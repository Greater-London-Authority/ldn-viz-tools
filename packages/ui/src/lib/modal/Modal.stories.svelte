<script>
    import {Meta, Template, Story} from '@storybook/addon-svelte-csf';

    import Modal from "./Modal.svelte";

    let isOpen;
</script>

<Meta title="Ui/Modal" component={Modal}/>

<Template let:args>
    <Modal title="My title" description="DEscription...">
        Foo!
    </Modal>
</Template>

<Story name="Description only">
    <button class="btn bg-core-grey-500 p-4" on:click={() => isOpen = true}>Open modal!</button>

    <Modal bind:isOpen title="A modal with contents!" description="This modal has a description, but no contents!" />
</Story>


<Story name="Description and Contents">
    <button class="btn bg-core-grey-500 p-4" on:click={() => isOpen = true}>Open modal!</button>

    <Modal bind:isOpen title="A modal with contents!" description="This modal has a description and contents!">

        <p>A list</p>
        <ul>
            <li>One</li>
            <li>Two</li>
            <li>Three</li>
        </ul>
    </Modal>
</Story>

<Story name="Contents without description">
    <button class="btn bg-core-grey-500 p-4" on:click={() => isOpen = true}>Open modal!</button>

    <Modal bind:isOpen title="A modal with contents!">

        <p>A list</p>
        <ul>
            <li>One</li>
            <li>Two</li>
            <li>Three</li>
        </ul>
    </Modal>
</Story>