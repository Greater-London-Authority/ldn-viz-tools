<script lang="ts">
    import TabLabel from "./TabLabel.svelte";
    import TabList from "./TabList.svelte";

    import {setContext} from 'svelte';
    import {writable, type Writable} from 'svelte/store';

    export let selectedValue;

    const val: Writable<string> = writable(selectedValue);
    val.subscribe((newVal) => (selectedValue = newVal));

    setContext('selectedValue', {
        selectedValue: val
    });

    export let tabs = []
</script>


<div id="sidebar" class="bg-core-grey-800 h-screen flex">

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
    #sidebar {
        width: 488px;
    }
</style>