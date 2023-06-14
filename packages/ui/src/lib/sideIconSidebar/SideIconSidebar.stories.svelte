<script>
    import {Meta, Story, Template} from '@storybook/addon-svelte-csf';

    import SideIconSidebar from "./SideIconSidebar.svelte";
    import {ChartBarIcon, FilterIcon, LocationMarkerIcon, MapIcon} from "@rgossiaux/svelte-heroicons/solid";

    let selected = "filters";

    let tabs = [
        {id: "markers", label: "Data Markers", icon: LocationMarkerIcon},
        {id: "filters", label: "Filters", icon: FilterIcon},
        {id: "analysis", label: "Analysis", icon: ChartBarIcon},
        {id: "layers", label: "Layers", icon: MapIcon}
    ]

</script>

<Meta title="Ui/SideIconSidebar" component={SideIconSidebar}/>

<Template let:args>
    <SideIconSidebar {...args}/>
</Template>

<Story name="Default">
    <SideIconSidebar {tabs} bind:selected>
        <p class="text-white"> Selected tab: {selected} </p>
    </SideIconSidebar>
</Story>


<Story name="With contents">

    <p>
        In actual use, would probably have a separate component for each pane of the tab, and render conditionally.
    </p>

    <SideIconSidebar {tabs} bind:selected>

        {#if selected === "markers"}
            <div class="text-white">Markers is selected, so we'd render a
                <code> &lt;Marker /&gt;</code>
                component
            </div>
        {:else if selected === "filters"}
            <div class="text-white">Filter is selected, so we'd render a
                <code> &lt;Filters /&gt;</code>
                component
            </div>
        {:else if selected === "analysis"}
            <div class="text-white">Analysis is selected, so we'd render a
                <code> &lt;Analysis /&gt;</code>
                component
            </div>
        {:else if selected === "layers"}
            <div class="text-white">Layers is selected, so we'd render a
                <code> &lt;Layer /&gt;</code>
                component
            </div>
        {/if}

    </SideIconSidebar>
</Story>
