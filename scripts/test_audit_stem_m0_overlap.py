import copy
import unittest
from audit_stem_m0_overlap import STAGES, inspect

SHA = 'a' * 40

def fixture():
    return {'revision': SHA, 'arbol_modificado': True, 'stages': [
        {'name': name, 'required': True, 'status': 'PASS', 'command': list(cmd),
         'exit_code': 0, 'seconds': i + 1.5, 'stdout': 'actual log', 'stderr': ''}
        for i, (name, cmd) in enumerate(STAGES.items())
    ]}

class StemOverlapTests(unittest.TestCase):
    def test_groups_and_measured_minimum_without_reuse(self):
        r = inspect(fixture(), SHA)
        self.assertEqual(len(r['groups']), 2)
        self.assertEqual([g['observed_min_seconds'] for g in r['groups']], [1.5, 3.5])
        self.assertEqual(r['saved_seconds'], 0)
        self.assertTrue(all(g['decision'] == 'REVIEW' and not g['reuse_authorized'] for g in r['groups']))
        self.assertTrue(r['tree_modified'])

    def test_missing_duplicate_and_changed_command_rejected(self):
        for variant in ('missing', 'duplicate', 'changed'):
            r = fixture()
            if variant == 'missing':
                r['stages'].pop()
            elif variant == 'duplicate':
                r['stages'].append(copy.deepcopy(r['stages'][0]))
            else:
                r['stages'][0]['command'].append('--other')
            with self.subTest(variant=variant), self.assertRaises(ValueError):
                inspect(r, SHA)

    def test_wrong_checkout_rejected(self):
        with self.assertRaises(ValueError):
            inspect(fixture(), 'b' * 40)

    def test_incomplete_and_failed_steps_do_not_count(self):
        for update in ({'status':'NOT_RUN'}, {'exit_code': 1}, {'seconds': -1}, {'seconds': float('nan')}, {'stdout': None}, {'exit_code': False}):
            r = fixture()
            r['stages'][0].update(update)
            g = inspect(r, SHA)['groups'][0]
            with self.subTest(update=update):
                self.assertEqual(g['decision'], 'DIAGNOSE')
                self.assertIsNone(g['observed_min_seconds'])
                self.assertFalse(g['reuse_authorized'])

if __name__ == '__main__':
    unittest.main()
