#!/bin/bash

# Release helper script for astro-starlight-docs-template
# Usage: ./release.sh [patch|minor|major]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if version type is provided
if [ -z "$1" ]; then
  echo -e "${RED}Error: Version type not specified${NC}"
  echo "Usage: ./release.sh [patch|minor|major]"
  echo ""
  echo "Examples:"
  echo "  ./release.sh patch   # 1.0.1 → 1.0.2"
  echo "  ./release.sh minor   # 1.0.1 → 1.1.0"
  echo "  ./release.sh major   # 1.0.1 → 2.0.0"
  exit 1
fi

VERSION_TYPE=$1

# Validate version type
if [[ ! "$VERSION_TYPE" =~ ^(patch|minor|major)$ ]]; then
  echo -e "${RED}Error: Invalid version type '$VERSION_TYPE'${NC}"
  echo "Valid types: patch, minor, major"
  exit 1
fi

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
  echo -e "${RED}Error: package.json not found${NC}"
  echo "Please run this script from the project root directory"
  exit 1
fi

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
  echo -e "${YELLOW}Warning: You have uncommitted changes${NC}"
  git status --short
  echo ""
  read -p "Continue anyway? (y/N) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 1
  fi
fi

# Get current version
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo -e "${BLUE}Current version: ${CURRENT_VERSION}${NC}"

# Bump version
echo -e "${YELLOW}Bumping $VERSION_TYPE version...${NC}"
NEW_VERSION=$(npm version $VERSION_TYPE --no-git-tag-version)

echo -e "${GREEN}New version: ${NEW_VERSION}${NC}"

# Run tests
echo -e "${YELLOW}Running tests...${NC}"
if npm test; then
  echo -e "${GREEN}✓ Tests passed${NC}"
else
  echo -e "${RED}✗ Tests failed${NC}"
  echo "Reverting version change..."
  git checkout package.json
  exit 1
fi

# Build package
echo -e "${YELLOW}Building package...${NC}"
if npm run build; then
  echo -e "${GREEN}✓ Build successful${NC}"
else
  echo -e "${RED}✗ Build failed${NC}"
  echo "Reverting version change..."
  git checkout package.json
  exit 1
fi

# Commit version change
echo -e "${YELLOW}Committing version change...${NC}"
git add package.json
git commit -m "Bump version to ${NEW_VERSION}

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# Push to GitHub
echo -e "${YELLOW}Pushing to GitHub...${NC}"
git push

echo ""
echo -e "${GREEN}✓ Version ${NEW_VERSION} prepared and pushed!${NC}"
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}Next step: Trigger GitHub Actions to publish${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "1. Open: ${BLUE}https://github.com/javajack/astro-starlight-docs-template/actions/workflows/publish.yml${NC}"
echo "2. Click: 'Run workflow'"
echo "3. Select branch: 'main'"
echo "4. Click: 'Run workflow' button"
echo ""
echo "Or use GitHub CLI:"
echo -e "  ${GREEN}gh workflow run publish.yml${NC}"
echo ""
echo "After publishing, verify at:"
echo -e "  ${BLUE}https://www.npmjs.com/package/astro-starlight-docs-template${NC}"
echo ""
echo -e "${GREEN}Happy publishing! 🚀${NC}"
