<script lang="ts">
	let { children } = $props();
</script>

<div class="p-8">
	<div class="prose responsive">
		{@render children?.()}
	</div>
</div>
