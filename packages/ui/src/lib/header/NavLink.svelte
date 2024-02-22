<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';

	export let target = '';

	let classes: string;
	$: {
		if (($page.url?.pathname || '').endsWith(target)) {
			classes = 'flex h-[50px] bg-core-blue-500 items-center px-4 py-2 items-center';
		} else {
			classes = 'flex h-[50px] bg-core-grey-700 items-center px-4 py-2 items-center';
		}
	}
</script>

<div class={classes}>
	<a href={`${base}/${target}`}>
		<slot />
	</a>
</div>
