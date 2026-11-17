#!/usr/bin/env python3
"""Runner parcial de M0. Los controles aún no implementados bloquean cierre."""
import argparse
import datetime
import json
import subprocess
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

def run_stage(name, command):
    if command is None:
        return {"name": name, "required": True, "status": "NOT_RUN", "reason": "Control obligatorio aún no implementado o sin evidencia reproducible."}
    start = time.monotonic()
    try:
        result = subprocess.run(command, cwd=ROOT, text=True, capture_output=True, timeout=120)
        return {"name": name, "required": True, "status": "PASS" if result.returncode == 0 else "FAIL",
                "command": command, "exit_code": result.returncode, "seconds": round(time.monotonic()-start, 3),
                "stdout": result.stdout[-12000:], "stderr": result.stderr[-12000:]}
    except (OSError, subprocess.TimeoutExpired) as exc:
        return {"name": name, "required": True, "status": "FAIL", "command": command, "error": str(exc)}

def acceptable(stages):
    return bool(stages) and all(s.get("status") == "PASS" for s in stages if s.get("required")) and any(s.get("required") for s in stages)

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', required=True, help='Ruta del informe JSON; no sobrescribe archivos existentes')
    parser.add_argument('--module', default='M0', choices=['M0'], help='Módulo evaluado por este runner')
    parser.add_argument('--area', default='espanol', choices=['espanol'], help='Área activa en el catálogo')
    parser.add_argument('--phase', default='cierre', choices=['cierre'], help='Fase de verificación')
    args = parser.parse_args()
    stages = [
        run_stage('grafo', ['python3','scripts/validate_modules.py']),
        run_stage('negativos_grafo', ['python3','-m','unittest','discover','-s','scripts','-p','test_validate_modules.py']),
        run_stage('inventario_tecnico', ['node','scripts/test-inventory.mjs']),
        run_stage('inventario_individual', ['node','--import','./scripts/ts-resolve.mjs','scripts/test-inventory-items.mjs']),
        run_stage('auditoria_seleccion', ['node','scripts/test-selection-audit.mjs']),
        run_stage('oraculos_seleccion', ['node','scripts/check-selection-oracles.mjs']),
        run_stage('negativos_runner', ['python3','-m','unittest','discover','-s','scripts','-p','test_qa_m0.py']),
        run_stage('negativos_verificador_estado', ['python3','-m','unittest','discover','-s','scripts','-p','test_verify_state.py']),
        run_stage('evidencia_baseline_estado', ['python3','scripts/verify_state.py','--baseline']),
        run_stage('contratos_y_mutaciones_fixtures', ['node','scripts/test-content-contracts.mjs']),
        run_stage('mutaciones_m0_integracion_y_progreso', ['node','--import','./scripts/ts-resolve.mjs','scripts/test-m0-critical-mutations.mjs']),
        run_stage('trazabilidad_editorial', ['python3','scripts/validate_editorial_review.py']),
        run_stage('negativos_editoriales', ['python3','-m','unittest','discover','-s','scripts','-p','test_editorial_review.py']),
        run_stage('familias', ['node','scripts/check-family-evidence.mjs']),
        run_stage('cuarentena', ['node','scripts/test-quarantine.mjs']),
        run_stage('build', ['bun','run','build']),
        run_stage('regresion_suite_existente', ['bun','run','test']),
        run_stage('lint', ['bunx','eslint','.','--rule','prettier/prettier: off']),
        run_stage('auditoria_contenido_existente', ['bun','run','audit:content']),
        run_stage('estado_y_contratos', None),
        run_stage('inventario_por_item_y_calidad', None),
        run_stage('regresion_y_funcional', None),
        run_stage('mutacion_critica', None),
        run_stage('seguridad_estatica_cliente', ['node','scripts/security-client-audit.mjs']),
        run_stage('dependencias_produccion', ['bun','audit','--production']),
        run_stage('dependencias_completas', ['bun','audit']),
        run_stage('seguridad_mutaciones_fixture', ['node','scripts/security-client-audit.mjs','--test']),
        run_stage('seguridad_y_privacidad', None),
        run_stage('verificador_independiente_de_estado', None),
    ]
    try:
        revision = subprocess.check_output(['git','rev-parse','HEAD'],cwd=ROOT,text=True).strip()
        changed = bool(subprocess.check_output(['git','status','--porcelain','--untracked-files=all'],cwd=ROOT,text=True).strip())
        report = {"version":1, "module":args.module, "area":args.area, "phase":args.phase, "revision":revision, "arbol_modificado":changed,
                  "fecha_utc":datetime.datetime.now(datetime.timezone.utc).isoformat(),
                  "status":"PASS" if acceptable(stages) else "FAIL", "stages":stages}
        with open(args.output,'x',encoding='utf-8') as out:
            json.dump(report,out,ensure_ascii=False,indent=2); out.write('\n')
    except (OSError, subprocess.CalledProcessError) as exc:
        print(f'No se pudo guardar evidencia: {exc}',file=sys.stderr); return 2
    print(f"M0 {report['status']}; informe: {args.output}")
    return 0 if report['status']=='PASS' else 1

if __name__ == '__main__': sys.exit(main())
