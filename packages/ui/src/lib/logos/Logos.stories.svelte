<script>
	import { Meta, Story } from '@storybook/addon-svelte-csf';

	import LogoCIU from './LogoCIU.svelte';
	import LogoLOTI from './LogoLOTI.svelte';
	import LogoMayor from './LogoMayor.svelte';
</script>

<Meta title="Ui/Logos" component={LogoLOTI} />

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

<Story name="LOTI">
	<div class="text-core-grey-800 dark:text-white">
		<LogoLOTI class="h-10" />
	</div>
</Story>

<Story name="Inherit font color (dafault)">
	<div class="text-white flex space-x-6">
		<LogoMayor class="w-40" />
		<LogoCIU class="w-40" />
		<LogoLOTI class="h-10" />
	</div>
</Story>

<Story name="Custom fill color">
	<div class="text-white flex space-x-6">
		<LogoMayor class="w-40 fill-gla-pink-500" />
		<LogoCIU class="w-40 fill-core-blue-600 dark:fill-core-grey-100" />
		<LogoLOTI class="h-10 !fill-[#ffcc00]" />
	</div>
</Story>
