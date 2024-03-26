<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { widthLookup, wrapperFlowLookup } from '../sidebar/sidebarUtils';
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
	$: wrapperClasses = classNames(
		'h-full min-h-dvh flex relative bg-core-yellow-50 xl:bg-core-green-50',
		wrapperFlowLookup[bpProp]
	);

	let borderBoxSize: any;

	$: bpWidth = 0;
	$: borderBoxHeight = borderBoxSize ? borderBoxSize[0].blockSize : -1;

	$: bpProp = getSetting(sidebarPlacement, bpWidth);
	$: aoProp = sidebarAlwaysOpen ? getSetting(sidebarAlwaysOpen, bpWidth) : undefined;

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

<!-- Inorder to get consostent width between code and css we need to use the innerwidth of the window -->
<svelte:window bind:innerWidth={bpWidth} />

<!-- to get the height we bind to borderbox for performance improvements over clientHeight -->
<div bind:borderBoxSize>
	<main class={wrapperClasses}>
		<div class={'grow'}>
			<slot name="main">
				<p>
					<span class="bold">
						Provide some main content. The main cotent you provide should have appropriate padding
						applied...
					</span>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas aliquet fermentum nulla.
					Suspendisse porta gravida ipsum ac tincidunt. Donec ac rutrum ligula. Duis tortor erat, blandit
					non ante vitae, facilisis finibus arcu. Phasellus eget felis tempor, eleifend lectus quis,
					facilisis lectus.
				</p>
				<p>
					Provide some main content Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Maecenas aliquet fermentum nulla. Suspendisse porta gravida ipsum ac tincidunt. Donec ac
					rutrum ligula. Duis tortor erat, blandit non ante vitae, facilisis finibus arcu. Phasellus
					eget felis tempor, eleifend lectus quis, facilisis lectus.
				</p>
			</slot>
		</div>

		<slot name="sidebar">Sidebar</slot>

		<!-- This div exists to push content to the side of the sidebar	-->
		{#if sidebarPush && $isOpen && $sidebarWidthStore}
			<div class={classNames('shrink-0', widthLookup[$sidebarWidthStore][bpProp])} />
		{/if}
	</main>
</div>
