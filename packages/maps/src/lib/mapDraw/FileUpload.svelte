<script lang="ts">
	import { Button, Callout, classNames } from '@ldn-viz/ui';
	import { CheckCircle, XCircle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { GeoJSONStoreFeatures, TerraDraw } from 'terra-draw';
	import { fixImportedGeoJSON } from './utils';

	interface Props {
		/**
		 * The TerraDraw object.
		 */
		terraDraw: TerraDraw;

		mapDraw: any;
	}

	let { terraDraw, mapDraw }: Props = $props();

	let upload: {
		state: 'pending' | 'success' | 'error';
		features: GeoJSONStoreFeatures[];
		previousFeatures: string;
	} = $state({
		state: 'pending',
		features: [],
		previousFeatures: '[]'
	});

	const onLoad = () => {
		mapDraw.controlMode.current = 'edit';
	};

	const onCancel = () => {
		mapDraw.features.current = JSON.parse(upload.previousFeatures);

		terraDraw.clear();
		terraDraw.addFeatures(mapDraw.features.current);

		mapDraw.controlMode.current = 'edit';
	};

	async function readFile(file: any) {
		try {
			const text = await file.text();
			const parsedJson = JSON.parse(text);

			fixImportedGeoJSON(parsedJson);

			upload.previousFeatures = JSON.stringify(mapDraw.features.current);

			upload.features = parsedJson.features;
			terraDraw.addFeatures(parsedJson.features);
			upload.state = 'success';
		} catch (error) {
			upload.state = 'error';
			console.error('Error parsing JSON:', error);
		}
	}

	let isDragging = $state(false);

	function handleDrag(e: DragEvent) {
		e.preventDefault();
		e.stopPropagation();
	}

	function handleDragIn(e: DragEvent) {
		e.preventDefault();
		e.stopPropagation();
		if (e.dataTransfer?.items && e.dataTransfer.items.length > 0) {
			isDragging = true;
		}
	}

	function handleDragOut(e: DragEvent) {
		e.preventDefault();
		e.stopPropagation();
		isDragging = false;
	}

	function handleDrop(e: DragEvent) {
		e.preventDefault();
		e.stopPropagation();
		isDragging = false;

		const items = [...e.dataTransfer!.items];
		const file = items.find((item) => item.kind === 'file')?.getAsFile();

		if (file && file.name.endsWith('.geojson')) {
			readFile(file);
		}
	}

	function handleFileSelect(e: any) {
		const file = e.target.files[0];
		if (file && file.name.endsWith('.geojson')) {
			readFile(file);
		}
		return;
	}

	let inputRef: HTMLInputElement | undefined = $state();
</script>

<div
	class="bg-color-container-level-1 pointer-events-auto flex w-[320px] flex-col gap-2 p-4 shadow"
>
	<p class="form-label text-sm">Upload</p>

	{#if upload.state === 'pending'}
		<div
			class={classNames(
				'border-color-border-muted hover:border-color-interactive-focus relative flex min-h-[180px]  items-center rounded-lg border-2 border-dashed p-2',
				isDragging ? '!bg-color-interactive-primary-muted-hover' : ''
			)}
			ondragenter={handleDragIn}
			ondragleave={handleDragOut}
			ondragover={handleDrag}
			ondrop={handleDrop}
			onkeydown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					inputRef?.click();
				}
			}}
			role="button"
			tabindex="0"
			aria-label="GeoJSON file drop zone"
			aria-describedby="dropZoneDescription"
		>
			<span id="dropZoneDescription" class="sr-only">
				Drop a GeoJSON file here or press Enter to select a file
			</span>

			<div class="absolute inset-0 z-10 h-full w-full cursor-pointer">
				<input
					bind:this={inputRef}
					type="file"
					accept=".geojson"
					onchange={handleFileSelect}
					class="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
				/>
			</div>

			<div class="relative z-0 text-center">
				<p class="text-color-text-muted text-sm">
					Drag & drop a GeoJSON file here or click to open file picker.
				</p>
			</div>
		</div>
	{:else if upload.state === 'error'}
		<Callout status="negative" size="sm" ariaTitle="File upload successful">
			{#snippet body()}
				<Icon src={XCircle} />
				<p>File upload error. Please check and try again.</p>
			{/snippet}
		</Callout>
	{:else if upload.state === 'success'}
		<Callout status="positive" size="sm" ariaTitle="File upload successful">
			{#snippet body()}
				<div class="mb-2 flex items-center">
					<Icon src={CheckCircle} theme="mini" class="text-color-ui-positive mr-2 h-6 w-6" />
					<p>File upload successful</p>
				</div>
			{/snippet}
		</Callout>
	{/if}

	<div class="mt-2 flex justify-end gap-2">
		<Button onclick={onCancel} emphasis="secondary" variant="outline">Cancel</Button>
		<Button onclick={onLoad} emphasis="primary" disabled={upload.state !== 'success'}>
			Add area
		</Button>
	</div>
</div>
