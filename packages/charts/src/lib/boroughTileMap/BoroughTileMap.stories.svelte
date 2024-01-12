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
    <p>
        Available color schemes are listed <a
            href="https://github.com/kristw/encodable/blob/master/packages/encodable-color/src/scheme/presets/d3Schemes.ts">here</a>.
        You can see them <a href="https://vega.github.io/vega/docs/schemes">here</a>.
    </p>
    <div class="w-[800px] h-[800px]">
        <BoroughTileMap {data} gssCodeField="GSS_CODE"
                        spec={{
                            symbolArea: {field: "ValueA"},

                            symbolColor: {
                                field: "ValueA",
                                type: "quantitative",
                                scale: {
                                  scheme: "d3.blues"
                                }
                            },

                            }
                           }
        />

    </div>
</Story>

<Story name="Symbol size and background color">
    <div class="w-[800px] h-[800px]">
        <BoroughTileMap {data} gssCodeField="GSS_CODE"
                        spec={{
                            symbolArea: {field: "ValueA"},
                            symbolColor: {value: "grey"},


                            rectColor: {
                                field: "ValueB",
                                type: "quantitative",
                                scale: {
                                  scheme: "d3.reds"
                                }
                            }
                           }}
        />
    </div>
</Story>

