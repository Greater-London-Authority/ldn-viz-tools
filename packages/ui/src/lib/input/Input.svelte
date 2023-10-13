<script lang="ts">
	import InputWrapper from './InputWrapper.svelte';

	export let id: string;
	export let name: string;
	export let placeholder = '';
	export let type = ''; // TODO: fix

	if (!name) {
		name = id;
	}
</script>

<InputWrapper {...$$props}>
	<input class="form-input" type="text" {id} {name} {placeholder} {type} />
</InputWrapper>
