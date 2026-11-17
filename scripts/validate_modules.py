#!/usr/bin/env python3
"""Valida el grafo operativo; no valida contenido pedagógico."""
import json
import sys
from pathlib import Path

STAGES = {"M0": 0, "M1": 1, "M2": 2, "M3": 3, "CORTE": 4, "M4": 5}

def validate(data):
    errors = []
    areas = data.get("areas", [])
    if len(areas) != len(set(areas)):
        errors.append("áreas duplicadas")
    modules = data.get("modules", [])
    ids = [m.get("id") for m in modules]
    if any(not isinstance(i, str) or not i for i in ids) or len(ids) != len(set(ids)):
        errors.append("ID vacío o duplicado")
    by_id = {m.get("id"): m for m in modules}
    for m in modules:
        mid, stage, area = m.get("id"), m.get("stage"), m.get("area")
        if stage not in STAGES:
            errors.append(f"{mid}: etapa inválida")
        if area is not None and area not in areas:
            errors.append(f"{mid}: área no declarada")
        required = m.get("required", [])
        optional = m.get("optional", [])
        if len(set(required)) != len(required) or len(set(optional)) != len(optional) or set(required) & set(optional):
            errors.append(f"{mid}: dependencias repetidas")
        for dep in required + optional:
            if dep == mid or dep not in by_id:
                errors.append(f"{mid}: dependencia inválida {dep}")
            elif dep in required:
                parent = by_id[dep]
                if stage in STAGES and parent.get("stage") in STAGES and STAGES[parent["stage"]] >= STAGES[stage]:
                    errors.append(f"{mid}: etapas fuera de orden")
                if parent.get("area") not in (None, area) and parent.get("stage") != "CORTE":
                    errors.append(f"{mid}: dependencia de otra área sin corte")
    visiting, done = set(), set()
    def visit(mid):
        if mid in visiting:
            errors.append(f"ciclo obligatorio en {mid}")
            return
        if mid in done or mid not in by_id:
            return
        visiting.add(mid)
        for dep in by_id[mid].get("required", []):
            visit(dep)
        visiting.remove(mid)
        done.add(mid)
    for mid in by_id:
        visit(mid)
    return errors

if __name__ == "__main__":
    try:
        data = json.loads(Path(sys.argv[1] if len(sys.argv) > 1 else "docs/modulos-phuma.json").read_text(encoding="utf-8"))
        errors = validate(data)
    except (OSError, ValueError, TypeError, KeyError) as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        sys.exit(2)
    if errors:
        print("\n".join(errors), file=sys.stderr)
        sys.exit(1)
    print("Grafo válido; los estados y la calidad del contenido no se han verificado.")
