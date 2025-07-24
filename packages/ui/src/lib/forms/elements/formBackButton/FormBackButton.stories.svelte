<script module lang="ts">
	import Form from '../../Form.svelte';
	import FormBackButton from './FormBackButton.svelte';

	export const meta = {
		title: 'Ui/Components/Form/FormBackButton',
		component: FormBackButton,
		argTypes: {
			onBack: {
				type: 'function',
				control: 'none',
				table: {
					type: {
						summary: 'function',
						detail: '(event: MouseEvent | TouchEvent) => void | Promise<unknown>;'
					}
				}
			},
			async: {
				control: { type: 'boolean' }
			},
			working: {
				control: { type: 'none' }
			},
			label: {
				type: 'text',
				control: 'text'
			}
		}
	};
</script>

<script lang="ts">
	import { ArrowLeft } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	const waitOneSeconds = () => {
		return new Promise((r) => setTimeout(r, 1000));
	};
</script>

<Template>
	{#snippet children({ args })}
		<Form>
			{#snippet leftButtons()}
				<FormBackButton {...args} onBack={waitOneSeconds} />
			{/snippet}
		</Form>
	{/snippet}
</Template>

<Story name="Default" source />

<Story name="Label">
	<Form>
		{#snippet leftButtons()}
			<FormBackButton label="Previous page" onBack={waitOneSeconds} />
		{/snippet}
	</Form>
</Story>

<Story name="Async">
	<Form>
		{#snippet leftButtons()}
			<FormBackButton async onBack={waitOneSeconds} />
		{/snippet}
	</Form>
</Story>

<!-- If the button has no visible `label`, ensure a `title` is added for screen reader use, as below. -->

<Story name="Customise Button">
	<Form>
		{#snippet leftButtons()}
			<FormBackButton
				emphasis="primary"
				variant="square"
				size="lg"
				async
				onBack={waitOneSeconds}
				title="Go back"
			>
				<Icon src={ArrowLeft} class="mb-1 h-6 w-6" />
				Go Back
			</FormBackButton>
		{/snippet}
	</Form>
</Story>
