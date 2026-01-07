<script>
	import { Button } from '@ldn-viz/ui';
	import { ArrowPath } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	const handle = () => window.location.reload();
</script>

<div class="invisible flex flex-col space-y-1 sm:visible">
	<Button
		variant="square"
		emphasis="secondary"
		title="Refresh page"
		class="pointer-events-auto shadow dark:border dark:border-color-ui-border-primary"
		onclick={handle}
	>
		<Icon src={ArrowPath} class="h-8 w-8 p-1" />
	</Button>
</div>
