## Architecture

This app uses [Velite](https://velite.js.org/) as an application data layer.
This is configured by [`velite.config.js`](./velite.config.js) to scan the `./src/content` folder for markdown files ('documents'), and saves metadata about these files in the `.velite/docs.json` index file.

During `npm run dev`, a plugin in [`vite.config.ts`](./vite.config.ts) runs Velite in watch mode, so new markdown files and front matter changes reach the index while the dev server is running.

`npm run build` runs Velite before the Vite build. To rebuild the index without the dev server, for example after changing the schema, run `npm run build:content`.

The [`svelte.config.js`](svelte.config.js) file defines a `$content/*` alias that resolves to `.velite/*`.
It also specifies that [mdsx](https://github.com/svecosystem/mdsx) should be called as a pre-processor (configured by [`mdsx.config.ts`](./mdsx.config.ts)), so that markdown is rendered as formatted HTML rather than the raw markdown text. `mdsx` also allows Svelte components to be used within markdown documents, similarly to how MDX allows React components to be used within markdown documents. Its blueprint, [`src/lib/blueprints/default.svelte`](./src/lib/blueprints/default.svelte), replaces the HTML for links, images, code blocks and tables with our own components.

The [`vite.config.ts`](./vite.config.ts) config file allows file-system access to the `./velite` directory.

The [`src/lib/utils.ts`](./src/lib/utils.ts) file imports the index file from `$content/index.js` and exports functions that return documents and/or their metadata.
These can be used within the [`load()` functions of `+page.ts` files](https://svelte.dev/docs/kit/load#Page-data); SvelteKit provides whatever this function returns to the corresponding `+page.svelte` file as the `data` prop.

## Images in markdown

We use a custom blueprint which means that rather than being converted directly into an HTML `<img>` element, a markdown image is instead converted to our custom Svelte component defined in `src/lib/components/enhancedImage/EnhancedImage.svelte`.
This component uses theme aware switching, and the [svelte enhanced-img plugin](https://svelte.dev/docs/kit/images#sveltejs-enhanced-img) for format and resolution optimization.

Include the image using the normal markdown syntax:

    ![alt text](/image-name.png)

Images should then be added to `src/lib/assets/images/...`. The blueprint will look for `image-name`, `image-name-light` and `image-name-dark` (each followed by image extension - e.g. `image-name-dark.png`).
In light mode, the component will render `image-name-light` if it exists, and `image-name` if it does not.
In dark mode, the component will render `image-name-dark` if it exists, and `image-name` if it does not.
If images should not mode switch, just include a single image that is not suffixed with either `-light` or `-dark`.
