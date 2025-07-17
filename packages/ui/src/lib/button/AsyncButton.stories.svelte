<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { DocumentArrowUp } from '@steeze-ui/heroicons';
	import AsyncButton from './AsyncButton.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { type AsyncButtonProps, type ButtonProps } from './types';

	/**
	 * The `<AsyncButton>` component wraps the `<button>` component for slow
	 * asynchronous operations such as _HTTP_ requests. A `<LoadingIndicator>` is shown
	 * as the button label while the `onClick` function is executing. The button
	 * is also disabled during this period.
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components/Buttons/AsyncButton',
		component: AsyncButton,
		tags: ['autodocs'],
		render: defaultTemplate,
		argTypes: {
			onclick: {
				type: 'function',
				control: undefined,
				table: {
					type: {
						summary: 'function',
						detail: '(event: MouseEvent | TouchEvent) => void | Promise<unknown>;'
					}
				}
			},
			emphasis: {
				options: ['primary', 'secondary', 'positive', 'negative', 'caution'],
				control: { type: 'radio' }
			},
			working: {
				control: undefined
			},
			variant: {
				options: ['brand', 'solid', 'outline', 'text', 'square'],
				control: { type: 'select' }
			},
			size: {
				options: ['sm', 'md', 'lg'],
				control: { type: 'radio' }
			},
			type: {
				options: ['button', 'submit'],
				control: { type: 'radio' }
			}
		},
		args: {
			variant: 'solid'
		}
	});

	const waitThreeSeconds = () => {
		return new Promise((r) => setTimeout(r, 3000));
	};

	let working = $state(false);

	const variants: AsyncButtonProps['variant'][] = ['solid', 'brand', 'outline', 'text', 'square'];
	const emphasis: AsyncButtonProps['emphasis'][] = [
		'primary',
		'secondary',
		'positive',
		'caution',
		'negative'
	];
</script>

{#snippet defaultTemplate(args: AsyncButtonProps)}
	<AsyncButton {...args} bind:working onclick={waitThreeSeconds}>Click me!</AsyncButton>
	<div class="mt-4">
		Working:
		<span class:text-color-ui-negative={!working} class:text-color-ui-positive={working}>
			{working}
		</span>
	</div>
{/snippet}

<Story name="Default" />

<Story name="Variants & emphasis">
	{#snippet template(args)}
		<div class="flex flex-col gap-4">
			{#each emphasis as emphasis}
				<div class="flex items-center gap-4">
					{#each variants as variant}
						<AsyncButton
							{...args}
							{variant}
							{emphasis}
							size={variant === 'square' ? 'lg' : 'md'}
							onclick={waitThreeSeconds}
							class="capitalize"
						>
							{#if variant === 'square'}
								<Icon src={DocumentArrowUp} class="mb-1 h-6 w-6" aria-hidden="true" />
								{variant}
							{:else}
								{variant}
							{/if}
						</AsyncButton>
					{/each}
				</div>
			{/each}
		</div>
	{/snippet}
</Story>

<!-- When `prefersReducedMotion` is true and `spinner` is true, a static clock icon will be rendered instead of `Spinner`. To test this in Chrome, open DevTools (`Command+Option+I`), open Commands drawer (`Command+Shift+P`), type `reduce` and press `Enter`. -->
<Story name="Reduced motion">
	{#snippet template(args)}
		<AsyncButton {...args} onclick={waitThreeSeconds} class="capitalize">Click me!</AsyncButton>
	{/snippet}
</Story>
