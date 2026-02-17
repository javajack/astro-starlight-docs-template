---
title: Customization Guide
description: Advanced customization options for styling, behavior, and extending the optimizer functionality.
sidebar:
  order: 2
---

Beyond basic configuration, the optimizer offers extensive customization options for styling, behavior, and functionality. This guide covers advanced customization techniques.

## Styling Customization

### Consent Banner Styling

The consent banner inherits Starlight's CSS custom properties and can be customized with CSS:

```css
/* src/styles/custom.css */

/* Override banner colors */
.cookie-consent-banner {
  --banner-bg: #ffffff;
  --banner-text: #1a1a1a;
  --banner-border: #e0e0e0;
  --button-primary-bg: #0066cc;
  --button-primary-text: #ffffff;
  --button-secondary-bg: #6c757d;
  --button-secondary-text: #ffffff;
}

/* Dark mode overrides */
:root[data-theme='dark'] .cookie-consent-banner {
  --banner-bg: #1a1a1a;
  --banner-text: #e8e8e8;
  --banner-border: #404040;
  --button-primary-bg: #4da3ff;
}

/* Custom positioning */
.cookie-consent-banner {
  position: fixed;
  top: 0;  /* Move to top instead of bottom */
  left: 0;
  right: 0;
}

/* Custom animations */
.cookie-consent-banner {
  animation: slideInUp 0.3s ease-out;
}

@keyframes slideInUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Responsive customization */
@media (max-width: 50rem) {
  .cookie-consent-banner {
    padding: 1rem;
    font-size: 0.875rem;
  }
}
```

### Button Customization

```css
/* Custom button styles */
.cookie-consent-accept {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: transform 0.2s ease;
}

.cookie-consent-accept:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.cookie-consent-decline {
  background: transparent;
  border: 2px solid var(--sl-color-gray-5);
  border-radius: 8px;
  padding: 10px 24px;
  color: var(--sl-color-text);
}

.cookie-consent-decline:hover {
  border-color: var(--sl-color-text);
  background: var(--sl-color-gray-6);
}
```

### Brand-Specific Styling

```css
/* Match your brand colors */
:root {
  /* Primary brand color */
  --brand-primary: #FF6B6B;
  --brand-secondary: #4ECDC4;
  --brand-accent: #FFE66D;
}

.cookie-consent-banner {
  background: var(--brand-primary);
  color: white;
  border-top: 4px solid var(--brand-accent);
}

.cookie-consent-accept {
  background: var(--brand-secondary);
  color: white;
}

.cookie-consent-accept:hover {
  background: color-mix(in srgb, var(--brand-secondary) 90%, black);
}
```

## Behavioral Customization

### Custom Consent Logic

Extend the default consent behavior:

```javascript
// public/scripts/custom-consent.js

// Override default accept function
window.customConsentAccept = function() {
  // Default behavior
  gtag('consent', 'update', {
    'analytics_storage': 'granted',
    'functionality_storage': 'granted',
    'personalization_storage': 'granted',
  });
  
  // Custom: Save to your backend
  fetch('/api/consent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: getUserId(),
      analytics: true,
      timestamp: new Date().toISOString(),
    }),
  });
  
  // Custom: Track acceptance event
  gtag('event', 'cookie_consent_granted', {
    event_category: 'engagement',
    event_label: 'Cookie Banner',
  });
  
  // Custom: Show thank you message
  showNotification('Thank you! Analytics enabled.');
};

// Override default decline function
window.customConsentDecline = function() {
  // Default behavior (keep denied)
  
  // Custom: Save to your backend
  fetch('/api/consent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: getUserId(),
      analytics: false,
      timestamp: new Date().toISOString(),
    }),
  });
  
  // Custom: Track decline event (without analytics cookies)
  console.log('User declined analytics');
  
  // Custom: Show confirmation
  showNotification('Preferences saved. Only essential cookies used.');
};
```

### Custom Regional Detection

Override automatic detection:

```javascript
// public/scripts/custom-region.js

// Custom region detection based on your requirements
window.customRegionDetection = function() {
  // Example: Check user's IP via your backend
  return fetch('/api/detect-region')
    .then(res => res.json())
    .then(data => {
      const isEU = data.continent === 'EU' || 
                   data.gdprApplies === true;
      
      // Store result
      localStorage.setItem('user-region', isEU ? 'EU' : 'non-EU');
      
      return isEU;
    })
    .catch(() => {
      // Fallback to default detection
      return window.__isEUUser;
    });
};

// Use custom detection
customRegionDetection().then(isEU => {
  if (isEU && !hasConsent()) {
    showConsentBanner();
  }
});
```

### Consent Expiry Customization

```javascript
// Custom consent expiry handling
const CUSTOM_CONSENT_EXPIRY = 90 * 24 * 60 * 60 * 1000; // 90 days

function isConsentValid() {
  const consent = localStorage.getItem('cookie-consent');
  if (!consent) return false;
  
  const data = JSON.parse(consent);
  const age = Date.now() - data.timestamp;
  
  // Custom: Different expiry for different consent types
  if (data.analytics && age > CUSTOM_CONSENT_EXPIRY) {
    return false; // Analytics consent expired
  }
  
  // Custom: Prompt for reconfirmation on policy update
  const POLICY_VERSION = '2.0';
  if (data.policyVersion !== POLICY_VERSION) {
    return false; // Policy updated, re-request consent
  }
  
  return true;
}
```

## Analytics Customization

### Custom Events

Track custom interactions:

```javascript
// Track button clicks
document.querySelectorAll('[data-track-click]').forEach(button => {
  button.addEventListener('click', () => {
    const label = button.dataset.trackClick;
    gtag('event', 'button_click', {
      event_category: 'engagement',
      event_label: label,
      value: 1,
    });
  });
});

// Track form submissions
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', () => {
    const formName = form.id || form.name || 'unknown';
    gtag('event', 'form_submit', {
      event_category: 'lead',
      event_label: formName,
    });
  });
});

// Track video plays
document.querySelectorAll('video').forEach(video => {
  video.addEventListener('play', () => {
    const videoTitle = video.title || video.src;
    gtag('event', 'video_play', {
      event_category: 'media',
      event_label: videoTitle,
    });
  });
  
  video.addEventListener('ended', () => {
    gtag('event', 'video_complete', {
      event_category: 'media',
      event_label: videoTitle,
    });
  });
});
```

### Custom Dimensions

Add page-specific dimensions:

```javascript
// In page component
gtag('config', 'G-XXXXXXXXXX', {
  'custom_map': {
    'dimension1': 'doc_section',
    'dimension2': 'doc_version',
    'dimension3': 'user_plan',
  },
  'doc_section': 'guides',
  'doc_version': '2.0',
  'user_plan': getUserPlan(), // 'free', 'pro', 'enterprise'
});

// Function to get user plan
function getUserPlan() {
  // Your logic to determine user's plan
  const user = getCurrentUser();
  return user?.plan || 'free';
}
```

### Enhanced E-commerce Tracking

```javascript
// Product views (for paid docs, courses)
gtag('event', 'view_item', {
  currency: 'USD',
  value: 25.00,
  items: [{
    item_id: 'PRO_DOCS',
    item_name: 'Pro Documentation Access',
    item_category: 'Documentation',
    price: 25.00,
  }],
});

// Add to cart
gtag('event', 'add_to_cart', {
  currency: 'USD',
  value: 25.00,
  items: [{
    item_id: 'PRO_DOCS',
    item_name: 'Pro Documentation Access',
    price: 25.00,
    quantity: 1,
  }],
});

// Purchase
gtag('event', 'purchase', {
  transaction_id: generateTransactionId(),
  value: 25.00,
  currency: 'USD',
  tax: 2.50,
  shipping: 0,
  items: [{
    item_id: 'PRO_DOCS',
    item_name: 'Pro Documentation Access',
    price: 25.00,
    quantity: 1,
  }],
});
```

## SEO Customization

### Per-Page SEO Override

Use frontmatter to customize SEO per page:

```mdx
---
title: Installation Guide
description: Step-by-step installation instructions

# SEO overrides
seo:
  title: "Install MyApp - Complete Guide | MyDocs"  # Override page title
  description: "Learn how to install MyApp with our comprehensive guide. Covers prerequisites, installation, and verification."
  ogImage: /images/og-installation.png
  ogType: article
  twitterCard: summary_large_image
  twitterImage: /images/twitter-installation.png
  robots: index, follow
  keywords: [installation, setup, getting started]
  
  # Article-specific
  author: Jane Doe
  publishedTime: 2025-01-15
  modifiedTime: 2025-02-17
  section: Guides
  tags: [installation, setup, beginner]
---

# Installation Guide

Content here...
```

### Dynamic OG Images

Generate OG images dynamically:

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { starlightOptimizer } from 'astro-starlight-optimizer';

export default defineConfig({
  integrations: [
    starlight({...}),
    starlightOptimizer({
      seo: {
        ogImage: (page) => {
          // Generate URL for dynamic OG image
          const title = encodeURIComponent(page.title);
          const section = encodeURIComponent(page.section);
          
          return `https://og-image.example.com/generate?title=${title}&section=${section}`;
        },
      },
    }),
  ],
});
```

### Advanced Structured Data

```javascript
// Add custom structured data via frontmatter
---
title: API Reference
structuredData:
  type: APIReference
  programmingLanguage: JavaScript
  codeRepository: https://github.com/yourorg/yourrepo
  runtimePlatform: Node.js
  targetProduct:
    name: MyAPI
    version: "2.0"
---
```

## LLM Customization

### Custom llms.txt Template

```javascript
// astro.config.mjs
starlightOptimizer({
  llmOptimization: true,
  llmsConfig: {
    template: `
# {{title}} - Documentation for AI

## About
{{description}}

## Key Features
{{#each features}}
- {{this}}
{{/each}}

## Content Structure
{{contentStructure}}

## AI Guidelines
{{guidelines}}

## API Reference
Base URL: {{apiBaseUrl}}
Authentication: {{authMethod}}
Rate Limits: {{rateLimit}}

## Code Examples Language
Primary: {{primaryLanguage}}
Supported: {{supportedLanguages}}

## Support
- GitHub: {{githubUrl}}
- Email: {{supportEmail}}
- Discord: {{discordUrl}}

## License
{{license}}

---
Last Updated: {{lastUpdated}}
Documentation Version: {{version}}
    `,
    
    templateData: {
      title: 'My API',
      description: 'RESTful API for developers',
      features: ['Authentication', 'Rate Limiting', 'Webhooks'],
      apiBaseUrl: 'https://api.example.com/v2',
      authMethod: 'Bearer Token',
      rateLimit: '1000 requests/hour',
      primaryLanguage: 'JavaScript',
      supportedLanguages: 'JavaScript, Python, Ruby, Go',
      githubUrl: 'https://github.com/yourorg/yourrepo',
      supportEmail: 'api@example.com',
      discordUrl: 'https://discord.gg/yourserver',
      license: 'MIT',
      version: '2.0',
      lastUpdated: new Date().toISOString().split('T')[0],
    },
  },
}),
```

### AI-Specific Meta Tags

Add custom AI meta tags:

```html
<!-- In custom component or via integration -->
<meta name="ai-purpose" content="technical-reference" />
<meta name="ai-audience" content="software-developers" />
<meta name="ai-difficulty" content="intermediate" />
<meta name="ai-topics" content="REST, GraphQL, Authentication" />
<meta name="ai-languages" content="JavaScript, TypeScript, Python" />
<meta name="ai-last-reviewed" content="2025-02-17" />
<meta name="ai-freshness" content="updated-weekly" />
```

## Integration with Other Tools

### Plausible Analytics

Use alongside or instead of GA4:

```javascript
// Add Plausible script manually
// astro.config.mjs
export default defineConfig({
  integrations: [
    starlight({...}),
    {
      name: 'plausible-analytics',
      hooks: {
        'astro:config:setup': ({ injectScript }) => {
          injectScript('head', `
            <script defer data-domain="docs.example.com" src="https://plausible.io/js/script.js"></script>
          `);
        },
      },
    },
    starlightOptimizer({
      // Disable GA4 if using Plausible exclusively
      // Or keep both for comparison
    }),
  ],
});
```

### PostHog

Add product analytics:

```javascript
starlightOptimizer({
  // Your existing config
}),
{
  name: 'posthog-analytics',
  hooks: {
    'astro:config:setup': ({ injectScript }) => {
      injectScript('page', `
        <script>
          !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
          posthog.init('YOUR_API_KEY', {api_host: 'https://app.posthog.com'})
        </script>
      `);
    },
  },
},
```

## Custom Consent Categories

Implement custom cookie categories:

```javascript
// Granular consent categories
const CONSENT_CATEGORIES = {
  essential: {
    name: 'Essential',
    description: 'Required for site functionality',
    required: true,  // Cannot be declined
    cookies: ['session', 'auth', 'theme-preference'],
  },
  analytics: {
    name: 'Analytics',
    description: 'Help us understand usage',
    required: false,
    cookies: ['_ga', '_gid', '_gat'],
  },
  marketing: {
    name: 'Marketing',
    description: 'Personalized advertising',
    required: false,
    cookies: ['_fbp', '_gcl_au'],
  },
  personalization: {
    name: 'Personalization',
    description: 'Remember your preferences',
    required: false,
    cookies: ['user-prefs', 'language', 'region'],
  },
};

// Custom consent banner with categories
function showGranularConsentBanner() {
  const banner = createBanner();
  
  Object.entries(CONSENT_CATEGORIES).forEach(([key, category]) => {
    const checkbox = createCheckbox(category);
    if (category.required) {
      checkbox.checked = true;
      checkbox.disabled = true;
    }
    banner.appendChild(checkbox);
  });
  
  banner.querySelector('.accept-all').onclick = () => {
    acceptAllCategories();
  };
  
  banner.querySelector('.save-preferences').onclick = () => {
    saveSelectedCategories();
  };
}
```

---

**Next Steps:**
- [Review troubleshooting guide](/guides/troubleshooting)
- [Explore technical implementation](/implementation/technical)
- [Learn about configuration options](/guides/configuration)
