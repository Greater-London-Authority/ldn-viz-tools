<script context="module">
	/**
	 * The `Header` component displays the heading for a column, optionally with arrows to indicate sort order.
	 */
	import Header from './Header.svelte';

	export const meta = {
		title: 'Tables/Encodings/Header',
		component: Header,

		argTypes: {
			order: {
				options: ['asc', 'desc', undefined],
				control: { type: 'radio' }
			}
		},

		args: {
			label: 'Age'
		}
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<Header {...args} />
</Template>

<Story name="Default" source />
