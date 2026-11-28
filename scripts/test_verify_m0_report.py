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

    def shared_report(self):
        r=report()
        r['version']=2
        r['stages']=[s for s in r['stages'] if s['name'] not in ('regresion_suite_existente','regresion_y_funcional')]
        r['stages'] += [
            {'name':'regresion_suite_existente','required':True,'status':'PASS','command':['bun','run','test'],'exit_code':0,'seconds':72.6,'stdout':'tests passed','stderr':''},
            {'name':'regresion_y_funcional','required':True,'status':'PASS','command':['bun','run','test'],'exit_code':0,'seconds':0,'shared_execution_from':'regresion_suite_existente'},
        ]
        return r

    def test_shared_pair_covers_31_obligations_with_30_executed_pass(self):
        result=inspect(self.shared_report(),SHA)
        self.assertTrue(result['closure_ready'], result)
        self.assertEqual(result['pass'],31)
        self.assertEqual(result['executed_pass'],30)
        self.assertEqual(result['shared_obligations'],1)

    def test_shared_pair_rejects_missing_or_false_origin(self):
        for variant in ('chain','wrong_command','missing_output','false_green','moved','wrong_version','fake_output','no_alias','missing_origin'):
            r=self.shared_report()
            origin, alias=r['stages'][-2:]
            if variant=='chain': origin['shared_execution_from']='build'
            elif variant=='wrong_command': alias['command']=['true']
            elif variant=='missing_output': del origin['stdout']
            elif variant=='false_green': origin.update(status='FAIL',exit_code=7)
            elif variant=='moved': r['stages'].insert(0,r['stages'].pop())
            elif variant=='wrong_version': r['version']=1
            elif variant=='fake_output': alias['stdout']='invented'
            elif variant=='no_alias': del alias['shared_execution_from']
            elif variant=='missing_origin': r['stages'].remove(origin)
            with self.subTest(variant=variant):
                self.assertFalse(inspect(r,SHA)['closure_ready'])

    def test_shared_failure_never_closes(self):
        r=self.shared_report()
        for s in r['stages'][-2:]: s.update(status='FAIL',exit_code=7)
        r['status']='FAIL'
        result=inspect(r,SHA)
        self.assertEqual(result['integrity'],'PASS')
        self.assertFalse(result['closure_ready'])

if __name__=='__main__':
    unittest.main()
