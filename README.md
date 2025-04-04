# LDN Viz Tools

[ ![npm](https://img.shields.io/npm/v/%40ldn-viz%2Fcharts?label=%40ldn-viz%2Fcharts%20version) ](https://www.npmjs.com/package/@ldn-viz/charts)
[ ![npm](https://img.shields.io/npm/v/%40ldn-viz%2Fmaps?label=%40ldn-viz%2Fmaps%20version) ](https://www.npmjs.com/package/@ldn-viz/maps)
[ ![npm](https://img.shields.io/npm/v/%40ldn-viz%2Ftables?label=%40ldn-viz%2Ftables%20version) ](https://www.npmjs.com/package/@ldn-viz/tables)
[ ![npm](https://img.shields.io/npm/v/%40ldn-viz%2Fthemes?label=%40ldn-viz%2Fthemes%20version) ](https://www.npmjs.com/package/@ldn-viz/themes)
[ ![npm](https://img.shields.io/npm/v/%40ldn-viz%2Fui?label=%40ldn-viz%2Fui%20version) ](https://www.npmjs.com/package/@ldn-viz/ui)
[ ![npm](https://img.shields.io/npm/v/%40ldn-viz%2Futils?label=%40ldn-viz%2Futils%20version) ](https://www.npmjs.com/package/@ldn-viz/utils)

This is a mono-repo containing several components:

- the [`@ldn-viz/charts`](https://www.npmjs.com/package/@ldn-viz/charts) package is in [`charts/`](./packages/charts) ([CHANGELOG](https://github.com/Greater-London-Authority/ldn-viz-tools/blob/main/packages/charts/CHANGELOG.md)); it contains components for visualizing data
- the [`@ldn-viz/maps`](https://www.npmjs.com/package/@ldn-viz/maps) package is in [`maps/`](./packages/maps) ([CHANGELOG](https://github.com/Greater-London-Authority/ldn-viz-tools/blob/main/packages/maps/CHANGELOG.md)); it contains components for rendering maps
- the [`@ldn-viz/tables`](https://www.npmjs.com/package/@ldn-viz/tables) package is in [`tables/`](./packages/tables) ([CHANGELOG](https://github.com/Greater-London-Authority/ldn-viz-tools/blob/main/packages/tables/CHANGELOG.md)); it contains components for rendering tables
- the [`@ldn-viz/themes`](https://www.npmjs.com/package/@ldn-viz/themes) package is in [`theme/`](./packages/themes) ([CHANGELOG](https://github.com/Greater-London-Authority/ldn-viz-tools/blob/main/packages/themes/CHANGELOG.md)); it contains CSS and design tokens that are used by other components
- the [`@ldn-viz/ui`](https://www.npmjs.com/package/@ldn-viz/ui) package is in [`ui/`](./packages/ui) ([CHANGELOG](https://github.com/Greater-London-Authority/ldn-viz-tools/blob/main/packages/ui/CHANGELOG.md)); it contains general UI components like modals or sidebars
- the [`@ldn-viz/utils`](https://www.npmjs.com/package/@ldn-viz/utils) package is in [`utils/`](./packages/utils) ([CHANGELOG](https://github.com/Greater-London-Authority/ldn-viz-tools/blob/main/packages/utils/CHANGELOG.md)); it contains utils functions (such as for constructing color scales)

These packages are intended primarily for use in projects created by [Greater London Authority](https://london.gov.uk/)'s [City Intelligence Unit](https://www.london.gov.uk/programmes-strategies/research-and-analysis).

### Tooling

The structure of this repo was initially based on Vercel's [Turborepo & SvelteKit Starter](https://vercel.com/templates/svelte/turborepo-sveltekit-starter) template.

It uses:

- [Turbo](https://turbo.build/) as an incremental bundler and build system
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Changesets](https://github.com/changesets/changesets) to keep track of changes as they are made, and then automatically updating `CHANGELOG`files and version numbers in `package.json` files when releases are made

### Developing with Storybook

There is a single storybook instance in apps/docs. Once installed run `npm run storybook -w apps/docs` from the repo root. This storybook instance draws stories from each of the packages - with a separate section for each.

Each package is structured so that components live next to their stories (and tests etc)

```
lib/
├─ src/
│ ├─ Button/
│ │ ├─ Button.svelte
│ │ ├─ Button.stories.svelte
```

Storybook needs to be restarted when adding a new story to allow it to index the new file.

You can preview the storybook by running `npm run storybook -w apps/docs`.

#### Step-by-step Set Up

- Clone repository onto local machine
- Switch to dev branch
- Install dependencies: `npm i`
- Create new local branch: `git checkout -B name-of-task`
- Run build script to build the components: `npm run build`
- Run docs script to set up local preview of storybook: `npm run docs`
- Ready to start contributing.
- Once changes have been made, update the change set log: `npx changeset` and push to git.

## Contributing, and Publishing packages

Development should occur in feature branches that are branched off from the `dev` branch.
The `dev` branch is periodically merged into the `main` branch, from which releases are made.

Following the [recommendations of the Turbo project maintainers](https://turbo.build/repo/docs/handbook/publishing-packages/versioning-and-publishing), we use `changesets` to keep track of changes.

Before merging a PR that adds a feature or fixes a bug, run the command `npx changeset`.
This will prompt for a description of the changes, which will be saved as a markdown file in [`.changeset/`](./.changeset/).
For more details, see the [Adding a Changeset](https://github.com/changesets/changesets/blob/main/docs/adding-a-changeset.md) section of the `changeset` docs.

When writing changelog messages, consider the suggestions from [keep a changelog](https://keepachangelog.com/).

When a release is made, `changeset` will add these descriptions of changes to a `CHANGELONG.md` file in the directory of the appropriate package; the version numbers in `package.json` files will also be updated appropriately.

### Storybook previews

When a PR is created targeting the `dev` branch, then the `deploy-previews` workflow (defined in [this file](./.github/workflows/deploy-preview.yml)) should be triggered automatically.
This will deploy an instance of storybook to `https://dev.ldn-gis.co.uk/storybook-<branch_name>`.

The action should automatically re-run if you push additional commits to the source branch of the PR.

Note that this action will immediately abort if there is a conflict that would prevent the PR from being automatically merged into the `dev` branch.
The action will also not be automatically triggered for PRs targeting other branches, but it can still be manually triggered [through the GitHub web UI](https://github.com/Greater-London-Authority/ldn-viz-tools/actions/workflows/deploy-preview.yml).

An action also deploys:

- the `dev` branch to [https://dev.ldn-gis.co.uk/storybook-dev/](https://dev.ldn-gis.co.uk/storybook-dev/)
- the `main` branch (which should match the latest released version) to [https://greater-london-authority.github.io/ldn-viz-tools/](https://greater-london-authority.github.io/ldn-viz-tools/)

### Making releases/publishing packages

Rather than having a fixed release schedule, we make releases when someone wants to make use of unreleased code in the `main` branch.

The process for making a release is:

- check whether there are any open PRs that should be included in the release; if so, merge them first
- merge from the `dev` branch into the `main` branch, using the 'merge commit' option (this will mean that each commit made to the `dev` branch will be added to the `main` branch)
- manually trigger the [`publish-packages`](./.github/publish-packages.yml) workflow in GitHub.
  This runs the `publish-packages` script defined in the top-level [`package.json`](./package.json) file.
  It uses a token that was [generated in NPM](https://www.npmjs.com/settings/ldn-viz/tokens/) and [saved as an Action secret in GitHub](https://github.com/Greater-London-Authority/ldn-viz-tools/settings/secrets/actions).
- make a Pull Request from the `release-msg` branch to `main`, merge it, then delete the branch (the action that generates the release notes can't push directly to the `main` branch because it is protected, and [GitHub Actions can't push to protected branches](https://github.com/orgs/community/discussions/25305))
- merge from the `main` branch to `dev`, using the 'merge commit' option

The version number badges on the README will update automatically.
