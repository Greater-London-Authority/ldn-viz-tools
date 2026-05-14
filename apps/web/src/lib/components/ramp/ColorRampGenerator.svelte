<script lang="ts">
	import {
		Checkbox,
		ColorLegend,
		CopyButton,
		Select,
		ThemeSwitcher,
		randomId,
		theme
	} from '@ldn-viz/ui';
	import { getColorRamp } from '@ldn-viz/utils';
	import { scaleSequential } from 'd3-scale';
	import { onMount } from 'svelte';

	// check if mounted, for DOM (Canvas) dependent components (ColorLegend)
	let mounted = $derived(false);

	onMount(() => {
		mounted = true;
	});

	// get width & height of wrappers around content components
	// TODO: Code review.. is this ok to share between bindings on component wrappers
	let contentWidth = $state();
	let contentHeight = $state();

	const typeOptions = ['Sequential', 'Diverging'];
	let typeSelected = $state('Sequential');

	const breaksOptions = [2, 3, 4, 5, 6, 7, 8, 9, 10];
	let breaksSelected = $state(5);

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
	let colorSelectedLeft = $state('red');
	let colorSelectedRight = $state('blue');

	const paletteStepOptions = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100];
	let paletteStepStartSelected = $state(300);
	let paletteStepEndSelected = $state(900);
	let paletteStepMid = $derived(
		paletteStepStartSelected +
			Math.round((paletteStepEndSelected - paletteStepStartSelected) / 2 / 100) * 100
	);

	let includeZeroGrey = $state(false);

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
				theme.tokenNameToValue('palette.' + colorSelectedLeft + '.' + paletteStepEndSelected),
				theme.tokenNameToValue('palette.' + colorSelectedLeft + '.' + paletteStepMid),
				theme.tokenNameToValue('palette.' + colorSelectedLeft + '.' + paletteStepStartSelected)
			],
			count: breaksSelected,
			even: true
		})
	);

	// used in both types
	let hexRight = $derived(
		getColorRamp({
			colors: [
				theme.tokenNameToValue('palette.' + colorSelectedRight + '.' + paletteStepStartSelected),
				theme.tokenNameToValue('palette.' + colorSelectedRight + '.' + paletteStepMid),
				theme.tokenNameToValue('palette.' + colorSelectedRight + '.' + paletteStepEndSelected)
			],
			count: breaksSelected,
			even: true
		})
	);

	let hexRightWithZeroGrey = $derived(
		includeZeroGrey === true ? [theme.tokenNameToValue('data.empty')].concat(hexRight) : hexRight
	);

	let hex = $derived(
		typeSelected == 'Diverging' ? hexLeft.concat(hexRightWithZeroGrey) : hexRightWithZeroGrey
	);

	const interpolator = (t) => {
		return ramp(hex)(t);
	};

	let scale = scaleSequential([0, 100], interpolator);
</script>

<div class="pb-8">
	<h3 class="title-sm mb-typography-spacing-xs">Color Ramp Generator</h3>

	<div>
		<div class="float-left w-48 pb-4 pr-4">
			<Select label="Type" options={typeOptions} name="Type" bind:value={typeSelected} />
		</div>

		{#if typeSelected == 'Diverging'}
			<div class="not-prose float-left w-32 pb-4 pr-4">
				<Select
					label="Palette Left"
					options={colorOptions}
					name="Color"
					bind:value={colorSelectedLeft}
				/>
			</div>
		{/if}

		<div class="float-left w-32 pb-4 pr-4">
			<Select
				label={typeSelected == 'Diverging' ? 'Palette Right' : 'Palette'}
				options={colorOptions}
				name="Color"
				bind:value={colorSelectedRight}
			/>
		</div>

		<div class="float-left w-32 pb-4 pr-4">
			<Select
				label="Palette Start"
				options={paletteStepOptions}
				name="StartStep"
				bind:value={paletteStepStartSelected}
			/>
		</div>

		<div class="float-left w-32 pb-4 pr-4">
			<Select
				label="Palette End"
				options={paletteStepOptions}
				name="EndStep"
				bind:value={paletteStepEndSelected}
			/>
		</div>

		<div class="float-left w-32 pb-4 pr-4">
			<Select label="Breaks" options={breaksOptions} name="Steps" bind:value={breaksSelected} />
		</div>
	</div>

	<div bind:clientWidth={contentWidth}>
		{#if mounted}
			<ColorLegend
				color={scale}
				ticks="0"
				marginTop="0"
				marginBottom="0"
				height="32"
				width={contentWidth}
			/>
		{/if}
	</div>

	<div>
		<div class="float-left pr-4 pt-4">
			<Checkbox label="Include grey at zero" bind:checked={includeZeroGrey} />
		</div>

		<div class="right-0 float-right flex items-center pt-4">
			<span class="label-xs responsive mr-2 text-color-label-muted">Mode</span>
			<ThemeSwitcher size="xs" />
		</div>
	</div>

	<div class="clear-both pt-4">
		<CopyButton content={hex} label="Copy Hex Values" />
	</div>
</div>
