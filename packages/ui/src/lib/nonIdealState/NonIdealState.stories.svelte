<script module lang="ts">
	import { QuestionMarkCircle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import NonIdealState from './NonIdealState.svelte';

	/**
	 * The `<NonIdealState>` component acts as a placeholder for when other components are not ready render, or are prevented from successfully rendering by an error.
	 * It can include an icon or spinner, and explanatory text.
	 *
	 * **Alternatives**: if no explanatory text is required, and a placeholder is not needed to prevent content re-flows, then consider using the [LoadingIndicator](./?path=/docs/ui-components-loadingindicator--documentation) component.
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components/NonIdealState',
		component: NonIdealState,
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<NonIdealState {...args}>The server did not respond.</NonIdealState>
	{/snippet}
</Story>

<Story name="Custom title">
	{#snippet template(args)}
		<div class="h-96 w-96">
			<NonIdealState {...args}>
				{#snippet title()}
					Oh no!
				{/snippet}
				Something terrible has happened and nothing can be shown!
			</NonIdealState>
		</div>
	{/snippet}
</Story>

<Story name="Custom title and icon">
	{#snippet template(args)}
		<div class="h-96 w-96">
			<NonIdealState {...args}>
				{#snippet icon()}
					<Icon
						src={QuestionMarkCircle}
						theme="solid"
						class="h-6 w-6 text-color-ui-primary"
						aria-hidden="true"
					/>
				{/snippet}

				{#snippet title()}
					Something has gone wrong
				{/snippet}

				But who knows what?
			</NonIdealState>
		</div>
	{/snippet}
</Story>

<Story
	name="
Spinner"
>
	{#snippet template(args)}
		<div class="h-96 w-96">
			<NonIdealState spinner={true} {...args}>
				{#snippet title()}
					Something is loading
				{/snippet}

				Hopefully it will be ready soon.
			</NonIdealState>
		</div>
	{/snippet}
</Story>

<!-- When `prefersReducedMotion` is true and `spinner` is true, a static clock icon will be rendered instead of `Spinner`. To test this in Chrome, open DevTools (`Command+Option+I`), open Commands drawer (`Command+Shift+P`), type `reduce` and press `Enter`.  -->
<Story name="Reduced motion">
	{#snippet template(args)}
		<div class="h-96 w-96">
			<NonIdealState spinner {...args}>
				{#snippet title()}
					Something is loading
				{/snippet}
				Hopefully it will be ready soon.
			</NonIdealState>
		</div>
	{/snippet}
</Story>

<Story name="Long body">
	{#snippet template(args)}
		<div class="h-96 w-full">
			<NonIdealState {...args}>
				{#snippet icon()}
					<Icon src={QuestionMarkCircle} theme="solid" class="h-6 w-6" aria-hidden="true" />
				{/snippet}

				{#snippet title()}
					Something has gone wrong
				{/snippet}

				Quisquam voluptatem qui velit qui pariatur ut. Rerum qui dolor nemo accusamus non quam
				occaecati. Corrupti est ut sit eos et perspiciatis rerum ducimus. Excepturi blanditiis
				molestias neque itaque quia ut. Fugiat rerum in quidem rerum esse assumenda nesciunt eum.
				Sit delectus sed aut excepturi eos atque possimus. Iure vel delectus sequi enim. Est et
				ipsam totam labore esse consectetur veniam rerum.
			</NonIdealState>
		</div>
	{/snippet}
</Story>
