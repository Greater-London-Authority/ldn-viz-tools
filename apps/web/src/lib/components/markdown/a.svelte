<script lang="ts">
	import { resolve } from '$app/paths';

	let { href, children } = $props();
</script>

<a href={href.startsWith('/') ? resolve(href) : href}>
	{@render children()}
</a>
