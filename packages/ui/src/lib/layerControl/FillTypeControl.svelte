<script lang="ts">
	import Trigger from '../overlay/Trigger.svelte';
	import Popover from '../popover/Popover.svelte';
	import RadioButtonGroup from '../radioButton/RadioButtonGroup.svelte';

	import { AdjustmentsHorizontal, NoSymbol } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	let fillOptions = [
		{ id: 'solid-fill', label: 'Solid Fill' },
		{ id: 'no-fill', label: 'Outline only' }
	];

	const patterns = {
		patternURL:
			'https://raw.githubusercontent.com/visgl/deck.gl/master/examples/layer-browser/data/pattern.png',

		// N.B. this can't be determined from the pattern atlas alone, as there may be blank/unused pixels
		// to the right or bottom of the pattern swatches. Ignoring these would cause incorrect scaling, and mis-alignment.
		patternImageWidth: 256,
		patternImageHeight: 256,

		atlas: {
			'hatch-1x': {
				x: 4,
				y: 4,
				width: 120,
				height: 120,
				mask: true
			},
			'hatch-2x': {
				x: 132,
				y: 4,
				width: 120,
				height: 120,
				mask: true
			},
			'hatch-cross': {
				x: 4,
				y: 132,
				width: 120,
				height: 120,
				mask: true
			},
			dots: {
				x: 132,
				y: 132,
				width: 120,
				height: 120,
				mask: true
			}
		}
	};

	const swatchWidth = 30;

	interface Props {
		label: any;
		disabled?: boolean;
		fillType?: string;
	}

	let { label, disabled = false, fillType = $bindable() }: Props = $props();

	const clickPattern = (name: string) => {
		fillType = name;
	};
</script>

{#if disabled}
	<Icon
		src={NoSymbol}
		theme="mini"
		class="text-color-action-disabled h-6 w-6 cursor-not-allowed"
		aria-hidden="true"
	/>
{:else}
	<Popover>
		{#snippet trigger(props)}
			<Trigger {...props} size="xs" aria-label="Click to open {label} layer fill control">
				<Icon src={AdjustmentsHorizontal} theme="mini" class="h-6 w-6" aria-hidden="true" />
			</Trigger>
		{/snippet}

		{#snippet title()}
			Fill type
		{/snippet}

		<span class="mb-2 inline-block text-xs">Click to assign a fill type to this layer.</span>

		<div class="flex flex-col gap-2">
			<div class="flex flex-wrap gap-0.5">
				<RadioButtonGroup
					options={fillOptions}
					name="station-type"
					bind:selectedId={fillType!}
					allowClear
				/>
			</div>

			<div class="flex flex-wrap gap-2">
				{#each Object.keys(patterns.atlas) as patternName}
					{@const pattern = patterns.atlas[patternName as keyof typeof patterns.atlas]}

					<!--
          The approach here is to set the background-size to scale the image such that the region for each pattern is scaled to fit in a (swatchWidth x swatchWidth) sized box
          Then set the
          -->
					<div
						class="grid grid-cols-2"
						style:width={`${swatchWidth * 2}px`}
						style:outline={patternName === fillType ? '2px solid var(--theme-ui-primary)' : ''}
					>
						{#each [1, 2, 3, 4] as _}
							<button
								aria-label={`Select fill type ${patternName}`}
								onclick={() => clickPattern(patternName)}
								style:width={`${swatchWidth}px`}
								style:height={`${swatchWidth}px`}
								style:background-image={`url(${patterns.patternURL})`}
								style:background-size={`${(patterns.patternImageWidth * swatchWidth) / pattern.width}px ${(patterns.patternImageHeight * swatchWidth) / pattern.height}px`}
								style:background-position={`-${pattern.x / (pattern.width / swatchWidth)}px -${pattern.y / (pattern.width / swatchWidth)}px`}
							></button>
						{/each}
					</div>
				{/each}
			</div>
		</div>
	</Popover>
{/if}
