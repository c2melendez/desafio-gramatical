<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Autoridad técnico-pedagógica — v7.7
Leer [PROMPT_EJECUTOR_REPOSITORIO.md](PROMPT_EJECUTOR_REPOSITORIO.md) y [ejecutor completo](docs/Sistema_modulos_Academia_PHUMA_Play_v7_6.md). Sustituyen los prompts históricos; preservar el bloque Lovable. CONTINUAR inicia trabajo real, con G-ACTION, no un informe. Las fuentes originales están en qa/certification/PDF/; verificar huella y páginas, no redistribuir ni copiar reactivos. Mantener cursor y evidencia, no reiniciar módulos.

**v7.7 — Conservación del producto:** certificar el banco existente aplicando §0.1; auditorías compartidas por alcance y hash, revisión individual por ID y corrección inmediata. No reiniciar módulos ni regenerar bancos válidos. El Modo Repaso se conserva o completa según brechas verificadas.

**v7.7 — Prioridad vinculante:** la unidad de avance es el subtema. Fuentes PHUMA → Ruta de Descubrimiento Guiado funcional → contrato RDG_READY → auditoría correctiva de sus IDs → transferencia y paridad. No hay cuota de 450 por corrida; es solo techo técnico de sublote. Los lotes globales legados son diagnóstico, no certificación semántica. Repaso primero, juegos después; conservar lo válido y atender defectos críticos transversales sin inflar avance.
