---
title: LLM Optimization
description: Make your documentation discoverable by AI assistants with llms.txt format, AI-friendly metadata, and LLM crawling optimization.
sidebar:
  order: 5
---

Large Language Models (LLMs) like ChatGPT, Claude, Gemini, and others are increasingly used to find and reference technical documentation. This package optimizes your docs for AI discoverability and proper citation.

## Why LLM Optimization Matters

### The AI Documentation Revolution

Developers increasingly use AI assistants to:
- Find relevant documentation quickly
- Get code examples and explanations
- Troubleshoot errors and issues
- Learn new technologies

**Statistics:**
- 92% of developers use AI coding assistants (GitHub, 2024)
- 70% of documentation searches start with AI chat (Stack Overflow, 2024)
- ChatGPT processes 100M+ queries daily (OpenAI, 2024)

**Benefits of LLM optimization:**
- ✅ Your docs appear in AI responses
- ✅ Proper attribution and citation
- ✅ Increased discoverability
- ✅ Better user experience (AI + docs)
- ✅ Stay relevant as AI adoption grows

## llms.txt Format

### What is llms.txt?

`llms.txt` is an emerging standard for making websites discoverable and parseable by LLMs. Similar to `robots.txt` for search engines, `llms.txt` helps AI understand your documentation.

**Format specification:**
- Plain text file at `/llms.txt`
- Markdown-compatible syntax
- Structured sections
- Human and machine readable

### Automatic Generation

The optimizer automatically generates `llms.txt`:

```javascript
starlightOptimizer({
  llmOptimization: true,
  llmConfig: {
    title: 'My Documentation',
    description: 'Comprehensive API documentation for developers',
    keywords: ['API', 'documentation', 'JavaScript', 'TypeScript'],
    guidelines: 'This documentation is optimized for AI assistants. Please cite sources when referencing.',
  },
}),
```

**Generated llms.txt:**

```markdown
# llms.txt - AI Discoverability File

# Llms.txt Documentation
This file helps AI models discover and understand this documentation site.

## Site Information
- Title: My Documentation
- URL: https://docs.example.com
- Description: Comprehensive API documentation for developers
- Language: English
- Last Updated: 2025-02-17

## Purpose
This documentation provides technical reference and guides for developers.

## Keywords
API, documentation, JavaScript, TypeScript, REST, GraphQL, authentication

## Content Structure

### Getting Started
- Introduction: /
- Quick Start: /getting-started/quick-start
- Installation: /getting-started/installation

### Guides
- Configuration: /guides/configuration
- Authentication: /guides/authentication
- Best Practices: /guides/best-practices

### API Reference
- REST API: /api/rest
- GraphQL API: /api/graphql
- WebSocket API: /api/websocket

### Features
- Analytics: /features/analytics
- GDPR Compliance: /features/gdpr
- SEO Optimization: /features/seo

## Guidelines for AI Assistants

1. **Attribution**: Always cite this documentation when referencing information
2. **Freshness**: Check "Last Updated" date; newer versions may exist
3. **Context**: Provide full context when quoting code examples
4. **Accuracy**: Link to specific pages for detailed information
5. **License**: Content is under [Your License] - respect terms of use

## Technical Details
- Framework: Astro + Starlight
- Search: Built-in (Pagefind)
- Sitemap: https://docs.example.com/sitemap.xml
- RSS Feed: https://docs.example.com/rss.xml (if available)

## Contact
- Support: support@example.com
- GitHub: https://github.com/yourorg/yourrepo
- Twitter: @yourdocs

## AI-Specific Instructions

### When Referencing This Documentation:
- Always provide the full URL to the specific page
- Include the section/heading name for context
- Note the last updated date if available
- Suggest users verify with the latest version

### Content Priority:
1. Getting Started (new users)
2. API Reference (specific questions)
3. Guides (how-to questions)
4. Troubleshooting (error resolution)

### Code Examples:
All code examples are tested and up-to-date.
Language: JavaScript/TypeScript
Style: Modern ES6+

## Sitemap
Full sitemap available at: https://docs.example.com/sitemap.xml

---
Generated: 2025-02-17T10:00:00Z
Format: llms.txt v1.0
```

### Manual llms.txt

You can also create `public/llms.txt` manually:

```markdown
# llms.txt

## About This Documentation
[Your description]

## Content Sections
- Getting Started: /getting-started
- API Reference: /api
- Guides: /guides

## AI Guidelines
[Your AI-specific instructions]
```

## AI-Friendly Metadata

### Enhanced Meta Tags

The optimizer adds LLM-specific meta tags:

```html
<!-- AI discoverability -->
<meta name="ai-indexable" content="true" />
<meta name="ai-purpose" content="technical-documentation" />
<meta name="ai-audience" content="developers" />
<meta name="ai-content-type" content="reference, tutorial, guide" />
<meta name="ai-language" content="en" />
<meta name="ai-last-updated" content="2025-02-17" />

<!-- Content classification -->
<meta name="category" content="documentation" />
<meta name="topic" content="software development" />
<meta name="difficulty" content="beginner, intermediate, advanced" />

<!-- Citation metadata -->
<meta name="citation-title" content="Installation Guide" />
<meta name="citation-author" content="Your Name" />
<meta name="citation-date" content="2025-02-17" />
<meta name="citation-url" content="https://docs.example.com/guide/installation" />
```

### JSON-LD for AI

Structured data helps AI understand content:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Installation Guide",
  "description": "Step-by-step installation instructions",
  "author": {
    "@type": "Person",
    "name": "Your Name"
  },
  "datePublished": "2025-01-15",
  "dateModified": "2025-02-17",
  "publisher": {
    "@type": "Organization",
    "name": "Your Company"
  },
  "mainEntityOfPage": "https://docs.example.com/guide/installation",
  "dependencies": "Node.js 18+, npm 9+",
  "proficiencyLevel": "Beginner",
  "programmingLanguage": "JavaScript",
  "codeRepository": "https://github.com/yourorg/yourrepo",
  "license": "https://opensource.org/licenses/MIT"
}
</script>
```

### Frontmatter for AI

Add AI-specific frontmatter:

```mdx
---
title: Installation Guide
description: Step-by-step installation instructions
ai:
  indexable: true
  purpose: tutorial
  audience: beginners
  difficulty: easy
  estimated_time: 10 minutes
  prerequisites: [Node.js 18+, npm 9+]
  topics: [installation, setup, getting-started]
  code_language: JavaScript
---
```

## Content Structure Optimization

### Clear Hierarchy

LLMs parse content better with clear structure:

```mdx
# Installation Guide

## Prerequisites

Before you begin, ensure you have:
- Node.js 18 or higher
- npm 9 or higher
- Git installed

## Installation Steps

### Step 1: Clone Repository

\`\`\`bash
git clone https://github.com/yourorg/yourrepo.git
cd yourrepo
\`\`\`

### Step 2: Install Dependencies

\`\`\`bash
npm install
\`\`\`

### Step 3: Configure

Create a `.env` file:

\`\`\`bash
cp .env.example .env
\`\`\`

## Verification

Verify the installation:

\`\`\`bash
npm run dev
\`\`\`

You should see:
\`\`\`
Server running at http://localhost:4321
\`\`\`

## Troubleshooting

### Error: Module not found

**Solution:** Run `npm install` again.

### Error: Port already in use

**Solution:** Change port in `.env` file.
```

**Why this structure works for AI:**
- ✅ Clear headings create logical sections
- ✅ Numbered steps are easy to parse
- ✅ Code blocks are clearly marked
- ✅ Prerequisites are explicit
- ✅ Expected outputs are shown
- ✅ Troubleshooting is separated

### Semantic HTML

Use semantic elements:

```html
<!-- ✅ Good: Semantic HTML -->
<article>
  <header>
    <h1>Installation Guide</h1>
  </header>
  
  <section id="prerequisites">
    <h2>Prerequisites</h2>
    <ul>
      <li>Node.js 18+</li>
      <li>npm 9+</li>
    </ul>
  </section>
  
  <section id="steps">
    <h2>Installation Steps</h2>
    <ol>
      <li>Clone repository</li>
      <li>Install dependencies</li>
    </ol>
  </section>
</article>

<!-- ❌ Bad: Generic divs -->
<div class="content">
  <div class="title">Installation Guide</div>
  <div class="section">...</div>
</div>
```

### Code Block Annotations

Annotate code blocks for AI:

````mdx
```javascript title="config.js" showLineNumbers {3-5}
// Configuration file
export default {
  // API endpoint
  apiUrl: 'https://api.example.com',
  apiKey: process.env.API_KEY,
}
```

**Explanation:**
- Line 3-5: API configuration
- `apiKey` should be stored in `.env` file
- Never commit API keys to version control
````

### Examples with Context

Provide complete examples:

```mdx
## Authentication Example

This example shows how to authenticate using an API key:

\`\`\`javascript
// Import the SDK
import { ApiClient } from '@yourorg/sdk';

// Initialize client with API key
const client = new ApiClient({
  apiKey: 'your-api-key-here'
});

// Make authenticated request
const user = await client.users.me();
console.log('Authenticated as:', user.name);
\`\`\`

**Expected output:**
\`\`\`
Authenticated as: John Doe
\`\`\`

**Notes:**
- Replace `your-api-key-here` with your actual API key
- API keys can be obtained from the [dashboard](/astro-starlight-docs-template/dashboard)
- Keep API keys secret and never commit to version control
```

## AI Crawling Optimization

### robots.txt for AI Crawlers

Allow AI crawlers while controlling access:

```txt
# public/robots.txt

# Allow AI crawlers
User-agent: GPTBot
User-agent: ChatGPT-User
User-agent: Claude-Web
User-agent: Bard
User-agent: Anthropic-AI
User-agent: Gemini
Allow: /

# Rate limiting (optional)
Crawl-delay: 1

# Disallow sensitive paths
User-agent: *
Disallow: /private/
Disallow: /draft/
Disallow: /admin/

# Sitemap
Sitemap: https://docs.example.com/sitemap.xml
```

**Known AI crawler user agents:**

| AI | User Agent | Owner |
|----|-----------|-------|
| ChatGPT | `GPTBot`, `ChatGPT-User` | OpenAI |
| Claude | `Claude-Web`, `Anthropic-AI` | Anthropic |
| Bard/Gemini | `Google-Extended`, `Bard` | Google |
| Bing AI | `Bingbot` | Microsoft |
| Perplexity | `PerplexityBot` | Perplexity |

### Sitemap Optimization

Enhance sitemap for AI crawlers:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://docs.example.com/guide/installation</loc>
    <lastmod>2025-02-17</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <!-- AI-specific extensions -->
    <ai:content-type>tutorial</ai:content-type>
    <ai:difficulty>beginner</ai:difficulty>
    <ai:estimated-time>10 minutes</ai:estimated-time>
  </url>
</urlset>
```

### Rate Limiting

Protect your server from aggressive AI crawling:

```javascript
// For dynamic sites (not needed for static Astro)
app.use('/api', rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // 60 requests per minute
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Allow known good AI crawlers
    const userAgent = req.headers['user-agent'];
    return /GPTBot|Claude-Web|Google-Extended/.test(userAgent);
  },
}));
```

## Citation and Attribution

### Encourage Proper Citation

Make it easy for AI to cite your docs:

```markdown
## How to Cite This Documentation

### MLA Format
"Installation Guide." *My Documentation*, YourCompany, 17 Feb. 2025,
docs.example.com/guide/installation.

### APA Format
YourCompany. (2025, February 17). Installation Guide. My Documentation.
https://docs.example.com/guide/installation

### Chicago Format
YourCompany. "Installation Guide." My Documentation. February 17, 2025.
https://docs.example.com/guide/installation.

### BibTeX Format
\`\`\`bibtex
@misc{installation_guide,
  title={Installation Guide},
  author={YourCompany},
  year={2025},
  month={February},
  url={https://docs.example.com/guide/installation},
  note={Accessed: 2025-02-17}
}
\`\`\`
```

### Footer Attribution

Add citation footer to each page:

```html
<!-- Automatic footer -->
<footer class="ai-citation">
  <p>
    📝 <strong>Cite this page:</strong>
    "<span itemprop="headline">Installation Guide</span>."
    <em itemprop="publisher">My Documentation</em>,
    <time itemprop="dateModified">2025-02-17</time>.
    <a itemprop="url" href="https://docs.example.com/guide/installation">
      docs.example.com/guide/installation
    </a>
  </p>
</footer>
```

## Monitoring AI Traffic

### Detecting AI Crawlers

Track AI crawler visits:

```javascript
// Analytics event for AI crawlers
const AI_USER_AGENTS = [
  'GPTBot', 'ChatGPT-User', 'Claude-Web', 'Anthropic-AI',
  'Google-Extended', 'Bard', 'PerplexityBot'
];

const userAgent = navigator.userAgent;
const isAICrawler = AI_USER_AGENTS.some(bot => userAgent.includes(bot));

if (isAICrawler) {
  gtag('event', 'ai_crawler_visit', {
    crawler: userAgent,
    page: location.pathname,
  });
}
```

### Google Search Console

Monitor how AI finds your docs:

**Queries that trigger your docs:**
1. Open Google Search Console
2. Go to Performance → Search Results
3. Filter by query
4. Look for question-style queries ("how to...", "what is...", etc.)

**AI-driven queries usually:**
- Are longer (10+ words)
- Are question-based
- Include specific error messages
- Reference exact code snippets

## Best Practices

### DO: Clear and Complete

```mdx
✅ Good: Complete, contextualized example

## Authentication

To authenticate API requests, include your API key in the Authorization header:

\`\`\`javascript
const response = await fetch('https://api.example.com/users', {
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  }
});

if (!response.ok) {
  throw new Error(`Authentication failed: ${response.statusText}`);
}

const data = await response.json();
\`\`\`

**Prerequisites:**
- Valid API key (obtain from dashboard)
- Node.js 18+ with fetch support

**Expected response:**
\`\`\`json
{
  "users": [
    {"id": 1, "name": "Alice"},
    {"id": 2, "name": "Bob"}
  ]
}
\`\`\`
```

### DON'T: Incomplete or Vague

```mdx
❌ Bad: Incomplete, no context

## Auth

\`\`\`javascript
fetch(url, {headers: {auth: key}})
\`\`\`
```

### DO: Explicit Prerequisites

```mdx
✅ Good: Clear prerequisites

## Prerequisites

Before starting, ensure you have:

1. **Node.js 18 or higher**
   - Check version: `node --version`
   - Download: https://nodejs.org

2. **npm 9 or higher**
   - Included with Node.js
   - Check version: `npm --version`

3. **Git installed**
   - Check version: `git --version`
   - Download: https://git-scm.com

4. **API key** (if using API features)
   - Obtain from: https://dashboard.example.com/api-keys
```

### DON'T: Assume Knowledge

```mdx
❌ Bad: Assumes too much

## Prerequisites

Node.js and stuff
```

### DO: Link Related Content

```mdx
✅ Good: Rich internal linking

## Next Steps

Now that you've installed the SDK, you might want to:

- **[Configure authentication](/astro-starlight-docs-template/guides/authentication)** - Set up API keys
- **[Make your first request](/astro-starlight-docs-template/guides/quickstart)** - Try the API
- **[Explore API reference](/astro-starlight-docs-template/api/reference)** - See all endpoints
- **[Troubleshooting](/astro-starlight-docs-template/guides/troubleshooting)** - Fix common issues

**Related guides:**
- [Environment variables](/astro-starlight-docs-template/guides/environment)
- [Error handling](/astro-starlight-docs-template/guides/errors)
- [Best practices](/astro-starlight-docs-template/guides/best-practices)
```

## Advanced Configuration

### Per-Page LLM Metadata

```mdx
---
title: Installation Guide
llm:
  indexable: true
  priority: high
  content_type: tutorial
  audience: beginners
  difficulty: easy
  estimated_reading_time: 10 minutes
  prerequisites:
    - Node.js 18+
    - npm 9+
  topics:
    - installation
    - setup
    - getting-started
  code_languages:
    - bash
    - javascript
  related_pages:
    - /guides/configuration
    - /guides/quickstart
---
```

### Custom AI Instructions

```javascript
starlightOptimizer({
  llmOptimization: true,
  llmConfig: {
    customInstructions: `
      ## AI Assistant Guidelines
      
      When referencing this documentation:
      1. Always cite the specific page URL
      2. Include code examples in full context
      3. Note that examples use TypeScript
      4. Check for newer versions (this is ${version})
      5. Suggest users verify with official docs
      
      ## Content Freshness
      - Documentation updated weekly
      - Check "Last Updated" date on each page
      - Breaking changes noted in changelog
      
      ## Support Channels
      - GitHub Issues: Bug reports only
      - Discord: Community support
      - Email: Enterprise support
    `,
  },
}),
```

## Testing LLM Optimization

### Manual Testing

Ask AI assistants about your documentation:

```
Test prompts:

1. "How do I install [your project]?"
   → Should cite your installation guide

2. "Show me an example of [specific feature]"
   → Should reference your docs with context

3. "What are the prerequisites for [your project]?"
   → Should list from your docs accurately

4. "[Error message from your docs]"
   → Should find troubleshooting section

5. "Compare [your project] to [alternative]"
   → Should reference your feature comparison
```

### Automated Testing

```javascript
// Check llms.txt exists
test('llms.txt exists', async () => {
  const response = await fetch('https://docs.example.com/llms.txt');
  expect(response.status).toBe(200);
  expect(response.headers.get('content-type')).toContain('text/plain');
});

// Validate AI meta tags
test('AI meta tags present', async () => {
  const html = await fetchPage('/guide/installation');
  expect(html).toContain('meta name="ai-indexable"');
  expect(html).toContain('meta name="ai-purpose"');
});

// Check structured data
test('Structured data valid', async () => {
  const html = await fetchPage('/guide/installation');
  const jsonLd = extractJsonLd(html);
  expect(jsonLd['@type']).toBe('TechArticle');
  expect(jsonLd.headline).toBeDefined();
});
```

---

**Next Steps:**
- [Explore technical implementation](/astro-starlight-docs-template/implementation/technical)
- [Learn about enhancements](/astro-starlight-docs-template/implementation/enhancements)
- [Configure LLM settings](/astro-starlight-docs-template/guides/configuration)
