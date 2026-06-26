# Skill patch — beautiful QR + fullscreen button (client-ai-hub)

I can't persist changes to the installed `client-ai-hub` skill from a Cowork session
(the skill files are a read-only cache). To make this part of the skill for future
clients, edit the skill via **Settings → Capabilities → client-ai-hub**, and add the
two pieces below.

## 1) `references/deploy-and-qr.md` — Branded QR
Add to the "Branded QR" section:

> The centre medallion holds the **client logo** (recoloured SVG on a white chip) when a
> clean logo asset exists; otherwise fall back to the client's short **name** in the brand
> accent. Card uses the client's primary brand colour as the background, an accent rule
> under the title, and a bilingual caption when the hub is bilingual. Always
> `error_correction=H`, keep the logo ≤ 24–26% of the QR width, and **decode-verify** with
> `cv2.QRCodeDetector` so the centre logo never breaks scanning. The QR encodes the **hub
> page URL** (e.g. `.../CLIENT-AI-Hub.html`), not just the repo root.

## 2) `references/page-specs.md` — Fullscreen QR (every QR gets this)
Add under the Hub spec (and anywhere a QR is shown):

> Every QR image carries a **⛶ Fullscreen** button. Clicking it opens a centered modal
> overlay (dark, blurred backdrop) showing the QR at `min(82vmin, 560px)` on a white card,
> the short URL beneath it, and a ✕ close button. Close on backdrop click and on `Esc`.
> This lets people scan from across a room during a live session.

### Drop-in snippet (single-file, offline-safe)
```html
<!-- CSS -->
<style>
.qrmodal{position:fixed;inset:0;background:rgba(3,8,20,.93);backdrop-filter:blur(6px);display:none;place-items:center;z-index:200;padding:20px}
.qrmodal.open{display:grid}
.qrbox{display:flex;flex-direction:column;align-items:center;gap:16px;animation:qrpop .25s ease}
@keyframes qrpop{from{transform:scale(.9);opacity:0}to{transform:none;opacity:1}}
.qrbox img{width:min(82vmin,560px);height:auto;border-radius:22px;background:#fff;padding:12px}
.qrbox .qrurl{color:var(--muted);font-family:var(--mono);font-size:14px}
</style>

<!-- Button (next to the QR image) -->
<button class="btn" onclick="openQR()">⛶ <span data-ar="تكبير الرمز" data-en="Fullscreen">Fullscreen</span></button>

<!-- Modal (place near end of <body>) -->
<div id="qrModal" class="qrmodal" onclick="closeQR()">
  <div class="qrbox" onclick="event.stopPropagation()">
    <img src="CLIENT-hub-qr.png" alt="QR code">
    <div class="qrurl">user.github.io/repo</div>
    <button class="btn solid" onclick="closeQR()">✕ <span data-ar="إغلاق" data-en="Close">Close</span></button>
  </div>
</div>

<!-- JS -->
<script>
function openQR(){document.getElementById('qrModal').classList.add('open');}
function closeQR(){document.getElementById('qrModal').classList.remove('open');}
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeQR();});
</script>
```
