<script context="module" lang="ts">
	import Form from '../../Form.svelte';
	import FormSubmitButton from './FormSubmitButton.svelte';

	export const meta = {
		title: 'Ui/Components/Form/FormSubmitButton',
		component: FormSubmitButton,
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
	};
</script>

<script lang="ts">
	import { ArrowRight } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	const waitTwoSeconds = () => {
		return new Promise((r) => setTimeout(r, 2000));
	};

	const doNothing = () => {};
</script>

<Template let:args>
	<Form>
		<FormSubmitButton slot="leftButtons" {...args} onSubmit={waitTwoSeconds} />
	</Form>
</Template>

<Story name="Default" source />

<Story name="Label">
	<Form>
		<FormSubmitButton slot="leftButtons" onSubmit={doNothing}>
			Continue <Icon src={ArrowRight} theme="mini" class="ml-2 w-5 h-5" />
		</FormSubmitButton>
	</Form>
</Story>

<Story name="Async">
	<Form>
		<FormSubmitButton slot="leftButtons" async onSubmit={waitTwoSeconds} />
	</Form>
</Story>

<!-- If the button has no visible `label`, ensure a `title` is added for screen reader use, as below. -->

<Story name="Customise Button">
	<Form>
		<FormSubmitButton
			slot="leftButtons"
			variant="square"
			size="lg"
			onSubmit={doNothing}
			title="submit"
		>
			<Icon src={ArrowRight} class="w-6 h-6" />
			Custom Buttton
		</FormSubmitButton>
	</Form>
</Story>
