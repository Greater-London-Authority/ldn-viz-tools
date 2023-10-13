<script lang="ts">
	import InputWrapper from './InputWrapper.svelte';

	export let id: string;
	export let name: string;
	export let placeholder = '';
	export let type = 'text';

	if (!name) {
		name = id;
	}
</script>

<InputWrapper {...$$restProps} {id}>
	<input class="form-input" {id} {name} {placeholder} {type} />
</InputWrapper>
