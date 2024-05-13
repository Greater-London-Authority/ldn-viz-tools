<script lang="ts">
	/**
	 * The `<AppShell>` is responsible for positioning and orchestrating page content.
	 * It currently mainly coordinate the [Sidebar](./?path=/docs/ui-sidebar--documentation) and the other page content.
	 *
	 * @component
	 */

	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { fade, slide } from 'svelte/transition';
	import {
		heightLookup,
		transitionAxis,
		widthLookup,
		wrapperFlowLookup
	} from '../sidebar/sidebarUtils';
	import { sidebarWidthStore } from '../sidebar/stores';
	import type { AlwaysOpenType, SidebarPlacement } from '../sidebar/types';
	import { classNames } from '../utils/classNames';
	import { getSetting } from './utils/getSettingByScreenWidth';

	/**
	 * Object expressing the sidebar position (`top`, `bottom`, `left`, `right`) at different screen sizes.
	 * The keys are size breakpoints: for very small browser windows, the `initial` position will be used; for larger windows, the position corresponding to the largest breakpoint that is smaller than the window will be used.
	 * Breakpoints should be ordered in ascending order of size.
	 */
	export let sidebarPlacement: SidebarPlacement = { initial: 'bottom', md: 'right' };

	/**
	 * If the sidebar is `alwaysOpen`, the sidebar will always be open and the close control will not be displayed.
	 * As for the position, this can be responsive to the browser window size.
	 * `sidebarAlwaysOpen` is an object where the keys are size breakpoints (or `initial`, corresponding to 0 pixels) and the values are Booleans indicating whether the sidebar is always open at that size.
	 */
	export let sidebarAlwaysOpen: { [key: string]: AlwaysOpenType } | undefined = undefined;

	/**
	 * If `true`, then opening the sidebar will push other content to the side (or up/down, depending on the sidebar position), rather than the sidebar being superimposed on the content.
	 */
	export let sidebarPush = false;

	/**
	 * If `true`, then the sidebar will be open when the page first loads.
	 */
	export let startOpen = true;

	/**
	 * Store recording/controlling whether the sidebar is currently open.
	 */
	export const isOpen = writable(startOpen);

	/**
	 * Store recording/controlling whether the sidebar is set to be `alwaysOpen` at the current window size.
	 */
	export const isAlwaysOpen = writable('false');

	/**
	 * Store recording/controlling the sidebar's current position.
	 */
	export const sidebarPlacementStore = writable('bottom');

	// Classes applied to the wrapper element
	// wrapperFlowLookup classes determine the flex direction based on sidebar placement
	$: wrapperClasses = classNames('h-full min-h-dvh flex relative', wrapperFlowLookup[bpProp]);

	$: sidebarWidthClasses = widthLookup[$sidebarWidthStore][bpProp];
	$: sidebarHeightClasses = heightLookup[$sidebarWidthStore][bpProp];

	$: innerWidth = 0;

	/*
		Below are settings for Breakpoint Prop and Always Open Prop.
		This is the secret sauce that allows us to pass an object containing different props per breakpoint.
		The breakpoints are configurable if required, but use defaults: Demo to follow.
		See also appShell/utils/getSettingByScreenWidth 
	*/
	// bpProp = breakpoint prop - better name?
	$: bpProp = getSetting(sidebarPlacement, innerWidth);
	$: aoProp = sidebarAlwaysOpen ? getSetting(sidebarAlwaysOpen, innerWidth) : undefined;

	$: if (aoProp === 'true') {
		sidebarPush = true;
		$isOpen = true;
	}

	$: $isAlwaysOpen = aoProp;
	$: $sidebarPlacementStore = bpProp;

	setContext('sidebarAlwaysOpen', isAlwaysOpen);
	setContext('sidebarIsOpen', isOpen);
	setContext('sidebarPush', sidebarPush);
	setContext('sidebarPlacement', sidebarPlacementStore);
</script>

<!-- In order to get consistent width between code and css we need to use the innerWidth of the window -->
<svelte:window bind:innerWidth />

<div class={wrapperClasses}>
	<main class={'grow'}>
		<!-- The main content of the page. -->
		<slot name="main">
			<p class="font-bold">
				Provide some main content. The main content you provide should have appropriate padding
				applied...
			</p>
		</slot>
	</main>

	{#if innerWidth !== 0}
		<div transition:fade={{ duration: 200 }}>
			<!-- a `<Sidebar>` component -->
			<slot name="sidebar">Sidebar</slot>
		</div>
	{/if}

	<!-- This div exists to push content to the side of the sidebar	when sidebarPush is set to true-->
	{#if sidebarPush && $isOpen && $sidebarWidthStore}
		<div
			class={classNames('flex', sidebarHeightClasses)}
			transition:slide={{ duration: 300, axis: transitionAxis[bpProp] }}
		>
			<div class={classNames('shrink-0', sidebarWidthClasses)} />
		</div>
	{/if}
</div>
