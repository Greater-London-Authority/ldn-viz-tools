<script context="module">
	import RadioButtonGroupSolid from './RadioButtonGroupSolid.svelte';
	import RadioButtonSolid from './RadioButtonSolid.svelte';

	export const meta = {
		title: 'Ui/RadioButtonGroupSolid',
		component: RadioButtonGroupSolid,
		subcomponents: { RadioButtonSolid }
	};
</script>

<script lang="ts">
	import { Funnel, Map, PresentationChartLine } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import { Story } from '@storybook/addon-svelte-csf';

	let selectedId = 'bus';

	let optionsForGroup = [
		{ id: 'bus', label: 'Bus stops' },
		{ id: 'train', label: 'Train stations' },
		{ id: 'underground', label: 'Underground stations' },
		{ id: 'taxi', label: 'Taxi ranks', disabled: true }
	];
</script>

<Story name="RadioGroup">
	<RadioButtonGroupSolid options={optionsForGroup} name="station-type" bind:selectedId />
	<p class="mt-8 text-color-text-secondary">Selected id: {selectedId}</p>
</Story>

<Story name="RadioGroup with Icons above">
	<RadioButtonGroupSolid name="station-type" bind:selectedId>
		<RadioButtonSolid id="bus" name="station-type-bus">
			<Icon src={Funnel} theme="mini" class="w-5 h-5 mb-1" aria-hidden="true" />
			Bus
		</RadioButtonSolid>
		<RadioButtonSolid id="train" name="station-type-train">
			<Icon src={Map} theme="mini" class="w-5 h-5 mb-1" aria-hidden="true" />
			Train
		</RadioButtonSolid>
		<RadioButtonSolid id="plane" name="station-type-plane">
			<Icon src={PresentationChartLine} theme="mini" class="w-5 h-5 mb-1" aria-hidden="true" />
			Plane
		</RadioButtonSolid>
	</RadioButtonGroupSolid>
	<p class="mt-8 text-color-text-secondary">Selected id: {selectedId}</p>
</Story>

<Story name="RadioGroup with Icons below">
	<RadioButtonGroupSolid name="station-type" bind:selectedId>
		<RadioButtonSolid id="bus" name="station-type-bus">
			Bus
			<Icon src={Funnel} theme="mini" class="w-5 h-5 mt-1" aria-hidden="true" />
		</RadioButtonSolid>
		<RadioButtonSolid id="train" name="station-type-train">
			Train
			<Icon src={Map} theme="mini" class="w-5 h-5 mt-1" aria-hidden="true" />
		</RadioButtonSolid>
		<RadioButtonSolid id="plane" name="station-type-plane">
			Plane
			<Icon src={PresentationChartLine} theme="mini" class="w-5 h-5 mt-1" aria-hidden="true" />
		</RadioButtonSolid>
	</RadioButtonGroupSolid>
	<p class="mt-8 text-color-text-secondary">Selected id: {selectedId}</p>
</Story>

<Story name="With 2 options">
	<RadioButtonGroupSolid name="station-type" bind:selectedId>
		<RadioButtonSolid id="bus" name="station-type-bus">
			<Icon src={Funnel} theme="mini" class="w-5 h-5 mb-1" aria-hidden="true" />
			Bus
		</RadioButtonSolid>
		<RadioButtonSolid id="train" name="station-type-train">
			<Icon src={Map} theme="mini" class="w-5 h-5 mb-1" aria-hidden="true" />
			Train
		</RadioButtonSolid>
	</RadioButtonGroupSolid>
	<p class="mt-8 text-color-text-secondary">Selected id: {selectedId}</p>
</Story>

<Story name="With 4 options">
	<RadioButtonGroupSolid name="station-type" bind:selectedId>
		<RadioButtonSolid id="bus" name="station-type-bus">
			<Icon src={Funnel} theme="mini" class="w-5 h-5 mb-1" aria-hidden="true" />
			Bus
		</RadioButtonSolid>
		<RadioButtonSolid id="train" name="station-type-train">
			<Icon src={Map} theme="mini" class="w-5 h-5 mb-1" aria-hidden="true" />
			Train
		</RadioButtonSolid>
		<RadioButtonSolid id="plane" name="station-type-plane">
			<Icon src={PresentationChartLine} theme="mini" class="w-5 h-5 mb-1" aria-hidden="true" />
			Plane
		</RadioButtonSolid>
		<RadioButtonSolid id="plane" name="station-type-plane">
			<Icon src={PresentationChartLine} theme="mini" class="w-5 h-5 mb-1" aria-hidden="true" />
			This_label_is_far_too_long
		</RadioButtonSolid>
	</RadioButtonGroupSolid>
	<p class="mt-8 text-color-text-secondary">Selected id: {selectedId}</p>
</Story>
