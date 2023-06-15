<script lang="ts">
    import {setContext} from 'svelte';
    import {writable, type Writable} from 'svelte/store';

    export let selectedValue: string | undefined = undefined;
    const val: Writable<string | undefined> = writable(selectedValue);
    val.subscribe((newVal) => (selectedValue = newVal));
    setContext('selectedValue', {
        selectedValue: val
    });
</script>


<div class="flex bg-core-grey-800 border-b-4 border-b-core-blue-600 w-full h-16 pt-5 pr-0 pb-0 pl-4 gap-2.5 items-end"
>
    <slot/>
</div>