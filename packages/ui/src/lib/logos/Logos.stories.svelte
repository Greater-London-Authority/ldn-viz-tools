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
	<div class="space-y-4">
		<div class="text-white flex space-x-6">
			<LogoMayor class="w-40 text-core-grey-400 dark:fill-core-grey-50 "/>
			<LogoCIU class="w-40 text-core-grey-400 dark:fill-core-grey-50"/>
			<LogoLOTI class="h-10 text-core-grey-400 dark:fill-core-grey-50"/>
		</div>

		<div class="text-white flex space-x-6">
			<LogoMayor class="w-40 text-core-grey-800 dark:fill-core-grey-400"/>
			<LogoCIU class="w-40 text-core-grey-800 dark:fill-core-grey-400"/>
			<LogoLOTI class="h-10 text-core-grey-800 dark:fill-core-grey-400"/>
		</div>

	</div>
</Story>
