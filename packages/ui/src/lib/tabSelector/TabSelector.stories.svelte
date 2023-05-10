<script>
    import {Meta, Story, Template} from '@storybook/addon-svelte-csf';

    import TabSelector from "./TabSelector.svelte";
    import TabSelectorEntry from "./TabSelectorEntry.svelte";

    import Fa from 'svelte-fa/src/fa.svelte';
    import {faFilter, faLayerGroup, faChartLine} from '@fortawesome/free-solid-svg-icons'

    let selectedValue = "filter";
</script>

<Meta title="Ui/TabSelector" component={TabSelector}/>

<Story name="Icons above labels">

    <div class="pb-8">
        Selected value: <b>{selectedValue}</b>
    </div>

    <div style="width: 300px">
        <TabSelector bind:selectedValue>
            <TabSelectorEntry value="filter">
                <Fa icon={faFilter} focusable="false"/>
                Filters
            </TabSelectorEntry>

            <TabSelectorEntry value="analysis">
                <Fa icon={faChartLine} focusable="false"/>
                Analysis
            </TabSelectorEntry>

            <TabSelectorEntry value="layers">
                <Fa icon={faLayerGroup} focusable="false"/>
                Layers
            </TabSelectorEntry>
        </TabSelector>
    </div>
</Story>


<Story name="Icons below labels">

    <div class="pb-8">
        Selected value: <b>{selectedValue}</b>
    </div>

    <div style="width: 300px">
        <TabSelector bind:selectedValue>
            <TabSelectorEntry value="filter">
                Filters
                <Fa icon={faFilter} focusable="false"/>
            </TabSelectorEntry>

            <TabSelectorEntry value="analysis">
                Analysis
                <Fa icon={faChartLine} focusable="false"/>
            </TabSelectorEntry>

            <TabSelectorEntry value="layers">
                Layers
                <Fa icon={faLayerGroup} focusable="false"/>
            </TabSelectorEntry>
        </TabSelector>
    </div>
</Story>

