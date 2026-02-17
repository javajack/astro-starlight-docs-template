---
title: Quick Start
description: Get your Astro Starlight documentation production-ready in 2 minutes
---

## Prerequisites

- An existing Astro Starlight project
- Node.js 18.0.0 or higher
- Google Analytics 4 Measurement ID (optional but recommended)

## Installation

No installation needed! Use `npx` to run directly:

```bash
npx astro-starlight-docs-template init
```

Or install globally:

```bash
npm install -g astro-starlight-docs-template
astro-starlight-docs-template init
```

## Step-by-Step

### 1. Navigate to Your Project

```bash
cd my-astro-docs
```

### 2. Run the Optimizer

```bash
npx astro-starlight-docs-template init
```

### 3. Answer the Prompts

The CLI will ask you a series of questions:

```
🚀 Astro Starlight Docs Template v1.0.1

🔍 Checking if this is an Astro Starlight project...

✓ Astro project detected

? Google Analytics Measurement ID: G-XXXXXXXXXX
? Site URL: https://example.com
? Base path: /docs
? Author name: Your Name
? Twitter handle: yourhandle
? Add Cloudflare Web Analytics? No
? Create custom footer? Yes
? Add LLM optimization? Yes
```

:::tip[Don't Have a GA ID Yet?]
You can skip this (press Enter) and add it later by editing `astro.config.mjs`
:::

### 4. Review the Changes

The tool will create/modify:

- `public/cookie-consent.js` - Cookie consent banner
- `astro.config.mjs` - Analytics and consent mode setup
- `src/components/overrides/Footer.astro` - Custom footer (if enabled)
- `public/llms.txt` - LLM optimization (if enabled)
- `ASTRO_DOCS_OPTIMIZER.md` - Documentation of changes

### 5. Build and Deploy

```bash
npm run build
```

Your documentation is now production-ready with:
- ✅ Google Analytics with Consent Mode v2
- ✅ GDPR-compliant cookie consent
- ✅ SEO optimization
- ✅ LLM support

## What Happens Next?

### For EU Visitors

1. They see a cookie consent banner
2. Analytics are **denied by default**
3. Only after they click "Accept" will tracking begin
4. They can change settings anytime via the footer link

### For Non-EU Visitors

1. No banner shown (cleaner UX)
2. Analytics **granted by default**
3. Footer link available to opt-out if desired
4. Better measurement quality

## Verify It's Working

### 1. Run Dev Server

```bash
npm run dev
```

### 2. Open in Browser

Visit `http://localhost:4321` (or your configured port)

### 3. Check for Cookie Banner

If you're in a GDPR region (or using a VPN), you should see the cookie consent banner.

### 4. Check Google Analytics

- Go to your GA4 property
- Navigate to Realtime reports
- Browse your site
- You should see the visit (if you accepted cookies)

## Customization

Want to customize the setup? Check out:

- [Configuration Guide](/guides/configuration/) - Customize colors, text, behavior
- [Customization Guide](/guides/customization/) - Advanced customization options

## Troubleshooting

- **Banner not showing?** Check if you're in a GDPR region or see [Troubleshooting](/guides/troubleshooting/)
- **Analytics not working?** Verify your GA ID in `astro.config.mjs`
- **Footer not appearing?** Make sure you selected "Yes" for custom footer

## Next Steps

Now that your documentation is optimized, learn more about:

- [Why Astro & Starlight?](/why/astro-benefits/) - Understanding your tech stack
- [Features Overview](/features/overview/) - Deep dive into what you just installed
- [Implementation Details](/implementation/technical/) - How it all works under the hood
