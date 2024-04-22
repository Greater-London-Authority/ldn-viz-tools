<script lang="ts">
	export let base = ''; // typcally imported from '$app/paths' then pased as prop
</script>

<a href={base || '/'}><span class="mr-4 text-lg"><slot /></span></a>
