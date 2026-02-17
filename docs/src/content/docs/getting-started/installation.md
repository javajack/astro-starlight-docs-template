---
title: Installation
description: Detailed installation instructions and requirements
---

## Requirements

Before using this tool, ensure you have:

### 1. Node.js

- **Version**: 18.0.0 or higher
- **Check**: `node --version`
- **Download**: [nodejs.org](https://nodejs.org/)

### 2. Astro Starlight Project

This tool is specifically designed for Astro projects using the Starlight documentation theme.

**Check if you have Starlight:**

```bash
# Look for @astrojs/starlight in your package.json
cat package.json | grep starlight
```

**Don't have Starlight yet?** [Create a new Starlight project](https://starlight.astro.build/getting-started/)

### 3. Google Analytics 4 (Optional)

- Get a GA4 Measurement ID from [Google Analytics](https://analytics.google.com/)
- Format: `G-XXXXXXXXXX`
- Can be added later if you don't have one yet

## Installation Methods

### Method 1: npx (Recommended)

No installation required! Run directly:

```bash
npx astro-starlight-docs-template init
```

**Advantages:**
- ✅ Always uses the latest version
- ✅ No global package pollution
- ✅ One-time usage optimized

### Method 2: Global Install

Install once, use everywhere:

```bash
npm install -g astro-starlight-docs-template
```

Then run:

```bash
astro-starlight-docs-template init
```

**Advantages:**
- ✅ Faster subsequent runs
- ✅ Works offline (after first install)
- ✅ Shorter command

**Disadvantages:**
- ❌ Need to update manually (`npm update -g astro-starlight-docs-template`)
- ❌ Takes up global npm space

### Method 3: Project Dependency

Add to your project:

```bash
npm install --save-dev astro-starlight-docs-template
```

Add to package.json scripts:

```json
{
  "scripts": {
    "optimize": "astro-starlight-docs-template init"
  }
}
```

Run with:

```bash
npm run optimize
```

**Advantages:**
- ✅ Version locked in package.json
- ✅ Team members get same version
- ✅ CI/CD friendly

## Verification

After running the optimizer, verify installation:

### 1. Check Created Files

```bash
# Cookie consent script
ls public/cookie-consent.js

# Custom footer (if enabled)
ls src/components/overrides/Footer.astro

# LLM optimization (if enabled)
ls public/llms.txt

# Documentation
ls ASTRO_DOCS_OPTIMIZER.md
```

### 2. Check Modified Files

```bash
# Should contain Google Analytics and Consent Mode
cat astro.config.mjs | grep gtag
```

### 3. Run Dev Server

```bash
npm run dev
```

Open `http://localhost:4321` and check:
- Cookie banner appears (if in GDPR region)
- Footer has cookie settings link (if custom footer enabled)
- Google Analytics script loads in browser DevTools

## Package Integrity

This package is published with **provenance attestations**, meaning you can cryptographically verify it came from the official GitHub repository.

### Verify Provenance

```bash
npm view astro-starlight-docs-template dist.attestations
```

Should show:
```json
{
  "url": "https://registry.npmjs.org/-/npm/v1/attestations/astro-starlight-docs-template@1.0.1",
  "provenance": {
    "predicateType": "https://slsa.dev/provenance/v1"
  }
}
```

This proves the package was:
- ✅ Built from the official GitHub repository
- ✅ Published via GitHub Actions (not manual)
- ✅ Not tampered with after build

## Updating

### npx Method

Always uses latest version automatically. No action needed!

### Global Install

```bash
npm update -g astro-starlight-docs-template
```

### Project Dependency

```bash
npm update astro-starlight-docs-template
```

## Uninstalling

### Global Install

```bash
npm uninstall -g astro-starlight-docs-template
```

### Project Dependency

```bash
npm uninstall astro-starlight-docs-template
```

:::note
The files created by the tool (cookie-consent.js, Footer.astro, etc.) will remain in your project even after uninstalling the package. Delete them manually if needed.
:::

## System Requirements

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| Node.js | 18.0.0 | 20.x LTS |
| npm | 7.0.0 | 10.x |
| Disk Space | 10 MB | 50 MB |
| RAM | 512 MB | 1 GB |
| OS | Windows 10, macOS 10.15, Linux | Any recent version |

## Dependencies

The package has minimal dependencies:

```json
{
  "chalk": "^5.3.0",      // Terminal colors
  "inquirer": "^9.2.12",  // Interactive prompts
  "ora": "^8.0.1"         // Loading spinners
}
```

Total install size: ~10 MB

## Troubleshooting Installation

### "command not found" after global install

Add npm global bin to your PATH:

```bash
# Find npm global bin path
npm config get prefix

# Add to PATH (Linux/Mac)
export PATH="$(npm config get prefix)/bin:$PATH"

# Windows: Add to System Environment Variables
```

### Permission errors on Linux/Mac

Use npm without sudo:

```bash
# Configure npm to use a different directory
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'

# Add to ~/.bashrc or ~/.zshrc
export PATH=~/.npm-global/bin:$PATH

# Reload shell
source ~/.bashrc
```

### Proxy/Firewall Issues

Configure npm proxy:

```bash
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080
```

### "Not an Astro Starlight project" Error

The tool checks for Astro and Starlight. Ensure:
- `package.json` exists
- `astro` is in dependencies
- `@astrojs/starlight` is in dependencies

## Next Steps

- [Quick Start Guide](/astro-starlight-docs-template/getting-started/quick-start/) - Run the optimizer
- [Configuration](/astro-starlight-docs-template/guides/configuration/) - Customize the setup
- [Features Overview](/astro-starlight-docs-template/features/overview/) - Learn what you get
