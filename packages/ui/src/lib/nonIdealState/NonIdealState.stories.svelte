<script context="module" lang="ts">
	import NonIdealState from './NonIdealState.svelte';

	export const meta = {
		title: 'Ui/NonIdealState',
		component: NonIdealState
	};
</script>

<script lang="ts">
	import { QuestionMarkCircle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<div class="w-96 h-96">
		<NonIdealState {...args}>The server did not respond.</NonIdealState>
	</div>
</Template>

<Story name="Default" source />

<Story name="Custom title">
	<div class="w-96 h-96">
		<NonIdealState>
			<svelte:fragment slot="title">Oh no!</svelte:fragment>
			Something terrible has happened and nothing can be shown!
		</NonIdealState>
	</div>
</Story>

<Story name="Custom title and icon">
	<div class="w-96 h-96">
		<NonIdealState>
			<svelte:fragment slot="icon">
				<Icon
					src={QuestionMarkCircle}
					theme="solid"
					class="w-12 h-12 stroke-core-grey-200"
					aria-hidden="true"
				/>
			</svelte:fragment>

			<svelte:fragment slot="title">Something has gone wrong</svelte:fragment>

			But who knows what?
		</NonIdealState>
	</div>
</Story>

<Story
	name="
Spinner"
>
	<div class="w-96 h-96">
		<NonIdealState spinner={true}>
			<svelte:fragment slot="title">Something is loading</svelte:fragment>

			Hopefully it will be ready soon.
		</NonIdealState>
	</div>
</Story>

<Story name="Long body">
	<div class="w-full h-96">
		<NonIdealState>
			<svelte:fragment slot="icon">
				<Icon
					src={QuestionMarkCircle}
					theme="solid"
					class="w-12 h-12 stroke-core-grey-200"
					aria-hidden="true"
				/>
			</svelte:fragment>

			<svelte:fragment slot="title">Something has gone wrong</svelte:fragment>

			Quisquam voluptatem qui velit qui pariatur ut. Rerum qui dolor nemo accusamus non quam
			occaecati. Corrupti est ut sit eos et perspiciatis rerum ducimus. Excepturi blanditiis
			molestias neque itaque quia ut. Fugiat rerum in quidem rerum esse assumenda nesciunt eum. Sit
			delectus sed aut excepturi eos atque possimus. Iure vel delectus sequi enim. Est et ipsam
			totam labore esse consectetur veniam rerum.
		</NonIdealState>
	</div>
</Story>
