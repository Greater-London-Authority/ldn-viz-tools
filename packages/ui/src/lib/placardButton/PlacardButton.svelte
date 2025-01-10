<script lang="ts">
	/**
	 * The `<PlacardButton>` component creates a call-to-action link that includes a title and description.
	 *
	 * **Alternatives**: if the button does not need to be as visually prominent or include a description, consider using the [Button](./?path=/docs/ui-button--documentation) component with the `href` prop.
	 * @component
	 */

	import { ArrowRight } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	/**
	 * The target of the link.
	 */
	export let href = '';

	/**
	 * If `true`, then the target of the link will open in a new browser tab or window.
	 */
	export let newWindow = false;
</script>

<a
	{href}
	target={newWindow ? '_blank' : '_self'}
	rel={newWindow ? 'noopener noreferrer' : ''}
	class="bg-color-action-secondary-100 group hover:bg-color-action-secondary-100-hover transition h-full flex flex-col text-color-text-primary"
>
	<div class="p-4 h-full space-y-2">
		{#if $$slots.title}
			<div class="text-2xl font-bold">
				<!-- Title text, displayed at top of card in large font-->
				<slot name="title" />
			</div>
		{/if}

		{#if $$slots.body}
			<div class="h-full text-color-text-primary prose leading-snug">
				<!-- longer description text displayed below the title in smaller font -->
				<slot name="body" />
			</div>
		{/if}
	</div>
	<div
		class="bg-color-action-background-secondary group-hover:bg-color-action-secondary-hover px-4 py-2 mt-4 flex justify-between transition"
	>
		<!-- text displayed at bottom of button, vertically aligned with icon-->
		<slot name="footer" />

		<!-- icon positioned at bottom-right of button (defaults to `ArrowRight`) -->
		<slot name="icon">
			<Icon src={ArrowRight} theme="solid" class="w-6 h-6" aria-hidden="true" />
		</slot>
	</div>
</a>
