"""Integrity of existing PDF copies; not licensing or curricular certification."""
import hashlib,json,sys
from pathlib import Path
def verify(root):
    root=Path(root)
    registry=json.loads((root/'docs/fuentes_certificacion_paa_phuma_v6.json').read_text())
    errors=[]
    for entry in registry['documents']+registry['duplicates']:
        path=root/entry['repository_path']
        if not path.is_file() or hashlib.sha256(path.read_bytes()).hexdigest()!=entry['sha256']:
            errors.append(entry['repository_path'])
    return errors
if __name__=='__main__':
    errors=verify(Path(__file__).resolve().parents[2])
    print(json.dumps({'integrity':'FAIL' if errors else 'PASS','failed':errors,'scope':'PDF bytes only; not source interpretation or redistribution rights'}))
    sys.exit(bool(errors))
