<script lang="ts">
	import { Bars3, XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	let navOpen = false;
	const toggleNav = () => {
		navOpen = !navOpen;
	};

	export let placement: 'left' | 'right' | 'top' | 'bottom' = 'right';
</script>

<div class="overflow-hidden">
	<div class:pushed={!navOpen}>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas aliquet fermentum nulla.
		Suspendisse porta gravida ipsum ac tincidunt. Donec ac rutrum ligula. Duis tortor erat, blandit
		non ante vitae, facilisis finibus arcu. Phasellus eget felis tempor, eleifend lectus quis,
		facilisis lectus. Proin a turpis ut tortor bibendum sagittis. Pellentesque accumsan aliquet
		eros, id semper urna blandit at. Curabitur accumsan felis eu sem egestas, sit amet porta orci
		semper. Quisque semper varius sodales. Maecenas ut justo nec velit venenatis vestibulum.
		Suspendisse leo diam, consequat at sapien et, sodales ultricies nisi. Maecenas ipsum lacus,
		tristique faucibus interdum nec, scelerisque in enim. Donec nec interdum dolor. Maecenas eget
		nisi turpis. Proin ut auctor nisl. Etiam id est ultricies, rhoncus quam ac, dignissim justo. Ut
		elementum sapien et mi mollis condimentum. Pellentesque quis ex efficitur, ullamcorper massa
		non, pellentesque sem. Aenean a enim scelerisque, varius dolor eu, semper sem. Etiam non enim
		vitae odio scelerisque tempus et vitae risus. Nulla non tristique nibh. Nam consectetur molestie
		facilisis. Nam augue elit, cursus sed turpis sit amet, interdum pharetra ex. Nunc quis laoreet
		enim. Aliquam et dignissim lacus.
	</div>

	<div class:navOpen class="fixed inset-y-0 end-0 transition-x duration-300 pointer-events-none">
		<!--start-0-->
		<div
			class="bg-core-grey-800 fixed w-80 sm:w-[408px] h-auto inset-y-0 end-0 pointer-events-auto flex flex-col"
		>
			<!--start-0-->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				id="panelToggle"
				class="absolute bg-core-grey-800 inset-y-0 -start-8 mt-0 w-8 h-8 p-1 text-white cursor-pointer"
				on:click={toggleNav}
				on:keypress={toggleNav}
			>
				<!-- -ml-8 --><!-- -end-8 -->
				<Icon src={Bars3} />
			</div>
			<div class="p-4 text-core-grey-50 max-h-screen overflow-y-auto">
				<div class="mapPanel_head mb-6 p-2">
					<h1 class="text-2xl font-bold mb-2">Title</h1>
					<p class="text-sm mb-2">Lorem ipsum</p>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- <script lang="ts">
	import { quintOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	import { classNames } from '..//utils/classNames';
	import Button from '../button/Button.svelte';

	export let hidden: boolean = false;
	export let position: 'fixed' | 'absolute' = 'fixed';
	export let leftOffset: string = 'inset-y-0 start-0';
	export let rightOffset: string = 'inset-y-0 end-0';
	export let topOffset: string = 'inset-x-0 top-0';
	export let bottomOffset: string = 'inset-x-0 bottom-0';
	export let placement: 'left' | 'right' | 'top' | 'bottom' = 'right';

	const placements = {
		left: leftOffset,
		right: rightOffset,
		top: topOffset,
		bottom: bottomOffset
	};

	const handleDrawer = () => {
		hidden = !hidden;
	};

	$: wrapperClasses = classNames(
		'flex w-[448px]',
		hidden ? 'w-[40px]' : 'w-[448px]',
		placement === 'right' ? 'flex-row' : 'flex-row-reverse',
		position,
		placements[placement]
	);
	$: sidebarClasses = classNames('w-[408px] bg-core-grey-200', position, placements[placement]);
</script>

<div class={wrapperClasses}>
	<Button variant="square" on:click={handleDrawer}>Click</Button>
	{#if !hidden}
		<div
			class={sidebarClasses}
			transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'x' }}
		>
			HELLO
		</div>
	{/if}
</div> -->

<style>
	/* .navOpen {
		@apply -translate-x-[408px];
	} */

	.navOpen {
		@apply translate-x-[408px];
	}

	.pushed {
		@apply pr-[408px];
	}
</style>
