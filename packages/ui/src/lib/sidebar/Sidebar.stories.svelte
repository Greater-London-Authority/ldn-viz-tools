<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';

	import Sidebar, { sidebarOpen } from './Sidebar.svelte';
	import NotSidebar from './NotSidebar.svelte';
	import SidebarContent from './SidebarContent.svelte';
	import SidebarHeader from './SidebarHeader.svelte';
	import SidebarSection from './SidebarSection.svelte';

	sidebarOpen.set(true);
</script>

<Meta
	title="Ui/Sidebar"
	component={Sidebar}
	parameters={{
		layout: 'fullscreen'
	}}
/>

<Template let:args>
	<Sidebar {...args} />
</Template>

<Story name="Default" />

<Story name="A Dynamic Sidebar">
	<Sidebar>
		<div class="w-[300px] bg-core-blue-800 p-4 space-y-4 text-white text-sm">
			<p>
				<code>{'<Sidebar>'}</code> is a generic component with its width, height, and other layout attributes
				calculated based on its content.
			</p>

			<p>
				The sidebar is a <code>{'<section>'}</code> so
				<code>{'<header>'}</code> and <code>{'<footer>'}</code> are applicable. But the user programmer
				needs to set all the content sizing, overflow management, internal spacings, and other styling
				themselves. You'll also notice the non-standard styling I've applied to show off the sidebars
				flexibility.
			</p>

			<p>
				However, since nearly all sidebars will look the same the
				<code>{'<SidebarContent>'}</code> component can be used to remove all the boiler plate and provide
				a consistent looking sidebar across apps.
			</p>
		</div>
	</Sidebar>
</Story>

<Story name="Standard Sidebar Layout">
	<Sidebar>
		<SidebarContent>
			<p>
				Nearly all sidebars will have the same style and layout. The
				<code>{'<SidebarContent>'}</code> wraps your content within
				<code>{'<Sidebar>'}</code> to provide the standard sizing, spacing, and default footer content.
			</p>

			<p>
				You can change the footer using the named slot <code>footer</code>. You should use the <code
					>{'<footer>'}</code
				> tag and you'll need to style it yourself:
			</p>

			<pre><code
					>{[
						'<SidebarContent>',
						"  <footer slot='footer'>",
						'    Custom footer content.',
						'  </footer>',
						'</SidebarContent>'
					].join('\n')}</code
				></pre>

			<footer slot="footer" class="flex justify-end pt-6">
				<p>Custom <code>{'<footer>'}</code>.</p>
			</footer>
		</SidebarContent>
	</Sidebar>
</Story>

<Story name="Sidebar Stores">
	<Sidebar>
		<SidebarContent>
			<SidebarHeader title="Sidebar Stores">
				<p>Two stores accompany the sidebar component</p>
				<ul class="-mt-2 ml-4 list-outside list-disc space-y-1">
					<li><code>sidebarOpen</code></li>
					<li><code>sidebarLayout</code></li>
				</ul>
			</SidebarHeader>

			<SidebarSection title="$sidebarOpen">
				<p>
					<code>$sidebarOpen</code> is true if the sidebar is open and false if not.
				</p>

				<p>
					Setting this store true or false will toggle the sidebar open or closed respectively. Any
					reactive content using the store will receive the change and update accordingly.
				</p>
			</SidebarSection>

			<SidebarSection title="$sidebarLayout">
				<p>
					<code>$sidebarLayout</code> is an object that contains information about how the sidebar is laid
					out with a few utility functions to ensure readable user code.
				</p>

				<p>
					A new object is set each time the sidebar is resized so any content that needs to adapt
					based on the sidebar layout can do so. It currently contains the following functions and
					field with more functions likely to be added overtime:
				</p>

				<ul class="-mt-2 ml-4 list-outside list-disc space-y-1">
					<li><code>isHorizontal()</code>: returns true if <code>mode</code> is 'horizontal'</li>
					<li><code>isVertical()</code>: returns true if <code>mode</code> is 'vertical'</li>
					<li><code>isRight()</code>: returns true if <code>alignment</code> is 'right'</li>
					<li><code>isBottom()</code>: returns true if <code>alignment</code> is 'bottom'</li>
					<li><code>mode</code>: either 'horizontal' or 'vertical'</li>
					<li><code>alignment</code>: either 'right' or 'bottom'</li>
					<li><code>hoodWidth</code>: sidebar hood width in pixels</li>
					<li><code>hoodHeight</code>: sidebar hood height in pixels</li>
					<li><code>contentWidth</code>: sidebar content width in pixels</li>
					<li><code>contentHeight</code>: sidebar content height in pixels</li>
				</ul>

				<p>
					User programmers should prioritise use of the functions over fields because they are less
					error prone and provide better intentionality to readers.
				</p>
			</SidebarSection>
		</SidebarContent>
	</Sidebar>
</Story>

<Story name="The Sidebar Header">
	<Sidebar>
		<SidebarContent>
			<SidebarHeader title="Sidebar header">
				<p>
					The <code>{'<SidebarHeader>'}</code> component should be the first one in the sidebar. It
					uses the <code>{'<header>'}</code> tag.
				</p>
				<p>
					The title is provided using the <i>title</i> property which may contain standard HTML tags,
					i.e. not Svelte components.
				</p>
				<p>
					Supply the description as unamed slotted content. Use a series of
					<code>{'<p>'}</code> tags unless you need something bespoke.
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
					Sidebar sections are <code>{'<section>'}</code> elements for splitting up sidebar content in
					to meaningful chunks that crawlers, browsers, and accessibility can navigate meaningfully.
				</p>
			</SidebarHeader>

			<SidebarSection title="Section title">
				<p>
					A title is provided using the <i>title</i> property which may contain standard HTML tags, e.i.
					not Svelte components. Section titles are optional.
				</p>
			</SidebarSection>

			<SidebarSection title="Section content">
				<p>
					The section content is spaced accordingly but may be modified via local CSS, the style
					property, or utility classes.
				</p>
			</SidebarSection>
		</SidebarContent>
	</Sidebar>
</Story>

<Story name="Not the Sidebar">
	<NotSidebar classes="p-6">
		<h1 class="text-3xl">I am not the Sidebar.</h1>
		<p class="mt-4">
			I resize so the sidebar does not overlap me. Try toggling the sidebar open and closed and
			watch this paragraph width grow and shrink in sync.
		</p>
	</NotSidebar>

	<Sidebar>
		<SidebarContent>
			<SidebarHeader title="I am the Sidebar">
				<p>
					The <code>{'<NotSidebar>'}</code> component can be used to contain and resize non-sidebar content.
				</p>
			</SidebarHeader>

			<SidebarSection>
				<p>
					Opening the <code>{'<Sidebar>'}</code> will partly cover main application content.
					Wrapping the content in
					<code>{'<NotSidebar>'}</code> will provide auto-resizing when the sidebar opens and closes.
				</p>

				<p>
					<code>{'<NotSidebar>'}</code> is great for use with maps and other applications that are fixed
					to the users visible viewport.
				</p>
			</SidebarSection>
		</SidebarContent>
	</Sidebar>
</Story>

<style>
	code {
		@apply text-perceptual-orange-100;
	}
</style>
