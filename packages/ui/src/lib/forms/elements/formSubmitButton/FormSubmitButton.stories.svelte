<script context="module" lang="ts">
	import FormSubmitButton from './FormSubmitButton.svelte';
	import Form from '../../Form.svelte';

	export const meta = {
		title: 'Ui/Forms/FormSubmitButton',
		component: FormSubmitButton,
		argTypes: {
			onSubmit: {
				control: { type: 'none' }
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
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { ArrowRight } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	const waitTwoSeconds = (event: MouseEvent | TouchEvent) => {
		return new Promise((r) => setTimeout(r, 2000));
	};

	const doNothing = (event: MouseEvent | TouchEvent) => {};
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
			Continue <Icon src={ArrowRight} class="ml-2 w-6 h-6" />
		</FormSubmitButton>
	</Form>
</Story>

<Story name="Async">
	<Form>
		<FormSubmitButton slot="leftButtons" async onSubmit={waitTwoSeconds} />
	</Form>
</Story>

<Story name="Customise Button">
	<Form>
		<FormSubmitButton
			slot="leftButtons"
			emphasis="secondary"
			condition="warning"
			variant="square"
			size="lg"
			onSubmit={doNothing}
		>
			<Icon src={ArrowRight} class="w-10 h-10" />
		</FormSubmitButton>
	</Form>
</Story>
