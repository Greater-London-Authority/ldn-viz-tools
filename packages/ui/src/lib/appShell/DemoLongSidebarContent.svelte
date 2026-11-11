<script lang="ts">
	// Demo content for the AppShell stories: a sidebar taller than the screen,
	// with a button at the end, to check the end of the sidebar can be reached.
	import Button from '../button/Button.svelte';
	import CheckboxGroup from '../checkBox/CheckboxGroup.svelte';
	import SidebarSection from '../sidebar/elements/sidebarSection/SidebarSection.svelte';

	const options = Array.from({ length: 8 }, (_, i) => ({
		id: `option-${i}`,
		label: `Option ${i + 1}`
	}));
</script>

{#each [1, 2, 3, 4] as n (n)}
	<SidebarSection title={`Section ${n}`}>
		<CheckboxGroup label={`Group ${n}`} {options} />
	</SidebarSection>
{/each}
<Button>Last control in the sidebar</Button>
