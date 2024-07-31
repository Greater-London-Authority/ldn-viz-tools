<script context="module">
	import AsyncButton from './AsyncButton.svelte';

	export const meta = {
		title: 'Ui/AsyncButton',
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
				},
			},
			emphasis: {
				options: ['primary', 'secondary'],
				control: { type: 'radio' }
			},
			working: {
				control: 'none',
			},
			variant: {
				options: ['brand', 'solid', 'outline', 'text', 'square'],
				control: { type: 'select' }
			},
			condition: {
				options: ['default', 'success', 'error', 'warning'],
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
	import { ArrowDownCircle, Camera } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	const waitThreeSeconds = (event: MouseEvent | TouchEvent) => {
		return new Promise((r) => setTimeout(r, 3000));
	};

	const waitFiveSeconds = (event: MouseEvent | TouchEvent) => {
		return new Promise((r) => setTimeout(r, 5000));
	};

	let working = false

	const variants = ['solid', 'brand', 'outline', 'text', 'square']
	const conditions = ['default', 'success', 'warning', 'error']
</script>

<Template let:args>
	<AsyncButton {...args} bind:working title="Simulates a three second operation" onClick={waitThreeSeconds}>
		Click me!
	</AsyncButton>
	<div class="mt-4">
		Working:
		<span
			class:text-core-red-500={!working}
			class:text-core-green-500={working}>
			{working}
		</span>
	</div>
</Template>

<Story
	name="Default"
	source
/>

<Story name="Variants & Conditions">
	<div class="flex flex-col gap-4">
		{#each conditions as condition}
			<div class="flex gap-4">
				{#each variants as variant}
					<AsyncButton {variant} {condition} onClick={waitFiveSeconds}>
						{#if variant === 'square'}
							<span class="leading-4">Squ are</span>
						{:else}
							<span class="capitalize">{variant}</span>
						{/if}
					</AsyncButton>
				{/each}
			</div>
		{/each}
	</div>
</Story>