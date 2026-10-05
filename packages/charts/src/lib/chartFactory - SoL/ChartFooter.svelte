<script lang="ts">
    import {Footer} from "@ldn-viz/charts";

    interface Props {
		byline?: string;
		source?: string;
		note?: string;
		lloindicator?: string;
		chartDescription?: string;
		exportBtns?: import('svelte').Snippet;
	}

	let { byline = '', source = '', note = '', lloindicator, chartDescription = '', exportBtns }: Props = $props();

	let lloLabel = $derived(
		lloindicator === 'core'
			? 'Core LLO Indicator'
			: lloindicator
				? 'Supplementary LLO Indicator'
				: undefined
	);

	let combinedNote = $derived([lloLabel, note].filter(Boolean).join(' | '));
</script>

<div class="relative contents not-prose">
    <Footer {byline} {source} note={combinedNote} {chartDescription} {exportBtns} />
</div>
