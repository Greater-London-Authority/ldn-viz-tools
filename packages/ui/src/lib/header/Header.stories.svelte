<script lang="ts">
    import {Meta, Story, Template} from '@storybook/addon-svelte-csf';

    import Header from "./Header.svelte";
    import NavLink from "./NavLink.svelte";
    import NavLinks from "./NavLinks.svelte";
    import HeaderTitle from "./HeaderTitle.svelte";
    import HeaderRight from "./HeaderRight.svelte";
    import HeaderItem from "./HeaderItem.svelte";

</script>

<Meta title="Ui/Header" component={Header}/>

<Template let:args>
    <Header {...args}/>
</Template>

<Story name="NavBar - title only">
    <Header>
        <HeaderTitle>An interesting app</HeaderTitle>
    </Header>
</Story>


<Story name="A NavBar - title and links to pages">
    <Header>
        <HeaderTitle>EV Charger Dashboard</HeaderTitle>

        <NavLinks>
            <NavLink target="map">
                Map
            </NavLink>

            <NavLink target="trends">
                Trends
            </NavLink>
        </NavLinks>
    </Header>
</Story>

<Story name="A NavBar - title, links, and auth section">
    <Header>
        <HeaderTitle>EV Charger Dashboard</HeaderTitle>

        <NavLinks>
            <NavLink target="map">
                Map
            </NavLink>

            <NavLink target="trends">
                Trends
            </NavLink>
        </NavLinks>


        <HeaderRight>
            <HeaderItem>
                <span>Logged in as <b>Bob Smith</b></span>
            </HeaderItem>


            <HeaderItem>
                <a href="/#">Log Out</a>
            </HeaderItem>
        </HeaderRight>
    </Header>
</Story>

