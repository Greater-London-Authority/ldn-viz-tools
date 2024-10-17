<script lang="ts">
	import { ChevronLeft, ChevronRight } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import { Button } from '@ldn-viz/ui';

	export let numRows = 0;
	export let page = 1;
	export let pageSize = 10;

	let firstRowNum;
	$: firstRowNum = (page - 1) * pageSize + 1;

	let lastRowNum;
	$: lastRowNum = Math.min(page * pageSize, numRows);

	let numPages;
	$: numPages = Math.ceil(numRows / pageSize);

	const pageChanged = (val) => {
		inputPage = val;
	};
	$: pageChanged(page);

	let inputPage = page;
	const inputPageChanged = () => {
		const num = +inputPage;

		if (isNaN(num) || num < 1) {
			// need to handle carefully, so that if on page 1 we reset the inut box
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
			Page <input bind:value={inputPage} on:change={inputPageChanged} class="border w-12" /> of {numPages}
		</div>
		<Button variant="text" size="sm" disabled={page === numPages} on:click={() => page++}>
			Next
			<Icon src={ChevronRight} theme="mini" class="w-5 h-5" aria-hidden="true" />
		</Button>
	</div>
</div>
