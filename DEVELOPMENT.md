# Development Guide

## Project Structure

```
astro-docs-optimizer/
├── bin/
│   └── cli.js              # CLI entry point
├── src/
│   └── init.js             # Main initialization logic
├── templates/
│   ├── components/
│   │   └── Footer.astro    # Footer component template
│   └── public/
│       └── cookie-consent.js  # Cookie consent script
├── dist/                   # Built files (generated)
├── package.json
├── README.md
├── LICENSE
└── PUBLISH.md
```

## Local Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Build

```bash
npm run build
```

### 3. Test Locally

```bash
# Link the package globally
npm link

# Navigate to a test Astro project
cd /path/to/test-astro-project

# Run the CLI
astro-docs-optimizer init

# When done testing
npm unlink -g astro-docs-optimizer
```

### 4. Test with npx (More Realistic)

```bash
# In the optimizer directory
npm pack

# This creates: astro-docs-optimizer-1.0.0.tgz

# In test project
npx /absolute/path/to/astro-docs-optimizer-1.0.0.tgz init
```

## Making Changes

### Adding New Features

1. Update `src/init.js` with new logic
2. Add templates to `templates/` if needed
3. Update `README.md` with documentation
4. Test thoroughly
5. Bump version in `package.json`
6. Commit and tag

### Updating Templates

Templates use simple placeholder replacement:
- `{{AUTHOR_NAME}}` - Replaced with user's author name
- `{{AUTHOR_TWITTER}}` - Replaced with Twitter handle
- `{{AUTHOR_LINKEDIN}}` - Replaced with LinkedIn URL
- `{{GA_ID}}` - Replaced with Google Analytics ID

### Dependencies

We use:
- `inquirer` - Interactive prompts
- `chalk` - Colored terminal output
- `ora` - Spinners for progress indication

All are peer dependencies to keep package size small.

## Testing Checklist

Before publishing, test:

- [ ] `--help` flag works
- [ ] `--version` flag works
- [ ] `init` command prompts correctly
- [ ] Detects non-Astro projects
- [ ] Detects non-Starlight projects
- [ ] Creates all expected files
- [ ] Updates astro.config.mjs correctly
- [ ] Handles existing files gracefully
- [ ] Footer template renders correctly
- [ ] Cookie consent script works
- [ ] Generated documentation is accurate

## Release Process

1. Make changes
2. Test locally
3. Update version: `npm version [patch|minor|major]`
4. Build: `npm run build`
5. Commit: `git commit -am "Release v1.x.x"`
6. Tag: `git tag v1.x.x`
7. Push: `git push --follow-tags`
8. Publish: `npm publish`

## Debugging

### Enable verbose logging

Add to `src/init.js`:
```javascript
console.log('[DEBUG]', 'Current state:', someVariable);
```

### Test in isolation

```javascript
// Create test.js
import { init } from './src/init.js';

// Mock process.argv or environment
process.argv = ['node', 'cli.js', 'init'];

init().catch(console.error);
```

### Check generated files

After running `init`, inspect:
- `public/cookie-consent.js`
- `astro.config.mjs` (look for comments)
- `src/components/overrides/Footer.astro`
- `ASTRO_DOCS_OPTIMIZER.md`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes
4. Test thoroughly
5. Submit PR with description

## Code Style

- Use ES modules (`import`/`export`)
- Use async/await for async operations
- Keep functions small and focused
- Add comments for complex logic
- Use meaningful variable names

## Common Issues

### "Cannot find module 'inquirer'"

```bash
npm install
```

### "Permission denied" on cli.js

```bash
chmod +x bin/cli.js
```

### Templates not copying

Check that `templates/` is included in `package.json` `files` array.

## Future Enhancements

Ideas for future versions:
- [ ] TypeScript support
- [ ] More analytics providers (Plausible, Fathom, etc.)
- [ ] Custom cookie categories
- [ ] Automatic llms-full.txt generation
- [ ] Interactive preview of changes
- [ ] Rollback/undo functionality
- [ ] Configuration file support (.astro-optimizer.json)
- [ ] CI/CD integration examples
