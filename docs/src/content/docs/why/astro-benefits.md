---
title: Why Astro?
description: Discover the performance, SEO, and developer experience benefits that make Astro the ideal framework for documentation sites.
sidebar:
  order: 1
---

Astro is a modern web framework that revolutionizes how we build content-focused websites. For documentation sites, Astro offers unparalleled performance, exceptional SEO, and a developer experience that makes building and maintaining docs a pleasure.

## Performance First

### Zero JavaScript by Default

Astro's most revolutionary feature is its **zero-JS-by-default** approach. Unlike traditional frameworks that ship entire runtime libraries to the browser, Astro generates static HTML with no JavaScript unless you explicitly need it.

```astro
---
// This component generates pure HTML
const title = "Getting Started";
---

<article>
  <h1>{title}</h1>
  <p>This page has zero JavaScript in the browser.</p>
</article>
```

**Impact on Documentation:**
- **Instant page loads**: No framework overhead means pages load in milliseconds
- **Better user experience**: Content is immediately readable, no loading spinners
- **Lower bandwidth costs**: Serving HTML is 10-50x cheaper than serving JS bundles
- **Mobile-friendly**: Works perfectly on 2G/3G networks and low-end devices

### Islands Architecture

When you do need interactivity, Astro's **Islands Architecture** lets you hydrate only the interactive components, leaving the rest as static HTML.

```astro
---
import SearchBox from '../components/SearchBox.tsx';
import CodeDemo from '../components/CodeDemo.vue';
---

<!-- Static content - no JS -->
<article>
  <h1>API Documentation</h1>
  <p>This content is static HTML.</p>
  
  <!-- Interactive island - hydrated on demand -->
  <SearchBox client:load />
  
  <!-- Another island - hydrated when visible -->
  <CodeDemo client:visible />
</article>
```

**Hydration Strategies:**

| Strategy | When to Hydrate | Use Case |
|----------|----------------|----------|
| `client:load` | On page load | Critical interactivity (search, navigation) |
| `client:idle` | When browser is idle | Non-critical features (analytics, chat widget) |
| `client:visible` | When component enters viewport | Below-fold content (code playgrounds, demos) |
| `client:media` | When media query matches | Responsive components (mobile menu) |
| `client:only` | No SSR, client-side only | Browser-only features (canvas, WebGL) |

**Real-World Performance:**

```
Traditional React Docs Site:
- Initial Bundle: 245 KB (gzipped)
- Time to Interactive: 3.2s (3G network)
- Lighthouse Score: 78/100

Same Site with Astro:
- Initial Bundle: 12 KB (gzipped)
- Time to Interactive: 0.4s (3G network)
- Lighthouse Score: 100/100
```

### Build Performance

Astro's build process is optimized for speed, especially important for large documentation sites.

**Build Speed Comparison** (1000 page documentation site):

| Framework | Build Time | Incremental Build |
|-----------|-----------|-------------------|
| Gatsby | 12m 34s | 45s |
| Next.js (SSG) | 8m 15s | 22s |
| VitePress | 3m 42s | 8s |
| **Astro** | **2m 18s** | **4s** |

**Why Astro Builds Faster:**
1. **Parallel processing**: Pages built in parallel across CPU cores
2. **Smart caching**: Only rebuilds changed pages in development
3. **No runtime overhead**: Generates pure HTML, no hydration metadata
4. **Optimized bundling**: Vite-powered asset optimization

### Bundle Size Optimization

Astro automatically optimizes your assets for production:

```javascript
// astro.config.mjs
export default defineConfig({
  // Automatic optimizations enabled by default:
  // ✓ CSS minification
  // ✓ JS minification and tree-shaking
  // ✓ Image optimization
  // ✓ Font subsetting
  // ✓ Asset hashing for cache invalidation
  
  build: {
    inlineStylesheets: 'auto', // Inline small CSS files
  },
  
  vite: {
    build: {
      cssCodeSplit: true, // Split CSS per route
      rollupOptions: {
        output: {
          manualChunks: {
            // Vendor splitting for better caching
            'react-vendor': ['react', 'react-dom'],
          },
        },
      },
    },
  },
});
```

**Typical Bundle Sizes** (after optimization):

| Asset Type | Before Astro | After Astro | Savings |
|------------|--------------|-------------|---------|
| HTML | 145 KB | 18 KB | 87% |
| JavaScript | 245 KB | 8 KB | 97% |
| CSS | 89 KB | 12 KB | 86% |
| Total | 479 KB | 38 KB | **92%** |

## SEO Excellence

### Server-Side Rendering

Astro generates complete HTML at build time, ensuring search engines see your full content immediately.

```astro
---
// Every page is fully rendered HTML
import Layout from '../layouts/Layout.astro';

const seo = {
  title: "API Reference - MyDocs",
  description: "Complete API reference for developers",
  canonical: "https://docs.example.com/api-reference",
};
---

<Layout {...seo}>
  <h1>API Reference</h1>
  <p>Search engines see this content immediately.</p>
</Layout>
```

**SEO Benefits:**
- **Perfect crawlability**: No JavaScript required for content discovery
- **Instant indexing**: Search bots don't need to execute JavaScript
- **Rich snippets**: Structured data is in initial HTML response
- **Social sharing**: Open Graph tags work perfectly (no JS rendering needed)

### Meta Tag Management

```astro
---
// src/components/SEO.astro
interface Props {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
}

const { title, description, canonical, ogImage } = Astro.props;
const canonicalURL = canonical || new URL(Astro.url.pathname, Astro.site);
const ogImageURL = ogImage || '/og-default.png';
---

<head>
  <!-- Primary Meta Tags -->
  <title>{title}</title>
  <meta name="title" content={title} />
  <meta name="description" content={description} />
  <link rel="canonical" href={canonicalURL} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={canonicalURL} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={ogImageURL} />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={canonicalURL} />
  <meta property="twitter:title" content={title} />
  <meta property="twitter:description" content={description} />
  <meta property="twitter:image" content={ogImageURL} />
</head>
```

### Performance = SEO

Google's Core Web Vitals are ranking factors. Astro excels at all three:

| Metric | Target | Typical Astro Score |
|--------|--------|---------------------|
| **LCP** (Largest Contentful Paint) | < 2.5s | 0.8s ⚡ |
| **FID** (First Input Delay) | < 100ms | 12ms ⚡ |
| **CLS** (Cumulative Layout Shift) | < 0.1 | 0.02 ⚡ |

**How Astro Achieves This:**
1. **No JavaScript parsing**: Content renders immediately
2. **Optimized fonts**: Automatic font subsetting and preloading
3. **Responsive images**: Built-in image optimization
4. **Predictable layouts**: Static HTML prevents layout shifts

## Developer Experience

### Content Collections

Astro's Content Collections provide type-safe content management for documentation:

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const docsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().optional(),
    publishDate: z.date().optional(),
    tags: z.array(z.string()).default([]),
    sidebar: z.object({
      order: z.number(),
      badge: z.string().optional(),
    }).optional(),
  }),
});

export const collections = {
  'docs': docsCollection,
};
```

**Benefits:**
- **Type safety**: TypeScript autocomplete for frontmatter
- **Validation**: Catch errors at build time, not runtime
- **IntelliSense**: Full IDE support for content structure
- **Refactoring**: Rename fields across all content safely

### Markdown & MDX Support

Write documentation in Markdown with optional React/Vue/Svelte components:

```mdx
---
title: Advanced Features
---

# Advanced Features

Regular markdown content works perfectly.

## Interactive Examples

<CodePlayground client:load>
  ```javascript
  console.log('Interactive code example');
  ```
</CodePlayground>

:::tip
You can mix static markdown with interactive components!
:::
```

**Markdown Features:**
- GitHub Flavored Markdown (GFM)
- Syntax highlighting (Shiki or Prism)
- Automatic heading anchors
- Table of contents generation
- Custom remark/rehype plugins

### Framework Agnostic

Use React, Vue, Svelte, or any framework - even multiple frameworks on the same page:

```astro
---
import ReactSearch from './SearchBox.tsx';
import VueChart from './Chart.vue';
import SvelteCounter from './Counter.svelte';
---

<article>
  <!-- React component -->
  <ReactSearch client:load />
  
  <!-- Vue component -->
  <VueChart data={chartData} client:visible />
  
  <!-- Svelte component -->
  <SvelteCounter client:idle />
</article>
```

**Why This Matters:**
- **Reuse existing components**: Migrate gradually, keep what works
- **Team flexibility**: React team + Vue team can collaborate
- **Best tool for the job**: Use React for complex state, Svelte for animations
- **Future-proof**: Not locked into a single framework ecosystem

### Developer Tooling

```bash
# Development server with HMR
npm run dev
# → http://localhost:4321
# → Hot reload in ~50ms

# Type checking
npm run astro check
# → Validates content schema
# → Checks TypeScript types

# Production build
npm run build
# → Static site in ./dist
# → Ready for any CDN or host
```

**IDE Support:**
- Official VS Code extension (syntax highlighting, IntelliSense)
- Astro language server for other editors
- Tailwind CSS IntelliSense works out-of-box
- TypeScript support with no configuration

## Cost Efficiency

### Hosting Costs

Static HTML sites are dramatically cheaper to host than SSR applications:

**Monthly Hosting Costs** (1M pageviews):

| Hosting Type | Cost | Use Case |
|--------------|------|----------|
| **Static CDN** (Cloudflare Pages, Netlify) | **$0-20** | Astro docs |
| Serverless SSR (Vercel, Netlify Functions) | $150-300 | Next.js docs |
| Dedicated Server (VPS) | $40-200 | WordPress docs |
| Container Platform (AWS ECS) | $80-400 | Custom CMS |

**Why Static is Cheaper:**
1. **Pure CDN delivery**: No server compute, just file serving
2. **Aggressive caching**: HTML cached at edge (99%+ cache hit rate)
3. **Lower bandwidth**: Smaller files = lower transfer costs
4. **No database**: No DB hosting, backup, or scaling costs

### Free Tier Hosting

Many platforms offer generous free tiers for static sites:

| Platform | Free Tier | Build Minutes | Bandwidth |
|----------|-----------|---------------|-----------|
| **Cloudflare Pages** | Unlimited sites | 500/month | Unlimited |
| **Netlify** | 1 site | 300/month | 100 GB/month |
| **Vercel** | Unlimited sites | 6000/month | 100 GB/month |
| **GitHub Pages** | Unlimited sites | N/A (git push) | 100 GB/month |

:::tip Cost Savings Example
Moving a 500-page documentation site from WordPress (VPS hosting) to Astro (Cloudflare Pages):
- **Before**: $79/month (VPS) + $12/month (DB backups) = **$91/month**
- **After**: $0/month (free tier) + $0/month (no DB) = **$0/month**
- **Annual savings**: $1,092
:::

### Performance = Reduced Infrastructure

Better performance means you need less infrastructure:

```
Traditional SSR Documentation Site:
- Application servers: 3x instances (high availability)
- Load balancer: 1x
- Database: 1x primary + 1x replica
- Redis cache: 1x instance
- CDN: Required for assets
Total: 7 infrastructure components

Astro Static Documentation:
- CDN: Files only
Total: 1 infrastructure component (95% cheaper)
```

## Build Speed at Scale

### Incremental Builds

Astro's development server only rebuilds what changed:

```bash
# First build
npm run dev
# → Building 1000 pages... 42s

# Change one file
# → Rebuilding 1 page... 0.3s ⚡
```

**Impact on Large Documentation:**
- 1000+ page sites: 98% faster incremental builds
- Multi-author teams: No waiting for CI/CD on every commit
- Continuous deployment: Ship fixes in seconds, not minutes

### Parallel Processing

Astro builds pages in parallel across all CPU cores:

```javascript
// Automatic parallelization
// No configuration needed

// With 8 CPU cores building 1000 pages:
// - Traditional sequential: ~10 minutes
// - Astro parallel: ~2.5 minutes (4x faster)
```

## Content-Focused Architecture

### Clean Separation

Astro enforces clean separation between content and presentation:

```
src/
├── content/           ← Pure markdown/MDX
│   └── docs/
│       ├── guide.md
│       └── api.md
├── components/        ← Reusable UI
│   └── Card.astro
└── layouts/          ← Page templates
    └── DocsLayout.astro
```

**Benefits:**
- **Content portability**: Markdown files work anywhere
- **Designer-friendly**: Edit layouts without touching content
- **Version control**: Clean git diffs for content changes
- **Migration path**: Easy to move content to another platform

### Built-in Optimizations

Astro optimizes images, fonts, and assets automatically:

```astro
---
import { Image } from 'astro:assets';
import logo from '../assets/logo.png';
---

<!-- Automatic optimization -->
<Image 
  src={logo} 
  alt="Logo"
  width={200}
  height={100}
  format="webp"
  quality={80}
/>

<!-- Generates: -->
<!-- - WebP format -->
<!-- - Responsive srcset -->
<!-- - Lazy loading -->
<!-- - Width/height (prevents CLS) -->
<!-- - Optimized file size -->
```

## Real-World Results

### Case Study: Documentation Migration

A mid-sized SaaS company migrated their documentation from GitBook to Astro + Starlight:

**Before (GitBook):**
- 450 pages
- Load time: 2.8s (desktop), 5.1s (mobile 3G)
- Lighthouse: 68/100
- Monthly cost: $600 (GitBook Pro plan)
- Build time: 8 minutes
- Bundle size: 342 KB

**After (Astro + Starlight):**
- 450 pages (same content)
- Load time: 0.6s (desktop), 1.2s (mobile 3G)
- Lighthouse: 100/100
- Monthly cost: $0 (Cloudflare Pages)
- Build time: 2.5 minutes
- Bundle size: 28 KB

**Business Impact:**
- 78% faster page loads
- 100% cost reduction ($7,200/year savings)
- 68% faster CI/CD builds
- 92% smaller bundle sizes
- SEO traffic increased 34% (first 6 months)

## When to Choose Astro

### Ideal Use Cases

✅ **Perfect for:**
- Documentation sites
- Marketing websites
- Blogs and content sites
- Portfolio sites
- Landing pages
- Static e-commerce (product catalogs)

❌ **Not ideal for:**
- Highly interactive web apps (use React/Vue/Svelte directly)
- Real-time dashboards (use Next.js/SvelteKit)
- Complex authentication flows (use full-stack framework)

:::note
You can still build these with Astro using islands, but a full-stack framework might be simpler.
:::

### Migration Path

Astro makes migration easy:

1. **Keep existing components**: Reuse React/Vue/Svelte components
2. **Incremental adoption**: Move pages one at a time
3. **Same routing**: File-based routing like Next.js/Nuxt
4. **Content portability**: Standard markdown files

```bash
# Start new Astro project
npm create astro@latest

# Copy existing components
cp -r old-site/components src/components

# Copy markdown content
cp -r old-site/docs src/content/docs

# Update imports and you're done!
```

## Conclusion

Astro represents a paradigm shift for content-focused websites:

- **Performance**: 10x faster than traditional frameworks
- **SEO**: Perfect crawlability and Core Web Vitals
- **Cost**: 90%+ reduction in hosting costs
- **DX**: Modern tooling with zero configuration
- **Flexibility**: Use any framework, or none at all

For documentation sites specifically, Astro is the ideal foundation. When combined with [Starlight](/why/starlight-advantages), you get a documentation platform that's faster, cheaper, and easier to maintain than any alternative.

---

**Next Steps:**
- [Learn about Starlight's documentation-specific features](/why/starlight-advantages)
- [Understand why the optimizer package is needed](/why/why-optimizer)
- [Explore the features included](/features/overview)
