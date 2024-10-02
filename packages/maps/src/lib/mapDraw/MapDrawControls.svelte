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
		<RadioButtonGroupSolid name="" {options} bind:selectedId={currentMode} />

		<div class="flex">
			<Button
				variant="square"
				size="lg"
				condition="error"
				on:click={clickClear}
				class="pointer-events-auto"
			>
				<Icon src={XMark} theme="mini" class="w-5 h-5 ml-2" aria-hidden="true" />
				Clear
			</Button>

			<Button
				variant="square"
				size="lg"
				condition="success"
				on:click={clickDone}
				class="pointer-events-auto"
			>
				<Icon src={Check} theme="mini" class="w-5 h-5 ml-2" aria-hidden="true" />
				Done
			</Button>
		</div>
	{:else}
		<Button variant="square" size="lg" on:click={() => (showControls = true)}>
			<Icon src={Pencil} theme="mini" class="w-5 h-5 ml-2" aria-hidden="true" />
			Edit area
		</Button>
	{/if}
</div>
