# LDN Viz Tools

This is a mono-repo containing several components:

- the `ldn-viz-tools-charts` package is in [charts](./packages/charts); it contains components for visualizing data
- the `ldn-viz-tools-maps` package is in [maps](./packages/maps); it contains components for rendering maps
- the `ldn-viz-tools-ui` package is in [ui](./packages/ui); it contains general UI components like modals or sidebars
- the `ldn-viz-tools-theme` package is in [theme](./packages/theme); it contains CSS and design tokens that are used by other components

These packages are intended primarily for use in projects created by Greater London Authority's Intelligence Unit.

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
│ │ ├─ Button.stories.ts
```

Storybook needs to be restarted when adding a new story to allow it to index the new file.

You can preview the storybook by running `npm run storybook -w apps/docs`.
