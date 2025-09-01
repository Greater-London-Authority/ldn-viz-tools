<script lang="ts">
	let { children } = $props();
</script>

<div class="flex space-x-24 p-4">
	<div class="prose responsive">
		{@render children?.()}
	</div>
</div>
