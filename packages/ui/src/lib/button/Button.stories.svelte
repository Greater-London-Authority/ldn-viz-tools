<script>
    import {Meta, Template, Story} from '@storybook/addon-svelte-csf';

    import Button from "./Button.svelte";

</script>

<Meta title="Ui/Button" component={Button}/>

<Template let:args>
    <Button {...args}>
        I'm a button from UI!
    </Button>
</Template>

<Story name="Default" />
