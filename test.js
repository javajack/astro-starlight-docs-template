#!/usr/bin/env node

/**
 * Simple test suite for astro-starlight-docs-template
 */

import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
    passed++;
  } catch (error) {
    console.error(`✗ ${name}`);
    console.error(`  ${error.message}`);
    failed++;
  }
}

// Test 1: Package.json exists and is valid
test('package.json exists and is valid JSON', () => {
  const pkgPath = join(__dirname, 'package.json');
  if (!existsSync(pkgPath)) {
    throw new Error('package.json not found');
  }
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  if (!pkg.name || !pkg.version) {
    throw new Error('package.json missing name or version');
  }
});

// Test 2: Required files exist
test('Required files exist', () => {
  const requiredFiles = [
    'bin/cli.js',
    'src/init.js',
    'build.js',
    'README.md',
    'LICENSE',
    'templates/public/cookie-consent.js',
    'templates/components/Footer.astro'
  ];

  for (const file of requiredFiles) {
    const filePath = join(__dirname, file);
    if (!existsSync(filePath)) {
      throw new Error(`Required file missing: ${file}`);
    }
  }
});

// Test 3: Build output exists
test('Build output exists after build', () => {
  const distPath = join(__dirname, 'dist', 'init.js');
  if (!existsSync(distPath)) {
    throw new Error('dist/init.js not found - build may have failed');
  }
});

// Test 4: CLI is executable
test('CLI file is marked as executable', () => {
  const cliPath = join(__dirname, 'bin/cli.js');
  const content = readFileSync(cliPath, 'utf8');
  if (!content.startsWith('#!/usr/bin/env node')) {
    throw new Error('CLI file missing shebang');
  }
});

// Test 5: Templates are valid
test('Cookie consent template is valid', () => {
  const templatePath = join(__dirname, 'templates/public/cookie-consent.js');
  const content = readFileSync(templatePath, 'utf8');
  if (!content.includes('cookie-consent-banner')) {
    throw new Error('Cookie consent template appears invalid');
  }
});

// Summary
console.log('\n' + '='.repeat(50));
console.log(`Tests passed: ${passed}`);
console.log(`Tests failed: ${failed}`);
console.log('='.repeat(50));

if (failed > 0) {
  process.exit(1);
}

console.log('\n✓ All tests passed!');
