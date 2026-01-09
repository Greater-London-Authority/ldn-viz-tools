<script lang="ts">
	import { Button } from '@ldn-viz/ui';
	import { ArrowDownTray, ArrowUpTray, Check, Pencil, Trash, XMark } from '@steeze-ui/heroicons';
	import {
		Angle,
		BoundingBox,
		Circle,
		Cursor,
		LineSegments,
		MapPinSimpleArea,
		Polygon,
		Scribble,
		type IconSource
	} from '@steeze-ui/phosphor-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { fly } from 'svelte/transition';
	import type { GeoJSONStoreFeatures, TerraDraw } from 'terra-draw';
	import FileUpload from './FileUpload.svelte';

	interface Props {
		/**
		 * The TerraDraw object.
		 */
		terraDraw: TerraDraw;

		/**
		 * Function to be called when user clicks 'Done' button.
		 */
		onDone: (_features: GeoJSONStoreFeatures[]) => any;

		/**
		 * Function to be called when user clicks 'Edit' button.
		 */
		onStart: () => any;

		/**
		 * Function to be called when user clicks 'Cancel' button.
		 */
		onCancel: () => any;

		/**
		 * If [true, false], then Geojson upload only is enabled.
		 * If [false, true], then the drawn shape can be downloaded as a GeoJSON file.
		 * If [true, true], then upload and download are enabled
		 */
		uploadDownload: [boolean, boolean];

		drawModes: any;
		mapDraw: any;
	}

	let { terraDraw, onDone, uploadDownload, drawModes, mapDraw, onStart, onCancel }: Props =
		$props();

	/**
	 * Icon lookup for mode selection buttons
	 */
	const icons: { [key: string]: IconSource } = {
		circle: Circle,
		freehand: Scribble,
		linestring: LineSegments,
		point: MapPinSimpleArea,
		polygon: Polygon,
		rectangle: BoundingBox,
		sector: Angle,
		select: Cursor
	};

	const clickEdit = () => {
		// Set default mode
		drawModes.mode.selected = drawModes.mode.previous
			? drawModes.mode.previous
			: drawModes.enabled[0];
		terraDraw.setMode(drawModes.mode.selected);

		mapDraw.controlMode.current = 'edit';
		mapDraw.features.previous = JSON.stringify(mapDraw.features.current || []);

		onStart();
	};

	let showOptions = $state(true);

	terraDraw.on('change', () => {
		showOptions = false;
	});

	const toggleOptions = () => {
		showOptions = !showOptions;
	};

	const clickMode = (mode: string) => {
		if (drawModes.mode.selected !== 'select') {
			if (mode !== 'select') {
				toggleOptions();
			}
		} else {
			showOptions = false;
		}

		drawModes.mode.selected = mode;
		drawModes.mode.previous = drawModes.mode.selected;
		terraDraw.setMode(mode);
	};

	const clickSelect = () => {
		showOptions = false;
		drawModes.mode.selected = 'select';
		terraDraw.setMode('select');
	};

	const clickClear = () => {
		terraDraw.clear();
		drawModes.mode.selected = drawModes.mode.previous;
		mapDraw.features.current = terraDraw.getSnapshot();
		showOptions = false;
	};

	const clickCancel = () => {
		mapDraw.features.current = JSON.parse(mapDraw.features.previous as string);

		terraDraw.clear();
		terraDraw.addFeatures(mapDraw.features.current);

		drawModes.mode.previous = drawModes.mode.selected;
		mapDraw.controlMode.current = 'default';
		showOptions = false;

		onCancel();
	};

	const clickDone = () => {
		drawModes.mode.selected = 'render';

		mapDraw.controlMode.current = 'default';

		terraDraw.setMode('render');

		onDone(mapDraw.features.current);

		mapDraw.features.saved = mapDraw.features.current;
	};

	const clickUpload = () => {
		drawModes.mode.selected = 'select';
		terraDraw.setMode('select');
		mapDraw.controlMode.current = 'upload';
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
			features: mapDraw.features.current
		};
		const dataString = JSON.stringify(geoJson, null, 4);
		const dataURL = 'data:application/json;base64,' + window.btoa(dataString);

		downloadFromURL(dataURL, 'shape.geojson');
	};
</script>

{#if mapDraw.controlMode.current === 'default'}
	<Button variant="square" class="pointer-events-auto" size="lg" onclick={clickEdit}>
		<Icon src={Pencil} class="h-8 w-8 pb-1 pt-0.5" aria-hidden="true" />
		{mapDraw.features.saved.length === 0 ? 'Add' : 'Edit'} area
	</Button>
{:else if mapDraw.controlMode.current === 'edit'}
	<div class="pointer-events-auto flex h-fit">
		<Button
			variant="square"
			emphasis={drawModes.mode.selected !== 'select' ? 'primary' : 'secondary'}
			class="pointer-events-auto"
			size="lg"
			onclick={() => {
				showOptions = true;
			}}
		>
			<Icon src={Pencil} class="h-8 w-8 pb-1 pt-0.5" aria-hidden="true" />
			Draw
		</Button>

		{#each drawModes.options as mode (mode)}
			{#if showOptions}
				<!-- These options hidden in the ribbon -->
				<div in:fly>
					<Button
						variant="square"
						emphasis="secondary"
						class="{drawModes.mode.selected === mode
							? '!bg-color-action-background-secondary-active'
							: null} pointer-events-auto capitalize"
						size="lg"
						onclick={() => clickMode(mode)}
					>
						<Icon src={icons[mode]} class="h-8 w-8 pb-1 pt-0.5" aria-hidden="true" />
						{mode}
					</Button>
				</div>
			{/if}
		{/each}
	</div>

	<div class="flex flex-col">
		<Button
			variant="square"
			emphasis={drawModes.mode.selected === 'select' ? 'primary' : 'secondary'}
			class="pointer-events-auto"
			size="lg"
			onclick={() => clickSelect()}
			disabled={mapDraw.features.current.length ? false : true}
		>
			<Icon src={icons['select']} class="h-8 w-8 pb-1 pt-0.5" aria-hidden="true" />
			Select
		</Button>
		<Button
			variant="square"
			class="pointer-events-auto"
			size="lg"
			emphasis="secondary"
			onclick={clickClear}
			disabled={mapDraw.features.current.length ? false : true}
		>
			<Icon src={Trash} class="h-8 w-8 pb-1 pt-0.5" aria-hidden="true" />
			Clear all
		</Button>
	</div>

	<div class="flex flex-col">
		<Button
			variant="square"
			class="pointer-events-auto"
			size="lg"
			emphasis="negative"
			onclick={clickCancel}
		>
			<Icon src={XMark} class="h-8 w-8 pb-1 pt-0.5" aria-hidden="true" />
			Cancel
		</Button>
		<Button
			variant="square"
			class="pointer-events-auto"
			size="lg"
			emphasis="positive"
			onclick={clickDone}
		>
			<Icon src={Check} class="h-8 w-8 pb-1 pt-0.5" aria-hidden="true" />
			Done
		</Button>
	</div>

	{#if uploadDownload.some((v) => v === true)}
		<div class="flex flex-col">
			{#if uploadDownload[0]}
				<Button
					variant="square"
					class="pointer-events-auto"
					size="lg"
					emphasis="secondary"
					onclick={clickUpload}
				>
					<Icon src={ArrowUpTray} class="h-8 w-8 pb-1 pt-0.5" aria-hidden="true" />
					Upload
				</Button>
			{/if}

			{#if uploadDownload[1]}
				<Button
					variant="square"
					class="pointer-events-auto"
					size="lg"
					emphasis="secondary"
					onclick={downloadData}
					disabled={mapDraw.features.current.length ? false : true}
				>
					<Icon src={ArrowDownTray} class="h-8 w-8 pb-1 pt-0.5" aria-hidden="true" />
					Download
				</Button>
			{/if}
		</div>
	{/if}
{:else if mapDraw.controlMode.current === 'upload'}
	<FileUpload {terraDraw} {mapDraw} />
{/if}
