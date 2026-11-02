<script lang="ts">
	/**
	 * A diagram of colour tokens in light and dark mode, read from
	 * `@ldn-viz/themes/docs/tokens/tokens.js`. `diagram` picks it: `tiers` follows
	 * `--color-surface-accent` to its raw value, and `inverse` shows the inverse tokens
	 * beside `--color-text`.
	 * @component
	 */
	import published from '@ldn-viz/themes/docs/tokens/tokens.js';

	interface Props {
		diagram: 'tiers' | 'inverse';
	}

	let { diagram }: Props = $props();

	// Indexed by mode name, so the generated type is too narrow
	const tokens: any = published;

	type Step = { name: string; value: string; tier?: string };

	// Each chain runs from the raw value down to the semantic token that points to it
	const tiers = (mode: string): Step[] => {
		const t = tokens.mode[mode];
		const raw = tokens.primitive.color.mode[mode].blue['700'].value;
		return [
			{ name: raw, value: raw, tier: 'Raw value' },
			{ name: `--primitive-color-mode-${mode}-blue-700`, value: raw, tier: 'Primitive' },
			{ name: '--color-palette-blue-700', value: t.palette.blue['700'].value, tier: 'Semantic' },
			{ name: '--color-surface-accent', value: t.surface.accent.value, tier: 'Semantic' }
		];
	};

	const inverse = (mode: string): Step[] => {
		const t = tokens.mode[mode];
		return [
			{ name: '--color-text', value: t.text.default.value },
			{ name: '--color-surface', value: t.surface.default.value },
			{ name: '--color-inverse-text', value: t.inverse.text.default.value },
			{ name: '--color-inverse-surface', value: t.inverse.surface.default.value }
		];
	};

	// Each of these is 3:1 against the canvas in both modes, as a bar needs
	const tierColours: Record<string, string> = {
		'Raw value': 'blue',
		Primitive: 'orange',
		Semantic: 'green'
	};

	const chain = $derived(diagram === 'tiers');

	// Each panel is drawn in its own mode's colours, whatever mode the site is in
	const modes = $derived(
		['light', 'dark'].map((mode) => ({
			label: mode === 'light' ? 'Light' : 'Dark',
			canvas: tokens.mode[mode].canvas.default.value,
			text: tokens.mode[mode].text.default.value,
			border: tokens.mode[mode].border.wash.value,
			categorical: tokens.mode[mode].data.categorical,
			steps: chain ? tiers(mode) : inverse(mode)
		}))
	);

	// The tiers are the same in both modes
	const groups = $derived(
		modes[0].steps.reduce<{ tier: string; first: number; last: number }[]>((list, step, i) => {
			const group = list.at(-1);
			if (group && group.tier === step.tier) group.last = i;
			else list.push({ tier: step.tier!, first: i, last: i });
			return list;
		}, [])
	);

	// A header row, then a row per step with an arrow row between steps in a chain
	const count = $derived(modes[0].steps.length);
	const rows = $derived(
		[
			'2rem',
			...Array.from({ length: count }, (_, i) =>
				chain && i < count - 1 ? ['2.5rem', '2rem'] : ['2.5rem']
			).flat()
		].join(' ')
	);
	const rowOf = (i: number) => (chain ? 2 + i * 2 : 2 + i);
	const col = $derived(chain ? 2 : 1);
</script>

<!-- Each mode wraps below the other when the column is too narrow for both -->
<div class="not-typeset width-content-wide overflow-x-auto">
	<div class="flex flex-wrap gap-4">
		{#each modes as mode}
			<div
				class="grid min-w-max flex-1 gap-x-4 p-4"
				style:grid-template-rows={rows}
				style:grid-template-columns={chain ? 'auto 1fr' : '1fr'}
				style:background={mode.canvas}
				style:color={mode.text}
			>
				<p class="label-md self-start" style:grid-column={col}>{mode.label}</p>
				{#if chain}
					{#each groups as group}
						<div
							class="label-sm flex items-center justify-end whitespace-nowrap border-r-2 pr-3"
							style:grid-column="1"
							style:grid-row="{rowOf(group.first)} / {rowOf(group.last) + 1}"
							style:border-color={mode.categorical[tierColours[group.tier]].value}
							aria-hidden="true"
						>
							{group.tier}
						</div>
					{/each}
				{/if}
				{#each mode.steps as step, i}
					<div
						class="label-sm flex items-center gap-2 self-center justify-self-start whitespace-nowrap border px-2 py-1"
						style:grid-column={col}
						style:grid-row={rowOf(i)}
						style:border-color={mode.border}
					>
						<span class="inline-block h-4 w-4 shrink-0" style:background={step.value}></span>
						<code class="font-mono">{step.name}</code>
						{#if step.tier}<span class="sr-only">({step.tier})</span>{/if}
					</div>
					{#if chain && i < count - 1}
						<span
							class="self-center pl-2.5"
							style:grid-column={col}
							style:grid-row={rowOf(i) + 1}
							aria-hidden="true">↑</span
						>
					{/if}
				{/each}
			</div>
		{/each}
	</div>
</div>
