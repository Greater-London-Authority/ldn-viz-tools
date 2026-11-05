# @ldn-viz/tables

A Svelte table component, styled with the London City Data Design System (LCD-DS).
Cells can show a value as text or as a small visualisation (such as a bar or a dot) and column headings can show a summary of their values.
The table supports sorting and grouping rows, and can paginate or virtualise long tables (depending on the provided options).

[Storybook](https://greater-london-authority.github.io/ldn-viz-tools) documents the table, its renderers and its examples.

## Install

```sh
npm i @ldn-viz/themes @ldn-viz/tables
```

The package needs `@ldn-viz/themes` and Svelte 5.33 or later. Set up the theme CSS and the Tailwind preset as described in [`@ldn-viz/ui`](https://www.npmjs.com/package/@ldn-viz/ui).

## Use

A table takes an array of rows and a spec that lists the columns and the renderer for each column's cells:

```svelte
<script>
	import { Table } from '@ldn-viz/tables';

	const data = [
		{ first_name: 'Ada', last_name: 'Lovelace' },
		{ first_name: 'Alan', last_name: 'Turing' }
	];

	const tableSpec = {
		columns: [
			{ short_label: 'first_name', label: 'First name', cell: { renderer: 'TextCell' } },
			{ short_label: 'last_name', label: 'Last name', cell: { renderer: 'TextCell' } }
		]
	};
</script>

<Table {data} {tableSpec} title="Computing pioneers" allowSorting />
```

## Links

- [Storybook](https://greater-london-authority.github.io/ldn-viz-tools)
- [Changelog](https://github.com/Greater-London-Authority/ldn-viz-tools/blob/main/packages/tables/CHANGELOG.md)

## Licence

MIT
