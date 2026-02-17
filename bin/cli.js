#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJson = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf-8'));

console.log(`\n🚀 Astro Docs Optimizer v${packageJson.version}\n`);

const command = process.argv[2];

if (!command || command === 'help' || command === '--help' || command === '-h') {
  console.log(`Usage:
  npx astro-docs-optimized-template init     Initialize optimization in current directory
  npx astro-docs-optimized-template --help   Show this help message
  npx astro-docs-optimized-template --version Show version

Features added:
  ✓ Google Analytics with Consent Mode v2
  ✓ GDPR-compliant cookie consent banner
  ✓ SEO optimization (Open Graph, Twitter Cards, Schema.org)
  ✓ LLM optimization (llms.txt for AI crawlers)
  ✓ Regional scoping (GDPR vs non-GDPR)
  ✓ Custom footer with privacy notice

Example:
  cd my-astro-docs
  npx astro-docs-optimized-template init
`);
  process.exit(0);
}

if (command === '--version' || command === '-v') {
  console.log(packageJson.version);
  process.exit(0);
}

if (command === 'init') {
  // Dynamic import to avoid loading all dependencies for help/version
  import('../src/init.js')
    .then(({ init }) => init())
    .catch((err) => {
      console.error('Error:', err.message);
      process.exit(1);
    });
} else {
  console.error(`Unknown command: ${command}`);
  console.log('Run "npx astro-docs-optimized-template --help" for usage information');
  process.exit(1);
}
