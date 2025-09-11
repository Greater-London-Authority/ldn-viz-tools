<script context="module">
	/**
	 * The `Header` component displays the heading for a column, optionally with arrows to indicate sort order.
	 */
	import Header from './Header.svelte';

	export const meta = {
		title: 'Tables/Components/Renderers/Header',
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
	import HeaderModalDemo from './HeaderModalDemo.svelte';
</script>

<Template let:args>
	<Header {...args} />
</Template>

<Story name="Default" source />

<Story name="With a hint string - tooltip" source>
	<Header label={'A column'} hintText={'An explanation'} />
</Story>

<Story name="With a hint string - popover" source>
	<Header label={'A column'} hintText={'An explanation'} hintType="popover" />
</Story>

<Story name="With a hint string - modal" source>
	<Header label={'A column'} hintText={'An explanation'} hintType="modal" />
</Story>

<Story name="With a hint component - tooltip" source>
	<Header label={'A column'} hintComponent={HeaderModalDemo} />
</Story>

<Story name="With a hint component - popover" source>
	<Header label={'A column'} hintComponent={HeaderModalDemo} hintType="popover" />
</Story>

<Story name="With a hint component - modal" source>
	<Header label={'A column'} hintComponent={HeaderModalDemo} hintType="modal" />
</Story>
