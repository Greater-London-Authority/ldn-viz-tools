<script>
    import {Meta, Template, Story} from '@storybook/addon-svelte-csf';

    import Help from "./Help.svelte";

</script>

<Meta title="Ui/Help" component={Help}/>

<Template let:args>
    <Help {...args}>
        I'm a button from UI!
    </Help>
</Template>

<Story name="Default">
    <p>Mouse-over the icon to see the message.</p>

    <Help>
        This is some helpful text...
    </Help>
</Story>


<Story name="Require click">
    <p>Click the icon to see the message.</p>

    <Help requireClick>
        This is some helpful text...
    </Help>

</Story>

<Story name="Longer content">
    <Help>
        <div class="space-y-2">
            <h2 class="text-xl">
                And now a more complex example
            </h2>

            <p>
                <i>This</i> is a paragraph...
            </p>

            <p>Followed by a list:</p>
            <ul class="list-disc">
                <li>An important point</li>
                <li>Something to remember</li>
                <li>And something you mustn't forget!</li>
            </ul>
        </div>
    </Help>

</Story>


<Story name="Multiple">

    <p class="flex align-middle">Vehicle type:
    <Help>
        Select the type of vehicle you use</Help></p>

        <p class="flex align-middle">Car
            <Help>This has 4 wheels</Help>
        </p>
        <p class="flex align-middle">Bicycle
            <Help>You cycle this</Help>
        </p>
        <p class="flex align-middle">Motorbike
            <Help>Like a bicycle, but with an engine</Help>
        </p>

        <p class="flex align-middle">Scooter
            <Help>Don't fall off!</Help>
        </p>



</Story>

<style>
</style>