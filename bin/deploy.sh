#!/bin/bash
set -e

echo "Starting deployment process..."

# Step 1: Version bump (no commit, no tag)
echo "Bumping version..."
timeout 30s pnpm exec lerna version minor --no-git-tag-version --no-push --yes --force-publish || true

# Step 2: Get the new version
VERSION=$(cat lerna.json | grep version | cut -d '"' -f 4)
echo "New version: $VERSION"

# Step 3: Update Homebrew formula if minor/major release
echo "Checking if Homebrew formula needs updating..."
if [[ "$VERSION" =~ \.[0-9]+\.0$ ]]; then
  echo "Minor/major release detected - updating Homebrew formula..."
  gemini --yolo -p "Update all occurrences of version numbers in ./HomebrewFormula/taqueria.rb to version ${VERSION}. This includes the version field, the URL with v${VERSION} tag, and the TAQ_VERSION and TAQ_BUILD environment variables."
else
  echo "Patch release detected - skipping Homebrew formula update"
fi

# Step 4: Stage all changes
echo "Staging changes..."
git add .

# Step 5: Commit with HUSKY=0 to skip pre-commit hook
echo "Committing version $VERSION..."
HUSKY=0 git commit -m "v${VERSION}"

# Step 6: Create tag
echo "Creating tag v${VERSION}..."
git tag "v${VERSION}"

# Step 7: Push commits and tags
echo "Pushing to remote..."
git push && git push --tags

echo "Deployment complete! Version $VERSION has been released."