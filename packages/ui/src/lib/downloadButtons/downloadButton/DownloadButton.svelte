<script lang="ts">
	/**
	 * The `<DownloadButton>` component renders one button that opens a menu of download formats.
	 * The menu has a Data group (CSV, JSON) and an Image group (PNG, SVG). Choosing a format downloads the file.
	 *
	 * The Data group shows when `data` or `dataFn` is set. The Image group shows when `htmlNode` is set.
	 * @component
	 */

	import { ArrowDownTray } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { DropdownMenu } from 'bits-ui';
	import Button from '../../button/Button.svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { classNames } from '../../utils/classNames';
	import { downloadCSV, downloadJSON } from '../dataDownloadButton/utils';
	import { downloadImage } from '../imageDownloadButton/utils';

	type DataFormat = 'CSV' | 'JSON';
	type ImageFormat = 'PNG' | 'SVG';

	type DownloadButtonProps = Omit<HTMLButtonAttributes, 'children' | 'class' | 'disabled'> & {
		/**
		 * The available data formats for the downloaded file.
		 */
		dataFormats?: DataFormat[];

		/**
		 * The data that will be encoded in the downloaded file (formatted as an array of objects).
		 */
		data?: Record<string, number | string>[];

		/**
		 * A function which, when called with no arguments, will return the data to be saved in the downloaded file.
		 * If this is provided, then the `data` prop is ignored.
		 */
		dataFn?: undefined | (() => any[]) | (() => Promise<any[]>);

		/**
		 * An optional object defining a mapping from the names of attributes in the `data` prop to the names of columns in the generated file.
		 */
		columnMapping?: undefined | { [oldName: string]: string };

		/**
		 * The available file formats for the downloaded image.
		 */
		imageFormats?: ImageFormat[];

		/**
		 * An `Element` node to be converted. When 'SVG' format is selected the largest child svg element will be targeted.
		 */
		htmlNode?: HTMLElement | SVGElement;

		/**
		 * Amount of padding to add to images, in pixels.
		 */
		padding?: number;

		/**
		 * If converting an SVG to PNG, the resolution of the PNG will be `scaleFactor` times the size at which the SVG was displayed at.
		 */
		scaleFactor?: number;

		/**
		 * The name the downloaded file will be saved with.
		 */
		filename?: string;

		/**
		 * The text on the button. In a compact button it is the accessible name.
		 */
		label?: string;

		/**
		 * If `true`, the button shows only the download icon.
		 */
		compact?: boolean;

		/**
		 * If `true`, the user will not be able to interact with the button to download data.
		 */
		disabled?: boolean;

		/**
		 * If `true`, the button fills the width of its parent. It has no effect on a compact button.
		 */
		fullWidth?: boolean;

		/**
		 * Classes added to the button.
		 */
		class?: string;
	};

	let {
		dataFormats = ['CSV', 'JSON'],
		data,
		dataFn = undefined,
		columnMapping = undefined,
		imageFormats = ['PNG', 'SVG'],
		htmlNode,
		padding = 30,
		scaleFactor = 2,
		filename = 'download',
		label = 'Download',
		compact = false,
		disabled = false,
		fullWidth = false,
		class: className = '',
		...restProps
	}: DownloadButtonProps = $props();

	type MenuOption = { id: DataFormat | ImageFormat; label: string; description: string };

	const dataOptions: MenuOption[] = [
		{ id: 'CSV', label: 'CSV', description: 'Can be opened in software such as Excel.' },
		{ id: 'JSON', label: 'JSON', description: 'Sometimes more convenient for programmers.' }
	];

	const imageOptions: MenuOption[] = [
		{ id: 'PNG', label: 'PNG', description: 'Best for documents and presentations.' },
		{ id: 'SVG', label: 'SVG', description: 'Vector — best for editing in design tools.' }
	];

	let groups = $derived(
		[
			{
				heading: 'Data',
				options:
					data || dataFn ? dataOptions.filter((o) => dataFormats.includes(o.id as DataFormat)) : []
			},
			{
				heading: 'Image',
				options: htmlNode
					? imageOptions.filter((o) => imageFormats.includes(o.id as ImageFormat))
					: []
			}
		].filter((group) => group.options.length > 0)
	);

	let isDisabled = $derived(disabled || groups.length === 0);

	// The Figma triggers override the Button defaults: the text trigger uses the body text colour,
	// the small label and a 4px gap; the compact trigger is a 28px outline square.
	let standardClasses = $derived(
		classNames(
			'button-label-sm gap-1',
			isDisabled
				? ''
				: '!text-color-text hover:!text-color-interactive-primary-text-hover active:!text-color-interactive-primary-text-active'
		)
	);
	const compactClasses = '!h-7 !w-7 !min-h-0 !min-w-0 !p-0';

	const download = async (format: MenuOption['id']) => {
		if (format === 'JSON') {
			await downloadJSON(data, dataFn, columnMapping, filename || 'data');
		} else if (format === 'CSV') {
			await downloadCSV(data, dataFn, columnMapping, filename || 'data');
		} else if (htmlNode) {
			await downloadImage(htmlNode, padding, format, filename, scaleFactor);
		}
	};
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger disabled={isDisabled}>
		{#snippet child({ props })}
			<Button
				{...restProps}
				{...props}
				variant={compact ? 'outline' : 'text'}
				emphasis={compact ? 'secondary' : 'primary'}
				size={compact ? 'xs' : 'sm'}
				slim={!compact}
				fullWidth={fullWidth && !compact}
				data-capture-ignore
				class={classNames(compact ? compactClasses : standardClasses, className)}
				disabled={isDisabled}
				aria-label={compact ? label : undefined}
				title={compact ? label : undefined}
			>
				{#if compact}
					<Icon src={ArrowDownTray} theme="mini" class="h-4 w-4" aria-hidden="true" />
				{:else}
					{label}
					<Icon src={ArrowDownTray} theme="mini" class="h-5 w-5" aria-hidden="true" />
				{/if}
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>

	<DropdownMenu.Portal>
		<DropdownMenu.Content
			class="typeset-product elevation-2 z-[60] flex w-[15.5rem] flex-col gap-0.5 border border-color-border-wash bg-color-surface p-1"
			align="start"
			sideOffset={4}
			preventScroll={false}
		>
			{#each groups as group, i (group.heading)}
				{#if i > 0}
					<DropdownMenu.Separator class="h-px bg-color-border-wash" />
				{/if}
				<DropdownMenu.Group>
					<DropdownMenu.GroupHeading class="label-sm px-2 py-1 text-color-text-muted">
						{group.heading}
					</DropdownMenu.GroupHeading>
					{#each group.options as option (option.id)}
						<DropdownMenu.Item
							class="flex w-full cursor-pointer flex-col gap-0.5 px-2 py-1 text-left outline-none hover:bg-color-interactive-primary-muted-hover focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-color-interactive-focus active:bg-color-interactive-primary-muted-active data-[highlighted]:bg-color-interactive-primary-muted-hover"
							onSelect={() => download(option.id)}
						>
							<span class="label-md text-color-text">{option.label}</span>
							<span class="caption-sm text-color-text-muted">{option.description}</span>
						</DropdownMenu.Item>
					{/each}
				</DropdownMenu.Group>
			{/each}
		</DropdownMenu.Content>
	</DropdownMenu.Portal>
</DropdownMenu.Root>
