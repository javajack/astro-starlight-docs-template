# Astro Starlight Docs Template

A CLI tool to add Google Analytics, GDPR-compliant cookie consent, SEO optimization, LLM optimization, and a rich plugin ecosystem to Astro Starlight documentation sites.

**[Live Demo](https://javajack.github.io/astro-starlight-docs-template/)** | **[npm Package](https://www.npmjs.com/package/astro-starlight-docs-template)**

## Features

### Core

- **Google Analytics with Consent Mode v2** - Regional scoping for GDPR compliance
- **GDPR Cookie Consent Banner** - Customizable, with Accept/Reject/Settings options
- **SEO Optimization** - Open Graph, Twitter Cards, Schema.org structured data
- **LLM Optimization** - Generate `llms.txt` for AI crawlers (ChatGPT, Claude, Gemini)
- **Regional Intelligence** - Different behavior for GDPR vs non-GDPR regions
- **Zero Component Overrides** - Script injection method prevents layout issues

### Plugins (New in v1.1.0)

- **OpenAPI/Swagger Docs** - Auto-generate API reference pages from OpenAPI 3.x specs
- **Mermaid Diagrams** - Flowcharts, sequence diagrams, ERDs directly in markdown
- **Blog** - Blog section alongside docs with posts, tags, authors, and RSS feed
- **Image Zoom** - Medium-style click-to-zoom on documentation images
- **Link Validation** - Catch broken internal links at build time
- **Custom Theme** - Professional indigo/violet accent with hero animations and card effects

### Built-in Component Showcase

All Starlight components pre-configured and demonstrated:
Tabs, Cards, CardGrid, LinkCards, Steps, FileTree, Badges, Asides (Note/Tip/Caution/Danger), and syntax-highlighted code blocks with filenames, line highlighting, and diff support.

## Installation

No installation needed! Use with `npx`:

```bash
npx astro-starlight-docs-template init
```

Or install globally:

```bash
npm install -g astro-starlight-docs-template
astro-starlight-docs-template init
```

## Usage

Navigate to your Astro Starlight project and run:

```bash
cd my-astro-docs
npx astro-starlight-docs-template init
```

The CLI will prompt you for:
- Google Analytics Measurement ID
- Site URL and base path
- Author information
- Analytics preferences (Cloudflare, etc.)
- Component customization options

## What It Does

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

### 5. Plugin Ecosystem (New in v1.1.0)

The docs template includes these pre-configured plugins:

| Plugin | Purpose |
|--------|---------|
| `starlight-openapi` | API docs from OpenAPI/Swagger specs |
| `@pasqal-io/starlight-client-mermaid` | Mermaid diagrams in markdown |
| `starlight-image-zoom` | Click-to-zoom on images |
| `starlight-links-validator` | Build-time broken link detection |
| `starlight-blog` | Blog with posts, tags, RSS |
| `starlight-package-managers` | npm/yarn/pnpm/bun install tabs |

### 6. Custom Theme

- Indigo/violet accent color scheme (light + dark mode)
- Hero section with gradient background and animated CTA buttons
- Card hover animations with gradient borders
- Polished sidebar transitions
- Wider content area (55rem)
- Improved code block styling
- Modern typography (Inter + JetBrains Mono system font stacks)

## Requirements

- Node.js >= 18.0.0
- Astro project with @astrojs/starlight

## Example

```bash
$ npx astro-starlight-docs-template init

Astro Docs Optimizer v1.1.0

Checking if this is an Astro Starlight project...

Astro project detected

? Google Analytics Measurement ID: G-XXXXXXXXXX
? Site URL: https://javajack.github.io
? Base path: /my-docs
? Author name: Rakesh Waghela
? Twitter handle: webiyo
? Add Cloudflare Web Analytics? No
? Create custom footer? Yes
? Add LLM optimization? Yes

Installing optimizations...

Cookie consent script created: public/cookie-consent.js
astro.config.mjs updated with analytics and consent mode
Footer component created: src/components/overrides/Footer.astro
Created public/llms.txt
Documentation created: ASTRO_DOCS_OPTIMIZER.md

Optimization complete!
```

## Documentation

Full documentation available at: **https://javajack.github.io/astro-starlight-docs-template/**

Key pages:
- [Quick Start](https://javajack.github.io/astro-starlight-docs-template/getting-started/quick-start/)
- [Component Showcase](https://javajack.github.io/astro-starlight-docs-template/guides/component-showcase/)
- [API Reference](https://javajack.github.io/astro-starlight-docs-template/api/) (auto-generated from OpenAPI)
- [Features Overview](https://javajack.github.io/astro-starlight-docs-template/features/overview/)

## Regional Behavior

### GDPR Regions (EU/EEA/UK)
- Cookie banner shown on first visit
- Analytics denied by default
- User must explicitly consent

### Non-GDPR Regions
- No banner shown
- Analytics granted by default
- Better measurement quality
- Footer link available to opt-out

## Privacy & Compliance

- GDPR Article 7 compliant
- ePrivacy Directive compliant
- ICO Guidelines compliant
- Google Consent Mode v2
- IP anonymization
- Secure cookie flags

## Contributing

Contributions welcome! Please open an issue or PR.

## License

MIT (c) Rakesh Waghela

## Links

- [GitHub Repository](https://github.com/javajack/astro-starlight-docs-template)
- [npm Package](https://www.npmjs.com/package/astro-starlight-docs-template)
- [Live Documentation](https://javajack.github.io/astro-starlight-docs-template/)
- [Author on X](https://x.com/webiyo)
- [Author on LinkedIn](https://www.linkedin.com/in/rakeshwaghela)

## Credits

Built by [Rakesh Waghela](https://topmate.io/rakeshwaghela) - Tech & KYC Solutions Architect

---

## For Maintainers

### Publishing a New Version

This package uses automated publishing via GitHub Actions with provenance attestations.

**Quick Release (Using Helper Script):**

```bash
# Patch release (1.1.0 -> 1.1.1)
./release.sh patch

# Minor release (1.1.0 -> 1.2.0)
./release.sh minor

# Major release (1.1.0 -> 2.0.0)
./release.sh major
```

The script will:
1. Bump version in package.json
2. Commit the version change
3. Push to GitHub
4. Provide link to trigger GitHub Actions workflow

**Manual Publishing Steps:**

1. **Bump version:**
   ```bash
   npm version patch  # or minor/major
   ```

2. **Commit and push:**
   ```bash
   git push
   ```

3. **Trigger GitHub Actions:**
   - Go to: https://github.com/javajack/astro-starlight-docs-template/actions/workflows/publish.yml
   - Click "Run workflow"
   - Select `main` branch
   - Click "Run workflow"

4. **Verify publication:**
   ```bash
   npm view astro-starlight-docs-template
   ```

### Development

```bash
# Install dependencies
npm install

# Build the package
npm run build

# Run tests
npm test

# Test locally with npm link
npm link
cd /path/to/test-project
npx astro-starlight-docs-template init
```

### Security

- Granular access token stored in GitHub Environment: `npm`
- Token has write access only to this specific package
- 2FA bypass enabled only for automation
- All publishes include provenance attestations
- Full audit trail via GitHub Actions

For detailed setup instructions, see [GITHUB_PUBLISHING.md](./GITHUB_PUBLISHING.md)
