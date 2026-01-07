<script lang="ts">
	import { colorWithBestContrast } from '@ldn-viz/utils';
	import { ArrowRight } from '@steeze-ui/heroicons';
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
			theme.tokenNameToValue('text.primary'),
			theme.tokenNameToValue('text.inverse.primary')
		)
	);

	let ctaTextColor = $derived(
		colorWithBestContrast(
			ctaColorHover,
			theme.tokenNameToValue('text.primary'),
			theme.tokenNameToValue('text.inverse.primary')
		)
	);

	let isHovered = $state(false);
</script>

<a
	{href}
	target={newWindow ? '_blank' : '_self'}
	rel={newWindow ? 'noopener noreferrer' : ''}
	class="group flex h-full flex-col transition"
	style:color={textColor}
	style:background-color={isHovered ? bgColorHover : bgColor}
	onmouseenter={() => (isHovered = true)}
	onmouseleave={() => (isHovered = false)}
>
	<div class="h-full space-y-2 p-4">
		{#if title}
			<p class="text-2xl font-bold">
				<!-- Title text, displayed at top of card in large font-->
				{@render title?.()}
			</p>
		{/if}

		{#if body}
			<p class=" prose h-full leading-snug">
				<!-- longer description text displayed below the title in smaller font -->
				{@render body?.()}
			</p>
		{/if}
	</div>
	<div
		class=" mt-4 flex items-center justify-between px-4 py-2 transition"
		style:color={ctaTextColor}
		style:background-color={isHovered ? ctaColorHover : ctaColor}
	>
		<!-- text displayed at bottom of button, vertically aligned with icon-->
		{@render footer?.()}

		<!-- icon positioned at bottom-right of button (defaults to `ArrowRight`) -->
		{#if icon}
			{@render icon()}
		{:else}
			<Icon src={ArrowRight} theme="solid" class="h-5 w-5" aria-hidden="true" />
		{/if}
	</div>
</a>
