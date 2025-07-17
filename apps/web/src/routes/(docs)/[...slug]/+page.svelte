<script lang="ts">
	let { data } = $props();

	const PageComponent = $derived(data.component);
</script>

<h1 class="responsive headline !mb-0">{data.metadata.title}</h1>
<p class="responsive subhead mb-typography-spacing-xl">{data.metadata.description}</p>

<PageComponent />
