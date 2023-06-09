<script>
    import {Meta, Template, Story} from '@storybook/addon-svelte-csf';
    import {MapLibre} from 'svelte-maplibre';

    import {
        GREATER_LONDON_ZOOM,
        GREATER_LONDON_CENTER,
        GREATER_LONDON_BOUNDS,
    } from "../themes/bounds.js"

    import * as lightStyle from '../themes/os_light_vts.json';
    import * as greyStyle from '../themes/os_greyscale.json';

    import Map from './Map.svelte';


    const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

    const transformRequest = (url) => {
        if (!url.toLowerCase().includes('api.os')) return {url: url};
        if (!/[?&]key=/.test(url)) url += '?key=' + OS_KEY;
        return {
            url: url + '&srs=3857'
        };
    }


</script>

<Meta title="Maps/Map" component={Map}/>

<Template let:args>
    <Map {...args}>
        I'm a map!
    </Map>
</Template>


<Story name="Light OS Basemap">
    <p>This is our default light basemap.</p>

    <MapLibre
            style={lightStyle}
            class="relative w-full aspect-[9/16] max-h-[70vh] sm:max-h-full sm:aspect-video"
            standardControls
            zoom={GREATER_LONDON_ZOOM}
            center={GREATER_LONDON_CENTER}
            {transformRequest}
    />
</Story>


<Story name="Greyscale OS Basemap">
    <p>This is the greyscale basemap used on the Cool Spaces map.</p>

    <MapLibre
            style={greyStyle}
            class="relative w-full aspect-[9/16] max-h-[70vh] sm:max-h-full sm:aspect-video"
            standardControls
            zoom={GREATER_LONDON_ZOOM}
            center={GREATER_LONDON_CENTER}
            {transformRequest}
    />
</Story>