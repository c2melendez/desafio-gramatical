import hashlib, subprocess, tempfile, unittest
from pathlib import Path
from guard_avance_phuma_v7_6 import validate
class GuardTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory(); self.p=Path(self.tmp.name)
        def git(*a): return subprocess.check_output(['git','-C',str(self.p),*a],stderr=subprocess.DEVNULL,text=True).strip()
        self.git=git;git('init','-q');git('config','user.email','test@example.invalid');git('config','user.name','Fixture')
        (self.p/'src').mkdir();(self.p/'src/x.js').write_text('const x=1;\n');git('add','.');git('commit','-qm','base');b=git('rev-parse','HEAD')
        (self.p/'src/x.js').write_text('const x=2;\n');git('add','.');git('commit','-qm','fix');h=git('rev-parse','HEAD')
        (self.p/'result.log').write_text('synthetic fixture result\n');digest=hashlib.sha256((self.p/'result.log').read_bytes()).hexdigest()
        self.r={'base_sha':b,'candidate_sha':h,'checks':[{'command':'fixture','exit_code':0,'sha':h,'artifact':'result.log','artifact_sha256':digest}],'selected_ids':['a'],'examined_ids':['a'],'new_semantic_pass_ids':['a'],'review_ids':[],'fail_ids':[],'items':[{'id':'a','content_hash':'a'*64,'status':'PASS_SEMANTIC','oracle_status':'VERIFIED','evidence_level':'E1','evidence_ref':'result.log'}]}
        self.r['interventions']=[{'scope':'fixture/a','action':'CORREGIR','finding_ref':'result.log','evidence_ref':'result.log','affected_paths':['src/x.js'],'justification':'synthetic minimal correction'}]
        scope={'area':'fixture','topic':'fixture','subtopic':'fixture'}
        routehash=hashlib.sha256((self.p/'src/x.js').read_bytes()).hexdigest()
        self.r.update(phase='CERTIFICACION_ASOCIADA_EN_CURSO',subtopic_scope=scope,rdg_contract={'status':'RDG_READY','subtopic_scope':scope,'route_path':'src/x.js','route_sha256':routehash,'objective_ids':['o1'],'evidence_ref':'result.log'})
        self.r['items'][0].update(subtopic_scope=scope,rdg_route_sha256=routehash,objective_ids=['o1'])
    def test_rdg_not_ready(self): self.r['rdg_contract']['status']='RDG_EN_CURSO';self.assertTrue(any('RDG:' in e for e in validate(self.p,self.r)))
    def test_rdg_hash_stale(self): self.r['rdg_contract']['route_sha256']='b'*64;self.assertTrue(any('hash de ruta' in e for e in validate(self.p,self.r)))
    def test_rdg_wrong_scope(self): self.r['items'][0]['subtopic_scope']={'area':'other'};self.assertTrue(any('fuera del contrato' in e for e in validate(self.p,self.r)))
    def test_rdg_unknown_objective(self): self.r['items'][0]['objective_ids']=['other'];self.assertTrue(any('fuera del contrato' in e for e in validate(self.p,self.r)))
    def test_unjustified_product_change(self): self.r['interventions']=[];self.assertTrue(any('INTERVENCION' in e for e in validate(self.p,self.r)))
    def test_creation_requires_minimal_alternative(self): self.r['interventions'][0]['action']='CREAR';self.assertTrue(any('insuficiencia' in e for e in validate(self.p,self.r)))
    def test_creation_justified(self):
        self.r['interventions'][0].update(action='CREAR',why_minimal_insufficient='synthetic missing objective');self.assertEqual(validate(self.p,self.r),[])
    def test_missing_defect_evidence(self): self.r['interventions'][0]['finding_ref']='missing.log';self.assertTrue(any('artefactos' in e for e in validate(self.p,self.r)))
    def test_conservation_cannot_change_product(self): self.r['interventions'][0]['action']='CONSERVAR';self.assertTrue(any('conservar/verificar' in e for e in validate(self.p,self.r)))
    def test_unknown_diff_path(self): self.r['interventions'][0]['affected_paths']=['src/absent.js'];self.assertTrue(any('rutas no presentes' in e for e in validate(self.p,self.r)))
    def tearDown(self): self.tmp.cleanup()
    def test_valid_local_fixture(self): self.assertEqual(validate(self.p,self.r),[])
    def test_no_evidence(self): self.r['checks']=[];self.assertTrue(validate(self.p,self.r))
    def test_duplicate(self): self.r['examined_ids']=['a','a'];self.assertTrue(validate(self.p,self.r))
    def test_oracle_missing(self): self.r['items'][0]['oracle_status']='INCONCLUSIVE';self.assertTrue(validate(self.p,self.r))
    def test_wrong_sha(self): self.r['checks'][0]['sha']=self.r['base_sha'];self.assertTrue(validate(self.p,self.r))
    def test_artifact_tamper(self): (self.p/'result.log').write_text('tampered');self.assertTrue(validate(self.p,self.r))
    def test_repeat(self): self.r['prior_evidence_keys']=['a:'+'a'*64];self.assertTrue(validate(self.p,self.r))
    def test_teacher(self): self.r['items'][0]['teacher_status']='APROBADO_DOCENTE';self.assertTrue(validate(self.p,self.r))
    def test_publication_unverified(self): self.r['status']='PUBLICADO_VERIFICADO';self.assertTrue(validate(self.p,self.r))
    def test_document_only(self):
        b=self.r['candidate_sha'];(self.p/'README.md').write_text('text');self.git('add','README.md');self.git('commit','-qm','docs');h=self.git('rev-parse','HEAD');self.r.update(base_sha=b,candidate_sha=h);self.r['checks'][0]['sha']=h;self.assertTrue(any('DIFF' in x for x in validate(self.p,self.r)))
if __name__=='__main__': unittest.main()
