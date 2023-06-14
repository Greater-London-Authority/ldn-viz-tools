<script lang="ts">
    import {getContext} from "svelte";
    import type {Writable} from "svelte/store";

    const {collapsed} = getContext<{ collapsed: Writable<boolean> }>('collapsed');

</script>

<div class="w-20 bg-core-grey-800 flex flex-col items-center" >
    <slot/>
</div>