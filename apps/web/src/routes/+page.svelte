<script lang="ts">
	let { data } = $props();

	const PageComponent = $derived(data.component);
</script>

<h1 class="headline responsive">{data.metadata.title}</h1>
<p class="subhead responsive mb-typography-spacing-xl">{data.metadata.description}</p>

<PageComponent />
