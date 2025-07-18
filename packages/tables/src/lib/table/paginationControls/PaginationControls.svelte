<script lang="ts">
	import { run } from 'svelte/legacy';

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
	

	let numPages = $state();
	run(() => {
		numPages = Math.ceil(numRows / pageSize);
	});

	const pageChanged = (val) => {
		inputPage = val;
	};
	run(() => {
		pageChanged(page);
	});

	let inputPage = $state(page);
	const inputPageChanged = () => {
		const num = +inputPage;

		if (isNaN(num) || num < 1) {
			// need to handle carefully, so that if on page 1 we reset the input box
			inputPage = '1';
			page = 1;
			// page = 1;
		} else if (num > numPages) {
			page = numPages;
			//  inputPage = numPages.toString();
		} else if (page !== num) {
			page = num;
		}
	};
</script>

<div
	class="border-t border-color-ui-border-primary flex justify-between items-center text-sm text-color-text-secondary"
>
	<div class="">
		Showing {firstRowNum} to {lastRowNum} of {numRows} entries.
	</div>

	<div class="flex items-center">
		<Button variant="text" size="sm" disabled={page === 1} on:click={() => page--}>
			<Icon src={ChevronLeft} theme="mini" class="w-5 h-5" aria-hidden="true" />
			Previous
		</Button>
		<div>
			Page <input bind:value={inputPage} onchange={inputPageChanged} class="border w-12" /> of {numPages}
		</div>
		<Button variant="text" size="sm" disabled={page === numPages} on:click={() => page++}>
			Next
			<Icon src={ChevronRight} theme="mini" class="w-5 h-5" aria-hidden="true" />
		</Button>
	</div>
</div>
