<script>
    import {Meta, Story} from '@storybook/addon-svelte-csf';

    import LogoLOTI from './LogoLOTI.svelte';
    import LogoMayor from './LogoMayor.svelte';
    import LogoCIU from "./LogoCIU.svelte";
</script>

<Meta title="Ui/Logos" component={LogoLOTI}/>


<Story name="Mayor of London">
    <div class="bg-core-grey-600 h-14 flex items-center justify-center w-fit px-4">
        <LogoMayor class="h-10"/>
    </div>
</Story>

<Story name="CIU">
    <LogoCIU class="h-10"/>
</Story>

<Story name="LOTI">
    <LogoLOTI class="h-10"/>
</Story>
