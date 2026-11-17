import copy
import unittest
from validate_modules import validate

BASE = {"areas": ["espanol"], "modules": [
    {"id": "M0", "area": None, "stage": "M0", "required": [], "optional": []},
    {"id": "e1", "area": "espanol", "stage": "M1", "required": ["M0"], "optional": []},
    {"id": "e2", "area": "espanol", "stage": "M2", "required": ["e1"], "optional": []},
]}

class ValidatorTests(unittest.TestCase):
    def test_valid(self):
        self.assertEqual(validate(BASE), [])

    def test_cross_area_cut_precedes_next_area(self):
        d=copy.deepcopy(BASE); d['areas'].append('naturales')
        d['modules'].extend([
            {'id':'e3','area':'espanol','stage':'M3','required':['e2'],'optional':[]},
            {'id':'ec','area':'espanol','stage':'CORTE','required':['e3'],'optional':[]},
            {'id':'n1','area':'naturales','stage':'M1','required':['M0','ec'],'optional':[]},
        ])
        self.assertEqual(validate(d),[])

    def test_complete_catalog_requires_every_stage_and_m4(self):
        self.assertTrue(any("M4" in e for e in validate(BASE, require_complete=True)))
        self.assertTrue(any("CORTE" in e for e in validate(BASE, require_complete=True)))
        full = copy.deepcopy(BASE)
        full["modules"].extend([
            {"id":"e3","area":"espanol","stage":"M3","required":["e2"],"optional":[]},
            {"id":"ec","area":"espanol","stage":"CORTE","required":["e3"],"optional":[]},
            {"id":"M4","area":None,"stage":"M4","required":["ec"],"optional":[]},
        ])
        self.assertEqual(validate(full, require_complete=True), [])
        without_m3 = copy.deepcopy(full)
        without_m3["modules"] = [m for m in without_m3["modules"] if m["id"] != "e3"]
        self.assertTrue(validate(without_m3, require_complete=True))
        duplicate_m4 = copy.deepcopy(full)
        duplicate_m4["modules"].append({"id":"M4-copy","area":None,"stage":"M4","required":["ec"],"optional":[]})
        self.assertTrue(any("exactamente un M4" in e for e in validate(duplicate_m4, require_complete=True)))

    def test_negative_cases(self):
        cases = []
        d = copy.deepcopy(BASE); d["modules"].append(copy.deepcopy(d["modules"][0])); cases.append(d)
        d = copy.deepcopy(BASE); d["modules"][1]["required"] = ["missing"]; cases.append(d)
        d = copy.deepcopy(BASE); d["modules"][1]["optional"] = ["e1"]; cases.append(d)
        d = copy.deepcopy(BASE); d["modules"][1]["required"] = ["e2"]; cases.append(d)
        d = copy.deepcopy(BASE); d["modules"][1]["area"] = "desconocida"; cases.append(d)
        d = copy.deepcopy(BASE); d["modules"][1]["stage"] = "M3"; cases.append(d)
        d = copy.deepcopy(BASE); d["modules"][1]["optional"] = ["M0"]; cases.append(d)
        d = copy.deepcopy(BASE); d["modules"][2]["required"] = ["M0"]; cases.append(d)
        d = copy.deepcopy(BASE); d["modules"][1]["optional"] = ["e2"]; cases.append(d)
        d = copy.deepcopy(BASE); d["modules"][1]["area"] = None; cases.append(d)
        d = copy.deepcopy(BASE); d["modules"].append({"id":"e1b","area":"espanol","stage":"M1","required":["M0"],"optional":[]}); cases.append(d)
        d = copy.deepcopy(BASE); d["modules"].append({"id":"M4","area":None,"stage":"M4","required":["M0"],"optional":[]}); cases.append(d)
        cases.append({"areas":[],"modules":[]})
        for case in cases:
            with self.subTest(case=case): self.assertTrue(validate(case))

if __name__ == "__main__": unittest.main()
