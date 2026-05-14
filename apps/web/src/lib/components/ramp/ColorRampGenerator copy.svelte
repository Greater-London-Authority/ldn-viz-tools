<script lang="ts">
	import { ColorLegend, Select, theme } from '@ldn-viz/ui';
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

	// functions

	// based on D3 scale chromatic: https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/viridis.js
	const ramp = (range) => {
		var n = range.length;
		return function (t) {
			return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
		};
	};

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

	const interpolator = (t) => {
		return ramp(hexRight)(t);
	};

	let scale = scaleSequential([0, 100], interpolator);

	const typeOptions = ['Sequential', 'Diverging'];
	let typeSelected = 'Sequential';

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
	let colorSelectedLeft = $state('green');
	let colorSelectedRight = $state('blue');

	const paletteStepOptions = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100];
	let paletteStepStartSelected = $state(200);
	let paletteStepEndSelected = $state(900);
	let paletteStepMid = $derived(
		paletteStepStartSelected +
			Math.round((paletteStepEndSelected - paletteStepStartSelected) / 2 / 100) * 100
	);
</script>

<div>
	<h3 class="title-sm mb-typography-spacing-xs">Color Ramp Generator:</h3>

	<div>
		<div class="not-prose float-left w-48 pb-4 pr-4">
			<Select label="Type" options={typeOptions} name="Type" bind:value={typeSelected} />
		</div>
		<div class="not-prose float-left w-32 pb-4 pr-4">
			<Select
				label="Palette Left"
				options={colorOptions}
				name="Color"
				bind:value={colorSelectedLeft}
			/>
		</div>

		<div class="not-prose float-left w-32 pb-4 pr-4">
			<Select
				label="Palette Right"
				options={colorOptions}
				name="Color"
				bind:value={colorSelectedRight}
			/>
		</div>

		<div class="not-prose float-left w-32 pb-4 pr-4">
			<Select
				label="Palette Start"
				options={paletteStepOptions}
				name="StartStep"
				bind:value={paletteStepStartSelected}
			/>
		</div>

		<div class="not-prose float-left w-32 pb-4 pr-4">
			<Select
				label="Palette End"
				options={paletteStepOptions}
				name="EndStep"
				bind:value={paletteStepEndSelected}
			/>
		</div>

		<div class="not-prose float-left w-32 pb-4 pr-4">
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

	<h4 class="title-xs mb-typography-spacing-xs">Copy these hex values:</h4>
	<div class="bg-color-surface-muted p-2"><code>{hexRight}</code></div>
</div>
