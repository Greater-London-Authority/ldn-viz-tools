<script lang="ts">
	import { Button, Input } from '@ldn-viz/ui';
	import {
		// Circle,
		MapPinSimpleArea
	} from '@steeze-ui/phosphor-icons';
	import { Icon } from '@steeze-ui/svelte-icon';

	// Activate

	const handleClick = () => {
		console.log('clicked');

		// Deactivate tooltips
		// Set cursor to cross hairs
	};

	// Drop a pin

	// Move map to pin

	// Extend circle out from pin

	// Tie Radius to range slider

	// Display Radius in M2

	// Debounce callbacks/ Submit on done

	//----//

	let radiusValue = $state('5');
</script>

<Button
	variant="square"
	emphasis="secondary"
	title="Radius Search"
	class="pointer-events-auto"
	onclick={handleClick}
>
	<Icon src={MapPinSimpleArea} class="h-8 w-8 p-1" />
</Button>

<div class="pointer-events-auto bg-color-container p-2">
	<p>TODO: Radius feedback here</p>

	<Input type="range" label="Radius" name="searchRadius" bind:value={radiusValue} />

	<Input type="text" label="Radius M<sup>2</sup>" bind:value={radiusValue}></Input>
</div>
