<script>
	import { InformationCircle, PlusCircle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import { Meta, Story } from '@storybook/addon-svelte-csf';

	import Popover from './Popover.svelte';
	import Input from '../input/Input.svelte';
	import Button from '../button/Button.svelte';
</script>

<Meta title="Ui/Popover" component={Popover} />

<Story name="Text only">
	<div class="max-w-xl">
		<Popover>
			<svelte:fragment slot="trigger">
				<Icon src={InformationCircle} theme="mini" class="w-3 h-3 fill-white" aria-hidden="true" />
				<span class="sr-only">Open Popover</span>
			</svelte:fragment>

			<h2 class="text-large font-bold">Aggregate Values</h2>
            <p>Here is some text in a popover....</p>
		</Popover>
	</div>
</Story>




<Story name="Controls">
	<div class="max-w-xl">
		<Popover>
			<svelte:fragment slot="trigger">
				<Icon src={PlusCircle} theme="mini" class="w-3 h-3 fill-white" aria-hidden="true" />
				<span class="sr-only">Add item</span>
			</svelte:fragment>

			<h2 class="text-large font-bold">Add Item</h2>

            <Input id="name" label="Name" />

            <Button>Add</Button>
		</Popover>
	</div>
</Story>



