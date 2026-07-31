<script lang="ts">
	let { children } = $props();
</script>

<div class="p-8">
	<div class="prose flow-prose">
		{@render children?.()}
	</div>
</div>
