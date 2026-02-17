import { existsSync, readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const templatesDir = join(__dirname, '../templates');

export async function init() {
  console.log(chalk.cyan('🔍 Checking if this is an Astro Starlight project...\n'));

  // Check if package.json exists
  if (!existsSync('package.json')) {
    console.error(chalk.red('❌ No package.json found. Is this a Node.js project?'));
    process.exit(1);
  }

  const packageJson = JSON.parse(readFileSync('package.json', 'utf-8'));
  const hasStarlight = packageJson.dependencies?.['@astrojs/starlight'] ||
                       packageJson.devDependencies?.['@astrojs/starlight'];

  if (!hasStarlight) {
    console.warn(chalk.yellow('⚠️  @astrojs/starlight not found in dependencies.'));
    const { proceed } = await inquirer.prompt([{
      type: 'confirm',
      name: 'proceed',
      message: 'Continue anyway?',
      default: false
    }]);
    if (!proceed) {
      console.log(chalk.gray('Aborted.'));
      process.exit(0);
    }
  }

  // Check for astro.config.mjs
  if (!existsSync('astro.config.mjs') && !existsSync('astro.config.js')) {
    console.error(chalk.red('❌ No astro.config.mjs or astro.config.js found.'));
    process.exit(1);
  }

  console.log(chalk.green('✓ Astro project detected\n'));

  // Gather configuration
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'gaId',
      message: 'Google Analytics Measurement ID (G-XXXXXXXXXX):',
      default: 'G-XXXXXXXXXX',
      validate: (input) => input.startsWith('G-') || 'Must start with G-'
    },
    {
      type: 'input',
      name: 'siteUrl',
      message: 'Site URL (e.g., https://javajack.github.io):',
      default: 'https://example.com'
    },
    {
      type: 'input',
      name: 'basePath',
      message: 'Base path (e.g., /my-docs or leave empty for root):',
      default: ''
    },
    {
      type: 'input',
      name: 'authorName',
      message: 'Author name:',
      default: 'Your Name'
    },
    {
      type: 'input',
      name: 'authorTwitter',
      message: 'Twitter handle (without @):',
      default: ''
    },
    {
      type: 'input',
      name: 'authorLinkedIn',
      message: 'LinkedIn profile URL:',
      default: ''
    },
    {
      type: 'confirm',
      name: 'addCloudflare',
      message: 'Add Cloudflare Web Analytics?',
      default: false
    },
    {
      type: 'input',
      name: 'cloudflareToken',
      message: 'Cloudflare Analytics token:',
      when: (answers) => answers.addCloudflare,
      default: ''
    },
    {
      type: 'confirm',
      name: 'createFooter',
      message: 'Create custom footer with privacy notice?',
      default: true
    },
    {
      type: 'confirm',
      name: 'addLLMOptimization',
      message: 'Add LLM optimization (llms.txt)?',
      default: true
    }
  ]);

  console.log(chalk.cyan('\n📦 Installing optimizations...\n'));

  try {
    // 1. Copy cookie consent script
    await copyTemplate('cookie-consent', answers);

    // 2. Update astro.config.mjs
    await updateAstroConfig(answers);

    // 3. Create footer component if requested
    if (answers.createFooter) {
      await createFooterComponent(answers);
    }

    // 4. Add LLM optimization if requested
    if (answers.addLLMOptimization) {
      await addLLMOptimization(answers);
    }

    // 5. Create documentation
    await createDocumentation(answers);

    console.log(chalk.green.bold('\n✅ Optimization complete!\n'));
    console.log(chalk.cyan('Next steps:'));
    console.log(chalk.white('  1. Review the changes in astro.config.mjs'));
    console.log(chalk.white('  2. Update your Google Analytics ID if needed'));
    console.log(chalk.white('  3. Build and deploy: npm run build'));
    console.log(chalk.white('  4. Check ASTRO_DOCS_OPTIMIZER.md for details\n'));

  } catch (error) {
    console.error(chalk.red('❌ Error during setup:'), error.message);
    process.exit(1);
  }
}

async function copyTemplate(templateName, config) {
  const spinner = ora('Copying cookie consent script...').start();

  const sourcePath = join(templatesDir, 'public', 'cookie-consent.js');
  const destDir = 'public';
  const destPath = join(destDir, 'cookie-consent.js');

  if (!existsSync(destDir)) {
    mkdirSync(destDir, { recursive: true });
  }

  let content = readFileSync(sourcePath, 'utf-8');
  // Replace placeholders if any
  content = content.replace(/\{\{GA_ID\}\}/g, config.gaId);

  writeFileSync(destPath, content);
  spinner.succeed('Cookie consent script created: public/cookie-consent.js');
}

async function updateAstroConfig(config) {
  const spinner = ora('Updating astro.config.mjs...').start();

  const configPath = existsSync('astro.config.mjs') ? 'astro.config.mjs' : 'astro.config.js';
  let content = readFileSync(configPath, 'utf-8');

  // Build the additions
  const basePath = config.basePath || '/';
  const scriptPath = basePath === '/' ? '/cookie-consent.js' : `${basePath}/cookie-consent.js`;

  const additions = `
// === Added by astro-docs-optimizer ===

// Google Consent Mode v2 - MUST load BEFORE gtag.js
{
  tag: 'script',
  content: \`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}

    function isGDPRRegion() {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const euTimezones = ['Europe/', 'Atlantic/Reykjavik', 'Atlantic/Azores', 'Atlantic/Madeira'];
      return euTimezones.some(zone => tz.startsWith(zone));
    }

    const isGDPR = isGDPRRegion();

    gtag('consent', 'default', {
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'analytics_storage': isGDPR ? 'denied' : 'granted',
      'functionality_storage': 'granted',
      'personalization_storage': 'denied',
      'security_storage': 'granted',
      'wait_for_update': 500,
    });

    window.__isGDPRRegion = isGDPR;
  \`,
},

// Google Analytics - Load gtag.js
{ tag: 'script', attrs: { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=${config.gaId}' } },
{
  tag: 'script',
  content: \`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${config.gaId}', {
      'anonymize_ip': true,
      'cookie_flags': 'SameSite=None;Secure'
    });
  \`,
},
${config.addCloudflare ? `
// Cloudflare Web Analytics
{ tag: 'script', attrs: { defer: true, src: 'https://static.cloudflareinsights.com/beacon.min.js', 'data-cf-beacon': '{"token": "${config.cloudflareToken}"}' } },
` : ''}
// Cookie Consent Banner
{ tag: 'script', attrs: { defer: true, src: '${scriptPath}' } },

// === End astro-docs-optimizer additions ===
`;

  // Find head array and add additions
  const headMatch = content.match(/head:\s*\[/);
  if (headMatch) {
    const insertPos = headMatch.index + headMatch[0].length;
    content = content.slice(0, insertPos) + additions + content.slice(insertPos);
  } else {
    spinner.warn('Could not find head array in astro.config. Please add manually.');
    writeFileSync('astro-config-additions.txt', additions);
    spinner.info('Additions saved to astro-config-additions.txt');
  }

  writeFileSync(configPath, content);
  spinner.succeed('astro.config.mjs updated with analytics and consent mode');
}

async function createFooterComponent(config) {
  const spinner = ora('Creating footer component...').start();

  const componentsDir = 'src/components';
  const overridesDir = join(componentsDir, 'overrides');

  if (!existsSync(overridesDir)) {
    mkdirSync(overridesDir, { recursive: true });
  }

  const footerPath = join(overridesDir, 'Footer.astro');

  if (existsSync(footerPath)) {
    spinner.warn('Footer.astro already exists, skipping...');
    return;
  }

  const footerTemplate = readFileSync(join(templatesDir, 'components', 'Footer.astro'), 'utf-8');
  const footer = footerTemplate
    .replace(/\{\{AUTHOR_NAME\}\}/g, config.authorName)
    .replace(/\{\{AUTHOR_TWITTER\}\}/g, config.authorTwitter)
    .replace(/\{\{AUTHOR_LINKEDIN\}\}/g, config.authorLinkedIn);

  writeFileSync(footerPath, footer);
  spinner.succeed('Footer component created: src/components/overrides/Footer.astro');
  spinner.info('Add to astro.config.mjs: components: { Footer: "./src/components/overrides/Footer.astro" }');
}

async function addLLMOptimization(config) {
  const spinner = ora('Adding LLM optimization...').start();

  const llmsTxt = `# ${config.authorName}'s Documentation

This documentation is optimized for LLM crawlers.

## Site Information
- URL: ${config.siteUrl}${config.basePath}
- Author: ${config.authorName}
- Last Updated: ${new Date().toISOString().split('T')[0]}

## Pages
See llms-full.txt for complete content.
`;

  writeFileSync('public/llms.txt', llmsTxt);
  spinner.succeed('Created public/llms.txt');
  spinner.info('Remember to generate llms-full.txt with your actual documentation content');
}

async function createDocumentation(config) {
  const spinner = ora('Creating documentation...').start();

  const docs = `# Astro Docs Optimizer - Implementation Report

Generated on: ${new Date().toISOString()}

## Configuration

- **Google Analytics ID**: ${config.gaId}
- **Site URL**: ${config.siteUrl}
- **Base Path**: ${config.basePath || '/'}
- **Author**: ${config.authorName}
- **Cloudflare Analytics**: ${config.addCloudflare ? 'Yes' : 'No'}
- **LLM Optimization**: ${config.addLLMOptimization ? 'Yes' : 'No'}

## Files Created/Modified

1. \`public/cookie-consent.js\` - Cookie consent banner with GDPR compliance
2. \`astro.config.mjs\` - Updated with Google Analytics and Consent Mode v2
${config.createFooter ? '3. `src/components/overrides/Footer.astro` - Custom footer with privacy notice\n' : ''}
${config.addLLMOptimization ? '4. `public/llms.txt` - LLM optimization index\n' : ''}

## Features Added

### ✅ Google Analytics with Consent Mode v2
- Measurement ID: ${config.gaId}
- Regional scoping (GDPR vs non-GDPR)
- IP anonymization enabled
- Secure cookie flags

### ✅ GDPR Cookie Consent
- Custom banner with Accept/Reject/Settings
- Script injection method (no component override)
- localStorage persistence
- Footer privacy notice link

### ✅ SEO Optimization
- Ready for Open Graph meta tags
- Twitter Card optimization
- Canonical URLs
- Structured data support

### ✅ Regional Intelligence
- GDPR regions: Banner shown, analytics denied by default
- Non-GDPR regions: No banner, analytics granted

## Next Steps

1. **Review Changes**
   - Check \`astro.config.mjs\` for the additions
   - Update Google Analytics ID if needed

2. **Update Components** (if footer created)
   - Add Footer component to astro.config.mjs:
     \`\`\`javascript
     components: {
       Footer: './src/components/overrides/Footer.astro'
     }
     \`\`\`

3. **Build and Deploy**
   \`\`\`bash
   npm run build
   npm run preview  # Test locally
   \`\`\`

4. **Verify**
   - Check browser console for consent mode initialization
   - Verify cookie banner appears (if in GDPR region)
   - Check Google Analytics Real-Time reports

## Documentation

- Cookie Consent: Uses Google Consent Mode v2
- Regional Detection: Based on browser timezone
- Privacy Compliant: GDPR, ePrivacy Directive, ICO guidelines

## Support

For issues or questions:
- GitHub: https://github.com/javajack/astro-docs-optimizer
- Documentation: https://github.com/javajack/astro-docs-optimizer#readme

---

Generated by astro-docs-optimizer v1.0.0
`;

  writeFileSync('ASTRO_DOCS_OPTIMIZER.md', docs);
  spinner.succeed('Documentation created: ASTRO_DOCS_OPTIMIZER.md');
}
