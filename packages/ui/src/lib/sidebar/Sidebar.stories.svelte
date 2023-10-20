<script>
	import { onMount } from 'svelte'
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';

	import Sidebar, { sidebarIsOpen } from './Sidebar.svelte';
	import NotSidebar from './NotSidebar.svelte'
	import SidebarContent from './SidebarContent.svelte'
	import SidebarHeader from './SidebarHeader.svelte'
	import SidebarSection from './SidebarSection.svelte'

	sidebarIsOpen.set(true)
</script>

<Meta title="Ui/Sidebar" component={Sidebar}  parameters={{
  layout: 'fullscreen',
}}/>

<Template let:args>
	<Sidebar {...args} />
</Template>

<Story name="Default" />

<Story name="A Dynamic Sidebar">
	<Sidebar>
		<div class="w-[300px] bg-core-blue-800 p-4 space-y-4 text-white text-sm">
			<p>
				<code>{"<Sidebar>"}</code> is a generic component with it's width,
				height, and other layout attributes calculated based on it's content.
			</p>

			<p>
				The sidebar is a <code>{"<section>"}</code> so
				<code>{"<header>"}</code> and <code>{"<footer>"}</code> are applicable.
			</p>

			<p>
				The user programmer needs to set all the content sizing, overflow
				management, internal spacings, and other styling themselves.
			</p>

			<p>
				However, since nearly all sidebars will look the same the
				<code>{"<SidebarContent>"}</code> component can be used to remove all
				the boiler plate and provide a consistent looking sidebar across apps.
			</p>
		</div>
	</Sidebar>
</Story>

<Story name="Standard Sidebar Layout">
	<Sidebar>
		<SidebarContent>
			<p>
				Because nearly all sidebars will have the same style and layout. The
				<code>{"<SidebarContent>"}</code> wraps your content within
				<code>{"<Sidebar>"}</code> to provide the standard sizing, spacing, and
				default footer content.
			</p>

			<p>
				You can change the footer using the named slot 'footer'. You should use
				the <code>{"<footer>"}</code> tag and you'll need to style it yourself:
			</p>

			<pre><code>{"  <SidebarContent>"}
{"    <footer slot='footer'>"}
      Custom footer content
{"    </footer>"}
{"  </SidebarContent>"}</code></pre>

			<footer slot="footer" class="flex justify-end pt-6">
				<p>Custom <code>{"<footer>"}</code>.</p>
			</footer>
		</SidebarContent>
	</Sidebar>
</Story>

<Story name="Sidebar Stores">
	<Sidebar>
		<SidebarContent>
			<p>
				TODO.
			</p>
		</SidebarContent>
	</Sidebar>
</Story>

<Story name="The Sidebar Header">
	<Sidebar>
		<SidebarContent>
			<SidebarHeader title="Sidebar header">
				<p>
					The <code>{"<SidebarHeader>"}</code> component should be the first
					one in the sidebar. It uses the <code>{"<header>"}</code> tag.
				</p>
				<p>
					The title is provided using the <i>title</i> property which may
					contain standard HTML tags, e.i. not Svelte components.
				</p>
				<p>
					Supply the description as unamed slotted content. Use a series of
					<code>{"<p>"}</code> tags unless you need something bespoke.
				</p>
			</SidebarHeader>
		</SidebarContent>
	</Sidebar>
</Story>

<Story name="The Sidebar Section">
	<Sidebar>
		<SidebarContent>
			<SidebarHeader title="Sidebar section">
				<p>
					Sidebar sections are <code>{"<section>"}</code> elements for
					splitting up sidebar content in to meaningful chunks that crawlers,
					browsers, and accessibility can navigate meaningfully.
				</p>
			</SidebarHeader>

			<SidebarSection title="Title">
				<p>
					A title is provided using the <i>title</i> property which may
					contain standard HTML tags, e.i. not Svelte components. Section
					titles are optional.
				</p>
			</SidebarSection>

			<SidebarSection title="Content">
				<p>
					The section content is spaced accordingly but may be modified via
					local CSS, the style property, or utility classes.
				</p>
			</SidebarSection>
		</SidebarContent>
	</Sidebar>
</Story>

<Story name="Not the Sidebar">
	<Sidebar>
		<SidebarContent>
			<SidebarHeader title="I am the Sidebar">
				<p>
					TODO
				</p>
			</SidebarHeader>
		</SidebarContent>
	</Sidebar>

	<NotSidebar classes="p-6">
		<h1 class="text-3xl">I am not the Sidebar.</h1>
		<hr class="w-full border-2 border-core-grey-800" />
		<p class="mt-4">
			I resize to so the sidebar does not overlap me. Try toggling the sidebar
			open and closed and watch the full width title underline grow and shrink
			in sync.
		</p>
	</NotSidebar>
</Story>

<style>
	code {
		color: goldenrod;
	}
</style>