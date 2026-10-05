<script lang="ts">
	// This component is extracted out of the ChartContainer in @ldn-viz/charts,
	// with the case of `subTitle` changed to `title`

	import { SubTitle, Title } from '@ldn-viz/charts';

	interface Props {
		/**
		 * Title that is displayed in large text above the plot.
		 */
		title?: string;
		/**
		 * Subtitle that is displayed below the title, but above the plot.
		 */
		subtitle?: string;
		/**
		 * Alt-text for the plot.
		 */
		alt?: string;

		dataset?: string;
	}

	let { title = '', subtitle = '', alt = '', dataset = '' }: Props = $props();
</script>

<div class="not-prose relative flex flex-col" id={dataset}>
	{#if alt}
		<p class="sr-only">{alt}</p>
	{/if}

	{#if title || subtitle}
		<div class="mb-4">
			{#if title}
				<Title>{@html title}</Title>
			{/if}
			{#if subtitle}
				<SubTitle>{@html subtitle}</SubTitle>
			{/if}
		</div>
	{/if}
</div>
