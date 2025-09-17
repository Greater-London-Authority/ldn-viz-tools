<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';

	import { ArrowDownTray, ArrowUpTray, Check, Pencil, Trash, XMark } from '@steeze-ui/heroicons';

	import { Button, RadioButtonGroupSolid } from '@ldn-viz/ui';
	import type { Feature } from 'geojson';
	import FileUpload from './FileUpload.svelte';

	/**
	The modes/tools available for selection.
	 **/
	export let enabledModes: string[] = [];

	/**
	 * The currently active mode.
	 */
	export let currentMode: string | undefined;

	/**
	 * GeoJSON features that have been drawn (continuously updates).
	 */
	export let features: Feature[];

	/**
	 * GeoJSON features that have been drawn (updates on Save or Clear).
	 */
	export let savedFeatures: Feature[];

	/**
	 * The TerraDraw object.
	 */
	export let terraDraw;

	/**
	 * Function to be called when user clicks 'Done' button.
	 */
	export let onDone = (_features: Feature[]) => null;

	/**
	 * If `true`, then the drawn shape can be downloaded as a GeoJSON file, then re-uploaded to restore state.
	 */
	export let allowUploadAndDownload = true;

	// this is the mode of the MapDrawControls component, rather than of the TerraDraw component
	let metaMode: 'default' | 'edit' | 'upload' = 'default';

	let options: { id: string; label: string }[];

	$: options = [...enabledModes, 'select'].map((m) => ({
		id: m,
		label: m[0].toUpperCase() + m.slice(1)
	}));

	let previousFeatures: Feature[] = [];
	const clickEdit = () => {
		metaMode = 'edit';
		previousFeatures = JSON.stringify(features);
		console.log('previousFeatures is now:', { previousFeatures });
	};

	const clickClear = () => {
		terraDraw.clear();
		terraDraw.getSnapshot();
	};

	const clickCancel = () => {
		features = JSON.parse(previousFeatures);

		terraDraw.clear();
		terraDraw.addFeatures(features);

		metaMode = 'default';
	};

	const clickDone = () => {
		currentMode = undefined;
		metaMode = 'default';
		onDone(features);

		savedFeatures = features;
	};

	const clickLoad = (geoJSON) => {
		metaMode = 'default';
		terraDraw.clear();
		terraDraw.addFeatures(geoJSON.features);
	};

	const downloadFromURL = (url: string, name: string) => {
		const link = document.createElement('a');
		link.setAttribute('href', url);
		link.setAttribute('target', '_blank');
		link.setAttribute('download', name);
		link.dispatchEvent(new MouseEvent('click'));
	};

	const downloadData = () => {
		const geoJson = {
			type: 'FeatureCollection',
			features: features
		};
		const dataString = JSON.stringify(geoJson, null, 4);
		const dataURL = 'data:application/json;base64,' + window.btoa(dataString);

		downloadFromURL(dataURL, 'shape.geojson');
	};
</script>

<div class="flex gap-2">
	{#if metaMode === 'edit'}
		<div class="flex flex-col gap-1 pointer-events-auto pt-1">
			<Button
				variant="square"
				size="lg"
				emphasis="positive"
				on:click={clickDone}
				class="pointer-events-auto"
			>
				<Icon src={Check} class="w-8 h-8 pb-1 pt-0.5" aria-hidden="true" />
				Done
			</Button>

			<Button
				variant="square"
				size="lg"
				emphasis="negative"
				on:click={clickCancel}
				class="pointer-events-auto"
			>
				<Icon src={XMark} class="w-8 h-8 pb-1 pt-0.5" aria-hidden="true" />
				Cancel
			</Button>

			<Button
				variant="square"
				size="lg"
				emphasis="secondary"
				on:click={clickClear}
				class="pointer-events-auto"
			>
				<Icon src={Trash} class="w-8 h-8 pb-1 pt-0.5" aria-hidden="true" />
				Clear
			</Button>
		</div>

		<div class="pointer-events-auto h-fit">
			<RadioButtonGroupSolid name="" {options} bind:selectedId={currentMode} />
		</div>
	{:else if metaMode === 'upload'}
		<FileUpload onCancel={() => (metaMode = 'default')} onLoad={clickLoad} />
	{:else}
		<div class="flex flex-col gap-1 pointer-events-auto">
			<Button variant="square" size="lg" on:click={clickEdit}>
				<Icon src={Pencil} class="w-8 h-8 pb-1 pt-0.5" aria-hidden="true" />
				Edit area
			</Button>

			{#if allowUploadAndDownload}
				<Button variant="square" size="lg" emphasis="secondary" on:click={downloadData}>
					<Icon src={ArrowDownTray} class="w-8 h-8 pb-1 pt-0.5" aria-hidden="true" />
					Download
				</Button>

				<Button
					variant="square"
					size="lg"
					emphasis="secondary"
					on:click={() => (metaMode = 'upload')}
				>
					<Icon src={ArrowUpTray} class="w-8 h-8 pb-1 pt-0.5" aria-hidden="true" />
					Upload
				</Button>
			{/if}
		</div>
	{/if}
</div>
