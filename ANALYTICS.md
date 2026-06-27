# Analytics (privacy-friendly) — how to turn it on

The Hub has a placeholder where an analytics snippet goes (search `ANALYTICS.md` in
`AOL-AI-Hub.html`, just before `</body>`). I can't create an analytics account for you, so pick
one of these cookieless, GDPR/PDPL-friendly options, create the account, and paste its snippet
into **every page** (or at least the Hub + QR pages):

## Option A — Cloudflare Web Analytics (free, no cookies)
1. dash.cloudflare.com → Analytics → Web Analytics → Add a site → `amirshurrab.github.io`.
2. Copy the `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" ...>` tag.
3. Paste it before `</body>` on each page, commit, push.

## Option B — Plausible (paid, very clean dashboards)
1. plausible.io → add domain `amirshurrab.github.io`.
2. Paste `<script defer data-domain="amirshurrab.github.io" src="https://plausible.io/js/script.js"></script>`.

## Option C — GoatCounter (free, open-source)
1. goatcounter.com → create a site code.
2. Paste `<script data-goatcounter="https://YOURCODE.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>`.

Tip: to measure **QR scans specifically**, point the QR at `AOL-AI-Hub.html?src=qr` and filter by
that query in your analytics. (Say the word and I'll regenerate the QR with the `?src=qr` tag.)
