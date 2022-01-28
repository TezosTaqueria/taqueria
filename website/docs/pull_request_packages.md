---
title: Pull request packages
---

# Pull Request npm packages

After submitting a pull request to the `main` branch of the Taqueria repository, the CICD will start building and publishing `npm` packages to npmjs.com. The install instructions are then commented on the PR and will look similar to the following:

| npm package installation instructions |
| ------------------------------------- |
| `npm install @taqueria/plugin-ligo@0.0.0-pr-155-d8b3d05` |
| `npm install @taqueria/plugin-smartpy@0.0.0-pr-155-d8b3d05` |
| `npm install @taqueria/plugin-taquito@0.0.0-pr-155-d8b3d05` |
| `npm install @taqueria/node-sdk@0.0.0-pr-155-d8b3d05` |

The structure of the package name and version is as follows 

`{package_scope}/{package_name}@0.0.0-pr-{github_pr_number}-{github_commit_short_sha}`. 

The 0.0.0 version number is used because npm packages require a `semver` versioning scheme. 

Each plugin is published to npmjs.com with a tag that represents the current pull request number e.g. tag `pr-155` will be applied to all packages published in [PR #155](https://github.com/ecadlabs/taqueria/pull/155). This way, one can install the latest version of the packages for the pull request you are working on using a command like 
`npm install @taqueria/node-sdk@pr-155`