<script context="module" lang="ts">
	import Form from '../../Form.svelte';
	import FormBackButton from './FormBackButton.svelte';

	export const meta = {
		title: 'Ui/Form/FormBackButton',
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

	const waitOneSeconds = () => {
		return new Promise((r) => setTimeout(r, 1000));
	};
</script>

<Template let:args>
	<Form>
		<FormBackButton slot="leftButtons" {...args} onBack={waitOneSeconds} />
	</Form>
</Template>

<Story name="Default" source />

<Story name="Label">
	<Form>
		<FormBackButton slot="leftButtons" label="Previous page" onBack={waitOneSeconds} />
	</Form>
</Story>

<Story name="Async">
	<Form>
		<FormBackButton slot="leftButtons" async onBack={waitOneSeconds} />
	</Form>
</Story>

<Story name="Customise Button">
	<Form>
		<FormBackButton
			slot="leftButtons"
			condition="warning"
			variant="square"
			size="lg"
			async
			onBack={waitOneSeconds}
		>
			<Icon src={ArrowLeft} class="w-10 h-10" />
		</FormBackButton>
	</Form>
</Story>
