<script lang="ts">
	import { ChevronLeft, ChevronRight } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import { Button } from '@ldn-viz/ui';

	interface Props {
		numRows?: number;
		page?: number;
		pageSize?: number;
	}

	let { numRows = 0, page = $bindable(1), pageSize = 10 }: Props = $props();

	let firstRowNum = $derived((page - 1) * pageSize + 1);

	let lastRowNum = $derived(Math.min(page * pageSize, numRows));

	let numPages = $derived(Math.ceil(numRows / pageSize));
</script>

<div
	class="border-color-border text-color-text-muted flex items-center justify-between border-t text-sm"
>
	<div class="">
		Showing {firstRowNum} to {lastRowNum} of {numRows} entries.
	</div>

	<div class="flex items-center">
		<Button variant="text" size="sm" disabled={page === 1} onclick={() => page--}>
			<Icon src={ChevronLeft} theme="mini" class="h-5 w-5" aria-hidden="true" />
			Previous
		</Button>
		<div>
			Page <input bind:value={() => page.toString(), (v) => (page = +v)} class="w-12 border" />
			of {numPages}
		</div>
		<Button variant="text" size="sm" disabled={page === numPages} onclick={() => page++}>
			Next
			<Icon src={ChevronRight} theme="mini" class="h-5 w-5" aria-hidden="true" />
		</Button>
	</div>
</div>
