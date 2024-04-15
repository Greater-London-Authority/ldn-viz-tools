<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { slide } from 'svelte/transition';
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

	export let sidebarPlacement: SidebarPlacement = { initial: 'bottom', md: 'right' };
	export let sidebarAlwaysOpen: { [key: string]: AlwaysOpenType } | undefined = undefined;
	export let sidebarPush = false;
	export let startOpen = true;
	export const isOpen = writable(startOpen);

	export const isAlwaysOpen = writable('false');
	export const sidebarPlacementStore = writable(sidebarPlacement);

	// Classes applied to the wrapper element
	// wrapperFlowLookup classes determine the flex direction based on sidebar placement
	$: wrapperClasses = classNames('h-full min-h-dvh flex relative', wrapperFlowLookup[bpProp]);

	$: sidebarWidthClasses = widthLookup[$sidebarWidthStore][bpProp];
	$: sidebarHeightClasses = heightLookup[$sidebarWidthStore][bpProp];

	$: innerWidth = 0;

	/*
		Below are settings for Breakpoint Prop and Always Open Prop.
		This is the secret sause that allows us to pass an object containing different props per breakpoint.
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
		<slot name="main">
			<p class="font-bold">
				Provide some main content. The main cotent you provide should have appropriate padding
				applied...
			</p>
		</slot>
	</main>

	<slot name="sidebar">Sidebar</slot>

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
