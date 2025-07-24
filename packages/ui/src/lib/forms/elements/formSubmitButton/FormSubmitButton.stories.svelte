<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Form from '../../Form.svelte';
	import FormSubmitButton from './FormSubmitButton.svelte';

	const { Story } = defineMeta({
		title: 'Ui/Components/Form/FormSubmitButton',
		component: FormSubmitButton,
		tags: ['autodocs'],
		argTypes: {
			onSubmit: {
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
			}
		}
	});
</script>

<script lang="ts">
	import { ArrowRight } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	const waitTwoSeconds = () => {
		return new Promise((r) => setTimeout(r, 2000));
	};

	const doNothing = () => {};
</script>

<Story name="Default" source>
	{#snippet template(args)}
		<Form>
			{#snippet leftButtons()}
				<FormSubmitButton {...args} onSubmit={waitTwoSeconds} />
			{/snippet}
		</Form>
	{/snippet}
</Story>

<Story name="Label">
	{#snippet template()}
		<Form>
			{#snippet leftButtons()}
				<FormSubmitButton onSubmit={doNothing}>
					Continue <Icon src={ArrowRight} theme="mini" class="ml-2 h-5 w-5" />
				</FormSubmitButton>
			{/snippet}
		</Form>
	{/snippet}
</Story>

<Story name="Async">
	{#snippet template()}
		<Form>
			{#snippet leftButtons()}
				<FormSubmitButton async onSubmit={waitTwoSeconds} />
			{/snippet}
		</Form>
	{/snippet}
</Story>

<!-- If the button has no visible `label`, ensure a `title` is added for screen reader use, as below. -->

<Story name="Customise Button">
	{#snippet template()}
		<Form>
			{#snippet leftButtons()}
				<FormSubmitButton variant="square" size="lg" onSubmit={doNothing} title="submit">
					<Icon src={ArrowRight} class="h-6 w-6" />
					Custom Buttton
				</FormSubmitButton>
			{/snippet}
		</Form>
	{/snippet}
</Story>
