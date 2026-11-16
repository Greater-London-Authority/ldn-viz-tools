<script lang="ts">
	/**
	 * `SlatGroup` — an `Expandable.Root` for `Slat`s. Each slat opens on its own unless
	 * `type="single"`.
	 *
	 * @component
	 */
	import type { ComponentProps } from 'svelte';
	import { classNames } from '../../utils/classNames.js';
	import ExpandableRoot from '../ExpandableRoot.svelte';

	let {
		value = $bindable(),
		type = 'multiple',
		class: classes = '',
		...rest
	}: ComponentProps<typeof ExpandableRoot> = $props();
</script>

<ExpandableRoot bind:value {type} class={classNames('flex flex-col gap-2', classes)} {...rest} />
