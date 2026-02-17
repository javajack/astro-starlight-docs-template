# 🚀 Quick Start Guide

## What You Just Built

A complete npm CLI package that automates Astro Starlight documentation optimization with:
- ✅ Google Analytics + Consent Mode v2
- ✅ GDPR-compliant cookie consent
- ✅ SEO optimization
- ✅ LLM optimization (llms.txt)
- ✅ Regional scoping
- ✅ Custom footer with privacy notice

## Project Location

```
/home/rakesh/work/astro-starlight-docs-template/
```

## Test It Locally (Before Publishing)

### Option 1: Using npm link

```bash
cd /home/rakesh/work/astro-starlight-docs-template

# Install dependencies first
npm install

# Build the package
npm run build

# Link it globally
npm link

# Test in your docs project
cd /home/rakesh/work/broking/kyc-docs-site
astro-starlight-docs-template init

# Or in xlfill
cd /home/rakesh/work/xlfill/docs
astro-starlight-docs-template init
```

### Option 2: Using npm pack (More realistic test)

```bash
cd /home/rakesh/work/astro-starlight-docs-template

# Install deps & build
npm install
npm run build

# Create tarball
npm pack
# Creates: astro-starlight-docs-template-1.0.0.tgz

# Test it
cd /home/rakesh/work/broking/kyc-docs-site
npx /home/rakesh/work/astro-starlight-docs-template/astro-starlight-docs-template-1.0.0.tgz init
```

## Publish to GitHub

```bash
cd /home/rakesh/work/astro-starlight-docs-template

# Create repository on GitHub first:
# https://github.com/new
# Name: astro-starlight-docs-template

# Add remote and push
git remote add origin https://github.com/javajack/astro-starlight-docs-template.git
git push -u origin main
```

## Publish to npm

### Prerequisites

1. Create npm account: https://www.npmjs.com/signup
2. Login locally:

```bash
npm login
# Enter username, password, email
```

### Publish

```bash
cd /home/rakesh/work/astro-starlight-docs-template

# Final check
npm run build

# Dry run to see what will be published
npm publish --dry-run

# If all looks good, publish!
npm publish

# Success! Package is now live at:
# https://www.npmjs.com/package/astro-starlight-docs-template
```

### After Publishing

Anyone can now use it:

```bash
# From any Astro project
npx astro-starlight-docs-template init
```

## Update After Publishing

```bash
# Make changes to src/init.js or templates

# Bump version
npm version patch  # 1.0.0 -> 1.0.1

# Rebuild
npm run build

# Push changes
git push --follow-tags

# Publish update
npm publish
```

## Example Usage (After Publishing)

```bash
# In ANY Astro Starlight project
cd my-astro-docs
npx astro-starlight-docs-template init

# Interactive prompts will guide you through:
? Google Analytics Measurement ID: G-XXXXXXXXXX
? Site URL: https://example.com
? Base path: /docs
? Author name: Your Name
? Twitter handle: yourhandle
? LinkedIn profile URL: https://linkedin.com/in/yourprofile
? Add Cloudflare Web Analytics? No
? Create custom footer? Yes
? Add LLM optimization? Yes

# Output:
✓ Cookie consent script created
✓ astro.config.mjs updated
✓ Footer component created
✓ Documentation created

✅ Optimization complete!
```

## Files Structure

```
astro-starlight-docs-template/
├── bin/cli.js              # Entry point for 'astro-starlight-docs-template' command
├── src/init.js             # Main logic
├── templates/
│   ├── public/
│   │   └── cookie-consent.js    # Consent banner script
│   └── components/
│       └── Footer.astro         # Footer template
├── package.json            # npm package config
├── README.md              # Public documentation
├── PUBLISH.md             # Publishing guide
└── DEVELOPMENT.md         # Development guide
```

## What Happens When Someone Runs It

1. CLI checks for Astro/Starlight project
2. Prompts for configuration
3. Copies `cookie-consent.js` to `public/`
4. Updates `astro.config.mjs` with GA and consent mode
5. Creates `Footer.astro` (if requested)
6. Generates `llms.txt` (if requested)
7. Creates `ASTRO_DOCS_OPTIMIZER.md` documentation
8. Shows next steps

## Maintenance

### Update Templates

```bash
# Edit templates/public/cookie-consent.js
# Or templates/components/Footer.astro

# Commit changes
git add templates/
git commit -m "Update cookie consent banner styling"

# Bump version and publish
npm version patch
npm run build
npm publish
```

### Add Features

```bash
# Edit src/init.js
# Add new prompts or functionality

# Test locally
npm link
cd /test/project
astro-starlight-docs-template init

# If works, publish
npm version minor  # New feature = minor bump
npm run build
npm publish
```

## Support & Issues

After publishing:
- GitHub Issues: https://github.com/javajack/astro-starlight-docs-template/issues
- npm page: https://www.npmjs.com/package/astro-starlight-docs-template

## Next Steps

1. **Test Locally** - Use npm link to test thoroughly
2. **Create GitHub Repo** - Push to GitHub
3. **Publish to npm** - Make it available worldwide
4. **Share It** - Tweet, blog post, Reddit r/astro
5. **Iterate** - Gather feedback and improve

## Quick Command Reference

```bash
# Test
npm install && npm run build && npm link

# Publish
npm publish

# Update
npm version [patch|minor|major]
npm run build
npm publish

# Check status
npm info astro-starlight-docs-template
```

---

**You've built something awesome! 🎉**

This tool will save hours of manual setup for every Astro documentation site.
