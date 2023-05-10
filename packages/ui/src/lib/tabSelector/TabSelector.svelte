<script>
    import {setContext} from 'svelte';
    import {writable} from 'svelte/store';

    export let selectedValue;

    const val = writable(selectedValue);
    val.subscribe(newVal => selectedValue = newVal);

    setContext("selectedValue", {
        selectedValue: val
    });
</script>

<div class="flex">
    <slot/>
</div>
