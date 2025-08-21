<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';

	import { Check, Pencil, Trash, XMark } from '@steeze-ui/heroicons';

	import { Button, RadioButtonGroupSolid } from '@ldn-viz/ui';
	import type { Feature } from 'geojson';

	/**
	The modes/tools available for selection.
	 **/
	export let enabledModes: string[] = [];

	/**
	 * The currently active mode.
	 */
	export let currentMode: string | undefined;

	/**
	 * GeoJSON features that have been drawn.
	 */
	export let features: Feature[];

	/**
	 * The TerraDraw object.
	 */
	export let terraDraw;

	/**
	 * Function to be called when user clicks 'Done' button.
	 */
	export let onDone = (features: Feature[]) => null;

	/**
	 * Controls will be displayed unless this is `false`.
	 */
	export let showControls = false;

	let options: { id: string; label: string }[];

	$: options = [...enabledModes, 'select'].map((m) => ({
		id: m,
		label: m[0].toUpperCase() + m.slice(1)
	}));

	let previousFeatures: Feature[] = [];
	const clickEdit = () => {
		showControls = true;
		previousFeatures = JSON.stringify(features);
		console.log('previousFeatures is now:', { previousFeatures });
	};

	const clickClear = () => {
		//	currentMode = 'CLEAR';

		terraDraw.clear();
		terraDraw.getSnapshot();

		//showControls = false;
	};

	const clickCancel = () => {
		features = JSON.parse(previousFeatures);

		terraDraw.clear();
		terraDraw.addFeatures(features);

		showControls = false;
	};

	const clickDone = () => {
		currentMode = undefined;
		showControls = false;
		onDone(features);
	};
</script>

<div class="flex gap-2">
	{#if showControls}
		<div class="pointer-events-auto h-fit">
			<RadioButtonGroupSolid
				label="Selection tool"
				name=""
				{options}
				bind:selectedId={currentMode}
			/>
		</div>

		<div class="flex flex-col gap-1 pointer-events-auto">
			<Button
				variant="square"
				size="lg"
				emphasis="negative"
				on:click={clickClear}
				class="pointer-events-auto"
			>
				<Icon src={Trash} theme="mini" class="w-8 h-8 ml-2" aria-hidden="true" />
				Clear
			</Button>

			<Button
				variant="square"
				size="lg"
				emphasis="negative"
				on:click={clickCancel}
				class="pointer-events-auto"
			>
				<Icon src={XMark} theme="mini" class="w-8 h-8 ml-2" aria-hidden="true" />
				Cancel
			</Button>

			<Button
				variant="square"
				size="lg"
				emphasis="positive"
				on:click={clickDone}
				class="pointer-events-auto"
			>
				<Icon src={Check} theme="mini" class="w-8 h-8 mb-2" aria-hidden="true" />
				Done
			</Button>
		</div>
	{:else}
		<div class="pointer-events-auto">
			<Button variant="square" size="lg" on:click={clickEdit}>
				<Icon src={Pencil} class="w-8 h-8 ml-2" aria-hidden="true" />
				Edit area
			</Button>
		</div>
	{/if}
</div>
