import copy
import unittest
from validate_editorial_review import validate

SOURCE={'sha':'a','rows':[{'id':'x','hash':'hash'}]}
ITEM={'id':'x','hash':'hash','revision_automatica':'CONDICIONAL','observacion_respuesta':'razón','conteo_aceptado':0,'independencia':'INCONCLUSO'}
REVIEW={'fuente':{'sha':'a'},'items':[ITEM]}

class EditorialTests(unittest.TestCase):
    def test_valid(self): self.assertEqual(validate(REVIEW,SOURCE),[])
    def test_invalid(self):
        variants=[]
        r=copy.deepcopy(REVIEW); r['items'][0]['hash']='otro'; variants.append(r)
        r=copy.deepcopy(REVIEW); r['items'].append(copy.deepcopy(ITEM)); variants.append(r)
        r=copy.deepcopy(REVIEW); r['items'][0]['observacion_respuesta']=''; variants.append(r)
        r=copy.deepcopy(REVIEW); r['items'][0]['conteo_aceptado']=1; variants.append(r)
        r=copy.deepcopy(REVIEW); r['fuente']['sha']='b'; variants.append(r)
        for case in variants:
            with self.subTest(case=case): self.assertTrue(validate(case,SOURCE))

if __name__=='__main__': unittest.main()
