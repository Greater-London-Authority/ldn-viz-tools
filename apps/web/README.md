## Architecture

This app uses [Velite](https://velite.js.org/) as an application data layer.
This is configured by [`velite.config.js`](./velite.config.js) to scan the `./src/content` folder for markdown files ('documents'), and saves metadata about these files in the `.velite/docs.json` index file.
This indexing must be triggered manually by running `npm velite` (or `npx velite dev`, which will watch for file changes as long as it is running).

The [`svelte.config.js`](svelte.config.js) file defines a `$content/*` alias that resolves to `.velite/*`.
It also specifies that [mdsvex](https://mdsvex.pngwn.io/docs) should be called as a pre-processor (configured by [`mdsvex.config.js`](./mdsvex.config.js)), so that markdown is rendered as formatted HTML rather than the raw markdown text. `mdsvex` also allows Svelte components to be used within markdown documents, similarly to how MDX allows React components to be used within markdown documents.

The [`vite.config.ts`](./vite.config.ts) config file allows file-system access to the `./velite` directory.

The [`src/lib/utils.ts`](./src/lib/utils.ts) file imports the index file from `$content/index.js` and exports functions that return documents and/or their metadata.
These can be used within the [`load()` functions of `+page.ts` files](https://svelte.dev/docs/kit/load#Page-data); SvelteKit provides whatever this function returns to the corresponding `+page.svelte` file as the `data` prop.