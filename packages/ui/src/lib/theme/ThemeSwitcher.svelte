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
	import { mode, setMode, userPrefersMode } from 'mode-watcher';

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
		'bg-color-interactive-selected text-color-static-white py-0 px-2 cursor-pointer label-md';
	const nonHighlightedClasses =
		'text-color-text hover:bg-color-interactive-primary-muted-hover py-0 px-2 cursor-pointer label-md';
	const buttonClasses =
		'rounded-full p-1 min-w-6 min-h-6 bg-color-interactive-secondary text-color-inverse-text hover:bg-color-interactive-secondary-hover active:bg-color-interactive-secondary-active';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger aria-label="Theme mode switcher">
		{#snippet child({ props })}
			<Button {...props} class={buttonClasses} variant="square" emphasis="secondary" {size}>
				{#if size === 'xs'}
					<Icon
						src={themeIcon}
						theme="mini"
						class="h-4 w-4"
						aria-hidden="true"
						title="Switch between light and dark mode."
					/>
				{:else}
					<Icon
						src={themeIcon}
						theme="mini"
						class="h-5 w-5"
						aria-hidden="true"
						title="Switch between light and dark mode."
					/>
				{/if}
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Portal>
		<DropdownMenu.Content
			class="typeset-product elevation-2 z-40 border border-color-border-wash bg-color-surface capitalize "
			preventScroll={false}
			aria-label="Select current theme mode"
		>
			<!-- Radio items tell a screen reader which mode is chosen -->
			<DropdownMenu.RadioGroup
				value={userPrefersMode.current}
				onValueChange={(value) => setMode(value as (typeof modes)[number])}
			>
				{#each modes as themeMode (themeMode)}
					<DropdownMenu.RadioItem
						value={themeMode}
						class={themeMode === userPrefersMode.current
							? highlightedClasses
							: nonHighlightedClasses}
					>
						{themeMode}
					</DropdownMenu.RadioItem>
				{/each}
			</DropdownMenu.RadioGroup>
			<DropdownMenu.Separator />
			<DropdownMenu.Arrow class="text-color-border-wash" />
		</DropdownMenu.Content>
	</DropdownMenu.Portal>
</DropdownMenu.Root>
