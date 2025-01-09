<script context="module">
	import Callout from './Callout.svelte';

	export const meta = {
		title: 'Ui/Callout',
		component: Callout,
		argTypes: {
			status: {
				options: ['notice', 'success', 'warning', 'error'],
				control: { type: 'select' }
			},
			size: {
				options: ['sm', 'md', 'lg'],
				control: { type: 'select' }
			}
		},
		args: {
			status: 'notice',
			size: 'md'
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

<Story name="Sizes" source>
	<div class="space-y-4">
		<Callout status="notice" size="sm">
			<span slot="title">Hey look at this</span>

			<div slot="body">
				<p>
					For quick in context callouts <a
						href="mailto:some-email-address@example.com"
						class="underline hover:no-underline"
					>
						Report it here
					</a>
				</p>
			</div>
		</Callout>
		<Callout status="warning" size="md">
			<span slot="title">Something has gone wrong</span>

			<div slot="body">
				<p>
					Click on the button to return home. If the error persists please <a
						href="mailto:some-email-address@example.com"
						class="underline hover:no-underline">Report it here</a
					>
				</p>
			</div>

			<div slot="more">
				<Button href={`/`} size="sm" condition="warning">Take me home</Button>
			</div>
		</Callout>
		<Callout status="error" size="lg">
			<span slot="title">Something has gone very wrong</span>

			<div slot="body">
				<p>
					<span class="font-bold">DO NOT</span> Click on the button!. If the error persists please
					<a href="mailto:some-email-address@example.com" class="underline hover:no-underline"
						>Report it here</a
					>
				</p>
			</div>

			<div slot="more">
				<Button href={`/`} condition="error">Abort Action</Button>
			</div>
		</Callout>
	</div>
</Story>

<Story name="With 'more'" source>
	<Callout status="warning">
		<span slot="title">Something has gone wrong</span>

		<div slot="body">
			<p>
				Click on the button to return home. If the error persists please <a
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
