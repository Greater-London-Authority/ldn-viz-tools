<script lang="ts">
    import {setContext} from 'svelte';
    import {writable, type Writable} from 'svelte/store';

    export let selectedValue;
    export let variant: "tabs" | "radio" = "radio";

    const val: Writable<string> = writable(selectedValue);
    val.subscribe((newVal) => (selectedValue = newVal));

    setContext('selectedValue', {
        selectedValue: val
    });

    setContext('variant', variant);

    $: {
        // update value of store when value of prop changes
        $val = selectedValue;
    }
</script>

<div class="flex gap-0.5">
    <slot/>
</div>
