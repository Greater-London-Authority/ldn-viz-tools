<script lang="ts">
	export let byline = '';
	export let source = '';
	export let note = '';
</script>

<div class="w-full flex flex-col sm:flex-row justify-between mt-1">
	{#if byline || source || note}
		<ul class="flex flex-col space-y-0.5 text-color-text-secondary text-xs max-w-xl mr-4">
			{#if byline}<li>{byline}</li>{/if}
			{#if source}<li><span class="font-bold mr-1">Source:</span>{source}</li>{/if}
			{#if note}<li><span class="font-bold mr-1">Note:</span>{note}</li>{/if}
		</ul>
	{/if}
	{#if $$slots.exportBtns}
		<slot name="exportBtns" />
	{/if}
</div>
