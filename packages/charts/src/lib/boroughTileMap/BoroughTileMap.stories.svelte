<script>
    import BoroughTileMap from "./BoroughTileMap.svelte";
    import {Meta, Story} from "@storybook/addon-svelte-csf";

    import {exampleData as data} from "./utils";

</script>

<Meta title="Charts/BoroughTileMap" component={BoroughTileMap}/>


<Story name="Default">
    <div class="w-[800px] h-[800px]">
        <BoroughTileMap {data} gssCodeField="GSS_CODE"/>

    </div>
</Story>


<Story name="Symbol size and color">
    <div class="w-[800px] h-[800px]">
        <BoroughTileMap {data} gssCodeField="GSS_CODE"
                       spec={{
                            symbolArea: {field: "ValueA"},
                            symbolColor: {
                                field: "ValueA",
                                type: "quantitative",
                                scale: {
                                  zero: false,
                                  interpolate: 'hsl',
                                  range: ['#FAE96F', '#C96E12'],
                                }
                            },
                            rectColor: {
                                field: "ValueB",
                                type: "quantitative",
                                scale: {
                                  zero: false,
                                  interpolate: 'hsl',
                                  range: ['red', "blue"],
                                }

                            }
                           }}

        />

    </div>
</Story>
