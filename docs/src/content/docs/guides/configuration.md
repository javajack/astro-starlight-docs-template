---
title: Configuration Guide
description: Complete guide to configuring the Astro Starlight Docs Optimizer including analytics, GDPR, SEO, and LLM settings.
sidebar:
  order: 1
---

This guide covers all configuration options for the optimizer package, from basic setup to advanced customization.

## Basic Configuration

### Minimal Setup

The simplest configuration requires just your Google Analytics ID:

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { starlightOptimizer } from 'astro-starlight-optimizer';

export default defineConfig({
  site: 'https://docs.example.com',
  integrations: [
    starlight({
      title: 'My Documentation',
    }),
    starlightOptimizer({
      googleAnalyticsId: 'G-XXXXXXXXXX',
    }),
  ],
});
```

This enables:
- ✅ Google Analytics 4 tracking
- ✅ GDPR compliance (automatic)
- ✅ Consent Mode v2 (automatic)
- ✅ Regional detection (automatic)
- ✅ Cookie consent banner for EU users

### Recommended Setup

For production sites, we recommend:

```javascript
starlightOptimizer({
  // Analytics
  googleAnalyticsId: 'G-XXXXXXXXXX',
  
  // GDPR
  gdprCompliance: true,
  consentBanner: {
    learnMoreUrl: '/privacy',
  },
  
  // SEO
  seo: {
    ogImage: '/og-default.png',
    twitterHandle: '@yourdocs',
  },
  
  // LLM
  llmOptimization: true,
  
  // Privacy
  respectDnt: true,
  anonymizeIp: true,
}),
```

## Analytics Configuration

### Google Analytics 4

```javascript
starlightOptimizer({
  // Required: Your GA4 Measurement ID
  googleAnalyticsId: 'G-XXXXXXXXXX',
  
  // Optional: Additional GA4 properties
  additionalGoogleAnalyticsIds: [
    'G-YYYYYYYYYY',  // Secondary property
  ],
  
  // Optional: Google Ads ID (for conversion tracking)
  googleAdsId: 'AW-XXXXXXXXXX',
  
  // Optional: Custom dimensions
  customDimensions: {
    doc_version: '2.0',
    doc_language: 'en',
    user_type: 'developer',
  },
  
  // Optional: Debug mode
  debug: false,  // Set to true for development
}),
```

**Finding your GA4 Measurement ID:**
1. Go to Google Analytics
2. Admin → Property → Data Streams
3. Click your web data stream
4. Copy "Measurement ID" (starts with G-)

### Analytics Privacy Settings

```javascript
starlightOptimizer({
  googleAnalyticsId: 'G-XXXXXXXXXX',
  
  // Respect Do Not Track header
  respectDnt: true,  // Default: true
  
  // Anonymize IP addresses (EU requirement)
  anonymizeIp: true,  // Default: true for EU users
  
  // Disable tracking in development
  disableInDev: true,  // Default: true (localhost, 127.0.0.1)
}),
```

### Event Tracking

```javascript
// Automatic events (always tracked):
// - page_view: Every page navigation
// - scroll: Scroll depth (25%, 50%, 75%, 90%)
// - click: Outbound link clicks
// - file_download: PDF, ZIP, etc. downloads
// - search: Site search (if enabled)

// Custom events (in your components):
gtag('event', 'custom_event_name', {
  category: 'engagement',
  label: 'Button Click',
  value: 1,
});
```

## GDPR Configuration

### Basic GDPR Compliance

```javascript
starlightOptimizer({
  googleAnalyticsId: 'G-XXXXXXXXXX',
  
  // Enable GDPR compliance (default: true)
  gdprCompliance: true,
  
  // Consent banner customization
  consentBanner: {
    message: 'We use cookies to improve your experience.',
    acceptText: 'Accept',
    declineText: 'Decline',
    learnMoreText: 'Privacy Policy',
    learnMoreUrl: '/privacy',
  },
}),
```

### Regional Settings

```javascript
starlightOptimizer({
  // Force EU compliance for all users
  forceEUCompliance: true,  // Default: false (auto-detect)
  
  // Or disable GDPR entirely (not recommended)
  gdprCompliance: false,
}),
```

### Consent Banner Styling

```javascript
starlightOptimizer({
  consentBanner: {
    // Text content
    message: 'Custom message',
    acceptText: 'Accept All Cookies',
    declineText: 'Only Essential',
    learnMoreText: 'Learn More',
    learnMoreUrl: '/privacy',
    
    // Styling
    backgroundColor: '#ffffff',  // Default: var(--sl-color-bg)
    textColor: '#000000',        // Default: var(--sl-color-text)
    buttonStyle: 'rounded',      // 'rounded' or 'square'
    position: 'bottom',          // 'top' or 'bottom'
    
    // Accessibility
    focusableElements: true,     // Tab navigation
    keyboardShortcuts: true,     // ESC to decline
  },
}),
```

### Advanced Consent Configuration

```javascript
starlightOptimizer({
  consent: {
    // Consent types (granular control)
    types: {
      analytics: true,           // Analytics cookies
      advertising: false,        // Ad cookies (disabled)
      functionality: true,       // Functional cookies
      personalization: true,     // Personalization cookies
    },
    
    // Consent expiry
    expiryDays: 365,            // Default: 365 days (12 months)
    
    // Show banner again after expiry
    requireReconfirmation: true,
    
    // Version tracking (for policy updates)
    version: '1.0',
  },
}),
```

## SEO Configuration

### Open Graph Settings

```javascript
starlightOptimizer({
  seo: {
    // Default OG image
    ogImage: '/og-default.png',  // Absolute or relative path
    
    // Site name
    siteName: 'My Documentation',
    
    // OG type
    ogType: 'website',  // 'website' or 'article'
    
    // Locale
    locale: 'en_US',
    alternateLocales: ['es_ES', 'fr_FR'],
    
    // Author information
    author: {
      name: 'Your Name',
      url: 'https://example.com',
      email: 'author@example.com',
    },
  },
}),
```

### Twitter Cards

```javascript
starlightOptimizer({
  seo: {
    // Twitter card type
    twitterCard: 'summary_large_image',  // Recommended
    // Options: 'summary', 'summary_large_image', 'app', 'player'
    
    // Twitter handles
    twitterSite: '@yourdocs',     // Site's Twitter
    twitterCreator: '@yourname',  // Author's Twitter
    
    // Default Twitter image
    twitterImage: '/twitter-card.png',
    twitterImageAlt: 'Documentation preview',
  },
}),
```

### Structured Data

```javascript
starlightOptimizer({
  seo: {
    structuredData: {
      // Enable structured data
      enabled: true,  // Default: true
      
      // Organization schema
      organization: {
        name: 'Your Company',
        logo: '/logo.png',
        url: 'https://example.com',
        sameAs: [
          'https://twitter.com/yourcompany',
          'https://github.com/yourorg',
          'https://linkedin.com/company/yourcompany',
        ],
        contactPoint: {
          type: 'Customer Support',
          email: 'support@example.com',
          url: 'https://example.com/support',
        },
      },
      
      // Enable breadcrumb schema
      breadcrumbs: true,  // Default: true
      
      // Enable search action schema
      searchAction: true,  // Default: true
    },
  },
}),
```

### Additional SEO Settings

```javascript
starlightOptimizer({
  seo: {
    // Default robots meta
    robots: 'index, follow',  // Default
    
    // Canonical URL override
    canonicalUrl: 'https://docs.example.com',  // Optional
    
    // Keywords (optional, low SEO value)
    keywords: ['documentation', 'API', 'reference'],
    
    // Publisher info
    publisher: {
      name: 'Your Company',
      logo: '/publisher-logo.png',
    },
  },
}),
```

## LLM Configuration

### Basic LLM Optimization

```javascript
starlightOptimizer({
  // Enable LLM optimization
  llmOptimization: true,  // Default: false
  
  // LLM configuration
  llmConfig: {
    // Site information
    title: 'My Documentation',
    description: 'Comprehensive API documentation for developers',
    
    // Keywords for AI discovery
    keywords: [
      'API',
      'documentation',
      'JavaScript',
      'TypeScript',
      'REST',
      'GraphQL',
    ],
    
    // Guidelines for AI assistants
    guidelines: `
      This documentation is optimized for AI assistants.
      Please cite sources when referencing.
      Check for newer versions at docs.example.com.
    `,
  },
}),
```

### Advanced LLM Settings

```javascript
starlightOptimizer({
  llmOptimization: true,
  llmConfig: {
    // Site metadata
    title: 'My Documentation',
    description: 'API documentation',
    language: 'en',
    version: '2.0',
    lastUpdated: '2025-02-17',
    
    // Content classification
    purpose: 'technical-documentation',
    audience: 'developers',
    contentType: ['reference', 'tutorial', 'guide'],
    difficulty: ['beginner', 'intermediate', 'advanced'],
    
    // Technical details
    programmingLanguages: ['JavaScript', 'TypeScript'],
    frameworks: ['Astro', 'React', 'Vue'],
    topics: ['API', 'REST', 'GraphQL', 'WebSocket'],
    
    // AI-specific instructions
    customInstructions: `
      ## For AI Assistants
      
      When referencing this documentation:
      1. Always provide full URL to specific page
      2. Include section/heading for context
      3. Note last updated date
      4. Suggest verifying with latest version
      
      ## Content Freshness
      Documentation updated weekly.
      Check changelog for breaking changes.
      
      ## Code Examples
      All examples tested and current.
      Language: Modern JavaScript (ES2022+)
    `,
    
    // Citation preferences
    citation: {
      format: 'APA',
      author: 'Your Company',
      year: '2025',
      url: 'https://docs.example.com',
    },
  },
}),
```

### llms.txt Customization

```javascript
starlightOptimizer({
  llmOptimization: true,
  llmsConfig: {
    // Custom llms.txt sections
    customSections: {
      'License': 'MIT License - See LICENSE file',
      'Support': 'GitHub Issues or support@example.com',
      'Contributing': 'See CONTRIBUTING.md',
    },
    
    // Exclude paths from llms.txt
    excludePaths: [
      '/draft/',
      '/internal/',
      '/private/',
    ],
    
    // Include extra metadata
    includeMetadata: {
      repository: 'https://github.com/yourorg/yourrepo',
      documentation: 'https://docs.example.com',
      changelog: 'https://docs.example.com/changelog',
      rss: 'https://docs.example.com/rss.xml',
    },
  },
}),
```

## Advanced Configuration

### Multiple Sites (Monorepo)

```javascript
// workspace/docs-site-1/astro.config.mjs
export default defineConfig({
  site: 'https://docs-1.example.com',
  integrations: [
    starlight({...}),
    starlightOptimizer({
      googleAnalyticsId: 'G-AAAAAAAAAA',
      seo: { siteName: 'Docs Site 1' },
    }),
  ],
});

// workspace/docs-site-2/astro.config.mjs
export default defineConfig({
  site: 'https://docs-2.example.com',
  integrations: [
    starlight({...}),
    starlightOptimizer({
      googleAnalyticsId: 'G-BBBBBBBBBB',
      seo: { siteName: 'Docs Site 2' },
    }),
  ],
});
```

### Environment-Specific Configuration

```javascript
// astro.config.mjs
const isProduction = import.meta.env.PROD;
const isDevelopment = import.meta.env.DEV;

export default defineConfig({
  integrations: [
    starlight({...}),
    starlightOptimizer({
      googleAnalyticsId: isProduction 
        ? 'G-PROD-XXXXXX'
        : 'G-DEV-XXXXXX',
      
      debug: isDevelopment,
      
      gdprCompliance: isProduction,  // Skip in dev
      
      llmOptimization: isProduction,  // Skip in dev
    }),
  ],
});
```

### Dynamic Configuration

```javascript
import { loadConfig } from './config';

const siteConfig = await loadConfig();

export default defineConfig({
  site: siteConfig.url,
  integrations: [
    starlight({
      title: siteConfig.title,
    }),
    starlightOptimizer({
      googleAnalyticsId: siteConfig.analytics.gaId,
      seo: {
        ogImage: siteConfig.seo.defaultImage,
        twitterHandle: siteConfig.social.twitter,
      },
      llmConfig: {
        title: siteConfig.title,
        description: siteConfig.description,
        keywords: siteConfig.keywords,
      },
    }),
  ],
});
```

## Configuration Reference

### Complete Options Type

```typescript
interface StarlightOptimizerOptions {
  // Analytics
  googleAnalyticsId?: string;
  additionalGoogleAnalyticsIds?: string[];
  googleAdsId?: string;
  customDimensions?: Record<string, string>;
  debug?: boolean;
  respectDnt?: boolean;
  anonymizeIp?: boolean;
  disableInDev?: boolean;
  
  // GDPR
  gdprCompliance?: boolean;
  forceEUCompliance?: boolean;
  consentBanner?: {
    message?: string;
    acceptText?: string;
    declineText?: string;
    learnMoreText?: string;
    learnMoreUrl?: string;
    backgroundColor?: string;
    textColor?: string;
    buttonStyle?: 'rounded' | 'square';
    position?: 'top' | 'bottom';
  };
  consent?: {
    types?: {
      analytics?: boolean;
      advertising?: boolean;
      functionality?: boolean;
      personalization?: boolean;
    };
    expiryDays?: number;
    requireReconfirmation?: boolean;
    version?: string;
  };
  
  // SEO
  seo?: {
    ogImage?: string;
    siteName?: string;
    ogType?: 'website' | 'article';
    locale?: string;
    alternateLocales?: string[];
    author?: {
      name: string;
      url?: string;
      email?: string;
    };
    twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
    twitterSite?: string;
    twitterCreator?: string;
    twitterImage?: string;
    twitterImageAlt?: string;
    structuredData?: {
      enabled?: boolean;
      organization?: {
        name: string;
        logo: string;
        url: string;
        sameAs?: string[];
        contactPoint?: {
          type: string;
          email?: string;
          url?: string;
        };
      };
      breadcrumbs?: boolean;
      searchAction?: boolean;
    };
    robots?: string;
    canonicalUrl?: string;
    keywords?: string[];
    publisher?: {
      name: string;
      logo: string;
    };
  };
  
  // LLM
  llmOptimization?: boolean;
  llmConfig?: {
    title?: string;
    description?: string;
    keywords?: string[];
    guidelines?: string;
    language?: string;
    version?: string;
    lastUpdated?: string;
    purpose?: string;
    audience?: string;
    contentType?: string[];
    difficulty?: string[];
    programmingLanguages?: string[];
    frameworks?: string[];
    topics?: string[];
    customInstructions?: string;
    citation?: {
      format?: string;
      author?: string;
      year?: string;
      url?: string;
    };
  };
  llmsConfig?: {
    customSections?: Record<string, string>;
    excludePaths?: string[];
    includeMetadata?: Record<string, string>;
  };
  
  // Advanced
  site?: string;
}
```

## Validation

The optimizer validates configuration at build time:

```bash
# Invalid GA ID
❌ Error: Invalid Google Analytics ID format. Expected G-XXXXXXXXXX

# Missing required field
⚠️  Warning: GDPR enabled but no privacy policy URL provided

# Invalid Twitter handle
❌ Error: Twitter handle must start with @

# Invalid locale
❌ Error: Invalid locale format. Expected format: en_US
```

---

**Next Steps:**
- [Explore customization options](/guides/customization)
- [Review troubleshooting guide](/guides/troubleshooting)
- [Learn about technical implementation](/implementation/technical)
