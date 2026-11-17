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
