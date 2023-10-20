<script>
	// SidebarContent is the standard content container for Sidebars.
	//
	// It should be imported and used to wrap sidebar content in the vast
	// majority of projects as it provides the standard footer, overflow
	// management, layout, sizing, and styling.

	import LogoMayor from '../logos/LogoMayor.svelte';
	import LogoCIU from '../logos/LogoCIU.svelte';

	import { sidebarLayout } from './Sidebar.svelte';
	import SidebarHeader from './SidebarHeader.svelte';
	import SidebarSection from './SidebarSection.svelte';

	export let classes = '';

	$: wide = $sidebarLayout.isHorizontal();
</script>

<div
	class="dark bg-core-grey-800 p-4 flex flex-col text-white text-sm {classes}"
	class:w-full={!wide}
	class:h-min={!wide}
	class:h-full={wide}
	class:w-[408px]={wide}
>
	<div class="grow overflow-y-auto overscroll-contain p-2 flex flex-col gap-5">
		<slot>
			<SidebarHeader title="Hello there,">
				<p>It looks like you're building a new map.</p>
			</SidebarHeader>

			<SidebarSection title="Standard sidebar">
				<p>
					For most maps you should use this SidebarContent component with your own slotted content.
					Optionally replace the sidebar hood containing the open/close toggle.
				</p>

				<p>
					It will take care of applying the standard sidebar sizing, spacing for inner elements,
					scrollbars when needed, and add the default footer. You can slot in your own footer if needed:
				</p>

				<div class="italic flex flex-col">
					<code>&lt;Sidebar&gt;</code>
					<code class="pl-4">&lt;... slot="hood" /&gt;</code>
					<code class="pl-4">&lt;SidebarContent&gt;</code>
					<code class="pl-8">&lt;... /&gt;</code>
					<code class="pl-8">&lt;... slot="footer" /&gt;</code>
					<code class="pl-4">&lt;SidebarContent&gt;</code>
					<code>&lt;/Sidebar&gt;</code>
				</div>
			</SidebarSection>

			<SidebarSection title="Custom sidebar">
				<p>
					In the rare event that a non-standard layout is essential you'll need to do all the
					sizing, spacing, footer, and other styling manually; just omit the sidebar content
					component. I recommend copying the SidebarContent code into a custom project component and modifying to suit.
				</p>

				<div class="italic flex flex-col">
					<code>&lt;Sidebar&gt;</code>
					<code class="pl-4">&lt;... slot="hood" /&gt;</code>
					<code class="pl-4">&lt;... /&gt;</code>
					<code>&lt;/Sidebar&gt;</code>
				</div>
			</SidebarSection>
		</slot>
	</div>

	<slot name="footer">
		<footer class="p-2 mt-4 w-full flex basis-6 items-center justify-between">
			<div class="max-w-full self-end">
				<LogoMayor class="w-[128px] sm:w-[144px]" />
			</div>

			<div class="max-w-full self-end">
				<LogoCIU class="w-[128px] sm:w-[144px]" />
			</div>
		</footer>
	</slot>
</div>
