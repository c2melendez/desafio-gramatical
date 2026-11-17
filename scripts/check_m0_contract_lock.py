#!/usr/bin/env python3
"""Verifica contra manifiesto versionado que el contrato M0 no cambió silenciosamente."""
import json
import re
import subprocess
from pathlib import Path

ROOT=Path(__file__).resolve().parent.parent
SHA=re.compile(r'^[0-9a-f]{40}$')
MINIMUM={'src/lib/phuma-catalog.ts','src/lib/coverage.ts','src/lib/rotation.ts',
         'src/lib/grammar.ts','src/lib/reading.ts','src/lib/writing.ts',
         'src/routes/index.tsx','src/routes/jugar.tsx','src/routes/lectura.tsx',
         'src/routes/redaccion.tsx','src/routes/historial.tsx'}

def check(lock,hash_file):
    errors=[]
    if lock.get('hash_algorithm')!='git-blob-sha1':errors.append('algoritmo inválido')
    entries=lock.get('files')
    if not isinstance(entries,dict):return ['lista de contratos ausente']
    if not MINIMUM.issubset(entries):errors.append('archivos públicos obligatorios ausentes')
    for path,expected in entries.items():
        if not isinstance(path,str) or path.startswith('/') or '..' in Path(path).parts:
            errors.append('ruta insegura: '+str(path));continue
        if not isinstance(expected,str) or not SHA.fullmatch(expected):
            errors.append('hash inválido: '+path);continue
        actual=hash_file(path)
        if not actual or actual!=expected: errors.append('contrato cambió o falta: '+path)
    return errors

def hash_file(path):
    p=ROOT/path
    if not p.is_file():return None
    out=subprocess.run(['git','hash-object','--',str(p)],cwd=ROOT,capture_output=True,text=True)
    return out.stdout.strip() if out.returncode==0 else None

def main():
    lock=json.loads((ROOT/'docs/m0-contract-lock.json').read_text(encoding='utf8'))
    errors=check(lock,hash_file)
    print(json.dumps({'control':'contrato_m0','status':'FAIL' if errors else 'PASS',
                      'files':len(lock.get('files',{})),'errors':errors},ensure_ascii=False))
    return 1 if errors else 0
if __name__=='__main__':raise SystemExit(main())
