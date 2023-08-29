<script lang="ts">
	import {
		ArrowCircleUpIcon,
		ArrowCircleLeftIcon,
		ArrowCircleDownIcon,
		ArrowCircleRightIcon
	} from '@rgossiaux/svelte-heroicons/solid';

	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import IconButton from './IconButton.svelte';

	let disabled = true;

	const toggleDisabled = () => (disabled = !disabled);
	const onEnterPressed = (e: Event) => {
		if ((<KeyboardEvent>e).key === 'Enter') {
			toggleDisabled();
		}
	};
</script>

<Meta title="Ui/IconButton" component={IconButton} />

<Template let:args>
	<div class="text-white mb-2">Default icon button.</div>

	<div class="bg-white w-14 h-14 p-2">
		<IconButton {...args}>
			<ArrowCircleUpIcon />
		</IconButton>
	</div>
</Template>

<Story name="Default" />

<Story name="Sizes">
	<div class="text-white mb-2">
		Buttons can either be <code class="text-core-blue-300">size="base"</code> (default) or
		<code class="text-core-blue-300">size="lg"</code>.
	</div>

	<div class="bg-white w-36 h-24 p-2 flex gap-2">
		<IconButton size="base" title="base">
			<ArrowCircleUpIcon />
		</IconButton>
		<IconButton size="lg" title="lg">
			<ArrowCircleDownIcon />
		</IconButton>
	</div>
</Story>

<Story name="Text">
	<div class="text-white mb-2">
		One or two very concise words can be slotted in to aid usability.
	</div>

	<div class="bg-white w-48 h-24 p-2 flex gap-2">
		<IconButton size="lg" classes="flex flex-col">
			<div class="mt-1">Above</div>
			<ArrowCircleUpIcon class="mb-1" />
		</IconButton>
		<IconButton size="lg" classes="flex flex-col">
			<ArrowCircleDownIcon class="mt-1" />
			<div class="mb-1">Below</div>
		</IconButton>
	</div>
</Story>

<Story name="Handlers">
	<div class="text-white mb-2">
		Event handlers such as <code class="text-core-blue-300">on:click</code> and
		<code class="text-core-blue-300">on:keypress</code> are exposed.
	</div>

	<div class="bg-white w-28 h-14 p-2 flex justify-between">
		<IconButton {disabled} on:click={toggleDisabled} on:keypress={onEnterPressed}>
			<ArrowCircleLeftIcon />
		</IconButton>
		<IconButton disabled={!disabled} on:click={toggleDisabled} on:keypress={onEnterPressed}>
			<ArrowCircleRightIcon />
		</IconButton>
	</div>
</Story>

<Story name="Attributes">
	<div class="text-white mb-2">
		Additional attributes can be added as if the component was an element, e.g. <code
			class="text-core-blue-300">title="Go left"</code
		>. Beware that adding a <code class="text-core-blue-300">class</code> attribute will remove all
		default styling. In most cases you'll want to append and override styling and layout using the
		<code class="text-core-blue-300">classes=""</code> prop.
	</div>

	<div class="bg-white w-28 h-14 p-2 flex justify-between">
		<IconButton title="Go left" aria-label="Go reft">
			<ArrowCircleLeftIcon />
		</IconButton>
		<IconButton title="Go right" aria-label="Go right">
			<ArrowCircleRightIcon />
		</IconButton>
	</div>
</Story>

<Story name="Classes">
	<div class="text-white mb-2">
		Append and override styling and layout using the <code class="text-core-blue-300"
			>classes=""</code
		> prop.
	</div>

	<div class="bg-core-grey-300 w-40 h-40 p-4 relative">
		<IconButton classes="absolute top-2 left-1/2 -translate-x-1/2 ">
			<ArrowCircleUpIcon />
		</IconButton>
		<IconButton
			classes="absolute top-1/2 left-2 -translate-y-1/2 bg-core-green-600 hover:bg-core-yellow-600"
		>
			<ArrowCircleLeftIcon />
		</IconButton>
		<IconButton
			classes="absolute top-1/2 right-2 -translate-y-1/2 bg-core-purple-400 hover:bg-core-darkPink-500"
		>
			<ArrowCircleRightIcon />
		</IconButton>
		<IconButton
			classes="absolute bottom-2 left-1/2 -translate-x-1/2 bg-core-red-600 hover:bg-core-orange-400"
		>
			<ArrowCircleDownIcon />
		</IconButton>
		<div class="bg-core-grey-800 absolute top-0 left-0 w-12 h-12" />
		<div class="bg-core-grey-800 absolute top-0 right-0 w-12 h-12" />
		<div class="bg-core-grey-800 absolute bottom-0 left-0 w-12 h-12" />
		<div class="bg-core-grey-800 absolute bottom-0 right-0 w-12 h-12" />
	</div>
</Story>
