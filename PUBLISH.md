# Publishing Guide

## Prerequisites

1. npm account (create at https://www.npmjs.com/signup)
2. GitHub account
3. Git configured locally

## Step 1: Create GitHub Repository

```bash
# On GitHub, create a new repository: javajack/astro-starlight-docs-template

# Add remote
git remote add origin https://github.com/javajack/astro-starlight-docs-template.git

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
npx astro-starlight-docs-template init

# If all works, unlink
npm unlink -g astro-starlight-docs-template
```

## Step 3: Publish to npm

```bash
# Dry run to see what will be published
npm publish --dry-run

# Publish to npm
npm publish

# For scoped package (if you want @yourusername/astro-starlight-docs-template)
# npm publish --access public
```

## Step 4: Verify Publication

```bash
# Check on npm
# Visit: https://www.npmjs.com/package/astro-starlight-docs-template

# Test installation
npx astro-starlight-docs-template@latest --version
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
- `npm unpublish astro-starlight-docs-template@version` - Remove a version (within 72h)

## Testing Before Publishing

```bash
# Create test package tarball
npm pack

# This creates astro-starlight-docs-template-1.0.0.tgz
# Install in test project:
cd /path/to/test-project
npm install /path/to/astro-starlight-docs-template-1.0.0.tgz
npx astro-starlight-docs-template init
```

## Troubleshooting

### "You need to be logged in to publish"
```bash
npm login
```

### "Package name already exists"
- Choose a different name in package.json
- Or use scoped package: @yourusername/astro-starlight-docs-template

### "Version already published"
```bash
# Increment version
npm version patch
npm publish
```

## Post-Publishing Checklist

- [ ] Package appears on npmjs.com
- [ ] `npx astro-starlight-docs-template --version` works
- [ ] `npx astro-starlight-docs-template init` works in test project
- [ ] README displays correctly on npm
- [ ] GitHub repository linked on npm page
- [ ] Add topics/tags to GitHub repo
- [ ] Tweet about it! 🎉
