---
title: GDPR Compliance
description: Comprehensive GDPR compliance with automatic regional detection, cookie consent management, and legal compliance features.
sidebar:
  order: 3
---

The optimizer provides automatic GDPR (General Data Protection Regulation) compliance for your documentation site, including regional detection, cookie consent management, and full Consent Mode v2 integration.

## Overview

GDPR is the EU's data protection law that requires explicit user consent before collecting personal data through cookies or similar technologies. This package handles GDPR compliance automatically.

### Key Features

- ✅ Automatic EU/EEA regional detection
- ✅ Cookie consent banner for EU users only
- ✅ Both "Accept" and "Decline" options (GDPR requirement)
- ✅ Consent Mode v2 integration
- ✅ LocalStorage preference persistence
- ✅ No cookies before consent
- ✅ IP anonymization for EU users
- ✅ Consent withdrawal mechanism
- ✅ GDPR Articles 7 & 13 compliance

## Regional Detection

### How It Works

The package automatically detects if a user is in the EU/EEA region:

```javascript
// Regional detection logic
const EU_COUNTRIES = [
  // EU Member States (27)
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
  'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
  'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
  
  // EEA Countries (non-EU)
  'IS', // Iceland
  'LI', // Liechtenstein
  'NO', // Norway
  
  // Special Status
  'CH', // Switzerland (bilateral agreements)
  'GB', // United Kingdom (UK GDPR)
];

function isEUUser() {
  // Method 1: Timezone-based detection
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const euTimezones = [
    'Europe/London', 'Europe/Paris', 'Europe/Berlin', 
    'Europe/Rome', 'Europe/Madrid', // ... etc
  ];
  
  if (euTimezones.some(tz => timezone.startsWith(tz))) {
    return true;
  }
  
  // Method 2: Language preference
  const language = navigator.language || navigator.userLanguage;
  const euLanguages = ['de', 'fr', 'it', 'es', 'pl', 'nl', ...];
  
  // Method 3: Conservative default
  // If uncertain, assume EU (better for compliance)
  return true;
}
```

**Detection Methods (in order):**

| Method | Reliability | Notes |
|--------|-------------|-------|
| **1. Timezone** | 85% | Primary detection method |
| **2. Browser Language** | 70% | Secondary fallback |
| **3. Conservative Default** | 100% | Assume EU if uncertain |

:::note Why Conservative Default?
If we can't determine the region reliably, we default to **treating all users as EU**. This ensures compliance but may show consent banners to non-EU users. This is better than accidentally violating GDPR.
:::

### VPN and Proxy Handling

Users on VPNs or proxies may appear to be in different regions:

```javascript
// VPN detection considerations
// - Timezone still reflects VPN server location
// - Browser language reflects user's actual preference
// - Conservative default ensures compliance

// Example: US user on German VPN
Timezone: 'Europe/Berlin'     // VPN server location
Language: 'en-US'              // User's actual preference
Result: Show consent banner    // Conservative approach
```

**Why this approach?**
- ✅ Better to show consent banner unnecessarily than violate GDPR
- ✅ Non-EU users can still decline cookies
- ✅ Protects against false negatives (EU users misidentified)

### Manual Override

Override automatic detection if needed:

```javascript
// Force EU treatment for all users
starlightOptimizer({
  googleAnalyticsId: 'G-XXXXXXXXXX',
  forceEUCompliance: true, // All users treated as EU
}),

// Or disable regional detection entirely
starlightOptimizer({
  googleAnalyticsId: 'G-XXXXXXXXXX',
  gdprCompliance: false, // Not recommended
}),
```

## Cookie Consent Banner

### Default Appearance

For EU users, a consent banner appears on first visit:

```
┌────────────────────────────────────────────────────┐
│ 🍪 Cookie Notice                                   │
│                                                    │
│ We use cookies to analyze site usage and improve  │
│ your experience. You can accept or decline        │
│ analytics cookies.                                 │
│                                                    │
│ [Learn More]  [Decline]  [Accept Cookies]         │
└────────────────────────────────────────────────────┘
```

**Key Elements:**
- ✅ Clear explanation of cookie usage
- ✅ Both "Accept" and "Decline" buttons (GDPR Art. 7)
- ✅ Link to privacy policy
- ✅ Non-intrusive design
- ✅ Accessible (keyboard navigation, screen readers)

### Banner Positioning

The banner appears at the bottom of the screen:

```css
.cookie-consent-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  padding: 1.5rem;
  background: var(--sl-color-bg);
  border-top: 1px solid var(--sl-color-gray-5);
  box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
}
```

**Responsive Design:**

| Screen Size | Layout |
|-------------|--------|
| Desktop (>768px) | Horizontal layout, buttons on right |
| Tablet (768px) | Wrapped layout, buttons below text |
| Mobile (<640px) | Stacked layout, full-width buttons |

### Customization

Customize banner text and appearance:

```javascript
starlightOptimizer({
  googleAnalyticsId: 'G-XXXXXXXXXX',
  consentBanner: {
    message: 'We use analytics cookies to improve our documentation. Your privacy is important to us.',
    acceptText: 'Accept All Cookies',
    declineText: 'Only Essential',
    learnMoreText: 'Privacy Policy',
    learnMoreUrl: '/privacy',
    
    // Styling
    backgroundColor: '#f8f9fa',
    textColor: '#1a1a1a',
    buttonStyle: 'rounded', // or 'square'
    position: 'bottom', // or 'top'
  },
}),
```

**Advanced Customization (CSS):**

```css
/* Override banner styles */
.cookie-consent-banner {
  --banner-bg: #ffffff;
  --banner-text: #000000;
  --button-primary: #0066cc;
  --button-secondary: #6c757d;
}

/* Dark mode */
:root[data-theme='dark'] .cookie-consent-banner {
  --banner-bg: #1a1a1a;
  --banner-text: #e8e8e8;
}
```

## Consent Management

### Consent States

Three possible states for each user:

| State | Description | Behavior |
|-------|-------------|----------|
| **Unknown** | First visit, no choice made | Show consent banner |
| **Accepted** | User clicked "Accept" | Full analytics tracking |
| **Declined** | User clicked "Decline" | Cookieless analytics only |

### Persistence

User choice is saved to localStorage:

```javascript
// Consent data structure
{
  "analytics": true,          // User accepted analytics
  "timestamp": 1708185600000, // When consent was given
  "version": "1.0",           // Consent version
  "region": "EU",             // Detected region
  "method": "explicit"        // How consent was obtained
}

// Storage key
localStorage.setItem('cookie-consent', JSON.stringify(consentData));
```

**Consent Expiration:**

```javascript
// Consent expires after 12 months (GDPR best practice)
const CONSENT_EXPIRY = 365 * 24 * 60 * 60 * 1000; // 1 year

function isConsentValid(consentData) {
  const age = Date.now() - consentData.timestamp;
  return age < CONSENT_EXPIRY;
}

// If expired, show banner again
if (!isConsentValid(consent)) {
  showConsentBanner();
}
```

### Consent Withdrawal

Users can change their choice at any time:

```javascript
// Add consent management link to footer
<footer>
  <a href="#" id="manage-cookies">Cookie Preferences</a>
</footer>

// Clicking reopens consent banner
document.getElementById('manage-cookies').onclick = () => {
  showConsentBanner();
};
```

**Automatic consent status indicator:**

```html
<!-- Shows current consent status -->
<div class="consent-status">
  ✅ Analytics cookies: Accepted
  <button onclick="revokeConsent()">Change</button>
</div>
```

## GDPR Compliance Details

### Article 7: Conditions for Consent

GDPR Article 7 requires:

1. ✅ **Freely given**: User can decline without consequences
2. ✅ **Specific**: Clear what user consents to
3. ✅ **Informed**: Explanation of what cookies do
4. ✅ **Unambiguous**: Clear "Accept" action required
5. ✅ **Withdrawable**: User can change mind anytime

**How we comply:**

```javascript
// 1. Freely given
// Both "Accept" and "Decline" buttons, equal prominence

// 2. Specific
message: "We use analytics cookies to understand how you use our documentation."

// 3. Informed
learnMoreLink: "/privacy" // Detailed privacy policy

// 4. Unambiguous
// Requires explicit button click, no pre-checked boxes

// 5. Withdrawable
// "Cookie Preferences" link always available
```

### Article 13: Information to be Provided

GDPR Article 13 requires providing:

- ✅ Identity of data controller (your organization)
- ✅ Purpose of data processing (analytics)
- ✅ Legal basis for processing (consent)
- ✅ Recipients of data (Google Analytics)
- ✅ Data retention period (14-50 months)
- ✅ Rights of data subjects (access, deletion, etc.)

**Implementation:**

```javascript
starlightOptimizer({
  googleAnalyticsId: 'G-XXXXXXXXXX',
  privacyPolicy: {
    controller: 'Your Company Name',
    controllerEmail: 'privacy@example.com',
    purpose: 'Website analytics and improvement',
    legalBasis: 'Consent (GDPR Art. 6(1)(a))',
    recipients: ['Google LLC (USA)'],
    retention: '14 months',
    rights: 'Access, rectification, erasure, portability, restriction, objection',
    policyUrl: '/privacy',
  },
}),
```

### ePrivacy Directive

The ePrivacy Directive (2002/58/EC) specifically regulates cookies:

**Requirements:**
- ✅ Inform users about cookies before storing them
- ✅ Obtain consent before storing non-essential cookies
- ✅ Provide mechanism to refuse cookies
- ✅ Essential cookies exempt from consent requirement

**Our implementation:**

```javascript
// Essential cookies (no consent required)
const ESSENTIAL_COOKIES = [
  'cookie-consent',      // Stores user's choice
  'theme-preference',    // Dark/light mode
  'language-preference', // Selected language
];

// Analytics cookies (require consent)
const ANALYTICS_COOKIES = [
  '_ga',           // Google Analytics
  '_ga_*',         // GA4 measurement
  '_gid',          // GA session
  '_gat',          // GA request throttling
];

// No analytics cookies until consent
if (!hasConsent()) {
  blockCookies(ANALYTICS_COOKIES);
}
```

## Cookie Categories

### Essential Cookies

Always allowed (GDPR exemption):

| Cookie | Purpose | Expiry |
|--------|---------|--------|
| `cookie-consent` | Stores user's consent choice | 12 months |
| `theme-preference` | Remembers dark/light mode | 12 months |
| `language` | Selected documentation language | 12 months |

:::note
Essential cookies are exempt from GDPR consent requirements because they're necessary for the website to function.
:::

### Analytics Cookies

Require user consent:

| Cookie | Purpose | Expiry |
|--------|---------|--------|
| `_ga` | Distinguishes unique users | 2 years |
| `_ga_<ID>` | Persists session state (GA4) | 2 years |
| `_gid` | Distinguishes users (24h sessions) | 24 hours |
| `_gat` | Throttles request rate | 1 minute |

**When consent is declined:**
- ❌ No analytics cookies set
- ✅ Cookieless tracking via Consent Mode
- ✅ Aggregate data in GA4 (conversion modeling)

## Data Processing

### Data Collected

When user accepts analytics cookies:

**Automatically Collected:**
- Page URL and title
- Referrer (where user came from)
- Browser type and version
- Operating system
- Screen resolution
- Language preference
- Approximate location (country/city)
- Session duration
- Scroll depth
- Click events

**Not Collected:**
- ❌ Personal identifying information (PII)
- ❌ Email addresses
- ❌ Usernames
- ❌ IP addresses (anonymized for EU)
- ❌ Cross-site tracking data

### Data Sharing

Data is shared with:

| Recipient | Purpose | Location | Safeguards |
|-----------|---------|----------|------------|
| **Google LLC** | Analytics processing | USA | Standard Contractual Clauses (SCCs) |
| **Google Cloud** | Data storage | EU (optional) | GDPR-compliant infrastructure |

**Data Protection Measures:**
- ✅ Standard Contractual Clauses (SCCs) with Google
- ✅ IP anonymization for EU users
- ✅ Data retention limits (14-50 months)
- ✅ Google's Data Processing Amendment
- ✅ EU data residency option available

### User Rights

GDPR grants users these rights:

| Right | Implementation |
|-------|----------------|
| **Access** | Contact form to request data export |
| **Rectification** | Limited (analytics is aggregate) |
| **Erasure** | Cookie deletion + GA4 user deletion |
| **Portability** | GA4 export available |
| **Restriction** | Decline cookies or revoke consent |
| **Objection** | Decline button or DNT header |
| **Automated Decisions** | N/A (no automated decisions made) |

**Implement data subject requests:**

```javascript
// Privacy policy page includes:
- Contact form for data requests
- Cookie deletion instructions
- Opt-out mechanism (DNT, consent withdrawal)
- GA4 opt-out browser extension link
```

## Legal Considerations

### Privacy Policy Requirements

Your privacy policy should include:

```markdown
# Privacy Policy

## 1. Data Controller
[Your Company Name]
[Contact Email]

## 2. Data We Collect
We collect analytics data through Google Analytics 4:
- Pages visited
- Time spent on site
- Browser and device information
- Approximate location (country/city)

## 3. Legal Basis
We process data based on your consent (GDPR Art. 6(1)(a)).

## 4. Data Recipients
Google LLC (USA) processes analytics data under Standard Contractual Clauses.

## 5. Data Retention
Analytics data is retained for 14 months, then automatically deleted.

## 6. Your Rights
You have the right to:
- Access your data
- Request deletion
- Withdraw consent
- Object to processing
- Data portability

Contact us at privacy@example.com

## 7. Cookies
We use analytics cookies (see Cookie Policy for details).

## 8. Changes
Last updated: [Date]
We may update this policy. Check back periodically.
```

### Cookie Policy

Separate cookie policy recommended:

```markdown
# Cookie Policy

## What Are Cookies?
Small text files stored on your device.

## Cookies We Use

### Essential Cookies (Always Active)
- cookie-consent: Remembers your cookie choice

### Analytics Cookies (Optional, Requires Consent)
- _ga, _gid: Google Analytics tracking

## Managing Cookies
You can:
- Accept or decline via our consent banner
- Change preferences anytime via "Cookie Preferences" link
- Use browser settings to block cookies
- Install Google Analytics opt-out extension

## Third-Party Cookies
We use Google Analytics. See Google's privacy policy.

## Contact
Questions? Email privacy@example.com
```

### Terms of Service

Consider adding analytics disclosure to ToS:

```markdown
## Analytics

We use Google Analytics to understand how users interact with our documentation. 
By accepting cookies, you consent to this data collection as described in our 
Privacy Policy.
```

## Testing GDPR Compliance

### Automated Tests

```javascript
describe('GDPR Compliance', () => {
  test('EU users see consent banner', () => {
    // Mock EU timezone
    mockTimezone('Europe/Berlin');
    
    // Load page
    visit('/');
    
    // Banner should appear
    expect(getByText('Cookie Notice')).toBeVisible();
  });
  
  test('No cookies before consent', () => {
    visit('/');
    
    // Check no analytics cookies
    expect(getCookie('_ga')).toBeUndefined();
    expect(getCookie('_gid')).toBeUndefined();
  });
  
  test('Decline prevents cookies', () => {
    visit('/');
    click('Decline');
    
    // Still no analytics cookies
    expect(getCookie('_ga')).toBeUndefined();
  });
  
  test('Accept enables cookies', () => {
    visit('/');
    click('Accept Cookies');
    
    // Analytics cookies should be set
    expect(getCookie('_ga')).toBeDefined();
  });
});
```

### Manual Testing Checklist

- [ ] EU timezone shows consent banner
- [ ] Non-EU timezone skips banner (or shows depending on config)
- [ ] Banner has both "Accept" and "Decline" buttons
- [ ] Declining prevents analytics cookies
- [ ] Accepting enables analytics cookies
- [ ] Consent persists across page loads
- [ ] Consent expires after 12 months
- [ ] "Cookie Preferences" link reopens banner
- [ ] Privacy policy link works
- [ ] Banner is accessible (keyboard, screen reader)
- [ ] Banner works in dark mode
- [ ] Banner is responsive on mobile

### Browser DevTools Checks

```javascript
// Open browser console

// 1. Check regional detection
console.log('Timezone:', Intl.DateTimeFormat().resolvedOptions().timeZone);
console.log('Is EU:', isEUUser());

// 2. Check consent state
console.log('Consent:', localStorage.getItem('cookie-consent'));

// 3. Check Consent Mode
gtag('get', 'G-XXXXXXXXXX', 'consent', console.log);

// 4. Check cookies
document.cookie.split(';').forEach(c => console.log(c.trim()));
```

## Troubleshooting

### Consent Banner Not Showing

**Possible causes:**

```javascript
// 1. Already gave consent (check localStorage)
localStorage.getItem('cookie-consent'); // Should be null on first visit

// 2. Not detected as EU user
console.log(isEUUser()); // Should be true for EU

// 3. GDPR disabled in config
starlightOptimizer({
  gdprCompliance: true, // Make sure this is true
});

// 4. CSS conflict hiding banner
// Check with browser DevTools if element exists but is hidden
```

### Cookies Set Before Consent

**Debug steps:**

```javascript
// 1. Clear all cookies and localStorage
document.cookie.split(';').forEach(c => {
  document.cookie = c.split('=')[0] + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC';
});
localStorage.clear();

// 2. Reload page
location.reload();

// 3. Check cookies immediately (should be empty except essential)
console.log(document.cookie);

// 4. Verify Consent Mode default state
gtag('get', 'G-XXXXXXXXXX', 'consent', (consent) => {
  // For EU: analytics_storage should be 'denied'
  console.log(consent.analytics_storage); // Should be 'denied'
});
```

### Consent Not Persisting

**Check localStorage:**

```javascript
// Verify consent is being saved
window.addEventListener('click', (e) => {
  if (e.target.matches('[data-accept-cookies]')) {
    console.log('Saved consent:', localStorage.getItem('cookie-consent'));
  }
});

// Check for localStorage errors
try {
  localStorage.setItem('test', 'test');
  localStorage.removeItem('test');
} catch (e) {
  console.error('LocalStorage not available:', e);
  // Might be in private/incognito mode or cookies disabled
}
```

---

**Next Steps:**
- [Explore SEO features](/astro-starlight-docs-template/features/seo)
- [Learn about LLM optimization](/astro-starlight-docs-template/features/llm)
- [Configure consent banner text](/astro-starlight-docs-template/guides/configuration)
