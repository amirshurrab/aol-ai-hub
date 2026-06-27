# client-ai-hub — lessons learned from the Academy of Learning build

> **How to apply:** open **Settings → Capabilities → client-ai-hub** and edit the skill's
> files as below. Cowork sessions can't persist skill edits (read-only cache), so this doc is
> the hand-off. Companion files: `README.md` (partner logo), `../SKILL-PATCH-qr-fullscreen.md`
> (QR + fullscreen page).

---

## 1. Bilingual / RTL is a first-class mode (SKILL.md step 0 + design-system.md)
Many clients are Arabic-first. Add an **AR/EN toggle** with RTL support, don't bolt English on.

- Every translatable element carries `data-ar` and `data-en`; one `applyLang(lang)` sets
  `document.documentElement.lang`/`dir` and assigns `el.innerHTML` from the chosen attribute;
  persist choice in `localStorage`. JS-rendered cards must be re-rendered on toggle.
- **i18n attribute discipline** (these bit us): inside `data-*` use `<br>` for line breaks
  (never literal `\n`), real `<b>`/`<i>` tags are fine, use **unquoted class** (`<span class=ph>`)
  or curly quotes “ ” to avoid breaking the attribute's own quotes. Copy helpers strip tags and
  convert `<br>`→`\n`.
- **Direction-aware arrows:** a literal `→` doesn't flip in RTL. Drive arrows via
  `data-ar="←" data-en="→"` (e.g. a "chatbot → agent" connector), and put "Start here" ribbons /
  back-arrows on the correct physical side per direction.

## 2. Arabic readability boost (design-system.md)
Default sizes look small/cramped in Arabic. Add an `html[lang=ar]` layer:
- Larger base sizes + `line-height:1.9–2` for body, cards, lists, captions.
- **Prompt/code boxes must NOT be monospace in Arabic** — switch to the Arabic sans; monospace
  Arabic is the single worst readability offender.
- Bump small chips/badges/labels a few px.

## 3. Web fonts for a hosted site (design-system.md)
The hub is deployed, so use a real **web font**, not just the system stack.
- Recommended: **Tajawal** (one family covering Arabic + Latin) via Google Fonts with
  `preconnect` + `display:swap`; lead the `--sans` stack with it.
- Note the trade-off: self-hosted `woff2` is more robust (no third-party, works if Google is
  blocked) but heavier to set up. Offer both.

## 4. Fullscreen QR = a dedicated page, never a modal  ⚠️ biggest lesson
A fixed-position modal with `backdrop-filter` caused persistent see-through/stacking bugs that
survived many "make it opaque" attempts. **Replace the modal pattern with a separate
`CLIENT-QR.html`** that has a flat solid background. The Hub's "Fullscreen" control is just a
link. Full details + drop-in in `../SKILL-PATCH-qr-fullscreen.md`.

## 5. Branded QR (deploy-and-qr.md)
- Centre the **client icon** (icon-only mark) on a white chip when available; else the short
  name in brand accent. Keep ≤ 24–26% width, `error_correction=H`, **decode-verify**.
- Encode the **hub page URL**, not the bare repo root.

## 6. Co-brand / partner support (SKILL.md step 0 + design-system.md + page-specs.md)
Capture in the brief: **partner name, logo URL, service lines, and productized offerings.**
- **Header lockup:** `[CLIENT] | [PARTNER]` — thin `|` divider, partner logo on a white chip at
  the **same height** as the client logo, with an `onerror` text fallback (partner short name).
- **Per-page band:** each page ends with a tailored *"How <PARTNER> helps"* band (one line
  mapping a partner service to that page's topic + service chips).
- **Hub section:** a richer *"Work with <PARTNER>"* block — a card per service line and a
  highlighted card per **product**.
- Download the real partner logo into the skill's `assets/` (see `README.md`).

## 7. Navigation: Back-to-Hub everywhere (page-specs.md)
Every non-hub page gets the header back-to-hub button **and** a centered Back-to-Hub button near
the footer (long pages leave users stranded at the bottom).

## 8. Survey UX (page-specs.md)
- Likert (1–5) and NPS (0–10) buttons use `flex:1` to **fill the full width** of the card and are
  tall (≈54–60px) with larger numerals — not small fixed squares.
- Submit button **centered and prominent**.
- Section heading wording: keep it simple ("بياناتك" / "Your details").

## 9. Keep technical terms in English (everywhere)
Even in Arabic copy: Claude, Gamma, NotebookLM, MCP, Skills, Agents, NPS, PDPL, SDAIA, ISO/IEC
42001, HUMAIN/ALLaM. Append the English term in parens to translated capability labels, e.g.
`المهارات (Skills)`, `الذاكرة (Memory)`. Don't transliterate standards codes (write `ISO/IEC 42001`).

## 10. Region / sovereignty for KSA & regulated clients (page-specs.md AI Toolkit)
Feature the **sovereign option (HUMAIN / ALLaM 34B)** prominently and add a data-governance note
(PDPL / SDAIA, in-Kingdom hosting). Web-verify tool currency and **remove shut-down tools**.

## 11. Deploy & verify from the local terminal, and verify *visually* (deploy-and-qr.md)
- The Cowork sandbox is network-blocked from github.com / google.com / the client's site. Do
  **deploys and asset downloads via the local terminal** (Desktop Commander), where `git`/`gh`
  are already authenticated, and where `curl` can reach the client site for logos/icons.
- **Verify rendering, not just code.** Computed style claimed the QR overlay was opaque while it
  still bled through — only a **screenshot** + **`document.elementFromPoint` hit-testing** at the
  corners revealed the truth. Always confirm overlays/visuals this way.
- GitHub Pages + CDN cache HTML for minutes — tell the user to **hard-refresh** (Cmd+Shift+R) and
  cache-bust with `?v=N` when checking.

## 12. Validate before every deploy (deploy-and-qr.md)
`node --check` each page's `<script>` blocks, check `<div>`/`</div>` and `<script>` tag balance,
and grep for encoding artifacts (stray full-width brackets, literal `\n` in attributes) before
pushing.
