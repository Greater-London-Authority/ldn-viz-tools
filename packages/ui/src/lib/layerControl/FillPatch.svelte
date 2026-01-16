<script lang="ts">
	import { randomId } from '../utils/randomId';

	import { theme } from '../theme/themeState.svelte';
	import { patterns as defaultPatterns, type PatternDefinitions } from './patterns';

	interface Props {
		width?: number;
		patternName: string;
		colorName?: string;
		colorVal?: string;
		outline?: string;
		onclick?: (patternName: string) => void;
		patterns?: PatternDefinitions;
	}

	let {
		width = 30,
		patternName,
		colorName = '',
		colorVal = '',
		outline = '',
		onclick = () => null,
		patterns = defaultPatterns
	}: Props = $props();

	let pattern = $derived(
		(patterns.atlas as Record<string, any>)[patternName] ?? { x: 0, y: 0, width: 120, height: 120 }
	);

	let color = $derived.by(() => {
		if (colorVal && colorVal.startsWith('rgb(')) {
			return colorVal.slice(4, -1).split(',');
		} else {
			return theme.colorTokenNameToRGBArray(colorName ?? 'data.neutral.0', theme.currentTheme);
		}
	});

	let colorString = $derived.by(() => {
		if (colorVal && colorVal.startsWith('rgb(')) {
			return colorVal;
		} else {
			return theme.tokenNameToValue(colorName ?? 'data.neutral.0', theme.currentTheme);
		}
	});

	let filterName = $derived(colorName || randomId());
</script>

<!--
The initial approach was to crate a div, and set the background-size to scale the image such that the region for each pattern is scaled to fit in a (swatchWidth x swatchWidth) sized box.
However, to allow clor customization, switched to using an SVG: inserted the whole fill atlas as an image, and then set viewbox to only reveal a section.
-->

{#if patternName === 'no-fill'}
	<button
		class="grid grid-cols-2"
		style:width={`${width * 2}px`}
		style:height={`${width * 2}px`}
		style:outline={`4px solid ${colorString}`}
		onclick={() => onclick(patternName)}
		aria-label="No fill pattern"
	>
	</button>
{:else if patternName === 'solid-fill'}
	<button
		class="grid grid-cols-2"
		style:width={`${width * 2}px`}
		style:height={`${width * 2}px`}
		style:background-color={colorString}
		onclick={() => onclick(patternName)}
		aria-label="Solid fill pattern"
	>
	</button>
{:else}
	<button
		class="grid grid-cols-2"
		style:width={`${width * 2}px`}
		style:outline
		onclick={() => onclick(patternName)}
		aria-label={`Fill pattern: ${patternName}`}
	>
		{#each [1, 2, 3, 4] as _}
			<svg
				{width}
				height={width}
				viewBox={`${pattern.x} ${pattern.y} ${pattern.width} ${pattern.width}`}
				role="button"
				tabindex="-1"
			>
				<filter id={`${filterName}-recolor`}>
					<!-- in this table, first val is color taken by black pixels, second by white pixels -->
					<feComponentTransfer color-interpolation-filters="sRGB">
						<feFuncR type="table" tableValues={`${color[0] / 255} 0`} />
						<feFuncG type="table" tableValues={`${color[1] / 255} 0`} />
						<feFuncB type="table" tableValues={`${color[2] / 255} 0`} />
					</feComponentTransfer>
				</filter>

				{#if patternName === 'solid-fill'}
					<rect
						filter={`url(#${filterName}-recolor)`}
						fill="black"
						x={0}
						y={0}
						width={patterns.patternImageWidth}
						height={patterns.patternImageHeight}
					/>
				{:else}
					<image
						filter={`url(#${filterName}-recolor)`}
						href={patterns.patternURL}
						x={0}
						y={0}
						width={patterns.patternImageWidth}
						height={patterns.patternImageHeight}
					/>
				{/if}
			</svg>
		{/each}
	</button>
{/if}
