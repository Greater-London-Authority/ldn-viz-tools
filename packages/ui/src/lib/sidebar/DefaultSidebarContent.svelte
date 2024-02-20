<script>
	import SidebarHeader from '../sidebarElements/SidebarHeader.svelte';
	import SidebarSection from '../sidebarElements/SidebarSection.svelte';
</script>

<SidebarHeader title="Hello there,">
	<p>It looks like you're building a new app.</p>
</SidebarHeader>

<SidebarSection title="Boilerplate">
	<div class="italic flex flex-col [&_code]:text-perceptual-orange-100">
		<code>&lt;AppShell&gt;</code>
		<code class="pl-4">&lt;... slot="content" /&gt;</code>
		<code class="pl-4">&lt;Sidebar slot="sidebar"&gt;</code>
		<code class="pl-8">&lt;... /&gt;</code>
		<code class="pl-8">&lt;... slot="footer" /&gt;</code>
		<code class="pl-4">&lt;Sidebar&gt;</code>
		<code>&lt;/AppShell&gt;</code>
	</div>
</SidebarSection>

<SidebarSection title="Custom sizing">
	<p>
		When in horizontal mode (desktop) the <code>sidebarWidth</code> property will be applied.
		Defaults to <code>408px</code>.
	</p>
	<div class="italic flex flex-col [&_code]:text-perceptual-orange-100">
		<code>&lt;AppShell sidebarWidth="600px" /&gt;</code>
	</div>
	<p>
		When in vertical mode (mobile) the <code>sidebarHeight</code> property will be applied. Defaults
		to <code>calc(100% - 8rem)</code> to account for the map geocoder.
	</p>
	<div class="italic flex flex-col [&_code]:text-perceptual-orange-100">
		<code>&lt;AppShell sidebarHeight="400px" /&gt;</code>
	</div>
</SidebarSection>

<SidebarSection title="State Management Store">
	<p>
		You can bind on the <i><code>isOpen</code></i> prop to access the writable Svelte store managing
		the sidebar's open/closed state. Adding the <i><code>startOpen</code></i> flag will set the sidebar
		as open on load.
	</p>
	<div class="italic flex flex-col [&_code]:text-perceptual-orange-100">
		<code>&lt;AppShell startOpen bind:isOpen /&gt;</code>
	</div>
</SidebarSection>

<SidebarSection title="Svelte Context">
	<p>
		You can acces the <i><code>isOpen</code></i> prop via Svelte context too:
	</p>
	<div class="italic flex flex-col [&_code]:text-perceptual-orange-100">
		<code>getContext('sidebarIsOpen')</code>
	</div>

	<p>
		You can also access a derived store holding the sidebar container's layout configuration. You
		can query it if you want the current viewing mode (horizontal or vertical) or dimensions:
	</p>
	<div class="italic flex flex-col [&_code]:text-perceptual-orange-100">
		<code>getContext('appShell')</code>
	</div>
</SidebarSection>
