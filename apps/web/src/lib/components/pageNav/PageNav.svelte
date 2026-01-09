<script>
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { navigation } from '$lib/navigation';
	import { Button } from '@ldn-viz/ui';
	import { ArrowLeftCircle, ArrowRightCircle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	const currSection = page.data.metadata.section;
	// An Array of all the pages
	const pages = navigation.flatMap((p) => [p, ...(p.children.length ? p.children : [])]);

	const activeIndex = $derived(
		pages.findIndex((p) => p.title.toLowerCase() === page.data.metadata.title.toLowerCase())
	);

	const hasActivePage = $derived(activeIndex !== -1);
	const hasPrevPage = $derived(hasActivePage && activeIndex > 0);
	const hasNextPage = $derived(hasActivePage && activeIndex < pages.length - 1);
</script>

<div class="flex justify-between gap-4 p-4 lg:p-8">
	<div>
		{#if hasPrevPage}
			{@const prevPage = pages[activeIndex - 1]}
			<Button href={resolve(prevPage.href, {})} variant="outline" emphasis="secondary">
				<Icon src={ArrowLeftCircle} theme="outline" class="mr-4 h-8 w-8" aria-hidden="true" />
				<div class="flex flex-col">
					<span class="product label-sm text-color-text-secondary"> Previous </span>
					<span class="product responsive label-lg">{prevPage.title}</span>
				</div>
			</Button>
		{/if}
	</div>
	<div>
		{#if hasNextPage}
			{@const nextPage = pages[activeIndex + 1]}

			<Button href={resolve(nextPage.href, {})} variant="outline" emphasis="secondary">
				<div class="flex flex-col">
					<span class="product label-sm text-color-text-secondary"> Next </span>
					<span class="product responsive label-lg">{nextPage.title}</span>
				</div>
				<Icon src={ArrowRightCircle} theme="outline" class="ml-4 h-8 w-8" aria-hidden="true" />
			</Button>
		{/if}
	</div>
</div>
