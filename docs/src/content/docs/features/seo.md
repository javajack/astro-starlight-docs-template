---
title: SEO Optimization
description: Advanced SEO features including Open Graph, Twitter Cards, structured data, and search engine optimization beyond Starlight's basics.
sidebar:
  order: 4
---

The optimizer package enhances Starlight's basic SEO with advanced meta tags, Open Graph protocol, Twitter Cards, structured data (Schema.org), and social sharing optimization.

## Overview

While Starlight provides basic SEO (title, description, canonical), production documentation sites need more sophisticated optimization for:

- Social media sharing (Open Graph, Twitter Cards)
- Rich search results (structured data)
- Better indexing (additional meta tags)
- Cross-platform compatibility

## Open Graph Protocol

### What is Open Graph?

Open Graph is a protocol that controls how URLs are displayed when shared on social media (Facebook, LinkedIn, WhatsApp, Discord, Slack, etc.).

**Without Open Graph:**
```
https://docs.example.com/guide/installation
Installation Guide - My Documentation
docs.example.com
```

**With Open Graph:**
```
┌─────────────────────────────────────┐
│ [Large preview image]               │
│                                     │
│ Installation Guide                  │
│ Step-by-step installation          │
│ instructions for getting started.   │
│                                     │
│ 🔗 docs.example.com                │
└─────────────────────────────────────┘
```

### Automatic Open Graph Tags

The optimizer automatically generates Open Graph tags for every page:

```html
<!-- Basic Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://docs.example.com/guide/installation" />
<meta property="og:title" content="Installation Guide" />
<meta property="og:description" content="Step-by-step installation instructions" />
<meta property="og:image" content="https://docs.example.com/og-image.png" />
<meta property="og:site_name" content="My Documentation" />
<meta property="og:locale" content="en_US" />

<!-- Optional tags -->
<meta property="og:updated_time" content="2025-02-17T10:00:00Z" />
<meta property="article:published_time" content="2025-01-15T10:00:00Z" />
<meta property="article:modified_time" content="2025-02-17T10:00:00Z" />
<meta property="article:author" content="Your Name" />
<meta property="article:section" content="Guides" />
<meta property="article:tag" content="installation, setup, getting-started" />
```

### Configuration

Configure Open Graph globally:

```javascript
// astro.config.mjs
starlightOptimizer({
  seo: {
    // Default OG image for all pages
    ogImage: '/og-default.png',
    
    // Site name
    siteName: 'My Documentation',
    
    // Default type
    ogType: 'website', // or 'article' for docs
    
    // Author information
    author: {
      name: 'Your Name',
      url: 'https://example.com',
    },
    
    // Locale
    locale: 'en_US',
    
    // Alternative locales
    alternateLocales: ['es_ES', 'fr_FR', 'de_DE'],
  },
}),
```

### Per-Page Customization

Override OG tags per page with frontmatter:

```mdx
---
title: Installation Guide
description: Step-by-step installation instructions
seo:
  ogImage: /og-installation.png
  ogType: article
  author: Jane Doe
  publishedTime: 2025-01-15
  modifiedTime: 2025-02-17
  section: Guides
  tags: [installation, setup, getting-started]
---

# Installation Guide

Your content here...
```

### OG Image Best Practices

**Recommended specifications:**

| Platform | Recommended Size | Aspect Ratio |
|----------|-----------------|--------------|
| **Facebook** | 1200 x 630 px | 1.91:1 |
| **LinkedIn** | 1200 x 627 px | 1.91:1 |
| **Twitter** | 1200 x 675 px | 16:9 |
| **Discord** | 1200 x 630 px | 1.91:1 |
| **Slack** | 1200 x 630 px | 1.91:1 |
| **WhatsApp** | 1200 x 630 px | 1.91:1 |

**Optimal universal size: 1200 x 630 pixels (1.91:1)**

**Image format:**
- ✅ PNG (best quality)
- ✅ JPEG (smaller file size)
- ⚠️ WebP (not universally supported)
- ❌ SVG (not supported for OG)

**File size:**
- Target: < 300 KB
- Maximum: < 1 MB (Facebook limit: 8 MB)

**Design tips:**
```
┌─────────────────────────────────────┐
│ [Logo]              [Icon/Visual]   │  <- Top 20%: Safe from cropping
│                                     │
│        Main Title                   │  <- Center: Most important
│        (Large, Bold)                │
│                                     │
│     Subtitle or tagline             │  <- Support text
│                                     │
│ example.com            [CTA]        │  <- Bottom: URL, call-to-action
└─────────────────────────────────────┘
```

:::tip Dynamic OG Images
Consider using services like [Vercel OG Image Generation](https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation) or [Cloudinary](https://cloudinary.com/documentation/social_media_card_generation) to generate OG images automatically from page content.
:::

### Testing Open Graph

Test how your pages appear when shared:

| Tool | URL | Purpose |
|------|-----|---------|
| **Facebook Debugger** | [developers.facebook.com/tools/debug](https://developers.facebook.com/tools/debug/) | Preview Facebook sharing |
| **LinkedIn Inspector** | [linkedin.com/post-inspector](https://www.linkedin.com/post-inspector/) | Preview LinkedIn sharing |
| **Twitter Card Validator** | [cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator) | Preview Twitter cards |
| **OpenGraph.xyz** | [opengraph.xyz](https://www.opengraph.xyz/) | Universal preview |

**Facebook Debugger workflow:**
1. Paste your page URL
2. Click "Debug"
3. View preview
4. Click "Scrape Again" to refresh cache (after changes)

## Twitter Cards

### What are Twitter Cards?

Twitter Cards enhance how links appear on Twitter/X with rich media previews.

**Without Twitter Card:**
```
docs.example.com
Installation Guide
```

**With Twitter Card:**
```
┌─────────────────────────────────────┐
│ [Large preview image]               │
│                                     │
│ Installation Guide                  │
│ Step-by-step installation...        │
│ 🔗 docs.example.com                │
└─────────────────────────────────────┘
```

### Card Types

| Card Type | Use Case | Display |
|-----------|----------|---------|
| **summary** | Default, small image | Text-focused with small thumbnail |
| **summary_large_image** | Recommended for docs | Large preview image (recommended) |
| **app** | Mobile app promotion | App install card |
| **player** | Video/audio content | Embedded media player |

### Automatic Twitter Card Tags

```html
<!-- Twitter Card meta tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@yourhandle" />
<meta name="twitter:creator" content="@authorhandle" />
<meta name="twitter:title" content="Installation Guide" />
<meta name="twitter:description" content="Step-by-step installation instructions" />
<meta name="twitter:image" content="https://docs.example.com/og-image.png" />
<meta name="twitter:image:alt" content="Installation Guide preview" />
```

### Configuration

```javascript
starlightOptimizer({
  seo: {
    twitter: {
      card: 'summary_large_image', // Recommended
      site: '@yourdocs',           // Your site's Twitter handle
      creator: '@yourhandle',       // Author's Twitter handle
      imageAlt: 'Documentation preview', // Default alt text
    },
  },
}),
```

### Per-Page Twitter Cards

```mdx
---
title: Installation Guide
seo:
  twitterCard: summary_large_image
  twitterImage: /twitter-install.png
  twitterImageAlt: Installation steps diagram
  twitterCreator: '@janedoe'
---
```

:::note Image Specifications
Twitter Card images: 
- Minimum: 300 x 157 px
- Maximum: 4096 x 4096 px
- Recommended: 1200 x 675 px (16:9)
- File size: < 5 MB
:::

## Structured Data (Schema.org)

### What is Structured Data?

Structured data helps search engines understand your content and can result in **rich snippets** in search results.

**Without structured data:**
```
Installation Guide - My Documentation
https://docs.example.com/guide/installation
Step-by-step installation instructions for getting started...
```

**With structured data (rich snippet):**
```
Installation Guide - My Documentation ⭐⭐⭐⭐⭐
https://docs.example.com/guide/installation › guides
📘 Technical Article · Updated Feb 17, 2025
Step-by-step installation instructions for getting started...

Table of Contents:
  • Prerequisites
  • Installation Steps
  • Verification
```

### TechArticle Schema

For documentation pages, we use `TechArticle` schema:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Installation Guide",
  "description": "Step-by-step installation instructions",
  "image": "https://docs.example.com/og-image.png",
  "author": {
    "@type": "Person",
    "name": "Your Name",
    "url": "https://example.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Your Company",
    "logo": {
      "@type": "ImageObject",
      "url": "https://docs.example.com/logo.png"
    }
  },
  "datePublished": "2025-01-15T10:00:00Z",
  "dateModified": "2025-02-17T10:00:00Z",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://docs.example.com/guide/installation"
  },
  "dependencies": "Node.js 18+, npm 9+",
  "proficiencyLevel": "Beginner",
  "about": {
    "@type": "Thing",
    "name": "Software Installation"
  }
}
</script>
```

### Organization Schema

For the homepage/about:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Your Company",
  "url": "https://docs.example.com",
  "logo": "https://docs.example.com/logo.png",
  "description": "Comprehensive documentation for developers",
  "sameAs": [
    "https://twitter.com/yourhandle",
    "https://github.com/yourorg",
    "https://linkedin.com/company/yourcompany"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Support",
    "email": "support@example.com",
    "url": "https://example.com/support"
  }
}
</script>
```

### Breadcrumb Schema

For navigation breadcrumbs:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": "https://docs.example.com"
  }, {
    "@type": "ListItem",
    "position": 2,
    "name": "Guides",
    "item": "https://docs.example.com/guides"
  }, {
    "@type": "ListItem",
    "position": 3,
    "name": "Installation",
    "item": "https://docs.example.com/guides/installation"
  }]
}
</script>
```

### WebSite Schema with SearchAction

For site-wide search:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "My Documentation",
  "url": "https://docs.example.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://docs.example.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>
```

### Configuration

```javascript
starlightOptimizer({
  seo: {
    structuredData: {
      enabled: true,
      organization: {
        name: 'Your Company',
        logo: '/logo.png',
        url: 'https://docs.example.com',
        sameAs: [
          'https://twitter.com/yourhandle',
          'https://github.com/yourorg',
        ],
      },
      author: {
        name: 'Your Name',
        url: 'https://example.com',
      },
      breadcrumbs: true,
      searchAction: true,
    },
  },
}),
```

### Testing Structured Data

| Tool | URL | Purpose |
|------|-----|---------|
| **Google Rich Results Test** | [search.google.com/test/rich-results](https://search.google.com/test/rich-results) | Test rich snippets |
| **Schema Markup Validator** | [validator.schema.org](https://validator.schema.org/) | Validate JSON-LD |
| **Google Search Console** | [search.google.com/search-console](https://search.google.com/search-console) | Monitor rich results |

## Additional Meta Tags

### Robots Meta Tag

Control search engine crawling:

```html
<!-- Default: Allow indexing -->
<meta name="robots" content="index, follow" />

<!-- Prevent indexing (draft pages) -->
<meta name="robots" content="noindex, nofollow" />

<!-- Index but don't follow links -->
<meta name="robots" content="index, nofollow" />
```

**Per-page control:**

```mdx
---
title: Draft Documentation
robots: noindex, nofollow
---
```

### Canonical URLs

Prevent duplicate content issues:

```html
<!-- Automatically generated for every page -->
<link rel="canonical" href="https://docs.example.com/guide/installation" />
```

**Why canonical matters:**
- ✅ Prevents duplicate content penalties
- ✅ Consolidates ranking signals
- ✅ Handles URL parameters (?utm_source=...)
- ✅ Resolves http vs https
- ✅ Resolves www vs non-www

### Language Alternate Tags

For multi-language documentation:

```html
<!-- Automatically generated if i18n enabled -->
<link rel="alternate" hreflang="en" href="https://docs.example.com/guide" />
<link rel="alternate" hreflang="es" href="https://docs.example.com/es/guide" />
<link rel="alternate" hreflang="fr" href="https://docs.example.com/fr/guide" />
<link rel="alternate" hreflang="x-default" href="https://docs.example.com/guide" />
```

### Author and Publisher

```html
<meta name="author" content="Your Name" />
<meta name="publisher" content="Your Company" />
<link rel="author" href="https://example.com/about" />
```

### Keywords Meta Tag

```html
<!-- Optional, less important for modern SEO -->
<meta name="keywords" content="installation, setup, getting started, documentation" />
```

:::note Keywords Tag
The `keywords` meta tag has minimal SEO impact today. Focus on content quality and headings instead.
:::

## Performance SEO

### Core Web Vitals

SEO ranking factors include performance metrics:

| Metric | Target | Optimizer Impact |
|--------|--------|------------------|
| **LCP** (Largest Contentful Paint) | < 2.5s | ✅ No degradation (100) |
| **FID** (First Input Delay) | < 100ms | ✅ No degradation (100) |
| **CLS** (Cumulative Layout Shift) | < 0.1 | ✅ No degradation (100) |
| **INP** (Interaction to Next Paint) | < 200ms | ✅ Maintained |

**How we maintain performance:**
- Async script loading
- Minimal JavaScript (4 KB added)
- No render-blocking resources
- Optimized images
- Efficient CSS

### Mobile-Friendliness

Google prioritizes mobile-first indexing:

```html
<!-- Viewport meta tag (Starlight includes this) -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<!-- Mobile-friendly features -->
- Responsive layout ✅
- Touch-friendly buttons (48x48px) ✅
- Readable font sizes (16px+) ✅
- No horizontal scrolling ✅
```

### HTTPS

HTTPS is a ranking signal:

```html
<!-- Canonical uses HTTPS -->
<link rel="canonical" href="https://docs.example.com/guide" />

<!-- Upgrade insecure requests -->
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
```

## Social Media Optimization

### Platform-Specific Considerations

| Platform | Image Size | Character Limit | Notes |
|----------|-----------|-----------------|-------|
| **Facebook** | 1200x630 | Title: 100, Desc: 200 | Uses Open Graph |
| **Twitter/X** | 1200x675 | Title: 70, Desc: 200 | Uses Twitter Cards |
| **LinkedIn** | 1200x627 | Title: 200, Desc: 300 | Uses Open Graph |
| **Discord** | 1200x630 | Unlimited | Uses Open Graph |
| **Slack** | 1200x630 | Unlimited | Uses Open Graph |
| **WhatsApp** | 1200x630 | Unlimited | Uses Open Graph |

### Optimal Title and Description Lengths

```javascript
// Title: Keep under 60 characters for Google, 70 for Twitter
const title = "Installation Guide - My Docs"; // 30 chars ✅

// Description: 150-160 characters for Google, 200 for social
const description = 
  "Step-by-step installation instructions for getting started with our documentation platform. Covers prerequisites, setup, and verification."; 
  // 157 chars ✅
```

### Share Previews

Test share previews before publishing:

```bash
# 1. Generate OG image
npm run generate-og-images

# 2. Test locally with ngrok
npx ngrok http 4321

# 3. Test share preview
# Paste ngrok URL into Facebook Debugger
```

## SEO Best Practices

### Content Optimization

**Heading hierarchy:**
```mdx
# Page Title (H1) - Only one per page
Your main content...

## Section 1 (H2)
Content...

### Subsection 1.1 (H3)
Content...

### Subsection 1.2 (H3)
Content...

## Section 2 (H2)
Content...
```

**Never skip heading levels:**
```mdx
❌ Bad:
# H1
### H3 (skipped H2)

✅ Good:
# H1
## H2
### H3
```

### Internal Linking

Link related pages:

```mdx
For more information, see:
- [Configuration Guide](/guides/configuration)
- [Troubleshooting](/guides/troubleshooting)
- [Advanced Features](/features/overview)
```

**Benefits:**
- ✅ Helps search engines discover pages
- ✅ Distributes page authority
- ✅ Improves user navigation
- ✅ Increases time on site

### Image Optimization

```mdx
![Installation steps diagram](./install-steps.png)
```

**Alt text best practices:**
- ✅ Descriptive: "Installation steps diagram showing npm install command"
- ❌ Generic: "Image" or "Screenshot"
- ❌ Keyword stuffing: "install installation setup getting started npm node"

### URL Structure

**Good URL structure:**
```
✅ /guides/installation
✅ /api/authentication
✅ /troubleshooting/common-errors

❌ /page?id=123
❌ /docs/v2/en/guides/getting-started-with-installation-guide
❌ /kategorie/installation-anleitung-fur-anfanger-schritt-fur-schritt
```

**Best practices:**
- Keep URLs short and descriptive
- Use hyphens, not underscores
- Avoid unnecessary parameters
- Use lowercase
- Include keywords naturally

## Monitoring SEO Performance

### Google Search Console

Monitor your documentation's search performance:

**Setup:**
1. Add property to Search Console
2. Verify ownership (HTML file, DNS, or meta tag)
3. Submit sitemap
4. Monitor performance

**Key metrics to track:**
- Total impressions
- Total clicks
- Average CTR (click-through rate)
- Average position
- Coverage issues
- Core Web Vitals
- Mobile usability

### Sitemap

Automatically generated by `@astrojs/sitemap`:

```javascript
// astro.config.mjs
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://docs.example.com',
  integrations: [
    starlight({...}),
    sitemap(),
    starlightOptimizer({...}),
  ],
});
```

**Submit sitemap to search engines:**
- Google: Search Console → Sitemaps → Add sitemap
- Bing: Webmaster Tools → Sitemaps → Submit sitemap

### robots.txt

Create `public/robots.txt`:

```txt
# Allow all crawlers
User-agent: *
Allow: /

# Sitemap location
Sitemap: https://docs.example.com/sitemap-index.xml

# Optional: Disallow specific paths
User-agent: *
Disallow: /draft/
Disallow: /private/
```

## Troubleshooting SEO

### OG Image Not Showing

```bash
# 1. Verify image exists and is accessible
curl -I https://docs.example.com/og-image.png
# Should return 200 OK

# 2. Check meta tag
view-source:https://docs.example.com/guide
# Look for <meta property="og:image" content="..." />

# 3. Verify absolute URL
# ❌ content="/og-image.png"
# ✅ content="https://docs.example.com/og-image.png"

# 4. Clear social media cache
# Facebook Debugger → Scrape Again
# Twitter Card Validator → Preview card
```

### Structured Data Errors

```bash
# Test with Google Rich Results Test
https://search.google.com/test/rich-results

# Common errors:
# - Missing required field: Add "author", "datePublished", etc.
# - Invalid date format: Use ISO 8601 (2025-02-17T10:00:00Z)
# - Invalid URL: Use absolute URLs
# - Missing @context: Always include "@context": "https://schema.org"
```

### Search Engines Not Indexing

```bash
# 1. Check robots.txt
curl https://docs.example.com/robots.txt
# Should NOT have: Disallow: /

# 2. Check meta robots
view-source:https://docs.example.com/guide
# Should have: <meta name="robots" content="index, follow" />

# 3. Submit to Google Search Console
# Manually request indexing for new pages

# 4. Check for noindex in frontmatter
# Remove: robots: noindex
```

---

**Next Steps:**
- [Learn about LLM optimization](/features/llm)
- [Configure SEO settings](/guides/configuration)
- [Explore customization options](/guides/customization)
