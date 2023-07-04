<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import DummyScreen from './DummyScreen.svelte'

	import Sidebar from './Sidebar.svelte';	
</script>

<Meta title="Ui/Sidebar" component={Sidebar} />

<Template let:args>
	<DummyScreen>
		<Sidebar {...args} />
	</DummyScreen>
</Template>

<Story name="Minimal">
	<div class="my-4 text-core-grey-500 dark:text-core-grey-200 space-y-2">
		<p>The minimal amount of code to get a sidebar showing.</p>
	</div>
	<DummyScreen>
		<Sidebar />
	</DummyScreen>
</Story>

<Story name="Left & top aligned">
	<div class="my-4 text-core-grey-500 dark:text-core-grey-200 space-y-2">
		<p>The minimal amount of code to get a sidebar showing.</p>
	</div>
	<DummyScreen>
		<Sidebar top left />
	</DummyScreen>
</Story>