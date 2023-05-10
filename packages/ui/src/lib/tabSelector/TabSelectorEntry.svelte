<script>
    export let value;
    export let selectedValue;
    const keydownHandler = (ev) => {
        if (ev.key === "Enter" || ev.key === " ") {
            selectedValue = value;
        }
    }
</script>

<div class="buttonGroupItem"
     class:selected={selectedValue===value}
     on:click={() => selectedValue=value}
     on:keydown={keydownHandler}
     tabindex="0" role="button">
    <slot/>
</div>


<style>
    .buttonGroupItem.selected {
        border-bottom: solid 2px #000000;
    }

    .buttonGroupItem {
        flex: 1 0 auto; /* scale so buttons fill width */

        display: flex;
        flex-direction: column;

        float: left;
        text-align: center;
        border-bottom: none;
        padding-bottom: 7px;

        user-select: none;
    }
</style>

