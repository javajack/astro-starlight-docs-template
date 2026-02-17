# 🚀 Astro Docs Optimizer

A CLI tool to add Google Analytics, GDPR-compliant cookie consent, SEO optimization, and LLM optimization to Astro Starlight documentation sites.

## ✨ Features

- **Google Analytics with Consent Mode v2** - Regional scoping for GDPR compliance
- **GDPR Cookie Consent Banner** - Customizable, with Accept/Reject/Settings options
- **SEO Optimization** - Open Graph, Twitter Cards, structured data ready
- **LLM Optimization** - Generate `llms.txt` for AI crawlers
- **Regional Intelligence** - Different behavior for GDPR vs non-GDPR regions
- **Zero Component Overrides** - Script injection method prevents layout issues

## 📦 Installation

No installation needed! Use with `npx`:

```bash
npx astro-docs-optimizer init
```

Or install globally:

```bash
npm install -g astro-docs-optimizer
astro-docs-optimizer init
```

## 🎯 Usage

Navigate to your Astro Starlight project and run:

```bash
cd my-astro-docs
npx astro-docs-optimizer init
```

The CLI will prompt you for:
- Google Analytics Measurement ID
- Site URL and base path
- Author information
- Analytics preferences (Cloudflare, etc.)
- Component customization options

## 🛠️ What It Does

### 1. Cookie Consent Banner
- Creates `public/cookie-consent.js`
- Injects GDPR-compliant cookie banner
- Implements Google Consent Mode v2
- Regional scoping (shows banner only in GDPR regions)

### 2. Google Analytics Setup
- Updates `astro.config.mjs` with GA4 tracking
- Adds consent mode initialization
- Configures IP anonymization
- Sets secure cookie flags

### 3. Custom Footer (Optional)
- Creates `src/components/overrides/Footer.astro`
- Adds cookie settings link
- Includes privacy notice
- Author branding

### 4. LLM Optimization (Optional)
- Generates `public/llms.txt`
- Prepares site for AI crawler indexing

## 📋 Requirements

- Node.js >= 18.0.0
- Astro project with @astrojs/starlight

## 🎨 Example

```bash
$ npx astro-docs-optimizer init

🚀 Astro Docs Optimizer v1.0.0

🔍 Checking if this is an Astro Starlight project...

✓ Astro project detected

? Google Analytics Measurement ID: G-XXXXXXXXXX
? Site URL: https://javajack.github.io
? Base path: /my-docs
? Author name: Rakesh Waghela
? Twitter handle: webiyo
? Add Cloudflare Web Analytics? No
? Create custom footer? Yes
? Add LLM optimization? Yes

📦 Installing optimizations...

✓ Cookie consent script created: public/cookie-consent.js
✓ astro.config.mjs updated with analytics and consent mode
✓ Footer component created: src/components/overrides/Footer.astro
✓ Created public/llms.txt
✓ Documentation created: ASTRO_DOCS_OPTIMIZER.md

✅ Optimization complete!

Next steps:
  1. Review the changes in astro.config.mjs
  2. Update your Google Analytics ID if needed
  3. Build and deploy: npm run build
  4. Check ASTRO_DOCS_OPTIMIZER.md for details
```

## 📖 Documentation

After running the optimizer, check `ASTRO_DOCS_OPTIMIZER.md` for:
- Configuration summary
- Files created/modified
- Implementation details
- Next steps

## 🌍 Regional Behavior

### GDPR Regions (EU/EEA/UK)
- Cookie banner shown on first visit
- Analytics denied by default
- User must explicitly consent

### Non-GDPR Regions
- No banner shown
- Analytics granted by default
- Better measurement quality
- Footer link available to opt-out

## 🔒 Privacy & Compliance

- ✅ GDPR Article 7 compliant
- ✅ ePrivacy Directive compliant
- ✅ ICO Guidelines compliant
- ✅ Google Consent Mode v2
- ✅ IP anonymization
- ✅ Secure cookie flags

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.

## 📄 License

MIT © Rakesh Waghela

## 🔗 Links

- [GitHub Repository](https://github.com/javajack/astro-docs-optimizer)
- [npm Package](https://www.npmjs.com/package/astro-docs-optimizer)
- [Author on X](https://x.com/webiyo)
- [Author on LinkedIn](https://www.linkedin.com/in/rakeshwaghela)

## 🙏 Credits

Built by [Rakesh Waghela](https://topmate.io/rakeshwaghela) - Tech & KYC Solutions Architect

Based on best practices from:
- Google Analytics Developer Guide
- GDPR Official Text
- Astro/Starlight Documentation
- Real-world implementation in production documentation sites

---

**Made with ❤️ for the Astro community**
