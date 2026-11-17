import sys
import unittest
from qa_m0 import acceptable, run_stage

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

if __name__ == '__main__': unittest.main()
