<script module lang="ts">
	export type PageNavItem = {
		title: string;
		href: string;
	};
</script>

<script lang="ts">
	/**
	 * The `PageNav` component renders links to the previous and next pages in a sequence of pages.
	 *
	 * @component
	 */
	import { ArrowLeftCircle, ArrowRightCircle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import Button from '../button/Button.svelte';

	interface Props {
		/**
		 * The pages, in reading order.
		 */
		pages: PageNavItem[];

		/**
		 * The `href` of the current page. If it doesn't match a page in `pages`, no links are shown.
		 */
		currentHref: string;

		/**
		 * Should be imported from:
		 * `import { resolve } from '$app/paths';`
		 */
		resolve?: (url: string) => string;
	}

	let { pages, currentHref, resolve = (url: string) => url }: Props = $props();

	const activeIndex = $derived(pages.findIndex((p) => p.href === currentHref));

	const hasActivePage = $derived(activeIndex !== -1);
	const hasPrevPage = $derived(hasActivePage && activeIndex > 0);
	const hasNextPage = $derived(hasActivePage && activeIndex < pages.length - 1);
</script>

<div class="flex justify-between gap-4 py-4 lg:py-8">
	<div>
		{#if hasPrevPage}
			{@const prevPage = pages[activeIndex - 1]}
			<Button
				href={resolve(prevPage.href)}
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
				href={resolve(nextPage.href)}
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
