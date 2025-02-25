<script context="module">
	import { DocumentArrowUp } from '@steeze-ui/heroicons';
	import AsyncButton from './AsyncButton.svelte';

	export const meta = {
		title: 'Ui/Components/Buttons/AsyncButton',
		component: AsyncButton,
		argTypes: {
			onClick: {
				type: 'function',
				control: 'none',
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
				control: 'none'
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
	};
</script>

<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	const waitThreeSeconds = () => {
		return new Promise((r) => setTimeout(r, 3000));
	};

	const waitFiveSeconds = () => {
		return new Promise((r) => setTimeout(r, 5000));
	};

	let working = false;

	type Variant = 'brand' | 'square' | 'solid' | 'outline' | 'text' | undefined;
	type Emphasis = 'primary' | 'secondary' | 'caution' | 'positive' | 'negative' | undefined;

	const variants: Variant[] = ['solid', 'brand', 'outline', 'text', 'square'];
	const emphasis: Emphasis[] = ['primary', 'secondary', 'positive', 'caution', 'negative'];
</script>

<Template let:args>
	<AsyncButton
		{...args}
		bind:working
		title="Simulates a three second operation"
		onClick={waitThreeSeconds}
	>
		Click me!
	</AsyncButton>
	<div class="mt-4">
		Working:
		<span class:text-color-ui-negative={!working} class:text-color-ui-positive={working}>
			{working}
		</span>
	</div>
</Template>

<Story name="Default" source />

<Story name="Variants & emphasis">
	<div class="flex flex-col gap-4">
		{#each emphasis as emphasis}
			<div class="flex items-center gap-4">
				{#each variants as variant}
					<AsyncButton
						{variant}
						{emphasis}
						size={variant === 'square' ? 'lg' : 'md'}
						onClick={waitFiveSeconds}
						class="capitalize"
					>
						{#if variant === 'square'}
							<Icon src={DocumentArrowUp} class="w-8 h-8 mb-0.5" aria-hidden="true" />
							{variant}
						{:else}
							{variant}
						{/if}
					</AsyncButton>
				{/each}
			</div>
		{/each}
	</div>
</Story>

<!-- When `prefersReducedMotion` is true and `spinner` is true, a static clock icon will be rendered instead of `Spinner`. To test this, open DevTools (`Command+Option+I`), open Commands drawer (`Command+Shift+P`), type `reduce` and press `Enter`.  -->
<Story name="Reduced motion">
	<AsyncButton onClick={waitFiveSeconds} class="capitalize">Click me!</AsyncButton>
</Story>
