<script>
	import { Button } from '@ldn-viz/ui';
	import { ArrowPath } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	const handler = (e) => window.location.reload();
	const keyHandler = (e) => {
		if (e.key === 'Enter') {
			handler();
		}
	};
</script>

<div class="flex flex-col space-y-1 invisible sm:visible">
	<Button
		variant="square"
		emphasis="secondary"
		title="Refresh page"
		class="dark:bg-core-grey-800 dark:text-white hover:dark:bg-core-grey-500"
		on:click={handler}
		on:keypress={keyHandler}
	>
		<Icon src={ArrowPath} class="w-8 h-8 p-1" />
	</Button>
</div>
