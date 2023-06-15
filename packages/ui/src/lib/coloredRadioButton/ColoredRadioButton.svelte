<script lang="ts">
    export let color = "black";
    export let selectedId = false;
    export let label: string;
    export let id: string;
    export let name: string | undefined;

    let inputID = `input-${id}`;

    $: {
        console.log(selectedId)
    }
</script>


<input class="sr-only" id={inputID}
       bind:group={selectedId}
       type="radio"
       name={name}
       value={id}
>

<label class="flex focus:border-gray-500 focus:border-2 focus:border-dashed" for={inputID}>
    <svg viewBox="0 0 10 10" height="1.5em" aria-hidden="true">
        <circle cx="5" cy="5" r="4"
                title={`${label}`}
                stroke={color}
                fill={ (selectedId === id) ? color : "white"}
        />

        {#if (selectedId === id)}
            <circle cx="5" cy="5" r="3"
                    title={`${label}`}
                    stroke={"white"}
                    fill={"none"}
            />
        {/if}
    </svg>
    {label}
</label>


<style>
    /* highlight label that has focus... */
    input:focus + label {
        outline: dashed 2px lightgrey;
        width: fit-content;
    }

    /* but not if it was focused by clicking on (rather than with keyboard) */
    input:focus:not(:focus-visible) + label {
        outline: none;
    }
</style>