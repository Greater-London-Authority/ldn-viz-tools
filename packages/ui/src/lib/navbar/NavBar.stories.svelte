<script lang="ts">
    import {Meta, Story, Template} from '@storybook/addon-svelte-csf';

    import NavBarContainer from "./NavBarContainer.svelte";
    import NavLink from "./NavLink.svelte";
    import NavLinks from "./NavLinks.svelte";
    import NavTitle from "./NavTitle.svelte";
    import NavAuth from "./NavAuth.svelte";
    import NavItem from "./NavItem.svelte";

</script>

<Meta title="Ui/NavBar" component={NavBarContainer}/>

<Template let:args>
    <NavBarContainer {...args}/>
</Template>

<Story name="NavBar - title only">
    <NavBarContainer>
        <NavTitle>An interesting app</NavTitle>
    </NavBarContainer>
</Story>


<Story name="A NavBar - title and links to pages">
    <NavBarContainer>
        <NavTitle>EV Charger Dashboard</NavTitle>

        <NavLinks>
            <NavLink target="map">
                Map
            </NavLink>

            <NavLink target="trends">
                Trends
            </NavLink>
        </NavLinks>
    </NavBarContainer>
</Story>

<Story name="A NavBar - title, links, and auth section">
    <NavBarContainer>
        <NavTitle>EV Charger Dashboard</NavTitle>

        <NavLinks>
            <NavLink target="map">
                Map
            </NavLink>

            <NavLink target="trends">
                Trends
            </NavLink>
        </NavLinks>


        <NavAuth>
            <NavItem>
                <span>Logged in as <b>Bob Smith</b></span>
            </NavItem>


            <NavItem>
                <a href="/#">Log Out</a>
            </NavItem>
        </NavAuth>
    </NavBarContainer>
</Story>

