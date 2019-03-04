# Semantic Release Workflow

A more detailed documentation for [Semantic Release](https://semantic-release.gitbook.io/semantic-release/), and its setup for this starter.

### What is Semantic Release

Semantic Release is a package that automates the whole package release workflow including: determining the next version number, generating the release notes, and publishing the package. So then whenever a developer needs to do a release, instead of manually bumping the version and writing release notes, merging code into the release branch is all that developer needs to do.

Semantic Release also enforces [Semantic Versioning](https://semver.org/) specification, which is in a version string, for example `1.2.3`, a major release will bump the `1` in the version, a minor release will bump the `2` in the version, and a patch release will bump the `3`. And a major release often happens when an incompatible API change is made, a minor release can happen when adding features and functionalities, and a patch release can happen when adding documentations and bug fixes.

The package usually runs in a CI environment, mostly running after unit tests pass and before release. It is safer to run it after the production code has been built successfully, but there are cases where you want to run it before. For example, in Expo, the version in app.json is used to indicate whether the app needs an OTA update, therefore it needs to be bumped before expo builds it.

### How to Customize Version Bump

The way Semantic Release determines the version bump is through analyzing the commit messages. Commit messages have to be written in the format like the one below:

![commit message explained](https://cdn-images-1.medium.com/max/1600/0*rRfqA8YIvMPsUUgr.)

- **type:** the type of change, can be a feat, a fix, a perf, a chore, etc. And these type names and its corresponding release type can all be customized in the configs for `@semantic-release/commit-analyzer`.
- **scope:** the subsystem this commit modifies, can be api, styling, docs, etc. We can also use an asterisk (\*) to indicate this commit is modifying more than one subsystem.
- **subject:** description for the commit, just like how we normally title our commit.

In the release process, the plugin `@semantic-release/commit-analyzer` goes through all the commits from the previous release to the current one to determine the new version. For example, if it sees a fix type, it will know it is a patch release, and it will bump the last number of the version string up. If it sees a feat type, it will bump the second number of the version string up.

![release type explained](https://cdn-images-1.medium.com/max/1000/0*XeD-A98J8howUm2w.)

For more details on commit message format, the semantic release official repo has a good [documentation](https://github.com/semantic-release/semantic-release/blob/master/README.md#commit-message-format). And [this](https://blog.greenkeeper.io/introduction-to-semantic-release-33f73b117c8) tutorial that I referenced a lot also does a good job explaining the process.

### The Workflow for THIS Starter

The entire workflow for Semantic Release is defined in `.releaserc`, and it is fully customizable. All the configs are available [here](https://semantic-release.gitbook.io/semantic-release/usage/configuration). And therefore the rest of this section will be going over `.releaserc` for this starter project.

- plugins: [...]
  - Defining the list of plugins to use, and these plugins will run in series, so the order matters.
  - Explanations for the setups within each plugins:
    - [commit-analyzer](https://github.com/semantic-release/commit-analyzer): analyzes commit to come up with the latest version.
      - `preset`: it is currently using the [angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular) conventional changelog preset, and you may find the guideline [here](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines). If you would like to customize the rules for release, you may find out how to do `releaseRules` [here](https://github.com/semantic-release/commit-analyzer#releaserules).
      - `parserOpts`: defines additional [ conventional-commits-parser](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-commits-parser#conventionalcommitsparseroptions) options. In this case it defined noteKeywords to be `["BREAKING CHANGE", "BREAKING CHANGES", "BREAKING"]`, meaning in the commit message containing any of these works will be a breaking change.
    - [release-notes-generator](https://github.com/semantic-release/release-notes-generator): generates changelog content.
      - `preset`: it is currently using the [angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular) conventional changelog preset
      - `parserOpts`: same as the parserOpts in commit-analyzer above -`writerOpts`: defines additional [ conventional-commits-parser](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-commits-parser#conventionalcommitsparseroptions) options. In this case it defined commitsSort to be ["subject", "scope"], which means it will sort the release notes output by subject first, then by scope.
    - [npm](https://github.com/semantic-release/npm): increments package.json version number and publish to npm.
      - `npmPublish`: defines if this repo should be published to npm or not, in this case it is `false` since we don't want to publish it.
    - [git](https://github.com/semantic-release/git): push a commit to master with all the generated files during release process.
      - `assets`: defines what generated files can be committed by this plugin, in this case we only commit package.json for the incremented version.
      - `message`: defines the commit title format for commit pushed by this plugin.
