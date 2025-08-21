<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';

	import { Check, Pencil, XMark } from '@steeze-ui/heroicons';

	import { Button, RadioButtonGroupSolid } from '@ldn-viz/ui';

	export let enabledModes = [];

	export let currentMode;

	export let onDone = () => null;

	export let showControls = false;

	let options;

	$: options = enabledModes.map((m) => ({
		id: m,
		label: m[0].toUpperCase() + m.slice(1)
	}));

	const clickClear = () => {
		currentMode = 'CLEAR';
		showControls = false;
	};

	const clickDone = () => {
		currentMode = undefined;
		showControls = false;
		onDone();
	};
</script>

<div class="flex gap-2 pointer-events-auto">
	{#if showControls}
		<RadioButtonGroupSolid label="Selection tool" name="" {options} bind:selectedId={currentMode} />

		<div class="flex flex-col gap-1">
			<Button
				variant="square"
				size="lg"
				emphasis="negative"
				on:click={clickClear}
				class="pointer-events-auto"
			>
				<Icon src={XMark} theme="mini" class="w-8 h-8 ml-2" aria-hidden="true" />
				Clear
			</Button>

			<Button
				variant="square"
				size="lg"
				emphasis="positive"
				on:click={clickDone}
				class="pointer-events-auto"
			>
				<Icon src={Check} theme="mini" class="w-8 h-8 mb-2" aria-hidden="true" />
				Done
			</Button>
		</div>
	{:else}
		<Button variant="square" size="lg" on:click={() => (showControls = true)}>
			<Icon src={Pencil} class="w-8 h-8 ml-2" aria-hidden="true" />
			Edit area
		</Button>
	{/if}
</div>
