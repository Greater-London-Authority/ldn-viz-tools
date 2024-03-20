<script lang="ts">
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import { classNames } from '../utils/classNames';

	import type { SidebarConfig } from '../sidebar/types';

	export let sidebar: SidebarConfig = {
		inFrom: 'right',
		startOpen: false
	};

	let { inFrom, startOpen } = sidebar;

	export const isOpen = writable(startOpen);

	const layoutClasses = {
		left: 'bg-core-yellow-500 flex-row-reverse',
		right: 'bg-core-green-500'
	};

	const darkThemeClasses = '';
	const lightThemeClasses = '';

	const themeClasses = [darkThemeClasses, lightThemeClasses];

	$: wrapperClasses = classNames('min-h-dvh flex relative', ...themeClasses, layoutClasses[inFrom]);

	setContext('sidebarIsOpen', isOpen);
	setContext('sidebarConfig', sidebar);
</script>

<main class={wrapperClasses}>
	<div class="bg-slate-600 w-full">
		<slot name="main">
			Provide some main content Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
			aliquet fermentum nulla. Suspendisse porta gravida ipsum ac tincidunt. Donec ac rutrum ligula.
			Duis tortor erat, blandit non ante vitae, facilisis finibus arcu. Phasellus eget felis tempor,
			eleifend lectus quis, facilisis lectus. Proin a turpis ut tortor bibendum sagittis.
			Pellentesque accumsan aliquet eros, id semper urna blandit at. Curabitur accumsan felis eu sem
			egestas, sit amet porta orci semper. Quisque semper varius sodales. Maecenas ut justo nec
			velit venenatis vestibulum. Suspendisse leo diam, consequat at sapien et, sodales ultricies
			nisi. Maecenas ipsum lacus, tristique faucibus interdum nec, scelerisque in enim. Donec nec
			interdum dolor. Maecenas eget nisi turpis. Proin ut auctor nisl. Etiam id est ultricies,
			rhoncus quam ac, dignissim justo. Ut elementum sapien et mi mollis condimentum. Pellentesque
			quis ex efficitur, ullamcorper massa non, pellentesque sem. Aenean a enim scelerisque, varius
			dolor eu, semper sem. Etiam non enim vitae odio scelerisque tempus et vitae risus. Nulla non
			tristique nibh. Nam consectetur molestie facilisis. Nam augue elit, cursus sed turpis sit
			amet, interdum pharetra ex. Nunc quis laoreet enim. Aliquam et dignissim lacus.
		</slot>
	</div>
	<slot name="sidebar">Sidebar</slot>
</main>
