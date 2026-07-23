<script lang="ts">
	let { children } = $props();
</script>

<div class="p-8">
	<div class="flow-prose prose">
		{@render children?.()}
	</div>
</div>
