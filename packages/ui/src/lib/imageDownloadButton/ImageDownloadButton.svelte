<script lang="ts">
    import {DocumentDownloadIcon} from "@rgossiaux/svelte-heroicons/outline";

    export let svgNode;
    export let scaleFactor = 2;
    export let filename;
    export let disabled = false;
    export let format: "PNG" | "SVG" | undefined;

    const downloadFromURL = (url) => {
        if (!filename){
            filename = (format === "SVG") ? "Image.svg" : "Image.png";
        }

        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("target", "_blank");
        link.setAttribute("download", filename);
        link.dispatchEvent(new MouseEvent("click"));
    };

    const createHTMLImageFromURL = async (url: string) => {
        let img;

        await new Promise(resolve => {
            img = new Image();
            img.onload = resolve;
            img.src = url;
        });

        return img;
    };

    const download = async () => {

        // This hack is necessary because .drawImage() doesn't work
        // unless the SVG that is being copied has an explicitly-set size
        const svgNodeClone = svgNode.cloneNode(true);
        svgNodeClone.setAttribute("width", svgNode.clientWidth)
        svgNodeClone.setAttribute("height", svgNode.clientHeight)

        const svgString = new XMLSerializer().serializeToString(svgNodeClone);
        const svgURL = 'data:image/svg+xml;base64,' + window.btoa(svgString);
        // the non base-64 encoded URL would be: "data:image/svg+xml;utf8," + svgString;

        // an alternative is:
        // const svgURL = URL.createObjectURL(new Blob([svgNodeClone.outerHTML],{type:'image/svg+xml;charset=utf-8'}))

        const img = await createHTMLImageFromURL(svgURL);

        if (format === "SVG") {
            downloadFromURL(svgURL);
        } else {
            img.src = svgURL;

            const w = svgNode.clientWidth * scaleFactor;
            const h = svgNode.clientHeight * scaleFactor;

            const canvas = new OffscreenCanvas(w, h);
            canvas.getContext("2d").drawImage(img, 0, 0, w, h);

            canvas.convertToBlob().then((blob) => {
                downloadFromURL(URL.createObjectURL(blob));
            });
        }
    }
</script>


<button on:click={download} {disabled}
        class="flex items-center w-fit border border-core-grey-700 disabled:bg-core-grey-300">
    <slot>Download Image</slot>
    <DocumentDownloadIcon class="color-gray-900 w-4 h-4 inline"/>
</button>
