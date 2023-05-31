# LDN Viz Tools

This is a mono-repo containing several components:

- the [`@ldn-viz/charts`](https://www.npmjs.com/package/@ldn-viz/charts) package is in [charts](./packages/charts); it contains components for visualizing data
- the [`@ldn-viz/maps`](https://www.npmjs.com/package/@ldn-viz/maps) package is in [maps](./packages/maps); it contains components for rendering maps
- the [`@ldn-viz/ui`](https://www.npmjs.com/package/@ldn-viz/ui) package is in [ui](./packages/ui); it contains general UI components like modals or sidebars
- the [`@ldn-viz/theme`](https://www.npmjs.com/package/@ldn-viz/theme) package is in [theme](./packages/theme); it contains CSS and design tokens that are used by other components

These packages are intended primarily for use in projects created by [Greater London Authority](https://london.gov.uk/)'s [City Intelligence Unit](https://www.london.gov.uk/programmes-strategies/research-and-analysis).

### Tooling

The structure of this repo was initially based on Vercel's [Turborepo & SvelteKit Starter](https://vercel.com/templates/svelte/turborepo-sveltekit-starter) template.

It uses:

- [Turbo](https://turbo.build/) as an incremental bundler and build system
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

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

## Contributing, and Publishing packages

Development should occur in feature branches that are branched off from the `dev` branch.
The `dev` branch is periodically merged into the `main` branch, from which releases are made.

Following the [recommendations of the Turbo project maintainers](https://turbo.build/repo/docs/handbook/publishing-packages/versioning-and-publishing), we use `changesets` to keep track of changes.

Before merging a PR that adds a feature or fixes a bug, run `changeset`.
This will prompt for a description of the changes, which will be saved as a markdown file in [`.changeset/](./.changeset/).

When a release is made, `changeset` will add these descriptions of changes to a `CHANGELONG.md` file in the directory of the appropriate package; the version numbers in `package.json` files will also be updated appropriately.

Releases are made by manually triggering the [`publish-packages`](./.github/publish-packages.yml) workflow in GitHub.
This runs the `publish-packages` script defined in the top-level [`package.json](./package.json) file.
It uses a token that was [generated in NPM](https://www.npmjs.com/settings/ldn-viz/tokens/) and [saved as an Action secret in GitHub](https://github.com/Greater-London-Authority/ldn-viz-tools/settings/secrets/actions).

