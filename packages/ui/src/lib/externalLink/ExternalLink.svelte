<script lang="ts">
    import {ExternalLinkIcon} from '@rgossiaux/svelte-heroicons/solid';

    export let href: string;
</script>

<a {href} class="flex items-center underline">
    <slot/>
    <ExternalLinkIcon class="inline h-4 w-4"/>
</a>

