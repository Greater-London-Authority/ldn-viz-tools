<script lang="ts">
    import {classNames} from '../utils/classNames';

    export let color = "black";
    export let checked = false;
    export let label: string;
    export let id: string;

    export let disabled = false;

    let inputID = `input-${id}`;
</script>


<input class="sr-only" id={inputID}
       bind:checked={checked}
       type="checkbox"
       {disabled}
>

<label class={classNames("flex focus:border-gray-500 focus:border-2 focus:border-dashed", disabled ? 'opacity-40' : '' )} for={inputID}>
    <svg viewBox="0 0 10 10" height="1.5em" aria-hidden="true">
        <rect x="1" y="1" width="8" height="8"
              title={`${label}`}
              stroke={color}
              fill={ checked ? color : "white"}
        />

        {#if checked}
            <rect x="2" y="2" width="6" height="6"
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
