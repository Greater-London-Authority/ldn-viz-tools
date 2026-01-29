<script lang="ts">
	/**
	 * The `<ThemeSwitcher>` component provides a select for the current theme - light, dark or system.
	 *
	 * **Important**: Requires the inclusion of the sibling "Theme" component. This should be implemented in the top level Layout component of the app. The theme switcher can then live at any level(s)
	 *
	 * @component
	 */

	import { Button } from '@ldn-viz/ui';
	import { Moon, Sun } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { DropdownMenu } from 'bits-ui';
	import { mode, setMode } from 'mode-watcher';

	const modes = ['light', 'dark', 'system'] as const;

	let themeIcon = $derived(mode.current === 'light' ? Sun : Moon);

	interface Props {
		/**
		 * The size of the menu trigger
		 */
		size?: 'xs' | 'sm' | 'md';
	}

	let { size = 'sm' }: Props = $props();

	const highlightedClasses =
		'bg-color-interactive-selected text-color-static-white py-1 px-2 cursor-pointer';
	const nonHighlightedClasses =
		'text-color-text hover:bg-color-interactive-primary-muted-hover py-1 px-2 cursor-pointer';
	const buttonClasses =
		'rounded-full text-xs p-1 min-w-6 min-h-6 bg-color-interactive-secondary text-color-static-white hover:bg-color-interactive-secondary-hover active:bg-color-interactive-secondary-active dark:hover:text-color-text-inverse';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger aria-label="Theme mode switcher">
		{#snippet child({ props })}
			<Button {...props} class={buttonClasses} variant="square" emphasis="secondary" {size}>
				{#if size === 'xs'}
					<Icon src={themeIcon} theme="mini" class="h-4 w-4" aria-hidden="true" />
				{:else}
					<Icon src={themeIcon} theme="mini" class="h-5 w-5" aria-hidden="true" />
				{/if}
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Portal>
		<DropdownMenu.Content
			class="border-color-border-muted bg-color-surface z-40 border capitalize shadow "
			preventScroll={false}
			aria-label="Select current theme mode"
		>
			{#each modes as themeMode (themeMode)}
				<DropdownMenu.Item
					onSelect={() => setMode(themeMode)}
					class={themeMode === mode.current ? highlightedClasses : nonHighlightedClasses}
				>
					{themeMode}
				</DropdownMenu.Item>
			{/each}
			<DropdownMenu.Separator />
			<DropdownMenu.Arrow class="text-color-border-muted" />
		</DropdownMenu.Content>
	</DropdownMenu.Portal>
</DropdownMenu.Root>
