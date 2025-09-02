<script>
	import { theme } from '@ldn-viz/ui';
	import ChartAnatomyLight from './ChartAnatomyLight.svelte';
	import ChartAnatomyDark from './ChartAnatomyDark.svelte';
</script>

{#if theme.currentMode === 'light'}
	<ChartAnatomyLight />
{:else}
	<ChartAnatomyDark />
{/if}
