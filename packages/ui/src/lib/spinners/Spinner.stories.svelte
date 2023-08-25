<script>
	import { Meta, Story } from '@storybook/addon-svelte-csf';

	import Spinner from './Spinner.svelte';
</script>

<Meta title="Ui/Spinners" component={Spinner} />

<Story name="Default">
	<div class="text-core-grey-800">
		<Spinner class="w-40" />
	</div>
</Story>

<Story name="Thickness">
	<div class="text-core-grey-800">
		<Spinner class="w-40 stroke-[16]" />
	</div>
</Story>

<Story name="Color">
	<div class="text-core-grey-800">
		<Spinner class="w-40" circleClass="stroke-core-blue-200" arcClass="stroke-core-darkPink-500" />
	</div>
</Story>
