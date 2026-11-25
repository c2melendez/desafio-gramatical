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
