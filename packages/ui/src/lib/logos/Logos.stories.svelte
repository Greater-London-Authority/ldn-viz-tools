<script context="module" lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';

	import LogoByCIU from './LogoByCIU.svelte';
	import LogoCIU from './LogoCIU.svelte';
	import LogoLOTI from './LogoLOTI.svelte';
	import LogoMayor from './LogoMayor.svelte';

	export const meta = {
		title: 'Ui/Logos',
		component: LogoLOTI
	};
</script>

<Story name="Mayor of London">
	<div class="text-color-text-primary">
		<LogoMayor class="w-40" />
	</div>
</Story>

<Story name="CIU">
	<div class="text-color-text-primary">
		<LogoCIU class="w-40" />
	</div>
</Story>

<Story name="Designed By CIU">
	<div class="text-color-text-primary">
		<LogoByCIU class="w-40" />
	</div>
</Story>

<Story name="LOTI">
	<div class="text-color-text-primary">
		<LogoLOTI class="h-10" />
	</div>
</Story>

<Story name="Inherit font color (default)">
	<div class="text-color-text-primary flex space-x-6">
		<LogoMayor class="w-40" />
		<LogoCIU class="w-40" />
		<LogoByCIU class="w-40" />
		<LogoLOTI class="h-10" />
	</div>
</Story>

<Story name="Custom fill color">
	<div class="space-y-4">
		<div class="flex space-x-6">
			<LogoMayor class="w-40 fill-color-palette-grey-400" />
			<LogoCIU class="w-40 fill-color-palette-grey-400" />
			<LogoByCIU class="w-40 fill-color-palette-grey-400" />
			<LogoLOTI class="h-10 fill-color-palette-grey-400" />
		</div>

		<div class="flex space-x-6">
			<LogoMayor class="w-40 fill-color-palette-grey-800" />
			<LogoCIU class="w-40 fill-color-palette-grey-800" />
			<LogoByCIU class="w-40 fill-color-palette-grey-800" />
			<LogoLOTI class="h-10 fill-color-palette-grey-800" />
		</div>
	</div>
</Story>
