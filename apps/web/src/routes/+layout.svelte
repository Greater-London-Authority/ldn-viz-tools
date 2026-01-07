<script lang="ts">
	import '../app.postcss';

	let { children } = $props();
</script>

<div class="">HEADER</div>
<div class="">
	{@render children()}
</div>
<div class="">FOOTER</div>
