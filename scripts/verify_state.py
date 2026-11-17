#!/usr/bin/env python3
"""Verificación independiente parcial de referencias de M0; nunca certifica calidad."""
import argparse
import json
import re
import subprocess
import sys
from pathlib import Path
from validate_modules import validate

ROOT = Path(__file__).resolve().parent.parent
HEX = re.compile(r'^[0-9a-f]{40}$')
UNIMPLEMENTED = ('contratos_y_estado', 'calidad_por_item', 'regresion', 'mutaciones_criticas', 'seguridad_privacidad', 'verificacion_independiente_completa')

def verify(state, catalog, root, lookup):
    checks=[]
    def add(name,status,detail): checks.append({'control':name,'status':status,'detalle':detail})
    for error in validate(catalog): add('grafo','ERROR',error)
    modules = {m.get('id'):m for m in catalog.get('modules',[])}
    m = modules.get(state.get('modulo'))
    if not m: add('modulo','ERROR','Módulo ausente en catálogo')
    elif state.get('estado') != m.get('state'): add('estado','ERROR','Estado difiere del catálogo')
    else: add('estado','OK','Estado coincide con catálogo')
    if state.get('area_activa') not in catalog.get('areas',[]): add('area','ERROR','Área no declarada')
    for ref in state.get('referencias',[]):
        sha, path, expected = ref.get('revision',''), ref.get('ruta',''), ref.get('blob','')
        if not HEX.fullmatch(sha) or not HEX.fullmatch(expected) or not path or path.startswith('/') or '..' in Path(path).parts:
            add('referencia','ERROR',f'Referencia inválida: {path}'); continue
        actual=lookup(sha,path)
        if actual is None: add('referencia','SKIP',f'No disponible {sha}:{path}')
        elif actual != expected: add('referencia','ERROR',f'Hash no coincide: {sha}:{path}')
        else: add('referencia','OK',f'Hash confirmado: {sha}:{path}')
    if not state.get('referencias'): add('referencia','ERROR','Faltan referencias')
    for path in state.get('evidencia',[]):
        p=Path(path)
        if p.is_absolute() or '..' in p.parts or not (root/p).is_file(): add('evidencia','ERROR',f'Archivo ausente o ruta inválida: {path}')
        else: add('evidencia','OK',f'Archivo presente: {path}')
    if not state.get('evidencia'): add('evidencia','ERROR','Falta evidencia')
    pending=state.get('controles_obligatorios_pendientes',[])
    for name in UNIMPLEMENTED:
        if name not in pending: add(name,'ERROR','Control omitido del estado; su verificación aún no está implementada')
        add(name,'SKIP','Sin evidencia validada de ejecución')
    if state.get('estado') in ('COMPLETADA','COMPLETADO') and any(c['status'] in ('ERROR','SKIP') for c in checks):
        add('cierre','ERROR','No puede cerrarse con errores o controles sin evidencia')
    return checks

def lookup_git(sha,path):
    result=subprocess.run(['git','rev-parse','--verify',f'{sha}:{path}'],cwd=ROOT,text=True,capture_output=True)
    return result.stdout.strip() if result.returncode==0 else None

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--closure',action='store_true',help='Bloquear cierre por SKIP obligatorio')
    parser.add_argument('--baseline',action='store_true',help='Verificar solo integridad del inventario y estado inicial M0; no acredita controles de contenido')
    args=parser.parse_args()
    try:
        state=json.loads((ROOT/'docs/estado-m0.json').read_text(encoding='utf-8'))
        catalog=json.loads((ROOT/'docs/modulos-phuma.json').read_text(encoding='utf-8'))
        checks=verify(state,catalog,ROOT,lookup_git)
    except (OSError,ValueError,TypeError,KeyError) as exc:
        print(json.dumps({'status':'ERROR','error':str(exc)},ensure_ascii=False)); return 2
    if args.baseline:
        required = {'grafo','modulo','estado','area','referencia','evidencia'}
        checks = [c for c in checks if c['control'] in required]
        if not checks or not {'referencia','evidencia','estado'}.issubset({c['control'] for c in checks}):
            print(json.dumps({'status':'ERROR','error':'Evidencia base M0 incompleta'},ensure_ascii=False))
            return 2
    status='ERROR' if any(x['status']=='ERROR' for x in checks) else 'SKIP' if any(x['status']=='SKIP' for x in checks) else 'OK'
    print(json.dumps({'status':status,'checks':checks},ensure_ascii=False,indent=2))
    return 1 if status=='ERROR' or (args.closure and status=='SKIP') else 0

if __name__=='__main__': sys.exit(main())
