import tempfile
import unittest
from pathlib import Path
from verify_state import UNIMPLEMENTED, verify

S='a'*40
C={'areas':['espanol'],'modules':[{'id':'M0','area':None,'stage':'M0','required':[],'optional':[],'state':'EN_CURSO'}]}
def sample(): return {'modulo':'M0','estado':'EN_CURSO','area_activa':'espanol','referencias':[{'revision':S,'ruta':'src/x','blob':S}],'evidencia':['e.txt'],'controles_obligatorios_pendientes':list(UNIMPLEMENTED)}

class StateTests(unittest.TestCase):
    def test_evidence_hash_and_pending(self):
        with tempfile.TemporaryDirectory() as d:
            p=Path(d); (p/'e.txt').write_text('x')
            checks=verify(sample(),C,p,lambda *_:S)
            self.assertTrue(any(c['status']=='SKIP' for c in checks))
            self.assertFalse(any(c['status']=='ERROR' for c in checks))
            checks=verify(sample(),C,p,lambda *_:'b'*40)
            self.assertTrue(any(c['status']=='ERROR' and c['control']=='referencia' for c in checks))
            checks=verify(sample(),C,p,lambda *_:None)
            self.assertTrue(any(c['status']=='SKIP' and c['control']=='referencia' for c in checks))

    def test_missing_evidence_and_false_completion(self):
        with tempfile.TemporaryDirectory() as d:
            s=sample(); s['estado']='COMPLETADA'
            checks=verify(s,C,Path(d),lambda *_:S)
            self.assertTrue(any(c['status']=='ERROR' and c['control']=='evidencia' for c in checks))
            self.assertTrue(any(c['status']=='ERROR' and c['control']=='cierre' for c in checks))

    def test_removing_pending_does_not_allow_green(self):
        with tempfile.TemporaryDirectory() as d:
            p=Path(d); (p/'e.txt').write_text('x')
            s=sample(); s['controles_obligatorios_pendientes']=[]
            checks=verify(s,C,p,lambda *_:S)
            self.assertTrue(any(c['status']=='ERROR' for c in checks))

if __name__=='__main__': unittest.main()
