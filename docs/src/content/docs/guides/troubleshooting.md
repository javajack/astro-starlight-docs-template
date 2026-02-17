---
title: Troubleshooting Guide
description: Solutions to common issues with analytics, GDPR compliance, SEO, and LLM optimization in the Astro Starlight Docs Optimizer.
sidebar:
  order: 3
---

This guide helps you diagnose and fix common issues with the optimizer package. Use this page to quickly resolve problems with analytics, consent banners, SEO, and more.

## Analytics Issues

### Analytics Not Tracking

**Symptoms:**
- No data in Google Analytics
- Events not appearing in GA4 DebugView
- Console shows no errors

**Diagnosis:**

```javascript
// Open browser console and check:

// 1. Is gtag defined?
console.log(typeof gtag);  // Should be 'function'

// 2. Is dataLayer present?
console.log(window.dataLayer);  // Should be an array

// 3. Check GA4 ID
console.log(window.dataLayer.find(item => 
  item[0] === 'config'
));  // Should show your G-XXXXXXXXXX

// 4. Check if tracking is disabled
console.log(window['ga-disable-G-XXXXXXXXXX']);  // Should be undefined or false
```

**Solutions:**

1. **Verify GA4 ID format**
   ```javascript
   // ❌ Wrong: Old Universal Analytics format
   googleAnalyticsId: 'UA-XXXXXXXXX-1'
   
   // ✅ Correct: GA4 format
   googleAnalyticsId: 'G-XXXXXXXXXX'
   ```

2. **Check if running on localhost**
   ```javascript
   // Analytics disabled on localhost by default
   console.log(window.location.hostname);
   // If 'localhost' or '127.0.0.1', analytics won't track
   
   // Solution: Test on actual domain or disable dev check
   starlightOptimizer({
     googleAnalyticsId: 'G-XXXXXXXXXX',
     disableInDev: false,  // Allow tracking on localhost
   })
   ```

3. **Verify consent was granted (EU users)**
   ```javascript
   // Check consent state
   const consent = localStorage.getItem('cookie-consent');
   console.log(JSON.parse(consent));
   // Should show: { analytics: true, ... }
   
   // If analytics: false, user declined cookies
   // Ask user to accept via consent banner
   ```

4. **Check Do Not Track**
   ```javascript
   // Check DNT status
   console.log(navigator.doNotTrack);
   // If '1', analytics is disabled
   
   // Solution: Disable DNT check (not recommended)
   starlightOptimizer({
     respectDnt: false,
   })
   ```

5. **Verify script injection**
   ```bash
   # Check if GA4 script is in HTML
   view-source:https://your-site.com
   
   # Search for:
   # - googletagmanager.com/gtag/js
   # - gtag('config', 'G-XXXXXXXXXX')
   
   # If missing, optimizer may not be configured correctly
   ```

### Events Not Showing in GA4

**Symptoms:**
- Page views work
- Custom events don't appear in DebugView
- No errors in console

**Solutions:**

1. **Check event syntax**
   ```javascript
   // ❌ Wrong: Incorrect parameter names
   gtag('event', 'button_click', {
     category: 'engagement',  // Wrong parameter name
   });
   
   // ✅ Correct: Use event_category
   gtag('event', 'button_click', {
     event_category: 'engagement',
     event_label: 'Download',
     value: 1,
   });
   ```

2. **Verify event is firing**
   ```javascript
   // Add debug logging
   const originalGtag = window.gtag;
   window.gtag = function(...args) {
     console.log('[GA4 Event]', ...args);
     return originalGtag.apply(this, args);
   };
   
   // Now trigger your event
   // Should see console log before sending to GA4
   ```

3. **Check DebugView is enabled**
   ```javascript
   // Enable debug mode
   starlightOptimizer({
     debug: true,
   })
   
   // Then check GA4 → Admin → DebugView
   ```

### GA4 Script Blocked

**Symptoms:**
- Console error: "Failed to load resource"
- Blocked by adblocker
- CSP violation

**Solutions:**

1. **Adblocker detection**
   ```javascript
   // Detect if GA4 is blocked
   window.addEventListener('error', (e) => {
     if (e.target.src?.includes('googletagmanager.com')) {
       console.warn('Analytics blocked by adblocker');
       
       // Fallback: Track with first-party solution
       useFallbackTracking();
     }
   }, true);
   ```

2. **Content Security Policy fix**
   ```html
   <!-- Add to HTML head or meta tag -->
   <meta http-equiv="Content-Security-Policy" content="
     default-src 'self';
     script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
     connect-src 'self' https://www.google-analytics.com https://analytics.google.com;
     img-src 'self' data: https://www.google-analytics.com;
   ">
   ```

## GDPR/Consent Issues

### Consent Banner Not Showing

**Symptoms:**
- Banner doesn't appear for any users
- EU users don't see consent prompt

**Diagnosis:**

```javascript
// Check EU detection
console.log(window.__isEUUser);  // Should be true for EU users

// Check if consent already given
const consent = localStorage.getItem('cookie-consent');
console.log(consent);  // Should be null on first visit

// Check banner element
const banner = document.querySelector('.cookie-consent-banner');
console.log(banner);  // Should exist if banner should show
```

**Solutions:**

1. **Verify GDPR is enabled**
   ```javascript
   starlightOptimizer({
     gdprCompliance: true,  // Make sure this is true (default)
   })
   ```

2. **Clear localStorage**
   ```javascript
   // Clear consent to test banner
   localStorage.removeItem('cookie-consent');
   localStorage.removeItem('user-region-cache');
   location.reload();
   ```

3. **Check timezone detection**
   ```javascript
   // Test EU timezone
   console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
   // Should be Europe/* for EU users
   
   // Force EU treatment for testing
   starlightOptimizer({
     forceEUCompliance: true,
   })
   ```

4. **Check CSS display**
   ```javascript
   // Banner might be hidden by CSS
   const banner = document.querySelector('.cookie-consent-banner');
   console.log(getComputedStyle(banner).display);  // Should not be 'none'
   console.log(getComputedStyle(banner).visibility);  // Should not be 'hidden'
   ```

### Cookies Set Before Consent

**Symptoms:**
- Analytics cookies present immediately
- No consent required
- GDPR violation

**Diagnosis:**

```javascript
// On fresh page load, check cookies immediately
document.cookie.split(';').forEach(cookie => {
  console.log(cookie.trim());
});

// For EU users, should ONLY see essential cookies
// - cookie-consent (if set)
// - session cookies
// Should NOT see _ga, _gid before consent
```

**Solutions:**

1. **Verify Consent Mode defaults**
   ```javascript
   // Check that consent mode defaults are set BEFORE GA4
   // View page source, should see:
   <script>
     // Consent defaults (first)
     gtag('consent', 'default', {...});
   </script>
   <script async src="https://www.googletagmanager.com/gtag/js"></script>
   <script>
     // GA4 init (after)
     gtag('config', 'G-XXX');
   </script>
   ```

2. **Check consent state**
   ```javascript
   // Verify consent state in GA4
   gtag('get', 'G-XXXXXXXXXX', 'consent', (consent) => {
     console.log(consent);
     // For EU users without consent, should show:
     // { analytics_storage: 'denied', ... }
   });
   ```

3. **Clear all cookies and test**
   ```javascript
   // Delete all cookies
   document.cookie.split(';').forEach(cookie => {
     const name = cookie.split('=')[0].trim();
     document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
   });
   
   // Clear storage
   localStorage.clear();
   sessionStorage.clear();
   
   // Reload and verify no analytics cookies before consent
   location.reload();
   ```

### Consent Not Persisting

**Symptoms:**
- Banner appears on every page load
- Consent choice not saved
- LocalStorage not working

**Solutions:**

1. **Check localStorage availability**
   ```javascript
   // Test localStorage
   try {
     localStorage.setItem('test', 'test');
     localStorage.removeItem('test');
     console.log('LocalStorage available');
   } catch (e) {
     console.error('LocalStorage not available:', e);
     // User might be in private/incognito mode
     // Or localStorage disabled in browser settings
   }
   ```

2. **Check for localStorage errors**
   ```javascript
   // Listen for storage errors
   window.addEventListener('error', (e) => {
     if (e.message.includes('localStorage')) {
       console.error('LocalStorage error:', e);
     }
   });
   ```

3. **Verify consent data format**
   ```javascript
   // Check consent data structure
   const consent = localStorage.getItem('cookie-consent');
   console.log(JSON.parse(consent));
   
   // Should be:
   // {
   //   analytics: true/false,
   //   timestamp: 1708185600000,
   //   version: '1.0'
   // }
   ```

## SEO Issues

### OG Image Not Showing

**Symptoms:**
- Facebook debugger shows no image
- Twitter card preview missing
- Social shares lack image

**Solutions:**

1. **Verify image exists**
   ```bash
   # Test image URL directly
   curl -I https://docs.example.com/og-image.png
   # Should return: HTTP/1.1 200 OK
   ```

2. **Check absolute URL**
   ```html
   <!-- ❌ Wrong: Relative URL -->
   <meta property="og:image" content="/og-image.png">
   
   <!-- ✅ Correct: Absolute URL -->
   <meta property="og:image" content="https://docs.example.com/og-image.png">
   ```

3. **Verify image size**
   ```bash
   # OG image should be:
   # - At least 1200x630 pixels
   # - Less than 1 MB
   # - PNG or JPEG format
   
   # Check file size
   curl -sI https://docs.example.com/og-image.png | grep -i content-length
   ```

4. **Clear social media cache**
   ```bash
   # Facebook Sharing Debugger
   https://developers.facebook.com/tools/debug/
   
   # Click "Scrape Again" to refresh cache
   
   # Twitter Card Validator
   https://cards-dev.twitter.com/validator
   ```

5. **Check meta tag**
   ```bash
   # Verify OG tag in HTML
   curl https://docs.example.com/page | grep og:image
   
   # Should output:
   # <meta property="og:image" content="https://docs.example.com/og-image.png">
   ```

### Structured Data Errors

**Symptoms:**
- Google Rich Results Test shows errors
- Missing required fields
- Invalid schema

**Solutions:**

1. **Test with Rich Results Test**
   ```
   https://search.google.com/test/rich-results
   
   Common errors:
   - Missing 'author' field
   - Missing 'datePublished'
   - Invalid date format
   - Missing image
   ```

2. **Fix common errors**
   ```javascript
   // ❌ Wrong: Invalid date
   "datePublished": "2025-02-17"  // Missing time
   
   // ✅ Correct: ISO 8601 format
   "datePublished": "2025-02-17T10:00:00Z"
   
   // ❌ Wrong: Relative URL
   "image": "/logo.png"
   
   // ✅ Correct: Absolute URL
   "image": "https://docs.example.com/logo.png"
   ```

3. **Validate JSON-LD syntax**
   ```javascript
   // Check for syntax errors
   const script = document.querySelector('script[type="application/ld+json"]');
   try {
     JSON.parse(script.textContent);
     console.log('Valid JSON-LD');
   } catch (e) {
     console.error('Invalid JSON-LD:', e);
   }
   ```

### Search Engines Not Indexing

**Symptoms:**
- Pages not appearing in Google
- Site:example.com shows no results
- Google Search Console shows coverage issues

**Solutions:**

1. **Check robots.txt**
   ```txt
   # Visit: https://docs.example.com/robots.txt
   
   # Should NOT have:
   User-agent: *
   Disallow: /  # This blocks all crawling
   
   # Should have:
   User-agent: *
   Allow: /
   Sitemap: https://docs.example.com/sitemap.xml
   ```

2. **Check meta robots tag**
   ```html
   <!-- ❌ Wrong: Prevents indexing -->
   <meta name="robots" content="noindex, nofollow">
   
   <!-- ✅ Correct: Allows indexing -->
   <meta name="robots" content="index, follow">
   ```

3. **Submit sitemap**
   ```
   1. Add @astrojs/sitemap integration
   2. Go to Google Search Console
   3. Sitemaps → Add sitemap
   4. Enter: https://docs.example.com/sitemap-index.xml
   5. Wait 24-48 hours for indexing
   ```

4. **Request indexing**
   ```
   Google Search Console:
   1. URL Inspection tool
   2. Enter page URL
   3. Click "Request Indexing"
   4. Wait 24-72 hours
   ```

## LLM Optimization Issues

### llms.txt Not Generated

**Symptoms:**
- /llms.txt returns 404
- File missing from build output

**Solutions:**

1. **Verify LLM optimization enabled**
   ```javascript
   starlightOptimizer({
     llmOptimization: true,  // Make sure this is true
   })
   ```

2. **Check build output**
   ```bash
   # After build
   ls dist/llms.txt
   
   # Should exist
   # If missing, check build logs for errors
   ```

3. **Manually create llms.txt**
   ```bash
   # Create in public/ directory
   touch public/llms.txt
   
   # Add basic content
   echo "# llms.txt" > public/llms.txt
   echo "## Documentation" >> public/llms.txt
   ```

### AI Not Finding Documentation

**Symptoms:**
- ChatGPT/Claude doesn't reference your docs
- AI provides generic answers instead of your docs

**Solutions:**

1. **Verify llms.txt format**
   ```markdown
   # llms.txt must be:
   # - Plain text
   # - Markdown-compatible
   # - At root: /llms.txt (not /docs/llms.txt)
   ```

2. **Check robots.txt for AI crawlers**
   ```txt
   # Allow AI crawlers
   User-agent: GPTBot
   User-agent: ChatGPT-User
   User-agent: Claude-Web
   User-agent: Anthropic-AI
   Allow: /
   ```

3. **Improve llms.txt content**
   ```markdown
   # Make it discoverable:
   # - Clear section headings
   # - Descriptive page titles
   # - Include keywords
   # - Add context for AI
   ```

## Build Issues

### Build Failing

**Symptoms:**
- `npm run build` fails
- TypeScript errors
- Integration errors

**Solutions:**

1. **Check Astro version**
   ```bash
   # Requires Astro 3.5+
   npm list astro
   
   # Update if needed
   npm update astro @astrojs/starlight
   ```

2. **Check Node version**
   ```bash
   # Requires Node.js 18+
   node --version
   
   # Update if needed (use nvm)
   nvm install 18
   nvm use 18
   ```

3. **Clear cache and rebuild**
   ```bash
   # Clear Astro cache
   rm -rf .astro node_modules/.astro
   
   # Reinstall dependencies
   rm -rf node_modules package-lock.json
   npm install
   
   # Rebuild
   npm run build
   ```

4. **Check configuration syntax**
   ```javascript
   // Common errors:
   
   // ❌ Wrong: Missing comma
   starlightOptimizer({
     googleAnalyticsId: 'G-XXX'
     gdprCompliance: true  // Missing comma before this
   })
   
   // ✅ Correct
   starlightOptimizer({
     googleAnalyticsId: 'G-XXX',
     gdprCompliance: true,
   })
   ```

### TypeScript Errors

**Symptoms:**
- Type errors in astro.config.mjs
- Missing type definitions

**Solutions:**

1. **Install type definitions**
   ```bash
   npm install --save-dev @types/node
   ```

2. **Use proper TypeScript config**
   ```javascript
   // Use .ts instead of .js for config
   // astro.config.ts (not .mjs)
   
   import type { AstroUserConfig } from 'astro/config';
   
   const config: AstroUserConfig = {
     // Full type checking
   };
   
   export default config;
   ```

## Performance Issues

### Slow Page Loads

**Symptoms:**
- Lighthouse score decreased
- Longer load times
- Blocking scripts

**Solutions:**

1. **Check script loading**
   ```html
   <!-- Ensure async loading -->
   <script async src="https://www.googletagmanager.com/gtag/js"></script>
   
   <!-- Not: -->
   <script src="..."></script>  <!-- Blocks rendering -->
   ```

2. **Reduce consent banner size**
   ```css
   /* Minimize CSS in consent banner */
   .cookie-consent-banner {
     /* Only essential styles */
     /* Remove unnecessary animations */
     /* Reduce shadow/effects */
   }
   ```

3. **Test performance impact**
   ```bash
   # Before optimizer
   lighthouse https://your-site.com --only-categories=performance
   
   # After optimizer
   lighthouse https://your-site.com --only-categories=performance
   
   # Compare scores
   ```

## Getting Help

If you can't resolve your issue:

1. **Check GitHub Issues**
   - Search existing issues: [github.com/yourorg/optimizer/issues](https://github.com/)
   - Common problems often already solved

2. **Create New Issue**
   - Use issue template
   - Include reproduction steps
   - Provide config and error messages
   - Specify versions (Astro, Starlight, Node)

3. **Community Support**
   - GitHub Discussions
   - Discord server (if available)
   - Stack Overflow (tag: astro)

4. **Debug Template**
   ```markdown
   **Issue**: [Brief description]
   
   **Expected**: [What should happen]
   
   **Actual**: [What actually happens]
   
   **Environment**:
   - Astro version: X.X.X
   - Starlight version: X.X.X
   - Optimizer version: X.X.X
   - Node version: X.X.X
   - OS: [Windows/Mac/Linux]
   
   **Config**:
   \`\`\`javascript
   // Your astro.config.mjs
   \`\`\`
   
   **Steps to reproduce**:
   1. Step one
   2. Step two
   3. ...
   
   **Console errors** (if any):
   \`\`\`
   [Error messages]
   \`\`\`
   ```

---

**Related Pages:**
- [Configuration Guide](/guides/configuration)
- [Customization Guide](/guides/customization)
- [Technical Implementation](/implementation/technical)
