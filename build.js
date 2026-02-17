import { cpSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

console.log('Building astro-docs-optimizer...');

// Create dist directory
if (!existsSync('dist')) {
  mkdirSync('dist', { recursive: true });
}

// Copy src to dist (we're using vanilla JS, no compilation needed)
cpSync('src', 'dist', { recursive: true });

console.log('✓ Build complete!');
console.log('  dist/ directory created');
console.log('  Source files copied');
