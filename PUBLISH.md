# Publishing Guide

## Prerequisites

1. npm account (create at https://www.npmjs.com/signup)
2. GitHub account
3. Git configured locally

## Step 1: Create GitHub Repository

```bash
# On GitHub, create a new repository: javajack/astro-docs-optimizer

# Add remote
git remote add origin https://github.com/javajack/astro-docs-optimizer.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 2: Prepare for npm Publishing

```bash
# Login to npm
npm login

# Build the package
npm run build

# Test locally first
npm link
cd /path/to/test-project
npx astro-docs-optimizer init

# If all works, unlink
npm unlink -g astro-docs-optimizer
```

## Step 3: Publish to npm

```bash
# Dry run to see what will be published
npm publish --dry-run

# Publish to npm
npm publish

# For scoped package (if you want @yourusername/astro-docs-optimizer)
# npm publish --access public
```

## Step 4: Verify Publication

```bash
# Check on npm
# Visit: https://www.npmjs.com/package/astro-docs-optimizer

# Test installation
npx astro-docs-optimizer@latest --version
```

## Updating After Publishing

```bash
# Make changes
# Update version in package.json (use semver)
npm version patch   # 1.0.0 -> 1.0.1
# or
npm version minor   # 1.0.0 -> 1.1.0
# or
npm version major   # 1.0.0 -> 2.0.0

# Rebuild
npm run build

# Commit version bump
git push --follow-tags

# Publish update
npm publish
```

## Version Guidelines

- **patch** (1.0.x): Bug fixes, minor changes
- **minor** (1.x.0): New features, backwards compatible
- **major** (x.0.0): Breaking changes

## npm Scripts

- `npm run build` - Build the package
- `npm publish` - Publish to npm registry
- `npm unpublish astro-docs-optimizer@version` - Remove a version (within 72h)

## Testing Before Publishing

```bash
# Create test package tarball
npm pack

# This creates astro-docs-optimizer-1.0.0.tgz
# Install in test project:
cd /path/to/test-project
npm install /path/to/astro-docs-optimizer-1.0.0.tgz
npx astro-docs-optimizer init
```

## Troubleshooting

### "You need to be logged in to publish"
```bash
npm login
```

### "Package name already exists"
- Choose a different name in package.json
- Or use scoped package: @yourusername/astro-docs-optimizer

### "Version already published"
```bash
# Increment version
npm version patch
npm publish
```

## Post-Publishing Checklist

- [ ] Package appears on npmjs.com
- [ ] `npx astro-docs-optimizer --version` works
- [ ] `npx astro-docs-optimizer init` works in test project
- [ ] README displays correctly on npm
- [ ] GitHub repository linked on npm page
- [ ] Add topics/tags to GitHub repo
- [ ] Tweet about it! 🎉
