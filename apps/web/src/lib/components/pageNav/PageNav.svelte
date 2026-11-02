<script>
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { navigation } from '$lib/navigation';
	import { Button } from '@ldn-viz/ui';
	import { ArrowLeftCircle, ArrowRightCircle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	// An Array of all the pages
	const pages = navigation.flatMap((p) => [p, ...(p.children.length ? p.children : [])]);

	const activeIndex = $derived(pages.findIndex((p) => p.href === page.data.metadata.slugFull));

	const hasActivePage = $derived(activeIndex !== -1);
	const hasPrevPage = $derived(hasActivePage && activeIndex > 0);
	const hasNextPage = $derived(hasActivePage && activeIndex < pages.length - 1);
</script>

<div class="flex justify-between gap-4 py-4 lg:py-8">
	<div>
		{#if hasPrevPage}
			{@const prevPage = pages[activeIndex - 1]}
			<Button
				href={resolve(prevPage.href, {})}
				variant="outline"
				emphasis="secondary"
				class="!items-end"
			>
				<Icon src={ArrowLeftCircle} theme="outline" class="mr-2 h-6 w-6 " aria-hidden="true" />
				<div class="flex flex-col">
					<span class="typeset-product label-sm text-color-text-muted"> Previous </span>
					<span class="typeset-product label-md">{prevPage.title}</span>
				</div>
			</Button>
		{/if}
	</div>
	<div>
		{#if hasNextPage}
			{@const nextPage = pages[activeIndex + 1]}

			<Button
				href={resolve(nextPage.href, {})}
				variant="outline"
				emphasis="secondary"
				class="!items-end"
			>
				<div class="flex flex-col">
					<span class="typeset-product label-sm text-color-text-muted"> Next </span>
					<span class="typeset-product label-md">{nextPage.title}</span>
				</div>
				<Icon src={ArrowRightCircle} theme="outline" class="ml-2 h-6 w-6" aria-hidden="true" />
			</Button>
		{/if}
	</div>
</div>
