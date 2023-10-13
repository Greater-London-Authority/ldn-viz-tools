<script lang="ts">
	import InputWrapper from './InputWrapper.svelte';

	export let id: string;
	export let name: string;

	if (!name) {
		name = id;
	}
</script>

<InputWrapper {...$$props}>
	<input class="form-input" type="text" {id} {name} />
</InputWrapper>
