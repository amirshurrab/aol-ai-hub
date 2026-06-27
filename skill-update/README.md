# client-ai-hub skill update — index

I can't persist edits to the installed `client-ai-hub` skill from a Cowork session (its files
are a read-only cache). Apply everything here via **Settings → Capabilities → client-ai-hub**.

Contents:
- **`SKILL-UPDATES.md`** — all 12 lessons learned from this build, mapped to the skill file each
  belongs in (SKILL.md / design-system.md / page-specs.md / deploy-and-qr.md).
- **`../SKILL-PATCH-qr-fullscreen.md`** — branded QR + the **dedicated fullscreen page** pattern
  (replaces the buggy modal approach).
- **`assets/lgn-logo.png`** — the real London Gulf Nexus logo (1828×1828 transparent PNG). Copy
  into the skill at `client-ai-hub/assets/lgn-logo.png`.
  Source: https://londongulfnexus.com/ → `/wp-content/uploads/2025/05/London-Gulf-Nexus-Logo-transparent.png`

## Co-brand lockup spec (for design-system.md)
> **Header lockup:** `[CLIENT logo]  |  [PARTNER logo]`. Thin `|` divider; partner logo on a
> white rounded chip at the **same height** as the client logo; `onerror` text fallback (partner
> short name). Partner asset at `assets/<partner>-logo.png`.

## LGN specifics used for this client
- Framing: **AI enablement partner**.
- Service lines: AI strategy & advisory · Custom agents & automation · Training & enablement ·
  Governance, compliance & sovereign AI.
- Products: **AI Learning Assistant** · **AI Kids Club**.
