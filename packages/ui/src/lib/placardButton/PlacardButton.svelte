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
	 * If `true`, then the targer of the link will open in a new browser tab or window.
	 */
	export let newWindow = false;
</script>

<a
	{href}
	target={newWindow ? '_blank' : '_self'}
	rel={newWindow ? 'noopener noreferrer' : ''}
	class="bg-core-grey-700 group hover:bg-core-grey-800 transition h-full flex flex-col text-white"
>
	<div class="p-4 h-full space-y-2">
		{#if $$slots.title}
			<div class="text-2xl font-bold">
				<slot name="title" />
			</div>
		{/if}

		{#if $$slots.body}
			<div class="h-full text-core-grey-100 prose leading-snug">
				<slot name="body" />
			</div>
		{/if}
	</div>
	<div
		class="bg-core-grey-600 group-hover:bg-core-blue-600 dark:group-hover:bg-core-blue-600 p-4 mt-4 flex justify-between transition"
	>
		<slot name="footer" />
		<slot name="icon">
			<Icon src={ArrowRight} theme="solid" class="w-6 h-6" aria-hidden="true" />
		</slot>
	</div>
</a>
