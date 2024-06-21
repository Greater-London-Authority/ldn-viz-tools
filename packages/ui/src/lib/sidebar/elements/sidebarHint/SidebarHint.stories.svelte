<script context="module">
	import SidebarHint from './SidebarHint.svelte';

	export const meta = {
		title: 'Ui/Sidebar/elements/SidebarHint',
		component: SidebarHint,

		argTypes: {
			hintType: {
				options: ['tooltip', 'popover', 'modal'],
				control: { type: 'radio' }
			}
		},
		args: {
			hintType: 'modal'
		}
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<SidebarHint {...args}>
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
		labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
		laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
		voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
		non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	</SidebarHint></Template
>

<Story name="Default (Modal)" source />

<Story name="Modal width" source>
	<SidebarHint hintType="modal" modalWidth="5xl">
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
		labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
		laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
		voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
		non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	</SidebarHint>
</Story>

<Story name="Tooltip" source>
	<SidebarHint hintType="tooltip">
		'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
		commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
		eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
		officia deserunt mollit anim id est laborum.'
	</SidebarHint>
</Story>

<Story name="Popover" source>
	<SidebarHint hintType="popover">
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
		labore et dolore magna aliqua.'
	</SidebarHint>
</Story>

<Story name="With Custom Label" source>
	<SidebarHint hintType="modal" hintLabel="Custom Label">
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
		labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
		laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
		voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
		non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	</SidebarHint>
</Story>
