<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Sidebar from './Sidebar.svelte';

	import StoryAppContainer from './StoryAppContainer.svelte';
	import CompleteSidebarPanelExample from './CompleteSidebarPanelExample.svelte';
</script>

<Meta title="Ui/Sidebars" component={Sidebar} />

<Template let:args>
	<Sidebar {...args} />
</Template>

<Story name="Quick start sidebar">
	<div class="my-4 text-core-grey-500 dark:text-core-grey-200 space-y-2">
		<p>
			Just &lt;Sidebar /&gt; is needed to show a sidebar with default content and toggle. Reduce to
			see bottom alignment or increase to see right alignment.
		</p>
	</div>
	<StoryAppContainer>
		<Sidebar />
	</StoryAppContainer>
</Story>

<Story name="A complete sidebar panel">
	<div class="w-[408px]">
		<CompleteSidebarPanelExample />
	</div>
</Story>

<Story name="A complete sidebar">
	<StoryAppContainer>
		<Sidebar>
			<CompleteSidebarPanelExample slot="content" />
		</Sidebar>
	</StoryAppContainer>
</Story>
