# Release Guide

Quick reference for publishing new versions of `astro-starlight-docs-template`.

## Quick Release

### Using the Helper Script (Recommended)

```bash
# Patch release (bug fixes: 1.0.1 → 1.0.2)
./release.sh patch

# Minor release (new features: 1.0.1 → 1.1.0)
./release.sh minor

# Major release (breaking changes: 1.0.1 → 2.0.0)
./release.sh major
```

The script automatically:
- ✅ Bumps version in package.json
- ✅ Runs tests
- ✅ Builds the package
- ✅ Commits the change
- ✅ Pushes to GitHub
- ✅ Shows link to trigger publish workflow

### Manual Release

If you prefer manual control:

```bash
# 1. Bump version
npm version patch  # or minor/major

# 2. Test and build
npm test
npm run build

# 3. Commit and push
git push

# 4. Trigger GitHub Actions
# Visit: https://github.com/javajack/astro-starlight-docs-template/actions/workflows/publish.yml
# Click "Run workflow" → Select main → Click "Run workflow"
```

## Version Types

| Type    | Use When                          | Example       |
|---------|-----------------------------------|---------------|
| `patch` | Bug fixes, documentation updates  | 1.0.0 → 1.0.1 |
| `minor` | New features, backwards compatible| 1.0.0 → 1.1.0 |
| `major` | Breaking changes                  | 1.0.0 → 2.0.0 |

## Semantic Versioning

Follow [Semantic Versioning 2.0.0](https://semver.org/):

- **MAJOR** version when you make incompatible API changes
- **MINOR** version when you add functionality in a backward compatible manner
- **PATCH** version when you make backward compatible bug fixes

## Checklist Before Release

- [ ] All tests pass (`npm test`)
- [ ] Build succeeds (`npm run build`)
- [ ] README.md is up to date
- [ ] CHANGELOG (if maintained) is updated
- [ ] No uncommitted changes
- [ ] You're on the `main` branch

## GitHub Actions Workflow

The workflow (`.github/workflows/publish.yml`) automatically:

1. Checks out code
2. Sets up Node.js
3. Installs dependencies
4. Runs tests
5. Builds package
6. Publishes to npm with **provenance attestations**

## Provenance Attestations

Every publish includes cryptographic attestations proving:
- Which GitHub repository it came from
- Which commit SHA was used
- Which workflow published it
- When it was published

Users can verify this on npm or via CLI:
```bash
npm view astro-starlight-docs-template dist.attestations
```

## Verifying Publication

After GitHub Actions completes:

```bash
# View latest version on npm
npm view astro-starlight-docs-template

# Check all versions
npm view astro-starlight-docs-template versions

# Test the published package
npx astro-starlight-docs-template@latest --version
```

## Troubleshooting

### "You cannot publish over previously published versions"

You're trying to publish the same version twice. Bump the version first.

### "ENEEDAUTH: need auth"

The `NPM_TOKEN` secret in GitHub is missing or invalid. Check:
- GitHub repo settings → Environments → npm → Secrets
- Token has write access to the package
- Token has "Bypass 2FA" enabled

### "Tests failed"

Fix the failing tests before publishing. The workflow will abort.

### Workflow not appearing

Make sure `.github/workflows/publish.yml` is pushed to the `main` branch.

## Emergency Rollback

If you need to unpublish a broken version (within 72 hours):

```bash
npm unpublish astro-starlight-docs-template@1.0.x
```

**Warning:** This is discouraged. Prefer publishing a fix as a new version.

## Publishing Beta/Alpha Versions

```bash
# Bump to prerelease version
npm version prerelease --preid=beta
# Example: 1.0.1 → 1.0.2-beta.0

# Push
git push

# Publish with beta tag (manual, not via workflow)
npm publish --tag beta

# Users install with:
# npx astro-starlight-docs-template@beta
```

## Resources

- [npm Semantic Versioning](https://docs.npmjs.com/about-semantic-versioning)
- [GitHub Actions Publishing Guide](./GITHUB_PUBLISHING.md)
- [npm Provenance Documentation](https://docs.npmjs.com/generating-provenance-statements)
- [Workflow File](./.github/workflows/publish.yml)

## Getting Help

- Check workflow logs: https://github.com/javajack/astro-starlight-docs-template/actions
- View package on npm: https://www.npmjs.com/package/astro-starlight-docs-template
- Open an issue: https://github.com/javajack/astro-starlight-docs-template/issues
