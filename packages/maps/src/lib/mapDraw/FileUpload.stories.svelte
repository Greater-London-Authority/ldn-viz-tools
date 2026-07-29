<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import FileUpload from './FileUpload.svelte';

	const componentType = {
		control: 'none',
		table: {
			type: {
				summary: 'object'
			}
		}
	};

	/**
	 * The `<FileUpload>` component is used internally by  [MapDraw](./?path=/docs/maps-components-mapdraw-mapdraw--documentation)
	 * to let users upload a `.geojson` file by dragging it onto a drop
	 * zone (or selecting one via the file picker).
	 *
	 * It has three visible states, driven by the internal `upload.state` value:
	 * - **pending**: the default drop zone prompting for a file (with an
	 *   `isDragging` hover style shown while a file is dragged over it);
	 * - **success**: a positive `Callout` shown after a valid `.geojson` file is parsed;
	 * - **error**: a negative `Callout` shown when the file cannot be parsed as JSON.
	 *
	 * In normal use these states are only reachable via a multi-step `<MapDraw>`
	 * flow. These stories drive the component directly using stub `terraDraw` and
	 * `mapDraw` objects (mirroring the shape `<MapDraw>` passes in), and — for the
	 * success/error stories — programmatically feed a file to the hidden file input
	 * so the relevant `upload.state` is reached.
	 */
	const { Story } = defineMeta({
		title: 'Maps/Components/MapDraw/FileUpload',
		component: FileUpload,
		tags: ['autodocs'],
		argTypes: {
			terraDraw: componentType,
			mapDraw: componentType
		}
	});
</script>

<script lang="ts">
	// A valid GeoJSON FeatureCollection, parsed successfully by `readFile`.
	const validGeoJSON = JSON.stringify({
		type: 'FeatureCollection',
		features: [
			{
				type: 'Feature',
				geometry: {
					type: 'Point',
					coordinates: [-0.1278, 51.5074]
				},
				properties: {}
			}
		]
	});

	// Invalid JSON, causing `readFile` to throw and switch to the error state.
	const invalidGeoJSON = '{ this is not valid JSON';

	/**
	 * Build fresh stub objects matching the shape `<MapDraw>` passes to `<FileUpload>`.
	 * A new set is created per render so stories do not share mutable state.
	 */
	const makeStubs = () => {
		const terraDraw: any = {
			clear: () => {},
			addFeatures: () => {}
		};
		const mapDraw: any = {
			controlMode: { current: 'default' },
			features: { current: [] }
		};
		return { terraDraw, mapDraw };
	};

	/**
	 * Svelte action that, once mounted, locates the component's hidden file input
	 * and dispatches a `change` event carrying the given GeoJSON text. This drives
	 * the component into its success or error state.
	 */
	const driveUpload = (node: HTMLElement, json: string) => {
		setTimeout(() => {
			const input = node.querySelector('input[type="file"]') as HTMLInputElement | null;
			if (!input) {
				return;
			}

			const dataTransfer = new DataTransfer();
			dataTransfer.items.add(new File([json], 'example.geojson', { type: 'application/json' }));
			input.files = dataTransfer.files;
			input.dispatchEvent(new Event('change', { bubbles: true }));
		}, 0);
	};
</script>

<!--
The default `pending` state: a drop zone prompting the user to drag-and-drop a
GeoJSON file or click to open the file picker. Dragging a file over the zone
applies the `isDragging` hover highlight.
-->
<Story name="Pending (drop zone)">
	{#snippet template()}
		{@const stubs = makeStubs()}
		<FileUpload terraDraw={stubs.terraDraw} mapDraw={stubs.mapDraw} />
	{/snippet}
</Story>

<!--
The `success` state, shown after a valid `.geojson` file is parsed. This story
feeds a valid GeoJSON FeatureCollection to the file input on mount.
-->
<Story name="Upload success">
	{#snippet template()}
		{@const stubs = makeStubs()}
		<div use:driveUpload={validGeoJSON}>
			<FileUpload terraDraw={stubs.terraDraw} mapDraw={stubs.mapDraw} />
		</div>
	{/snippet}
</Story>

<!--
The `error` state, shown when the selected file cannot be parsed as JSON. This
story feeds invalid JSON to the file input on mount, causing `readFile` to throw.
-->
<Story name="Upload error">
	{#snippet template()}
		{@const stubs = makeStubs()}
		<div use:driveUpload={invalidGeoJSON}>
			<FileUpload terraDraw={stubs.terraDraw} mapDraw={stubs.mapDraw} />
		</div>
	{/snippet}
</Story>
