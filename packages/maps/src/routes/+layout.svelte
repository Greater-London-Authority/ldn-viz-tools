<script lang="ts">
	import '../app.postcss';

	let { children } = $props();
</script>

<div class="container mx-auto">
	{@render children()}
</div>
