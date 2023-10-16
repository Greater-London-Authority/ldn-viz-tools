<script lang="ts">
	import { ExclamationIcon } from '@rgossiaux/svelte-heroicons/solid';
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Tooltip from '../tooltip/Tooltip.svelte';
</script>

<Meta title="Ui/Tooltip" component={Tooltip} />

<Story name="Default">
	<Tooltip>This is some text</Tooltip>
</Story>

<Story name="Custom hint label">
	<Tooltip hintLabel="Hover over me!" >This is some text</Tooltip>
</Story>

<Story name="Custom hint icon">
	<Tooltip>
		<svelte:fragment slot="hint">I have a diffent icon <ExclamationIcon  class="w-[18px] h-[18px] ml-0.5" aria-hidden="true" /></svelte:fragment>
		But I still work the same
	</Tooltip>
</Story>
