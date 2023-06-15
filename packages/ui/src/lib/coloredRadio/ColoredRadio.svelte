<script lang="ts">
    export let color: string;
    export let checked = false;
    export let label: string;
    export let id: string;

    let inputID = `input-${id}`;
</script>


<input class="sr-only" id={inputID}
       bind:checked={checked}
       type="checkbox"
>

<label class="flex focus:border-gray-500 focus:border-2 focus:border-dashed" for={inputID}>
    <svg viewBox="0 0 10 10" height="1.5em" aria-hidden="true">
        <circle cx="5" cy="5" r="4"
                title={`${label}`}
                stroke={color}
                fill={ checked ? color : "white"}
        />

        {#if checked}
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