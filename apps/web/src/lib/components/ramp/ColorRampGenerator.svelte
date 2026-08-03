<script lang="ts">
	import {
		ColorLegend,
		CopyButton,
		Input,
		randomId,
		Select,
		Switch,
		theme,
		ThemeSwitcher
	} from '@ldn-viz/ui';
	import { getColorRamp } from '@ldn-viz/utils';
	import { scaleSequential } from 'd3-scale';
	import { onMount } from 'svelte';

	interface SwatchGridProps {
		title: string;
		colorLeft: string;
		colorRight: string;
		type: string;
		includeGrey: boolean;
		breaks: number;
		paletteStart: number;
		paletteEnd: number;
	}

	let {
		title = 'Colour Ramp',
		colorLeft = 'red',
		colorRight = 'blue',
		type = 'Sequential',
		includeGrey = false,
		breaks = 5,
		paletteStart = 300,
		paletteEnd = 900
	}: SwatchGridProps = $props();

	// check if mounted, for DOM (Canvas) dependent components (ColorLegend)
	let mounted = $derived(false);

	onMount(() => {
		mounted = true;
	});

	// get width & height of wrappers around content components
	let contentWidth = $state();
	let contentHeight = $state();

	const typeOptions = ['Sequential', 'Diverging'];

	// const breaksOptions = [2, 3, 4, 5, 6, 7, 8, 9, 10];
	// let breaks = $state(5);

	const colorOptions = [
		'grey',
		'blue',
		'green',
		'yellow',
		'orange',
		'red',
		'pink',
		'darkpink',
		'purple',
		'turquoise'
	];

	const paletteStepOptions = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100];
	let paletteMid = $derived(paletteStart + Math.round((paletteEnd - paletteStart) / 2 / 100) * 100);

	const id = randomId();

	const doCopy = (id: string, content: string) => {
		navigator.clipboard
			.writeText(content)
			.then(() => onCopy(id))
			.catch(console.error);
	};

	const copyToClipboard = async () => {
		// Firefox query permission does not work or is intentionally limited in
		// functionality. Instead, just check for clipboard in navigator and
		// log error if clipboard copy fails.
		if ('clipboard' in navigator) {
			doCopy(id, hex);
		}
	};

	// based on D3 scale chromatic: https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/viridis.js
	const ramp = (range) => {
		var n = range.length;
		return function (t) {
			return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
		};
	};

	// only used in type: diverging
	let hexLeft = $derived(
		getColorRamp({
			colors: [
				theme.tokenNameToValue('palette.' + colorLeft + '.' + paletteEnd),
				theme.tokenNameToValue('palette.' + colorLeft + '.' + paletteMid),
				theme.tokenNameToValue('palette.' + colorLeft + '.' + paletteStart)
			],
			count: breaks,
			even: true
		})
	);

	// used in both types
	let hexRight = $derived(
		getColorRamp({
			colors: [
				theme.tokenNameToValue('palette.' + colorRight + '.' + paletteStart),
				theme.tokenNameToValue('palette.' + colorRight + '.' + paletteMid),
				theme.tokenNameToValue('palette.' + colorRight + '.' + paletteEnd)
			],
			count: breaks,
			even: true
		})
	);

	let hexRightWithGrey = $derived(
		includeGrey == true ? [theme.tokenNameToValue('data.empty')].concat(hexRight) : hexRight
	);

	let hex = $derived(type == 'Diverging' ? hexLeft.concat(hexRightWithGrey) : hexRightWithGrey);

	// $inspect(paletteStart, paletteMid, paletteEnd);
	// $inspect(hex);

	const interpolator = (t) => {
		return ramp(hex)(t);
	};

	let scale = scaleSequential([0, 100], interpolator);
</script>

<div class="product flow-product not-prose">
	<h3 class="title">{title}</h3>

	<div class="flex space-x-4">
		<div class="w-full">
			<Select label="Type" options={typeOptions} name="Type" bind:value={type} />
		</div>

		{#if type == 'Diverging'}
			<div class="w-full">
				<Select label="Palette Left" options={colorOptions} name="Color" bind:value={colorLeft} />
			</div>
		{/if}
		<div class="w-full">
			<Select
				label={type == 'Diverging' ? 'Palette Right' : 'Palette'}
				options={colorOptions}
				name="Color"
				bind:value={colorRight}
			/>
		</div>
	</div>

	<div class="flex space-x-4">
		<div class="w-full">
			<Select
				label="Start"
				options={paletteStepOptions}
				name="StartStep"
				bind:value={paletteStart}
			/>
		</div>
		<div class="w-full">
			<Select label="End" options={paletteStepOptions} name="EndStep" bind:value={paletteEnd} />
		</div>
		<div class="w-16">
			<Input label="Breaks" name="Steps" type="number" bind:value={breaks} />
		</div>
	</div>

	<div class="pt-1">
		<Switch bind:checked={includeGrey} label="Grey zero" />
	</div>

	<div bind:clientWidth={contentWidth} class="pt-1">
		{#if mounted}
			<ColorLegend
				color={scale}
				ticks="0"
				marginTop={0}
				marginBottom="0"
				height="32"
				width={contentWidth}
			/>
		{/if}
	</div>

	<div class="flex justify-between pt-1">
		<CopyButton
			content={hex}
			label="Copy Hex Values"
			emphasis="secondary"
			variant="outline"
			size="sm"
		/>

		<div class="flex items-center">
			<span class="label-sm mr-2 text-color-label-muted">Mode</span>
			<ThemeSwitcher size="xs" />
		</div>
	</div>
</div>
