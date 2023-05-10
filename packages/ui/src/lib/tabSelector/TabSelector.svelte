<script>
    import Fa from 'svelte-fa/src/fa.svelte';
    import {faFilter, faLayerGroup, faChartLine} from '@fortawesome/free-solid-svg-icons'
    import TabSelectorEntry from "./TabSelectorEntry.svelte";

    export let value;
</script>

<div class="groupsNav">

<slot/>
</div>

<style>
    .groupsNav {
        display: flex;
    }
</style>
