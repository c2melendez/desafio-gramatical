import sys
import unittest
from unittest.mock import patch
from qa_m0 import acceptable, run_stage, run_regression_pair

class RunnerTests(unittest.TestCase):
    def test_detects_failure(self):
        stage = run_stage('fallo', [sys.executable, '-c', 'raise SystemExit(7)'])
        self.assertEqual(stage['status'], 'FAIL')
        self.assertEqual(stage['exit_code'], 7)
        self.assertFalse(acceptable([stage]))

    def test_absent_stage_blocks(self):
        stage = run_stage('ausente', None)
        self.assertEqual(stage['status'], 'NOT_RUN')
        self.assertFalse(acceptable([{'required':True,'status':'PASS'},stage]))

    def test_requires_nonempty_passes(self):
        self.assertFalse(acceptable([]))
        self.assertTrue(acceptable([{'required':True,'status':'PASS'}]))

    def test_regression_pair_runs_full_suite_once(self):
        for status, code in [('PASS', 0), ('FAIL', 7)]:
            origin = {'name':'regresion_suite_existente','required':True,'status':status,
                      'command':['bun','run','test'],'exit_code':code,'seconds':1,
                      'stdout':'full suite','stderr':''}
            with self.subTest(status=status), patch('qa_m0.run_stage', return_value=origin) as run:
                pair = run_regression_pair()
                run.assert_called_once_with('regresion_suite_existente',['bun','run','test'])
                self.assertEqual(pair[1]['shared_execution_from'], origin['name'])
                self.assertEqual(pair[1]['status'], status)
                self.assertNotIn('stdout', pair[1])
                self.assertEqual(acceptable(pair), status=='PASS')

if __name__ == '__main__': unittest.main()
