<script>
    import {Meta, Template, Story} from '@storybook/addon-svelte-csf';

    import LayerControl from "./LayerControl.svelte";
    import LayerControlWrapper from "./LayerControlWrapper.svelte";
    import LayerControlWithOpacity from "./LayerControlWithOpacity.svelte";

    let selected;
    const options1 = [
        {color: "#9E0059", label: "bar", id: "bar"},
        {color: "#6DA7DE", label: "foo", id: "foo", description: "Some description of what this option is..."},
        {
            color: "#63C5B5", label: "baz", id: "baz", children: [
                {color: "#EB861E", label: "foobar", id: "foobar"}
            ]
        },
    ];

    let selected2;
    const options2 = [
        {color: "#9E0059", label: "bar", id: "bar"},
        {color: "#6DA7DE", label: "foo", id: "foo", description: "Some description of what this option is..."},
        {color: "#63C5B5", label: "baz", id: "baz"},

    ];

    const options3 = [
        {color: "rgb(103, 150, 245)", id: "water_fountains", label: "Water fountains", description: "Drinking fountains"},
        {color: "rgb(54, 163, 153)", id: "outdoor", label: "Outdoor cool spaces", description: "These open spaces have been designated as Cool Spaces where relief can be sought during hot days."},
        {color: "rgb(238, 38, 109)", id: "indoor", label: "Indoor cool spaces", description: "These venues have been designated as Cool Spaces where refuge can be sought during hot days."},
        {color: "rgb(0, 255, 255)", id: "cooler_areas", label: "Cooler Areas", description: "Modelled average land surface temperature - the more visible this layer's information is, the cooler the area is likely to be."},
        {color: "rgb(94, 161, 93)", id: "tree_canopies", label: "Tree canopy cover", description: "Indicative location of mature tree canopy cover in public open areas."},
        {color: "rgb(65, 108, 137)", id: "water_courses", label: "Water courses", description: "Water cools the air, so places next to water courses can be less hot."},
    ];

    let opacity1 = 0.5;
    let opacity2 = 0.75;
</script>

<Meta title="Ui/LayerControl" component={LayerControl}/>

<Template let:args>
    <LayerControl {...args}>
        I'm a button from UI!
    </LayerControl>
</Template>

<Story name="Default"/>


<Story name="Creating individual LayerControl elements">
    <div class="bg-core-grey-900 w-fit">
        <LayerControl color="#9E0059" label="bar"/>

        <LayerControl color="#6DA7DE" label="foo">
            Some description of what this option is...
        </LayerControl>

        <LayerControl color="#63C5B5" label="baz" hasChildLayers={true}>
            <LayerControl color="#EB861E" label="foobar"/>
        </LayerControl>
    </div>
</Story>

<Story name="Using LayerControlWrapper">
    Current selection state:
    <pre>{JSON.stringify(selected, null, 4)}</pre>

    <div class="bg-core-grey-900 w-fit">
        <LayerControlWrapper options={options1} bind:selected/>
    </div>
</Story>


<Story name="Using LayerControlWrapper for mutually exclusive options">
    Current selection state:
    <pre> {JSON.stringify(selected2, null, 4)} </pre>

    <div class="bg-core-grey-900 w-fit">
        <LayerControlWrapper options={options2} bind:selected={selected2} exclusive={true}/>
    </div>
</Story>

<Story name="Cooler Spaces example">
    <div class="bg-core-grey-900 w-fit">
        <LayerControlWrapper options={options3} />
    </div>
</Story>


<Story name="Creating individual LayerControl elements with opacity sliders">

    <div>Opacities: {opacity1}, {opacity2}</div>

    <div class="bg-core-grey-900 w-fit">
        <LayerControlWithOpacity color="#9E0059" label="bar" bind:opacity={opacity1} />

        <LayerControlWithOpacity color="#6DA7DE" label="foo" bind:opacity={opacity2} >
            Some description of what this option is...
        </LayerControlWithOpacity>

    </div>
</Story>
