#!/usr/bin/env python3
"""Comprueba trazabilidad editorial, no la corrección pedagógica de las decisiones."""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

def validate(review, source):
    issues=[]
    original=source.get('rows',[])
    expected={row['id']:row['hash'] for row in original}
    if len(expected)!=len(original): issues.append('IDs duplicados en la fuente')
    items=review.get('items',[])
    ids=[item.get('id') for item in items]
    if len(ids)!=len(set(ids)): issues.append('IDs duplicados en revisión')
    if set(ids)!=set(expected): issues.append('IDs no coinciden con la fuente')
    if review.get('fuente',{}).get('sha')!=source.get('sha'): issues.append('SHA de fuente distinto')
    for item in items:
        ident=item.get('id')
        if item.get('hash')!=expected.get(ident): issues.append(f'{ident}: hash distinto')
        if item.get('revision_automatica') not in ('CONDICIONAL','REQUIERE_CAMBIO'): issues.append(f'{ident}: decisión inválida')
        if not str(item.get('observacion_respuesta','')).strip(): issues.append(f'{ident}: falta observación')
        if item.get('conteo_aceptado')!=0 or item.get('independencia')!='INCONCLUSO': issues.append(f'{ident}: aceptación sin evidencia de independencia')
    return issues

def main():
    try:
        review=json.loads((ROOT/'docs/evidencia/revision-editorial-36-20261117.json').read_text(encoding='utf-8'))
        source=json.loads((ROOT/'docs/evidencia/revision-borradores-20261117.json').read_text(encoding='utf-8'))
        issues=validate(review,source)
    except (OSError,ValueError,TypeError,KeyError) as exc:
        print(f'ERROR: {exc}',file=sys.stderr); return 2
    if issues:
        print('\n'.join(issues),file=sys.stderr); return 1
    print(f'Trazabilidad verificada para {len(review["items"])} registros; calidad pedagógica pendiente.')
    return 0

if __name__=='__main__': sys.exit(main())
