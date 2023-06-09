<script>
    import {Meta, Template, Story} from '@storybook/addon-svelte-csf';

    import ExternalLink from "./ExternalLink.svelte";

</script>

<Meta title="Ui/ExternalLink" component={ExternalLink}/>

<Template let:args>
    <ExternalLink {...args}>
        I'm a button from UI!
    </ExternalLink>
</Template>

<Story name="Default" >

    <ExternalLink  href="https://github.com/Greater-London-Authority">Our team GitHub</ExternalLink>
</Story>