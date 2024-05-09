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
	<div class="text-core-grey-800 dark:text-white">
		<LogoMayor class="w-40" />
	</div>
</Story>

<Story name="CIU">
	<div class="text-core-grey-800 dark:text-white">
		<LogoCIU class="w-40" />
	</div>
</Story>

<Story name="Designed By CIU">
	<div class="text-core-grey-800 dark:text-white">
		<LogoByCIU class="w-40" />
	</div>
</Story>

<Story name="LOTI">
	<div class="text-core-grey-800 dark:text-white">
		<LogoLOTI class="h-10" />
	</div>
</Story>

<Story name="Inherit font color (default)">
	<div class="text-core-grey-800 dark:text-white flex space-x-6">
		<LogoMayor class="w-40" />
		<LogoCIU class="w-40" />
		<LogoByCIU class="w-40" />
		<LogoLOTI class="h-10" />
	</div>
</Story>

<Story name="Custom fill color">
	<div class="space-y-4">
		<div class="flex space-x-6">
			<LogoMayor class="w-40 fill-core-grey-400 dark:fill-core-grey-50 " />
			<LogoCIU class="w-40 fill-core-grey-400 dark:fill-core-grey-50" />
			<LogoByCIU class="w-40 fill-core-grey-400 dark:fill-core-grey-50" />
			<LogoLOTI class="h-10 fill-core-grey-400 dark:fill-core-grey-50" />
		</div>

		<div class="flex space-x-6">
			<LogoMayor class="w-40 fill-core-grey-800 dark:fill-core-grey-400" />
			<LogoCIU class="w-40 fill-core-grey-800 dark:fill-core-grey-400" />
			<LogoByCIU class="w-40 fill-core-grey-800 dark:fill-core-grey-400" />
			<LogoLOTI class="h-10 fill-core-grey-800 dark:fill-core-grey-400" />
		</div>
	</div>
</Story>
