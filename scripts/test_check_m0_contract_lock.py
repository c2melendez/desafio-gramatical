import unittest
from check_m0_contract_lock import check,MINIMUM

H='a'*40
def data():return {'hash_algorithm':'git-blob-sha1','files':{p:H for p in MINIMUM}}
class ContractLockTests(unittest.TestCase):
    def test_ok(self):
        self.assertEqual(check(data(),lambda _:H),[])
    def test_detect_changed_bytes(self):
        self.assertTrue(any('cambió' in x for x in check(data(),lambda _:'b'*40)))
    def test_missing_required_file(self):
        d=data();d['files'].pop(next(iter(MINIMUM)))
        self.assertTrue(check(d,lambda _:H))
    def test_path_traversal_and_invalid_sha(self):
        d=data();d['files']['../secret']=H
        self.assertTrue(any('insegura' in x for x in check(d,lambda _:H)))
        d=data();d['files'][next(iter(MINIMUM))]='abc'
        self.assertTrue(any('inválido' in x for x in check(d,lambda _:H)))
if __name__=='__main__':unittest.main()
