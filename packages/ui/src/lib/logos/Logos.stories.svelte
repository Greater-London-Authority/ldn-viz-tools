<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import LogoByCIU from './LogoByCIU.svelte';
	import LogoCIU from './LogoCIU.svelte';
	import LogoLOTI from './LogoLOTI.svelte';
	import LogoMayor from './LogoMayor.svelte';

	const { Story } = defineMeta({
		title: 'Ui/Components/Logos',
		component: LogoLOTI,
		tags: ['autodocs']
	});
</script>

<Story name="Mayor of London">
	{#snippet template()}
		<div class="text-color-text-primary">
			<LogoMayor class="w-40" />
		</div>
	{/snippet}
</Story>

<Story name="CIU">
	{#snippet template()}
		<div class="text-color-text-primary">
			<LogoCIU class="w-40" />
		</div>
	{/snippet}
</Story>

<Story name="Designed By CIU">
	{#snippet template()}
		<div class="text-color-text-primary">
			<LogoByCIU class="w-40" />
		</div>
	{/snippet}
</Story>

<Story name="LOTI">
	{#snippet template()}
		<div class="text-color-text-primary">
			<LogoLOTI class="h-10" />
		</div>
	{/snippet}
</Story>

<Story name="Inherit font color (default)">
	{#snippet template()}
		<div class="text-color-text-primary flex space-x-6">
			<LogoMayor class="w-40" />
			<LogoCIU class="w-40" />
			<LogoByCIU class="w-40" />
			<LogoLOTI class="h-10" />
		</div>
	{/snippet}
</Story>

<Story name="Custom fill color">
	{#snippet template()}
		<div class="space-y-4">
			<div class="flex space-x-6">
				<LogoMayor class="fill-color-palette-grey-400 w-40" />
				<LogoCIU class="fill-color-palette-grey-400 w-40" />
				<LogoByCIU class="fill-color-palette-grey-400 w-40" />
				<LogoLOTI class="fill-color-palette-grey-400 h-10" />
			</div>

			<div class="flex space-x-6">
				<LogoMayor class="fill-color-palette-grey-800 w-40" />
				<LogoCIU class="fill-color-palette-grey-800 w-40" />
				<LogoByCIU class="fill-color-palette-grey-800 w-40" />
				<LogoLOTI class="fill-color-palette-grey-800 h-10" />
			</div>
		</div>
	{/snippet}
</Story>
