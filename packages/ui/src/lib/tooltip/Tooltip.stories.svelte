<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';

	import { InformationCircleIcon } from '@rgossiaux/svelte-heroicons/solid';
	import Tooltip from '../tooltip/Tooltip.svelte';
	import { floatingRef } from '../tooltip/tooltip.js';

	let element: HTMLSpanElement;
	export let showTooltip: boolean = false;
</script>

<Meta title="Ui/Tooltip" component={Tooltip} />

<Story name="Default">
	<span
		class="inline-flex items-center text-core-grey-400 dark:text-core-grey-300 cursor-pointer"
		bind:this={element}
		on:mouseenter={(e) => {
			showTooltip = true;
			floatingRef(element);
		}}
		on:mouseleave|stopPropagation={() => (showTooltip = false)}
		use:floatingRef
		role="tooltip"
	>
		What is this?
		<InformationCircleIcon class="w-[18px] h-[18px] ml-0.5" aria-hidden="true" />
	</span>

	<Tooltip {showTooltip}>This is some text...</Tooltip>
</Story>
