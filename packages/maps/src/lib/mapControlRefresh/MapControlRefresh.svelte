<script>
	import { Button } from '@ldn-viz/ui';
	import { ArrowPath } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	const handle = () => window.location.reload();
</script>

<div class="flex flex-col space-y-1 invisible sm:visible">
	<Button
		variant="square"
		emphasis="secondary"
		title="Refresh page"
		class="pointer-events-auto"
		on:click={handle}
	>
		<Icon src={ArrowPath} class="w-8 h-8 p-1" />
	</Button>
</div>
