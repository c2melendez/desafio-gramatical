#!/usr/bin/env python3
"""G-ACTION local integrity only. Does not authenticate provider or academic claims."""
import argparse, hashlib, json, re, subprocess, sys
from pathlib import Path
SHA = re.compile(r'^[0-9a-f]{40}$')
HASH = re.compile(r'^[0-9a-f]{64}$')
EXT = {'.py','.mjs','.js','.ts','.tsx','.jsx','.css','.html','.json','.yaml','.yml'}
def validate(repo, run):
    repo=Path(repo).resolve(); errors=[]
    def git(*args): return subprocess.check_output(['git','-C',str(repo),*args],text=True,stderr=subprocess.DEVNULL).strip()
    base,head=run.get('base_sha',''),run.get('candidate_sha','')
    try:
        if not (SHA.fullmatch(base) and SHA.fullmatch(head)) or base==head: raise ValueError()
        git('cat-file','-e',base+'^{commit}');git('cat-file','-e',head+'^{commit}')
        git('merge-base','--is-ancestor',base,head)
        paths=git('diff','--name-only',base,head).splitlines()
    except (ValueError,subprocess.CalledProcessError,TypeError): return ['GIT: commits distintos y ancestro verificable requeridos']
    def material(x):
        return Path(x).suffix in EXT and (x.startswith(('src/','scripts/','tests/','.github/workflows/')) or (x.startswith('qa/certification/') and not x.startswith(('qa/certification/evidence/','qa/certification/audit/')) and Path(x).suffix in {'.mjs','.js','.ts','.py'}))
    if not any(material(x) for x in paths): errors.append('DIFF: ningún cambio material reconocido')
    artifacts=set(); checks=run.get('checks',[])
    if not checks: errors.append('E1: ninguna prueba registrada')
    for c in checks:
        try:
            path=(repo/c['artifact']).resolve(); path.relative_to(repo)
            data=path.read_bytes()
            if not data.strip() or hashlib.sha256(data).hexdigest()!=c['artifact_sha256']: raise ValueError()
            if c['sha']!=head or not c['command'].strip() or type(c['exit_code']) is not int: raise ValueError()
            artifacts.add(c['artifact'])
        except (KeyError,ValueError,TypeError,AttributeError,OSError): errors.append('E1: artefacto, hash, comando, exit code o SHA inválido')
    # v7.6.1: student-facing changes require a corrective intervention record.
    # This is a structural check, not independent verification of pedagogical claims.
    changed_product={p for p in paths if p.startswith('src/')}
    justified=set()
    interventions=run.get('interventions',[])
    if not isinstance(interventions,list):
        errors.append('INTERVENCION: registro inválido'); interventions=[]
    for i in interventions:
        if not isinstance(i,dict):
            errors.append('INTERVENCION: ficha inválida'); continue
        action=i.get('action')
        affected=i.get('affected_paths',[])
        scope=i.get('scope')
        justification=i.get('justification')
        if action not in ('CONSERVAR','VERIFICAR','CORREGIR','COMPLEMENTAR','SUSTITUIR','CREAR'):
            errors.append('INTERVENCION: acción inválida'); continue
        if not isinstance(scope,str) or not scope.strip() or not isinstance(justification,str) or not justification.strip():
            errors.append('INTERVENCION: alcance y justificación requeridos'); continue
        if not isinstance(affected,list) or any(not isinstance(p,str) for p in affected):
            errors.append('INTERVENCION: rutas inválidas'); continue
        affected=set(affected)
        if not affected.issubset(set(paths)):
            errors.append('INTERVENCION: rutas no presentes en diff'); continue
        if action in ('CONSERVAR','VERIFICAR'):
            if affected & changed_product: errors.append('INTERVENCION: conservar/verificar no autoriza modificar producto')
            continue
        if not affected or i.get('finding_ref') not in artifacts or i.get('evidence_ref') not in artifacts:
            errors.append('INTERVENCION: requiere defecto/brecha y regresión con artefactos registrados'); continue
        if action in ('SUSTITUIR','CREAR') and (not isinstance(i.get('why_minimal_insufficient'),str) or not i['why_minimal_insufficient'].strip()):
            errors.append('INTERVENCION: justificar insuficiencia de corrección/complemento'); continue
        justified.update(affected)
    if changed_product - justified:
        errors.append('INTERVENCION: cambios de producto sin reparación/brecha justificada: '+', '.join(sorted(changed_product-justified)))
    fields=['selected_ids','examined_ids','new_semantic_pass_ids','review_ids','fail_ids']
    sets={}
    for name in fields:
        a=run.get(name,[])
        if not isinstance(a,list) or any(not isinstance(x,str) or not x for x in a): errors.append('IDS: formato '+name); a=[]
        if len(a)!=len(set(a)): errors.append('IDS: duplicados '+name)
        sets[name]=set(a)
    sel,exam,passed,review,fail=(sets[f] for f in fields)
    if len(sel)>450 or not exam<=sel or passed|review|fail!=exam or passed&review or passed&fail or review&fail: errors.append('IDS: selección, partición o límite incorrecto')
    # v7.7: no semantic approval outside a single prepared learning route.
    # Structural binding only; no self-approval of RDG quality.
    scope=run.get('subtopic_scope')
    rdg=run.get('rdg_contract')
    objectives=set()
    def valid_scope(s):
        return isinstance(s,dict) and all(isinstance(s.get(k),str) and s[k].strip() for k in ('area','topic','subtopic'))
    if passed:
        if run.get('phase')!='CERTIFICACION_ASOCIADA_EN_CURSO' or not valid_scope(scope) or not isinstance(rdg,dict) or rdg.get('status')!='RDG_READY' or rdg.get('subtopic_scope')!=scope:
            errors.append('RDG: aprobación requiere ruta READY del subtema activo')
        else:
            obj=rdg.get('objective_ids',[])
            if not isinstance(obj,list) or not obj or any(not isinstance(x,str) or not x.strip() for x in obj) or len(set(obj))!=len(obj):
                errors.append('RDG: objetivos inválidos')
            else: objectives=set(obj)
            route=rdg.get('route_path','')
            try:
                if not isinstance(route,str) or not route.startswith('src/') or '..' in Path(route).parts or rdg.get('evidence_ref') not in artifacts: raise ValueError()
                raw=subprocess.check_output(['git','-C',str(repo),'show',head+':'+route],stderr=subprocess.DEVNULL)
                if hashlib.sha256(raw).hexdigest()!=rdg.get('route_sha256'): raise ValueError()
            except (ValueError,subprocess.CalledProcessError,TypeError): errors.append('RDG: evidencia o hash de ruta en commit inválido')
    idx={}
    for i in run.get('items',[]):
        k=i.get('id')
        if k in idx: errors.append('FICHA: duplicada')
        idx[k]=i
    if set(idx)!=exam: errors.append('FICHA: una ficha por ID examinado')
    for k,i in idx.items():
        expected='PASS_SEMANTIC' if k in passed else 'REVIEW' if k in review else 'FAIL'
        if i.get('status')!=expected or not HASH.fullmatch(i.get('content_hash','')) or i.get('evidence_ref') not in artifacts: errors.append('FICHA: estado/hash/evidencia inválidos '+str(k))
        if k in passed:
            obj=i.get('objective_ids',[])
            if not isinstance(rdg,dict) or i.get('subtopic_scope')!=scope or i.get('rdg_route_sha256')!=rdg.get('route_sha256') or not isinstance(obj,list) or not obj or any(not isinstance(x,str) or x not in objectives for x in obj):
                errors.append('RDG: ID fuera del contrato de aprendizaje '+str(k))
        if k in passed and (i.get('oracle_status')!='VERIFIED' or i.get('evidence_level')!='E1'): errors.append('SEMANTIC: sin oráculo VERIFIED/E1 '+str(k))
        if k in passed and k+':'+i.get('content_hash','') in run.get('prior_evidence_keys',[]): errors.append('IDEMPOTENCIA: evidencia repetida como nueva '+str(k))
        if i.get('teacher_status')=='APROBADO_DOCENTE': errors.append('DOCENTE: requiere canal independiente')
    if run.get('status') in ('CERRADO_TECNICO','PUBLICADO_VERIFICADO'):
        errors.append('PUBLICACIÓN: usar adaptador autenticado CI/Render')
    return errors
def main():
    ap=argparse.ArgumentParser();ap.add_argument('ledger');ap.add_argument('--repo',default='.')
    a=ap.parse_args()
    try: errs=validate(a.repo,json.loads(Path(a.ledger).read_text()))
    except (ValueError,TypeError,KeyError,AttributeError,OSError) as e: errs=['FORMATO: '+str(e)]
    print(json.dumps({'local_integrity':'FAIL' if errs else 'PASS','errors':errs,'scope':'Local integrity only; not semantic, academic or publication certification'},ensure_ascii=False,indent=2));return bool(errs)
if __name__=='__main__': sys.exit(main())
