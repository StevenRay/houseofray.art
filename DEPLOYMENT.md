# House of Ray — Deployment Guide

## How the site is deployed

The site is deployed as a **Cloudflare Worker** (not Cloudflare Pages).

### Architecture

```
Browser → houseofray.art → Cloudflare DNS (Worker route) → "astro-temp" Worker → serves Astro site
```

- **Worker name:** `astro-temp`
- **Config file:** `wrangler.jsonc`
- **Live URLs:** `houseofray.art` and `www.houseofray.art`
- **Worker dev URL:** `astro-temp.mail-3e5.workers.dev`

### DNS Setup (Cloudflare)

The `houseofray.art` zone has two **Worker route** DNS records that connect the domain to the Worker:

| Type   | Name              | Content     | Proxy   |
|--------|-------------------|-------------|---------|
| Worker | houseofray.art    | astro-temp  | Proxied |
| Worker | www.houseofray.art| astro-temp  | Proxied |

There are also MX records for email forwarding and a TXT/SPF record. **Do not modify these.**

### How to deploy

```bash
cd /Users/concordsteve/Projects/HouseofRay/houseofray.com

# 1. Build the site
npx astro build

# 2. Deploy to Cloudflare Workers
npx wrangler deploy
```

That's it. The site will be live at `houseofray.art` within seconds.

### Common mistakes

- **Do NOT use `wrangler pages deploy`** — that deploys to Cloudflare Pages (`houseofray.pages.dev`), which is a completely separate system not connected to `houseofray.art`.
- **Do NOT add `houseofray.art` as a Pages custom domain** — the domain is routed via Worker DNS records, not Pages.

### Why Workers instead of Pages?

The Astro Cloudflare adapter compiles the site into a Worker. Using Workers directly gives full control over the deployment and avoids the extra layer of Pages. The DNS Worker route records handle the domain mapping.
