<script lang="ts">
	/**
	 * The `<AppShell>` is responsible for positioning and orchestrating page content.
	 * It currently mainly coordinate the [Sidebar](./?path=/docs/ui-components-layout-and-themes-sidebar--documentation) and the other page content.
	 *
	 * @component
	 */

	import { fade, slide } from 'svelte/transition';
	import { getSidebarState, setSidebarState } from '../sidebar/sidebarState.svelte';
	import { heightLookup, transitionAxis, widthLookup } from '../sidebar/sidebarUtils';
	import type { SidebarPlacement } from '../sidebar/types';
	import { classNames } from '../utils/classNames';
	import { getSetting } from './utils/getSettingByScreenWidth';

	interface Props {
		/**
		 * Object expressing the sidebar position (`top`, `bottom`, `left`, `right`) at different screen sizes.
		 * The keys are size breakpoints: for very small browser windows, the `initial` position will be used; for larger windows, the position corresponding to the largest breakpoint that is smaller than the window will be used.
		 * Breakpoints should be ordered in ascending order of size.
		 */
		sidebarPlacement?: SidebarPlacement;
		/**
		 * If the sidebar is `alwaysOpen`, the sidebar will always be open and the close control will not be displayed.
		 * As for the position, this can be responsive to the browser window size.
		 * `sidebarAlwaysOpen` is an object where the keys are size breakpoints (or `initial`, corresponding to 0 pixels) and the values are Booleans indicating whether the sidebar is always open at that size.
		 */
		sidebarAlwaysOpen?: { [key: string]: boolean };
		/**
		 * If `true`, then opening the sidebar will push other content to the side (or up/down, depending on the sidebar position), rather than the sidebar being superimposed on the content.
		 */
		sidebarPush?: boolean;
		/**
		 * If `true`, then the sidebar will be open when the page first loads.
		 */
		startOpen?: boolean;

		/**
		 * A tailwind class or classes used to set or override the height of the Appshell wrapper.
		 */
		heightClass?: string;
		main?: import('svelte').Snippet;
		sidebar?: import('svelte').Snippet;
	}

	let {
		sidebarPlacement = { initial: 'bottom', md: 'right' },
		sidebarAlwaysOpen = { initial: false },
		sidebarPush = false,
		startOpen = true,
		heightClass = 'min-h-dvh',
		main,
		sidebar
	}: Props = $props();

	let innerWidth = $state(0);

	/*
		Below are settings for Breakpoint Prop and Always Open Prop.
		This is the secret sauce that allows us to pass an object containing different props per breakpoint.
		The breakpoints are configurable if required, but use defaults: Demo to follow.
		See also appShell/utils/getSettingByScreenWidth
	*/
	// Placement is *pulled* from here by the sidebar state rather than assigned
	// into it, so there is no window in which a stale value is visible and no
	// dependence on whether this component or its child initialises first.
	setSidebarState(() => getSetting(sidebarPlacement, innerWidth));
	let sidebarState = getSidebarState();

	(() => {
		if (getSetting(sidebarAlwaysOpen, innerWidth)) {
			sidebarState.isOpen = true;
		} else {
			sidebarState.isOpen = startOpen;
		}
	})();

	const respondToWidthChange = (innerWidth: number) => {
		// if "sidebarAlwaysOpen" at this size, then we are open at this size
		sidebarState.isAlwaysOpen = getSetting(sidebarAlwaysOpen, innerWidth);

		return sidebarState.isAlwaysOpen ? sidebarState.isAlwaysOpen : sidebarState.isOpen;
	};

	// Classes applied to the wrapper element
	let wrapperClasses = $derived(
		classNames('h-full w-full flex relative', heightClass) // overflow-hidden
	);

	let sidebarWidthClasses = $derived(
		widthLookup[sidebarState.width ?? 'standard'][sidebarState.placement]
	);
	let sidebarHeightClasses = $derived(
		heightLookup[sidebarState.width ?? 'standard'][sidebarState.placement]
	);

	$effect(() => {
		sidebarState.isOpen = respondToWidthChange(innerWidth);
	});
</script>

<!-- In order to get consistent width between code and css we need to use the innerWidth of the window -->
<svelte:window bind:innerWidth />

<div class={wrapperClasses}>
	<main class={classNames('w-full', sidebarState.placement === 'right' ? '' : 'order-1')}>
		<!-- The main content of the page. -->
		{#if main}{@render main()}{:else}
			<p class="product body font-bold">
				Provide some main content. The main content you provide should have appropriate padding
				applied...
			</p>
		{/if}
	</main>

	{#if innerWidth !== 0}
		<div transition:fade={{ duration: 200 }}>
			<!-- a `<Sidebar>` component -->
			{#if sidebar}{@render sidebar()}{:else}Provide a snippet to render a Sidebar{/if}
		</div>
	{/if}

	<!-- This div exists to push content to the side of the sidebar	when sidebarPush is set to true-->
	{#if (sidebarState.isAlwaysOpen || (sidebarPush && sidebarState.isOpen)) && sidebarState.width}
		<div
			class={classNames('flex', sidebarHeightClasses)}
			transition:slide={{ duration: 300, axis: transitionAxis[sidebarState.placement] }}
		>
			<div class={classNames('shrink-0', sidebarWidthClasses)}></div>
		</div>
	{/if}
</div>
