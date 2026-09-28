<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SymbolLegend from './SymbolLegend.svelte';

	const { Story } = defineMeta({
		title: 'Ui/Components/Legends/SymbolLegend',
		component: SymbolLegend,
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	{#snippet template()}
		<div class="max-w-[400px]">
			<SymbolLegend color={'data.primary'} />
		</div>
	{/snippet}
</Story>
