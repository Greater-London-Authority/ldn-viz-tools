<script lang="ts">
	import { Button, classNames } from '@ldn-viz/ui';
	import type { FeatureCollection } from 'geojson';
	import type { ChangeEventHandler } from 'svelte/elements';

	import uuid4 from 'uuid4';

	interface Props {
		onCancel: () => void;
		onLoad: (data: FeatureCollection) => void;
		features: any;
		savedFeatures: any;
	}

	let {
		onCancel,
		onLoad,
		features = $bindable(),
		savedFeatures = $bindable()
	}: Props = $props();

	let isDragging = $state(false);

	async function readFile(file) {
		try {
			const text = await file.text();
			const parsedJson = JSON.parse(text);

			// modify features to please TerraDrw
			// see e.g. https://github.com/JamesLMilner/terra-draw/issues/177
			for (const feature of parsedJson.features) {
				if (!uuid4.valid(feature.id)) {
					feature.id = uuid4();
				}

				if (!feature.properties) {
					feature.properties = {};
				}
				if (!feature.properties.mode) {
					feature.properties.mode = 'polygon';
				}
			}

			features = parsedJson.features;
			savedFeatures = parsedJson.features;

			onLoad(parsedJson);
		} catch (error) {
			console.error('Error parsing JSON:', error);
		}
	}

	function handleDrag(e: DragEvent) {
		e.preventDefault();
		e.stopPropagation();
	}

	function handleDragIn(e: DragEvent) {
		e.preventDefault();
		e.stopPropagation();
		if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
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

		const items = [...e.dataTransfer.items];
		const file = items.find((item) => item.kind === 'file')?.getAsFile();

		if (file && file.name.endsWith('.geojson')) {
			readFile(file);
		}
	}

	function handleFileSelect(e: ChangeEventHandler<HTMLInputElement>) {
		const file = e.target.files[0];
		if (file && file.name.endsWith('.geojson')) {
			readFile(file);
		}
	}

	let inputRef: HTMLInputElement = $state();
</script>

<div class="bg-color-container-level-1 pointer-events-auto flex flex-col gap-2 p-4">
	<span class="pb-2 text-lg font-bold">Upload GeoJSON</span>

	<div
		class={classNames(
			'border-color-input-border hover:border-color-input-border-focussed relative min-h-[200px] rounded-lg border-2 border-dashed p-2',
			isDragging ? '!bg-color-action-background-primary-muted-hover' : ''
		)}
		ondragenter={handleDragIn}
		ondragleave={handleDragOut}
		ondragover={handleDrag}
		ondrop={handleDrop}
		onkeydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				inputRef.click();
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
			<!-- TODO: WHY NOT OUR INPUT HERE -->
			<input
				bind:this={inputRef}
				type="file"
				accept=".geojson"
				onchange={handleFileSelect}
				class="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
			/>
		</div>

		<div class="relative z-0 text-center">
			<p class="text-color-text-secondary mb-4">
				Drag & drop a GeoJSON file here or click to open file picker.
			</p>
		</div>
	</div>

	<Button onclick={onCancel} emphasis="secondary" class="mt-2">Cancel</Button>
</div>
