---
title: Installation
description: Detailed installation instructions and requirements
---

import { Tabs, TabItem, Steps, Badge, FileTree } from '@astrojs/starlight/components';

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
cat package.json | grep starlight
```

**Don't have Starlight yet?** [Create a new Starlight project](https://starlight.astro.build/getting-started/)

### 3. Google Analytics 4 (Optional)

- Get a GA4 Measurement ID from [Google Analytics](https://analytics.google.com/)
- Format: `G-XXXXXXXXXX`
- Can be added later if you don't have one yet

## Installation Methods

<Tabs>
  <TabItem label="npx (Recommended)" icon="seti:npm">
    No installation required! Run directly:

    ```bash
    npx astro-starlight-docs-template init
    ```

    **Advantages:**
    - Always uses the latest version
    - No global package pollution
    - One-time usage optimized
  </TabItem>
  <TabItem label="Global Install">
    Install once, use everywhere:

    ```bash
    npm install -g astro-starlight-docs-template
    ```

    Then run:

    ```bash
    astro-starlight-docs-template init
    ```

    **Advantages:**
    - Faster subsequent runs
    - Works offline (after first install)
    - Shorter command
  </TabItem>
  <TabItem label="Project Dependency">
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
    - Version locked in package.json
    - Team members get same version
    - CI/CD friendly
  </TabItem>
</Tabs>

## Verification

After running the optimizer, verify installation:

<Steps>

1. **Check created files**

   <FileTree>
   - public/
     - cookie-consent.js
     - llms.txt (if enabled)
   - src/
     - components/
       - overrides/
         - Footer.astro (if enabled)
   - ASTRO_DOCS_OPTIMIZER.md
   </FileTree>

2. **Check modified files**

   ```bash
   # Should contain Google Analytics and Consent Mode
   cat astro.config.mjs | grep gtag
   ```

3. **Run dev server**

   ```bash
   npm run dev
   ```

4. **Verify in browser**

   Open `http://localhost:4321` and check:
   - Cookie banner appears (if in GDPR region)
   - Footer has cookie settings link (if custom footer enabled)
   - Google Analytics script loads in browser DevTools

</Steps>

## Package Integrity

This package is published with **provenance attestations**, meaning you can cryptographically verify it came from the official GitHub repository.

```bash
npm view astro-starlight-docs-template dist.attestations
```

This proves the package was:
- Built from the official GitHub repository
- Published via GitHub Actions (not manual)
- Not tampered with after build

## System Requirements

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| Node.js | 18.0.0 | 20.x LTS |
| npm | 7.0.0 | 10.x |
| Disk Space | 10 MB | 50 MB |
| RAM | 512 MB | 1 GB |
| OS | Windows 10, macOS 10.15, Linux | Any recent version |

## Troubleshooting Installation

:::tip[Permission errors on Linux/Mac]
Use npm without sudo:

```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
source ~/.bashrc
```
:::

:::note["Not an Astro Starlight project" Error]
The tool checks for Astro and Starlight. Ensure `package.json` contains both `astro` and `@astrojs/starlight` in dependencies.
:::

## Next Steps

- [Quick Start Guide](/astro-starlight-docs-template/getting-started/quick-start/) - Run the optimizer
- [Configuration](/astro-starlight-docs-template/guides/configuration/) - Customize the setup
- [Features Overview](/astro-starlight-docs-template/features/overview/) - Learn what you get
