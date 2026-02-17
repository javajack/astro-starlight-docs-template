# Automated Publishing from GitHub Actions

This guide explains how to publish your npm package automatically from GitHub using provenance attestations and automation tokens.

## What is Provenance Publishing?

**Provenance** is npm's way of cryptographically proving that a package came from your GitHub repository. It creates a verifiable chain of trust between your source code and the published package.

Benefits:
- ✅ Users can verify the package source
- ✅ Transparent build process
- ✅ Automated publishing from GitHub
- ✅ No manual OTP/recovery codes needed

## Setup Instructions

### Step 1: Create a Granular Access Token on npm

Since you already have 2FA with security keys enabled, you need to create a **Granular Access Token** with bypass 2FA for automation.

1. **Go to npm tokens page:**
   - Visit: https://www.npmjs.com/settings/javajack/tokens
   - Click "Generate New Token" → "Granular Access Token"

2. **Configure the token:**
   - **Token name:** `GitHub Actions - astro-starlight-docs-template`
   - **Expiration:** Choose an appropriate duration (e.g., 1 year)
   - **Packages and scopes:**
     - Select: "Only select packages and scopes"
     - Choose package: `astro-starlight-docs-template`
     - Permissions: `Read and write`
   - **Organizations:** (leave default)
   - **IP ranges:** (optional - can restrict to GitHub Actions IPs)
   - **Enable 2FA bypass:** ✅ Check "Bypass 2FA requirement for automation"

3. **Generate and copy the token:**
   - Click "Generate Token"
   - Copy the token (starts with `npm_...`)
   - ⚠️ Save it securely - you won't see it again!

### Step 2: Add Token to GitHub Secrets

1. **Go to your GitHub repository:**
   - Visit: https://github.com/javajack/astro-starlight-docs-template
   - Go to: Settings → Secrets and variables → Actions

2. **Create new secret:**
   - Click "New repository secret"
   - Name: `NPM_TOKEN`
   - Value: Paste the granular access token from Step 1
   - Click "Add secret"

### Step 3: Workflow is Already Set Up

The workflow file `.github/workflows/publish.yml` is already in your repository. It will:
- ✅ Build your package
- ✅ Run tests
- ✅ Publish with provenance attestations
- ✅ Bypass 2FA using the granular token

### Step 4: Trigger Publishing

You have two ways to publish:

#### Option A: Manual Trigger (Recommended for testing)

1. Go to: https://github.com/javajack/astro-starlight-docs-template/actions
2. Select "Publish to npm" workflow
3. Click "Run workflow"
4. Choose branch (usually `main`)
5. Click "Run workflow"

#### Option B: Automatic on Release

1. Create a new release on GitHub:
   ```bash
   # Update version in package.json first
   git add package.json
   git commit -m "Bump version to 1.0.1"
   git push

   # Create and push a tag
   git tag v1.0.1
   git push origin v1.0.1
   ```

2. Go to: https://github.com/javajack/astro-starlight-docs-template/releases
3. Click "Draft a new release"
4. Choose the tag `v1.0.1`
5. Fill in release notes
6. Click "Publish release"

The workflow will automatically run and publish to npm!

## Verifying Provenance

After publishing with provenance, users can verify your package:

```bash
# View provenance information
npm view astro-starlight-docs-template --json | jq .dist.attestations

# Or on the npm website
# Visit: https://www.npmjs.com/package/astro-starlight-docs-template
# Look for the "Provenance" badge
```

## Security Best Practices

1. **Token Security:**
   - Never commit tokens to git
   - Use GitHub Secrets for all tokens
   - Set appropriate token expiration dates
   - Rotate tokens periodically

2. **Granular Permissions:**
   - Only grant read/write to specific packages
   - Don't use classic automation tokens (deprecated)
   - Enable 2FA bypass only for automation tokens

3. **Workflow Security:**
   - Always use `npm ci` (not `npm install`) in CI
   - Run tests before publishing
   - Use provenance attestations
   - Review workflow runs for anomalies

## Future: Fully Tokenless Publishing

npm is working on fully tokenless "Trusted Publishing" similar to PyPI, where GitHub can publish directly using OIDC without any secrets. When this becomes available, you won't need to store `NPM_TOKEN` at all - GitHub Actions will authenticate directly via OIDC.

Monitor npm's announcements for updates on this feature.

## Troubleshooting

### "EOTP: This operation requires a one-time password"

- Your token doesn't have "Bypass 2FA" enabled
- Recreate the token with bypass 2FA option checked

### "E403: You do not have permission to publish"

- Token doesn't have write permission for this package
- Check package selection in token settings

### "Provenance failed to generate"

- Missing `id-token: write` permission in workflow
- Check `permissions:` section in workflow file

### "Token expired"

- Create a new granular access token
- Update `NPM_TOKEN` secret in GitHub

## Resources

- [npm Provenance Documentation](https://docs.npmjs.com/generating-provenance-statements)
- [GitHub Actions OIDC](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect)
- [npm Granular Access Tokens](https://docs.npmjs.com/creating-and-viewing-access-tokens#creating-granular-access-tokens-on-the-website)
