<script lang="ts">
	/**
	 * One tab for each way of using the system. The reader's choice is shared
	 * by every UsageTabs on the site. Leave a snippet out when a way has
	 * nothing different to say.
	 * @component
	 */
	import { usageState, type Usage } from '$lib/state.svelte';
	import { TabList, TabPanel } from '@ldn-viz/ui';
	import { onMount, type ComponentProps, type Snippet } from 'svelte';

	interface Props {
		full?: Snippet;
		adapting?: Snippet;
		anywhere?: Snippet;
	}

	let { full, adapting, anywhere }: Props = $props();

	// Tab ids are element ids, so they need to be unique on the page
	const uid = $props.id();

	const panels = $derived(
		[
			{ usage: 'full' as Usage, label: 'The full system', content: full },
			{ usage: 'adapting' as Usage, label: 'Adapting an existing system', content: adapting },
			{ usage: 'anywhere' as Usage, label: 'Anywhere', content: anywhere }
		].filter((panel) => panel.content)
	);

	// TabList's Tab type asks for a content component, which only Tabs uses
	const tabs = $derived(
		panels.map((panel) => ({ id: `${uid}-${panel.usage}`, label: panel.label }))
	) as ComponentProps<typeof TabList>['tabs'];

	const active = $derived(panels.find((p) => p.usage === usageState.current) ?? panels[0]);

	onMount(() => usageState.restore());
</script>

<div class="width-content-wide">
	<TabList
		{tabs}
		ariaLabel="Ways of using the system"
		class="!items-stretch"
		selectedTabId={`${uid}-${active?.usage}`}
		handleSelect={(id) => usageState.set(id.slice(uid.length + 1) as Usage)}
	/>

	{#if active}
		<TabPanel
			tabId={`${uid}-${active.usage}`}
			tabPanelId={`${uid}-${active.usage}-panel`}
			class="flow-spacious !bg-color-canvas-muted px-4 py-6"
		>
			{@render active.content?.()}
		</TabPanel>
	{/if}
</div>
