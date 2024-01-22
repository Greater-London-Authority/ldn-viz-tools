<script lang="ts">
	import { ExclamationTriangle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import Spinner from '../spinners/Spinner.svelte';

	export let spinner = false;
</script>

<div
	class="flex flex-col items-center justify-center text-center text-core-grey-400 gap-2 background-white border border-grey-400 px-2 py-2 w-full h-full"
>
	{#if spinner}
		<Spinner class="w-12" />
	{:else}
		<slot name="icon">
			<Icon
				src={ExclamationTriangle}
				theme="solid"
				class="w-12 h-12 stroke-core-grey-200"
				aria-hidden="true"
			/>
		</slot>
	{/if}

	<span class="text-lg font-bold max-w-xl">
		<slot name="title">Nothing to display</slot>
	</span>

	<div class="max-w-xl">
		<slot />
	</div>
</div>
