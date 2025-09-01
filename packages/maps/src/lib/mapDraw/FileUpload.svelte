<script lang="ts">
	import { Button, classNames } from '@ldn-viz/ui';
	import type { FeatureCollection } from 'geojson';
	import type { ChangeEventHandler } from 'svelte/elements';

	export let onCancel: () => void;
	export let onLoad: (data: FeatureCollection) => void;

	let isDragging = false;

	async function readFile(file) {
		try {
			const text = await file.text();
			const parsedJson = JSON.parse(text);
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

	let inputRef: HTMLInputElement;
</script>

<div class="p-4 bg-color-container-level-1 pointer-events-auto flex flex-col gap-2">
	<span class="text-lg font-bold pb-2">Upload GeoJSON</span>

	<div
		class={classNames(
			'border-2 border-dashed border-color-input-border rounded-lg p-2 min-h-[200px] hover:border-color-input-border-focussed',
			isDragging ? '!bg-color-action-background-primary-muted-hover' : ''
		)}
		on:dragenter={handleDragIn}
		on:dragleave={handleDragOut}
		on:dragover={handleDrag}
		on:drop={handleDrop}
		on:keydown={(e) => {
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

		<div class="absolute inset-0 w-full h-full z-10 cursor-pointer">
			<input
				bind:this={inputRef}
				type="file"
				accept=".geojson"
				on:change={handleFileSelect}
				class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
			/>
		</div>

		<div class="relative z-0 text-center">
			<p class="mb-4 text-gray-600">
				Drag & drop a GeoJSON file here or click to open file picker.
			</p>
		</div>
	</div>

	<Button on:click={onCancel}>Cancel</Button>
</div>
