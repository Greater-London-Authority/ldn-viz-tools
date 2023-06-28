<script>
    import {Meta, Template, Story} from '@storybook/addon-svelte-csf';
    import {MapLibre} from 'svelte-maplibre';

    import {
        GREATER_LONDON_ZOOM,
        GREATER_LONDON_CENTER,
    } from "../themes/bounds.js"

    import * as lightStyle from '../themes/os_light_vts.json';
    import * as greyStyle from '../themes/os_greyscale.json';
    import * as darkGreyMutedStyle from '../themes/os_dark_grey_muted_buildings.json';
    import * as darkStyle from '../themes/os_dark.json';

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

<Meta title="Maps/Map" component={Map}>

    foo
</Meta>
<Template let:args>
    <Map {...args}>
        I'm a map!
    </Map>
</Template>


<Story name="Light OS Basemap">
    <p>This is our default light basemap - it's the OS's <a class="underline"
            href="https://github.com/OrdnanceSurvey/OS-Vector-Tile-API-Stylesheets">
        OS_VTS_3857_Light.json</a> stylesheet.</p>

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
    <p>This is the greyscale basemap used on the Cool Spaces map. - it's very similar to the OS's <a
            class="underline"
            href="https://github.com/OrdnanceSurvey/OS-Vector-Tile-API-Stylesheets">
        OS_VTS_3857_Greyscale.json</a> stylesheet, with a few tweaks.</p>

    <MapLibre
            style={greyStyle}
            class="relative w-full aspect-[9/16] max-h-[70vh] sm:max-h-full sm:aspect-video"
            standardControls
            zoom={GREATER_LONDON_ZOOM}
            center={GREATER_LONDON_CENTER}
            {transformRequest}
    />
</Story>

<Story name="Dark Grey, muted buildings">
    <p>This was created by Mike Brondbjerg based on the OS greyscale theme. </p>

    <MapLibre
            style={darkGreyMutedStyle}
            class="relative w-full aspect-[9/16] max-h-[70vh] sm:max-h-full sm:aspect-video"
            standardControls
            zoom={GREATER_LONDON_ZOOM}
            center={GREATER_LONDON_CENTER}
            {transformRequest}
    />
</Story>


<Story name="Dark OS Basemap">
    <p>This was created by the OS, inspired by Mike Brondbjerg's dark gray theme with muted buildings. It is <a
            class="underline"
            href="https://github.com/OrdnanceSurvey/OS-Vector-Tile-API-Stylesheets">OS_VTS_3857_Dark.json</a></p>

    <MapLibre
            style={darkStyle}
            class="relative w-full aspect-[9/16] max-h-[70vh] sm:max-h-full sm:aspect-video"
            standardControls
            zoom={GREATER_LONDON_ZOOM}
            center={GREATER_LONDON_CENTER}
            {transformRequest}
    />
</Story>
