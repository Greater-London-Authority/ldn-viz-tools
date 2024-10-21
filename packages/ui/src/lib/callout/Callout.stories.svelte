<script context="module">
	import Callout from './Callout.svelte';

	export const meta = {
		title: 'Ui/Callout',
		component: Callout,
		argTypes: {
			status: {
				options: ['note', 'caution', 'warning'],
				control: { type: 'select' }
			}
		}
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import Button from '../button/Button.svelte';
</script>

<Template let:args>
	<Callout {...args}>
		<svelte:fragment slot="title">The title!</svelte:fragment>

		<svelte:fragment slot="body">The body!</svelte:fragment>
	</Callout>
</Template>

<Story name="Default" source />

<Story name="With 'more'" source>
	<Callout status="warning">
		<span slot="title">Something has gone wrong</span>

		<div slot="body">
			<p>
				Click on the button to return home. If the error persistes please <a
					href="mailto:some-email-address@example.com"
					class="underline hover:no-underline">Report it here</a
				>
			</p>
		</div>

		<div slot="more">
			<Button href={`/`}>Take me home</Button>
		</div>
	</Callout>
</Story>
