<script lang="ts">
	import { colorWithBestContrast } from '@ldn-viz/utils';
	import { ArrowRight, ArrowTopRightOnSquare } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { type Snippet } from 'svelte';
	import { theme } from '../theme/themeState.svelte';

	/**
	 * The `<PlacardButton>` component creates a call-to-action link that includes a title and description.
	 *
	 * **Alternatives**: if the button does not need to be as visually prominent or include a description, consider using the [Button](./?path=/docs/ui-components-buttons-button--documentation) component with the `href` prop.
	 * @component
	 */

	interface Props {
		/**
		 * The target of the link.
		 */
		href?: string;
		/**
		 * If `true`, then the target of the link will open in a new browser tab or window.
		 * The default icon changes to `ArrowTopRightOnSquare`, and screen readers hear "(opens in a new tab)".
		 */
		newWindow?: boolean;
		/**
		 * A string representing one of our palette colors.
		 */
		colorWay?:
			| 'grey'
			| 'blue'
			| 'green'
			| 'yellow'
			| 'orange'
			| 'red'
			| 'pink'
			| 'darkpink'
			| 'purple'
			| 'turquoise';
		title?: Snippet;
		body?: Snippet;
		footer?: Snippet;
		icon?: Snippet;
	}

	let {
		href = '',
		newWindow = false,
		colorWay = 'grey',
		title,
		body,
		footer,
		icon
	}: Props = $props();

	let bgColor = $derived(theme.tokenNameToValue(`palette.${colorWay}.100`));
	let bgColorHover = $derived(theme.tokenNameToValue(`palette.${colorWay}.200`));
	let ctaColor = $derived(theme.tokenNameToValue(`palette.${colorWay}.700`));
	let ctaColorHover = $derived(theme.tokenNameToValue(`palette.${colorWay}.800`));

	let textColor = $derived(
		colorWithBestContrast(
			bgColor,
			theme.tokenNameToValue('text'),
			theme.tokenNameToValue('inverse.text')
		)
	);

	let ctaTextColor = $derived(
		colorWithBestContrast(
			ctaColorHover,
			theme.tokenNameToValue('text'),
			theme.tokenNameToValue('inverse.text')
		)
	);
</script>

<a
	{href}
	target={newWindow ? '_blank' : '_self'}
	rel={newWindow ? 'noopener noreferrer' : undefined}
	class="group flex h-full flex-col bg-[var(--placard-bg)] transition hover:bg-[var(--placard-bg-hover)] focus-visible:bg-[var(--placard-bg-hover)]"
	style:color={textColor}
	style:--placard-bg={bgColor}
	style:--placard-bg-hover={bgColorHover}
	style:--placard-cta={ctaColor}
	style:--placard-cta-hover={ctaColorHover}
>
	<div class="flow-standard h-full p-4">
		{#if title}
			<p class="card-title">
				<!-- Title text, displayed at top of card in large font-->
				{@render title?.()}
			</p>
		{/if}

		{#if body}
			<p class="body-md h-full">
				<!-- longer description text displayed below the title in smaller font -->
				{@render body?.()}
			</p>
		{/if}
	</div>
	<div
		class="mt-4 flex items-center justify-between bg-[var(--placard-cta)] px-4 py-2 transition group-hover:bg-[var(--placard-cta-hover)] group-focus-visible:bg-[var(--placard-cta-hover)]"
		style:color={ctaTextColor}
	>
		<!-- text displayed at bottom of button, vertically aligned with icon-->
		<span class="label-md">
			{@render footer?.()}
			{#if newWindow}
				<span class="sr-only">(opens in a new tab)</span>
			{/if}
		</span>

		<!-- icon positioned at bottom-right of button (defaults to `ArrowRight`, or `ArrowTopRightOnSquare` when `newWindow` is set) -->
		{#if icon}
			{@render icon()}
		{:else}
			<Icon
				src={newWindow ? ArrowTopRightOnSquare : ArrowRight}
				theme="solid"
				class="h-5 w-5"
				aria-hidden="true"
			/>
		{/if}
	</div>
</a>
