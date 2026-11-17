#!/usr/bin/env python3
"""Verifica de forma independiente el resultado del runner; no certifica pedagogía."""
import argparse
import json
import subprocess
from pathlib import Path

REQUIRED = {
    'grafo','negativos_grafo','inventario_tecnico','inventario_individual',
    'auditoria_seleccion','oraculos_seleccion','negativos_runner',
    'negativos_verificador_estado','evidencia_baseline_estado',
    'contratos_y_mutaciones_fixtures','mutaciones_m0_integracion_y_progreso',
    'trazabilidad_editorial','negativos_editoriales','familias','cuarentena',
    'build','regresion_suite_existente','lint','auditoria_contenido_existente',
    'contratos_lock_negativos','estado_y_contratos','inventario_por_item_y_calidad','regresion_y_funcional',
    'mutacion_critica','seguridad_estatica_cliente','seguridad_mutaciones_fixture',
    'dependencias_produccion','dependencias_completas',
    'seguridad_y_privacidad','verificador_independiente_de_estado',
}
VALID = {'PASS','FAIL','SKIP','NOT_RUN','NOT_APPLICABLE'}

def inspect(report, sha):
    problems=[]
    stages=report.get('stages', [])
    if not isinstance(stages,list):
        return {'integrity':'FAIL','closure_ready':False,'problems':['stages no es lista']}
    by={}
    for stage in stages:
        if not isinstance(stage,dict):
            problems.append('etapa inválida');continue
        name=stage.get('name')
        if name in by:problems.append('etapa duplicada: '+str(name))
        by[name]=stage
        if stage.get('status') not in VALID:problems.append('estado inválido: '+str(name))
        if stage.get('status')=='PASS' and stage.get('command') is not None and stage.get('exit_code')!=0:
            problems.append('PASS sin código cero: '+str(name))
        if stage.get('status')=='FAIL' and stage.get('command') is not None and stage.get('exit_code')==0:
            problems.append('FAIL con código cero: '+str(name))
        if stage.get('status')=='NOT_APPLICABLE' and not stage.get('reason'):
            problems.append('N/A sin justificación: '+str(name))
    missing=REQUIRED-set(by)
    if missing:problems.append('etapas ausentes: '+', '.join(sorted(missing)))
    if report.get('module')!='M0':problems.append('módulo incorrecto')
    if report.get('revision')!=sha:problems.append('SHA de ejecución no coincide con checkout')
    if len(str(sha))!=40:problems.append('SHA inválido')
    closure_ready=not problems and all(
        by[name].get('status')=='PASS' or
        (by[name].get('status')=='NOT_APPLICABLE' and by[name].get('reason'))
        for name in REQUIRED
    )
    if report.get('status') != ('PASS' if closure_ready else 'FAIL'):
        problems.append('estado general contradice las etapas obligatorias')
        closure_ready=False
    return {'integrity':'FAIL' if problems else 'PASS','closure_ready':bool(closure_ready),
            'missing':sorted(missing),'problems':problems,
            'pass':sum(s.get('status')=='PASS' for s in by.values()),
            'not_run':sum(s.get('status')=='NOT_RUN' for s in by.values()),
            'fail':sum(s.get('status')=='FAIL' for s in by.values())}

def main():
    p=argparse.ArgumentParser()
    p.add_argument('--report',required=True)
    p.add_argument('--require-closure',action='store_true')
    p.add_argument('--sha')
    args=p.parse_args()
    sha=args.sha or subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip()
    report=json.loads(Path(args.report).read_text(encoding='utf-8'))
    result=inspect(report,sha)
    print(json.dumps(result,ensure_ascii=False,indent=2))
    return 1 if result['integrity']!='PASS' or (args.require_closure and not result['closure_ready']) else 0

if __name__=='__main__':
    raise SystemExit(main())
