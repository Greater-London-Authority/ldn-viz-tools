<script lang="ts">
    import TabLabel from "./TabLabel.svelte";
    import TabList from "./TabList.svelte";

    import {setContext} from 'svelte';
    import {writable, type Writable} from 'svelte/store';

    export let selectedValue;
    export let collapsed;

    const val: Writable<string> = writable(selectedValue);
    val.subscribe((newVal) => (selectedValue = newVal));
    setContext('selectedValue', {
        selectedValue: val
    });

    const isCollapsed: Writable<boolean> = writable(collapsed);
    isCollapsed.subscribe((newVal) => (collapsed = newVal));
    setContext('collapsed', {
        collapsed: isCollapsed
    });


    export let tabs = []
</script>


<div id="sidebar" class="bg-core-grey-800 h-screen flex" class:collapsed={collapsed} class:expanded={!collapsed}>

    <TabList>
        {#each tabs as tab}
            <TabLabel tabId={tab.id}>
                <svelte:component this={tab.icon} class="h-5 w-5" style="fill: white" aria-hidden="true"/>
                {tab.label}
            </TabLabel>
        {/each}
    </TabList>

    <div class="p-6">
        <slot/>
    </div>
</div>


<style>
    .expanded {
        width: 488px;
    }

    .collapsed {
        width: 80px;
        overflow-x: hidden;
    }
</style>