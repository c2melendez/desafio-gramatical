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
    if not modules:
        errors.append("catálogo sin módulos")
    ids = [m.get("id") for m in modules]
    if any(not isinstance(i, str) or not i for i in ids) or len(ids) != len(set(ids)):
        errors.append("ID vacío o duplicado")
    by_id = {m.get("id"): m for m in modules}
    m0s = [m for m in modules if m.get("stage") == "M0"]
    if len(m0s) != 1 or m0s[0].get("area") is not None:
        errors.append("se requiere un único M0 sin área")
    pairs = [(m.get("area"), m.get("stage")) for m in modules if m.get("stage") in ("M1", "M2", "M3", "CORTE")]
    if len(pairs) != len(set(pairs)):
        errors.append("etapa duplicada en la misma área")
    for m in modules:
        mid, stage, area = m.get("id"), m.get("stage"), m.get("area")
        if stage not in STAGES:
            errors.append(f"{mid}: etapa inválida")
        if area is not None and area not in areas:
            errors.append(f"{mid}: área no declarada")
        if stage in ("M1", "M2", "M3", "CORTE") and area is None:
            errors.append(f"{mid}: etapa sin área")
        required = m.get("required", [])
        optional = m.get("optional", [])
        if len(set(required)) != len(required) or len(set(optional)) != len(optional) or set(required) & set(optional):
            errors.append(f"{mid}: dependencias repetidas")
        for dep in required + optional:
            if dep == mid or dep not in by_id:
                errors.append(f"{mid}: dependencia inválida {dep}")
            else:
                parent = by_id[dep]
                if stage in STAGES and parent.get("stage") in STAGES and STAGES[parent["stage"]] >= STAGES[stage]:
                    errors.append(f"{mid}: etapas fuera de orden")
                if parent.get("area") not in (None, area) and parent.get("stage") != "CORTE":
                    errors.append(f"{mid}: dependencia de otra área sin corte")
        predecessor = {"M1": "M0", "M2": "M1", "M3": "M2", "CORTE": "M3"}.get(stage)
        if predecessor:
            candidates = [p.get("id") for p in modules if p.get("stage") == predecessor and
                          (predecessor == "M0" or p.get("area") == area)]
            if len(candidates) != 1 or candidates[0] not in required:
                errors.append(f"{mid}: falta dependencia obligatoria {predecessor}")
        if stage == "M4":
            cuts = [p for p in modules if p.get("stage") == "CORTE"]
            for declared_area in areas:
                matches = [p.get("id") for p in cuts if p.get("area") == declared_area]
                if len(matches) != 1 or matches[0] not in required:
                    errors.append(f"{mid}: falta corte obligatorio de {declared_area}")
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
