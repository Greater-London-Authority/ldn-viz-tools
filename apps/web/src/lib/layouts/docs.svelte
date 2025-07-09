<script lang="ts">
	let { children } = $props();
</script>

<div class="prose responsive">
	{@render children?.()}
</div>
