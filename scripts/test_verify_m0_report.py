import copy
import unittest
from verify_m0_report import REQUIRED, inspect

SHA='a'*40
def stage(name,status='PASS'):
    return {'name':name,'required':True,'status':status,'command':['true'],'exit_code':0}

def report():
    stages=[stage(x) for x in sorted(REQUIRED)]
    return {'module':'M0','revision':SHA,'status':'PASS','stages':stages}

class IndependentReportTests(unittest.TestCase):
    def test_valid_complete_report(self):
        self.assertEqual(inspect(report(),SHA)['closure_ready'],True)

    def test_pending_blocks_without_corrupting_evidence(self):
        r=report();r['stages'][0]={'name':r['stages'][0]['name'],'required':True,'status':'NOT_RUN'}
        r['status']='FAIL'
        x=inspect(r,SHA)
        self.assertEqual(x['integrity'],'PASS')
        self.assertFalse(x['closure_ready'])

    def test_false_green_is_rejected(self):
        r=report();r['stages'][0]['status']='NOT_RUN'
        self.assertEqual(inspect(r,SHA)['integrity'],'FAIL')

    def test_missing_duplicate_and_mismatched_sha(self):
        r=report();r['stages'].pop()
        self.assertEqual(inspect(r,SHA)['integrity'],'FAIL')
        r=report();r['stages'].append(copy.deepcopy(r['stages'][0]))
        self.assertEqual(inspect(r,SHA)['integrity'],'FAIL')
        self.assertEqual(inspect(report(),'b'*40)['integrity'],'FAIL')

    def test_false_pass_exit_code_and_na_without_reason(self):
        r=report();r['stages'][0]['exit_code']=7
        self.assertEqual(inspect(r,SHA)['integrity'],'FAIL')
        r=report();r['stages'][0]['status']='NOT_APPLICABLE'
        self.assertEqual(inspect(r,SHA)['integrity'],'FAIL')

if __name__=='__main__':
    unittest.main()
