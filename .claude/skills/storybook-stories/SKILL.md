---
name: storybook-stories
description: Conventions for writing and reviewing Storybook stories (`*.stories.svelte`) in the ldn-viz-tools monorepo. Use when creating, editing, or checking `.stories.svelte` files in packages/{ui,maps,tables,charts}. Covers the @storybook/addon-svelte-csf v5 API (defineMeta/Story/snippets, Svelte 5 runes), title namespacing, argTypes, decorators, autodocs descriptions, and per-package patterns.
---

# Storybook stories (`*.stories.svelte`) conventions

Stories in this repo use **`@storybook/addon-svelte-csf` v5** with **Svelte 5 runes**
(`$state`, `$props`, `$derived`) and the **snippet-based** API (`defineMeta` + `<Story>` +
`{#snippet template(args)}`). There is no `.stories.js`/CSF-3 object API and no `<Meta>`/`<Template>`
legacy tags — do not introduce them.

## File location & naming

- Colocate the story next to its component: `packages/<pkg>/src/lib/<component>/Component.stories.svelte`.
- Name it after the component in PascalCase: `Button.svelte` → `Button.stories.svelte`.
- Ignore `dist/` and `.svelte-kit/__package__/` copies — those are build output. Only edit files under `src/lib/`.
- Storybook itself is the `apps/docs` app (`npm run docs`). Shared story decorators live in `apps/docs/src/lib`.

## Skeleton

Every story file starts with a `<script module lang="ts">` block that calls `defineMeta` and
destructures `Story` from it:

```svelte
<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from './Button.svelte';
	import type { ButtonProps } from './types.js';

	/**
	 * The `Button` component ... (this JSDoc becomes the autodocs description).
	 */
	const { Story } = defineMeta({
		title: 'Ui/Components/Buttons/Button',
		component: Button,
		tags: ['autodocs'],
		render: defaultTemplate, // optional shared template
		argTypes: {
			/* ... */
		},
		args: {
			/* ... */
		},
		parameters: {
			/* ... */
		}
	});

	let count = $state(0); // demo state lives in the module script
</script>

{#snippet defaultTemplate(args: ButtonProps)}
	<Button {...args}>You clicked: {count}</Button>
{/snippet}

<Story name="Default" />
<Story name="Solid" args={{ variant: 'solid' }} />
```

### Two-script pattern

When a story needs demo data, helper functions, imported types, or a `@component` docstring,
split into two blocks (both are common — ~53 files do this):

- `<script module lang="ts">` — the `defineMeta` call and the component import only.
- `<script lang="ts">` — demo data, `$state`, `$props`, event handlers, type imports, and a
  `/** ... @component */` JSDoc describing the component.

Keep `defineMeta` in the **module** block; keep instance/demo logic in the plain instance block.

## `defineMeta` fields

- **`title`** (required) — a `/`-delimited hierarchy that places the entry in the sidebar. Follow the
  existing namespace exactly (see [Title namespaces](#title-namespaces)).
- **`component`** — the imported Svelte component.
- **`tags: ['autodocs']`** — include on virtually every component story so the Docs page is generated.
- **`render`** — optional; set to a module-level `{#snippet name(args)}` used as the default body for
  `<Story>` elements that have no inline `template`.
- **`argTypes`** — declare controls for enum-like props. Use `options: [...]` with
  `control: { type: 'select' }` (many options) or `control: { type: 'radio' }` (few). Example:
  ```ts
  argTypes: {
  	emphasis: { options: ['primary', 'secondary', 'caution', 'positive', 'negative'], control: { type: 'select' } },
  	size: { options: ['xs', 'sm', 'md', 'lg'], control: { type: 'radio' } }
  }
  ```
- **`args`** — default arg values shared by all stories; snippets may be passed as args (see below).
- **`parameters`** — commonly `layout: 'fullscreen'` (UI full-bleed) or `layout: 'full'` (maps);
  `sveltekit_experimental` for routing; etc.
- **`decorators`** — array of `() => SomeContext as any` (see [Decorators](#decorators)).

## Stories

Three forms, in order of preference (simplest first):

1. **Plain** — relies on `render`/default template + meta `args`:
   ```svelte
   <Story name="Default" />
   ```
2. **Args-only variant** — no custom markup, just override props:
   ```svelte
   <Story name="Outline" args={{ variant: 'outline' }} />
   ```
3. **Custom template** — arbitrary markup via a `template` snippet that receives `args`:
   ```svelte
   <Story name="Sizes">
   	{#snippet template(args)}
   		<div class="flex items-end space-x-2">
   			<Button {...args} size="sm">sm</Button>
   			<Button {...args} size="lg">lg</Button>
   		</div>
   	{/snippet}
   </Story>
   ```

Conventions:

- **The custom-body snippet is always named `template`** and takes `(args)` (type it, e.g.
  `(args: SidebarProps)`, when a two-script file gives you the type).
- **Always spread `{...args}` first**, then override specific props for the variant, so Storybook
  controls keep working.
- **Story `name`s are human Title Case phrases**: `"With long content"`, `"Full width"`,
  `"Left placement"`, `"Externally Controlled"` — not code identifiers.
- **Keep `name`s to plain ASCII** letters, numbers, and spaces. Storybook CSF turns each story
  `name` into a generated JS export identifier, so math symbols (`≠`, `≥`, `≤`), currency (`£`, `$`),
  arrows (`→`, `↔`), and other non-ASCII characters can break the export or collide. Spell it out
  instead — e.g. `"Not equal"` / `"At least 5"` rather than `"≠"` / `"≥ 5"`.
- Per-story overrides go inline: `<Story name="Full width" parameters={{ layout: 'fullscreen' }}>`.

## Story descriptions (autodocs)

- An **HTML comment immediately above a `<Story>`** becomes that story's description in the Docs page.
  Use it to explain what the variant demonstrates:
  ```svelte
  <!-- When `maxSuggestions` is smaller than the list, only the first N are shown. -->
  <Story name="maxSuggestions truncation">...</Story>
  ```
- Explanatory text should be added to HTML comments above Stories, rather than inside `<p>` tags within them
- A **JSDoc `/** ... \*​/`block above`defineMeta`** (or above the component in the instance script,
tagged `@component`) becomes the component-level description. Markdown is supported, including
Storybook cross-links: `[AppShell](./?path=/docs/ui-components-layout-and-themes-appshell--documentation)`.
- **Do not put backticks or `<code>` tags in link text.** Storybook's CSS styles inline code so that a
  `code`-formatted link no longer looks like a link, making it hard to spot. Write
  `[Sidebar](…)`, not ``[`Sidebar`](…)`` or `[<code>Sidebar</code>](…)`.
- **For a cross-link to another component's Storybook page, the link text must be exactly the component
  name** — no angle brackets and no reformatting. Write `[RadioButton](…)`, not `[<RadioButton>](…)`
  or `[Radio Button](…)`.

## Slots / snippets

- Pass a component's named slots as snippets **inside** the component tag:
  ```svelte
  <Callout {...args}>
  	{#snippet title()}The title!{/snippet}
  	{#snippet body()}The body!{/snippet}
  </Callout>
  ```
- Reusable content (headers, footers, sections) is defined as top-level `{#snippet name()}` and passed
  through `args`, e.g. `args: { header, sections, footer }` with `<Story name="…" args={{ header: undefined }} />`
  to override.
- Stories may import shared snippets/data from a sibling story file, e.g.
  `import { subMenu } from '../navigationMenu/NavigationMenu.stories.svelte';`.

## Decorators

Wrappers that supply context or layout live in `apps/docs/src/lib` and are imported into stories:

- `RelativeWrapper`, `SidebarLeftContext`, `SidebarLeftOpenContext`, `SidebarRightContext`,
  `SidebarTopContext`, `SidebarBottomContext`.
- Applied as: `decorators: [() => SidebarLeftContext as any]`. The `as any` cast is expected.

## Styling & theming in demos

- Lay out demos with Tailwind utilities: `space-y-4`, `flex items-end space-x-2`, explicit sizing
  wrappers (`h-72 w-72`, `w-96`), and `relative` containers for absolutely-positioned components.
- Use design-token colour classes, not raw colours: `bg-color-surface-*`, `text-color-text`,
  `border-color-border-muted`, `bg-color-palette-*`. For JS colour values use
  `theme.tokenNameToValue('data.categorical.red', theme.currentTheme)` (imported from `@ldn-viz/ui`).

## Title namespaces

Match the segment structure of neighbouring stories — the sidebar order is driven by
`storySort` in `apps/docs/.storybook/preview.ts`.

- **UI** (`@ldn-viz/ui`): `Ui/Components/<Group>/<Component>` where groups include `Buttons`,
  `Checkboxes`, `RadioButtons`, `Overlays`, `Legends`, `Layer Controls`, `Geocoder`, `Tabs`, `Toaster`.
  Layout/theme components use `Ui/Components - Layout And Themes/...` (with nested `Sidebar/elements/...`,
  `Footer/...`, `Meta, Analytics And Cookies/...`). Auth uses `Ui/Auth/...`. Example pages use
  `Ui/Example Layouts/...`.
- **Maps** (`@ldn-viz/maps`): `Maps/Components/<Component>`, with sub-groups `MapControls/`,
  `DeckGL/`, `MapMarker/elements/`, `MapContextLayers/`, `MapLayerSource/adaptations/`.
- **Tables** (`@ldn-viz/tables`): `Tables/Components/<Component>`, sub-groups `Renderers/` and
  `AggregateRenderers/`; example tables under `Tables/Example Tables/...`.
- **Charts** (`@ldn-viz/charts`): components under `Charts/Components/<Component>`; example charts under
  `Charts/Examples/<Family>` (e.g. `Bar Charts`, `Line Charts`, `Scatter Plot`, `Histograms`,
  `Treemaps`, `Slope Charts`) — multiple story files can share one `Examples/<Family>` title.

## Package-specific notes

- **Maps** — set `parameters: { layout: 'full' }`, wrap the map in a sized div
  (`<div class="h-[100dvh] w-[100dvw]">`), and render controls inside `<MapControlGroup position="…">`
  within a `<Map>`. An OS API key constant is defined at the top and passed via
  `appendOSKeyToUrl(OS_KEY)` in `transformRequest`.
- **Charts** — build the Plot spec with `$derived(...)`, render via `<ObservablePlot {spec} data={...} />`,
  and supply the full metadata prop set for accessible examples: `title`, `subTitle`, `alt`, `byline`,
  `source`, `note`, and a detailed `chartDescription`.
- **Tables** — define `data` arrays and `tableSpec` objects in the instance script; each story renders
  `<Table {data} {tableSpec} ... />` with feature flags (`allowSorting`, `paginate`, `zebraStripe`, etc.).

## Not used here

- No `play` functions / interaction tests inside stories, and no `@storybook/test` imports.
- No CSF-3 object exports, no `.stories.ts`, no MDX component stories.

## Formatting (Prettier)

Tabs for indentation, single quotes, no trailing commas, `printWidth: 100`, with
`prettier-plugin-svelte` and `prettier-plugin-tailwindcss`. Run `npm run format` (or rely on the
repo Prettier config) — Tailwind classes are auto-sorted.
