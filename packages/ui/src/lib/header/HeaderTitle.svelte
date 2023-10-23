<script>
	import { base } from '$app/paths';
</script>

<a href={base || '/'}><span class="mr-4 text-lg"><slot /></span></a>
