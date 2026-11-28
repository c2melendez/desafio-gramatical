#!/usr/bin/env python3
"""STEM-03: observe duplicate M0 commands; never replace required execution."""
import argparse
import hashlib
import json
import math
import re
import subprocess
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
STAGES = {
    'regresion_suite_existente': ['bun', 'run', 'test'],
    'regresion_y_funcional': ['bun', 'run', 'test'],
    'mutaciones_m0_integracion_y_progreso': ['node', '--import', './scripts/ts-resolve.mjs', 'scripts/test-m0-critical-mutations.mjs'],
    'mutacion_critica': ['node', '--import', './scripts/ts-resolve.mjs', 'scripts/test-m0-critical-mutations.mjs'],
}

def inspect(report, sha):
    if report.get('revision') != sha or not re.fullmatch(r'[0-9a-f]{40}', sha):
        raise ValueError('checkout no coincide')
    stages = report.get('stages')
    if not isinstance(stages, list):
        raise ValueError('etapas ausentes')
    by_name = {}
    for s in stages:
        if not isinstance(s, dict) or not isinstance(s.get('name'), str) or s['name'] in by_name:
            raise ValueError('etapa inválida o duplicada')
        by_name[s['name']] = s
    groups = defaultdict(list)
    shared_count = 0
    for name, command in STAGES.items():
        stage = by_name.get(name)
        if not stage or stage.get('required') is not True or stage.get('command') != command:
            raise ValueError('contrato de etapa ausente o alterado: ' + name)
        seconds = stage.get('seconds')
        valid_seconds = type(seconds) in (int, float) and math.isfinite(seconds) and seconds >= 0
        executed = (stage.get('status') == 'PASS' and type(stage.get('exit_code')) is int
                    and stage['exit_code'] == 0 and valid_seconds
                    and isinstance(stage.get('stdout'), str) and isinstance(stage.get('stderr'), str))
        shared_from = stage.get('shared_execution_from')
        if shared_from is not None:
            origin = by_name.get(shared_from, {})
            if (report.get('version') != 2 or name != 'regresion_y_funcional'
                    or shared_from != 'regresion_suite_existente'
                    or origin.get('command') != command
                    or 'shared_execution_from' in origin
                    or stage.get('status') != origin.get('status')
                    or stage.get('exit_code') != origin.get('exit_code')
                    or seconds != 0 or 'stdout' in stage or 'stderr' in stage):
                raise ValueError('referencia compartida inválida')
            shared_count += 1
            executed = False
        groups[tuple(command)].append({
            'stage': name, 'status': stage.get('status'), 'exit_code': stage.get('exit_code'),
            'observed_seconds': seconds if valid_seconds else None,
            'execution_complete': executed,
            'shared_execution_from': shared_from,
            'stdout_tail_sha256': hashlib.sha256(stage['stdout'].encode()).hexdigest() if isinstance(stage.get('stdout'), str) else None,
        })
    results = []
    for command, calls in groups.items():
        complete = all(c['execution_complete'] for c in calls)
        consolidated = (len(calls) == 2 and calls[0]['execution_complete']
                        and calls[1]['shared_execution_from'] == calls[0]['stage']
                        and calls[1]['status'] == 'PASS')
        results.append({
            'command': list(command), 'calls': calls,
            'decision': 'CONSOLIDATED' if consolidated else 'REVIEW' if complete else 'DIAGNOSE',
            'observed_min_seconds': min(c['observed_seconds'] for c in calls) if complete else None,
            'reuse_authorized': False,
            'actual_successful_executions': sum(c['execution_complete'] for c in calls),
        })
    return {'schema_version': 1, 'checkout_sha': sha, 'scope': 'M0-nested-commands',
            'tree_modified': report.get('arbol_modificado'), 'groups': results,
            'shared_obligations': shared_count, 'saved_seconds': 0, 'limitations': 'Command equality and log tails do not establish input/environment or semantic equivalence. Outer CI and browser jobs remain independent.'}

def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--report', required=True)
    args = p.parse_args()
    sha = subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=ROOT, text=True).strip()
    data = json.loads(Path(args.report).read_text(encoding='utf-8'))
    print(json.dumps(inspect(data, sha), ensure_ascii=False, indent=2, allow_nan=False))

if __name__ == '__main__':
    main()
