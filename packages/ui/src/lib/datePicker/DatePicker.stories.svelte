<script context="module" lang="ts">
	import DatePicker from './DatePicker.svelte';

	export const meta = {
		title: 'Ui/DatePicker',
		component: DatePicker
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<DatePicker {...args} />
</Template>

<Story name="Default" />

<Story name="End Date" args={{ isRange: true, isMultipane: true }} />
