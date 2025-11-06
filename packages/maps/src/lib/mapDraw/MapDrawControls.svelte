<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';

	import { ArrowDownTray, ArrowUpTray, Check, Pencil, Trash, XMark } from '@steeze-ui/heroicons';

	import { Button, RadioButtonGroupSolid } from '@ldn-viz/ui';
	import type { Feature } from 'geojson';
	import FileUpload from './FileUpload.svelte';

	interface Props {
		/**
	The modes/tools available for selection.
	 **/
		enabledModes?: string[];
		/**
		 * The currently active mode.
		 */
		currentMode: string | undefined;
		/**
		 * GeoJSON features that have been drawn (continuously updates).
		 */
		features: Feature[];
		/**
		 * GeoJSON features that have been drawn (updates on Save or Clear).
		 */
		savedFeatures: Feature[];
		/**
		 * The TerraDraw object.
		 */
		terraDraw: any;
		/**
		 * Function to be called when user clicks 'Done' button.
		 */
		onDone?: any;
		/**
		 * If `true`, then the drawn shape can be downloaded as a GeoJSON file, then re-uploaded to restore state.
		 */
		allowUploadAndDownload?: boolean;
	}

	let {
		enabledModes = [],
		currentMode = $bindable(),
		features,
		savedFeatures = $bindable(),
		terraDraw,
		onDone = (_features: Feature[]) => null,
		allowUploadAndDownload = true
	}: Props = $props();

	// this is the mode of the MapDrawControls component, rather than of the TerraDraw component
	let metaMode: 'default' | 'edit' | 'upload' = $state('default');

	let options: { id: string; label: string }[] = $derived(
		[...enabledModes, 'select'].map((m) => ({
			id: m,
			label: m[0].toUpperCase() + m.slice(1)
		}))
	);

	let previousFeatures: Feature[] | string = [];

	const clickEdit = () => {
		metaMode = 'edit';
		previousFeatures = JSON.stringify(features || []);
	};

	const clickClear = () => {
		terraDraw.clear();
		features = terraDraw.getSnapshot();
	};

	const clickCancel = () => {
		features = JSON.parse(previousFeatures as string);

		terraDraw.clear();
		terraDraw.addFeatures(features);

		metaMode = 'default';
	};

	const clickDone = () => {
		currentMode = 'render';

		metaMode = 'default';
		onDone(features);

		savedFeatures = features;
	};

	const clickLoad = (geoJSON: { features: any }) => {
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
		<div class="pointer-events-auto flex flex-col gap-1 pt-1">
			<Button
				variant="square"
				size="lg"
				emphasis="positive"
				onclick={clickDone}
				class="pointer-events-auto"
			>
				<Icon src={Check} class="h-8 w-8 pb-1 pt-0.5" aria-hidden="true" />
				Done
			</Button>

			<Button
				variant="square"
				size="lg"
				emphasis="negative"
				onclick={clickCancel}
				class="pointer-events-auto"
			>
				<Icon src={XMark} class="h-8 w-8 pb-1 pt-0.5" aria-hidden="true" />
				Cancel
			</Button>

			<Button
				variant="square"
				size="lg"
				emphasis="secondary"
				onclick={clickClear}
				class="pointer-events-auto"
			>
				<Icon src={Trash} class="h-8 w-8 pb-1 pt-0.5" aria-hidden="true" />
				Clear
			</Button>
		</div>

		<div class="pointer-events-auto h-fit">
			<RadioButtonGroupSolid name="" {options} bind:selectedId={currentMode} />
		</div>
	{:else if metaMode === 'upload'}
		<FileUpload
			onCancel={() => (metaMode = 'default')}
			onLoad={clickLoad}
			bind:features
			bind:savedFeatures
		/>
	{:else}
		<div class="pointer-events-auto flex flex-col gap-1">
			<Button variant="square" size="lg" onclick={clickEdit}>
				<Icon src={Pencil} class="h-8 w-8 pb-1 pt-0.5" aria-hidden="true" />
				{!savedFeatures || savedFeatures.length === 0 ? 'Add' : 'Edit'} area
			</Button>

			{#if allowUploadAndDownload}
				<Button variant="square" size="lg" emphasis="secondary" onclick={downloadData}>
					<Icon src={ArrowDownTray} class="h-8 w-8 pb-1 pt-0.5" aria-hidden="true" />
					Download
				</Button>

				<Button
					variant="square"
					size="lg"
					emphasis="secondary"
					onclick={() => (metaMode = 'upload')}
				>
					<Icon src={ArrowUpTray} class="h-8 w-8 pb-1 pt-0.5" aria-hidden="true" />
					Upload
				</Button>
			{/if}
		</div>
	{/if}
</div>
