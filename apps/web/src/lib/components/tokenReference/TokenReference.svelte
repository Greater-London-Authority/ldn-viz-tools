<script lang="ts">
	/**
	 * A reference table of published tokens, read from `@ldn-viz/themes/docs/tokens/tokens.js`.
	 * `group` picks the tokens: a colour concept such as `color-text`, or `spacing`, `flow`,
	 * `grid`, `shadow`, `elevation`, `breakpoint` or `typography`.
	 * @component
	 */
	import published from '@ldn-viz/themes/docs/tokens/tokens.js';
	import { Select } from '@ldn-viz/ui';

	interface Props {
		group: string;
	}

	let { group }: Props = $props();

	// Indexed by strings from `group`, so the generated type is too narrow
	const tokens: any = published;

	type Token = { name: string; value: any; type: string };

	const leaves = (node: any): Token[] => {
		if (!node || typeof node !== 'object') return [];
		if ('name' in node && 'value' in node) return [node];
		return Object.values(node).flatMap(leaves);
	};

	// The docs site and the system both assume a 16px root
	const px = (value: string) =>
		value.endsWith('rem') ? `${parseFloat(value) * 16}px` : value === '0' ? '0px' : value;

	// The source orders spacing by key, which puts `1-5` before `1`
	const byValue = (list: Token[]) => list.sort((a, b) => parseFloat(a.value) - parseFloat(b.value));

	const shadow = (value: any) =>
		(Array.isArray(value) ? value : [value])
			.map(
				(s) =>
					`${s.inset ? 'inset ' : ''}${s.offsetX} ${s.offsetY} ${s.blur} ${s.spread} ${s.color}`
			)
			.join(', ');

	// Each value is shown on its own mode's canvas, whatever mode the site is in
	const modes = ['light', 'dark'].map((mode) => ({
		mode,
		canvas: tokens.mode[mode].canvas.default.value,
		text: tokens.mode[mode].text.default.value
	}));

	const colourRows = (concept: string) => {
		const dark = new Map(leaves(tokens.mode.dark[concept]).map((t) => [t.name, t.value]));
		return leaves(tokens.mode.light[concept]).map((t) => ({
			name: t.name,
			light: t.value,
			dark: dark.get(t.name)
		}));
	};

	const options = (values: string[]) => values.map((value) => ({ value, label: value }));
	const breakpoints = options(['base', 'sm', 'md', 'lg', 'xl']);
	const typesets = options(['product', 'longform']);
	const properties = ['font-size', 'line-height', 'font-weight', 'letter-spacing'];

	let breakpoint = $state('base');
	let typeset = $state('product');

	const typographyRows = $derived.by(() => {
		const rows = new Map<string, Record<string, string>>();
		for (const t of leaves(tokens.typography[breakpoint][typeset])) {
			const property = properties.find((p) => t.name.endsWith(`-${p}`));
			if (!property) continue;
			const role = t.name.slice(
				`typography-${breakpoint}-${typeset}-`.length,
				-property.length - 1
			);
			rows.set(role, { ...rows.get(role), [property]: String(t.value) });
		}
		return [...rows].map(([role, values]): Record<string, string> => ({ role, ...values }));
	});
</script>

<div class="width-content-wide overflow-x-auto">
	{#if group.startsWith('color-')}
		<table>
			<colgroup><col class="w-1/2" /><col class="w-1/4" /><col class="w-1/4" /></colgroup>
			<thead>
				<tr><th>Token</th><th>Light</th><th>Dark</th></tr>
			</thead>
			<tbody>
				{#each colourRows(group.slice('color-'.length)) as row}
					<tr>
						<td><code>--{row.name}</code></td>
						{#each [row.light, row.dark] as value, i}
							<td style:background={modes[i].canvas} style:color={modes[i].text}>
								<span class="inline-flex items-center gap-2">
									<span
										class="inline-block h-4 w-4 shrink-0 border border-color-border-wash"
										style:background={value}
									></span>
									<code style:background="none" style:color="inherit">{value}</code>
								</span>
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	{:else if group === 'typography'}
		<div class="typeset-product grid max-w-md grid-cols-2 gap-4 pb-4">
			<Select label="Typeset" options={typesets} bind:value={typeset} searchable={false} />
			<Select label="Breakpoint" options={breakpoints} bind:value={breakpoint} searchable={false} />
		</div>
		<p>
			Each value is the token <code
				>--typography-{breakpoint}-{typeset}-{'{role}'}-{'{property}'}</code
			>.
		</p>
		<table>
			<colgroup
				><col class="w-1/4" />{#each properties as _}<col />{/each}</colgroup
			>
			<thead>
				<tr>
					<th>Role</th>
					{#each properties as property}<th>{property}</th>{/each}
				</tr>
			</thead>
			<tbody>
				{#each typographyRows as row}
					<tr>
						<td><code>{row.role}</code></td>
						{#each properties as property}
							<td>{row[property] ? px(row[property]) : '–'}</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	{:else if group === 'breakpoint'}
		<table>
			<colgroup><col class="w-1/2" /><col /></colgroup>
			<thead>
				<tr><th>Breakpoint</th><th>Minimum width</th></tr>
			</thead>
			<tbody>
				<tr><td><code>base</code></td><td>None</td></tr>
				{#each leaves(tokens.primitive.breakpoint) as t}
					<tr><td><code>{t.name.split('-').at(-1)}</code></td><td>{t.value}</td></tr>
				{/each}
			</tbody>
		</table>
	{:else if group === 'shadow' || group === 'elevation'}
		<table>
			<colgroup><col class="w-1/2" /><col class="w-1/3" /><col /></colgroup>
			<thead>
				<tr><th>Token</th><th>Value</th><th>Example</th></tr>
			</thead>
			<tbody>
				{#each leaves(group === 'shadow' ? tokens.primitive.shadow : tokens.elevation) as t}
					<tr>
						<td><code>--{t.name}</code></td>
						<td><code>{shadow(t.value)}</code></td>
						<td class="bg-color-canvas-muted">
							<span
								class="m-2 inline-block h-8 w-12 bg-color-surface"
								style:box-shadow={shadow(t.value)}
							></span>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{:else}
		<table>
			<colgroup><col class="w-1/2" /><col class="w-1/4" /><col class="w-1/4" /></colgroup>
			<thead>
				<tr><th>Token</th><th>Value</th><th>Pixels</th></tr>
			</thead>
			<tbody>
				{#each group === 'spacing' ? byValue(leaves(tokens.spacing)) : leaves(tokens[group]) as t}
					<tr>
						<td><code>--{t.name}</code></td>
						<td><code>{t.value}</code></td>
						<td>{px(String(t.value))}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</div>

<style>
	/* Fixed layout gives every table the same column widths, so they line up down the page */
	table {
		width: 100%;
		min-width: 40rem;
		table-layout: fixed;
	}
</style>
