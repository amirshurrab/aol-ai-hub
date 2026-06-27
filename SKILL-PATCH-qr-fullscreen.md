# Skill patch — branded QR + fullscreen via a DEDICATED PAGE (client-ai-hub)

> Apply via **Settings → Capabilities → client-ai-hub**. Cowork can't persist skill edits.

## Lesson (important)
A **modal overlay** for the enlarged QR is fragile: `position:fixed` + `backdrop-filter`
produced persistent see-through / stacking issues that were very hard to debug (computed
style reported an opaque background while the page still bled through). **Do not use a modal.**

**Use a dedicated full page instead.** It is bulletproof: a real page with a solid
background has no stacking context to fight.

## 1) `references/deploy-and-qr.md` — Branded QR
> Centre medallion = the **client logo/icon** (use the icon-only mark on a white chip when a
> clean asset exists; else the client's short name in the brand accent). Keep the logo ≤ 24–26%
> of the QR width, `error_correction=H`, and **decode-verify** with `cv2.QRCodeDetector`. The QR
> encodes the **hub page URL** (`.../CLIENT-AI-Hub.html`), not the bare repo root.

## 2) `references/page-specs.md` — Fullscreen QR = its own page
> Add a page **`CLIENT-QR.html`**: a solid-background (`background: <page bg hex>`, no gradient,
> no overlay) full-screen view with the large QR (`width:min(82vmin,560px)`), the scan caption,
> the URL, a **Copy link** button, and a **Back to the Hub** button. The Hub's QR panel shows a
> **⛶ Fullscreen** control that is a plain `<a href="CLIENT-QR.html">` (NOT a modal trigger).
> Bilingual when the hub is bilingual.

### Drop-in: the Fullscreen control on the Hub
```html
<a class="btn" href="CLIENT-QR.html">⛶ <span data-ar="تكبير الرمز" data-en="Fullscreen">Fullscreen</span></a>
```

### Drop-in: CLIENT-QR.html (single file, solid background)
```html
<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<style>
  html,body{margin:0;height:100%}
  body{background:#070f22;color:#eef2fb;font-family:"Tajawal",system-ui,sans-serif;
       min-height:100dvh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px}
  .qrimg{width:min(82vmin,560px);height:auto;border-radius:24px;box-shadow:0 30px 80px rgba(0,0,0,.6)}
  .btn{border:1px solid #27376b;border-radius:999px;padding:10px 18px;color:#eef2fb;text-decoration:none}
  .btn.solid{background:#F9A424;color:#10203f;font-weight:800;border-color:#F9A424}
</style></head><body>
  <img class="qrimg" src="CLIENT-hub-qr.png" alt="QR">
  <div style="color:#a8b7da;font-family:monospace">user.github.io/repo</div>
  <a class="btn solid" href="CLIENT-AI-Hub.html">↩ Back to the Hub</a>
</body></html>
```
Replace the page bg hex, the QR filename, and the URL/label per client.
