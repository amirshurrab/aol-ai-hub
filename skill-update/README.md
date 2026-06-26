# Skill update — LGN co-brand support (client-ai-hub)

**Important:** I can't write to the installed `client-ai-hub` skill from a Cowork
session — its files are a read-only cache, so edits there don't persist. Apply the
changes below via **Settings → Capabilities → client-ai-hub** (open the skill folder
and edit the files). Everything you need is in this folder.

## 1) Add the logo to the skill's resources
Copy `skill-update/assets/lgn-logo.png` (the official London Gulf Nexus logo,
1828×1828 transparent PNG) into the skill at:

```
client-ai-hub/assets/lgn-logo.png
```

Source of truth: https://londongulfnexus.com/ →
`/wp-content/uploads/2025/05/London-Gulf-Nexus-Logo-transparent.png`

## 2) `references/design-system.md` — co-brand lockup
Replace the "Header lockup" note with:

> **Header lockup** (every page): `[CLIENT logo]  |  [PARTNER logo]`. The client logo
> is the client's white/SVG mark; a thin `|` divider follows; the partner logo (e.g.
> **LGN**) sits on a white rounded chip so it reads on the dark UI, at the **same height**
> as the client logo. Provide an SVG/PNG `assets/<partner>-logo.png` and an `onerror`
> text fallback (the partner's short name) so the lockup never breaks.

## 3) `references/page-specs.md` — "How <PARTNER> can help"
Add:

> **Per-page partner band:** every page ends with a tailored *"How <PARTNER> helps"*
> band (partner mark + one line mapping the partner's service to that page's topic +
> service chips). **Hub** additionally gets a richer *"Work with <PARTNER>"* section:
> a short positioning line, a card per **service line**, and a highlighted card per
> **product** (use the `prod` style). Keep it bilingual when the hub is bilingual.

## 4) Workflow step 0 (SKILL.md)
When asking for the brief, also capture: **partner/co-brand name, logo URL, the
partner's service lines, and any productized offerings** — then thread them through
the lockup, the per-page bands, and the Hub "Work with" section.

## LGN specifics used for this client
- **Framing:** AI enablement partner.
- **Service lines:** AI strategy & advisory · Custom agents & automation ·
  Training & enablement · Governance, compliance & sovereign AI.
- **Products:** AI Learning Assistant · AI Kids Club.

> Reusable QR enhancements (beautiful branded QR + ⛶ fullscreen button) are in the
> sibling file `../SKILL-PATCH-qr-fullscreen.md`.
