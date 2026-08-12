<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SectionTitle from './SectionTitle.svelte';

	/**
	 * `SectionTitle` — groups a run of cards or panels within a dashboard, a
	 * mid-dashboard heading.
	 *
	 * Sits one step below [DashboardTitle](.?path=/docs/ui-components-titlegroup-dashboarditle--documentation);
	 * may appear several times down a page.
	 *
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components/TitleGroup/SectionTitle',
		component: SectionTitle,
		tags: ['autodocs'],
		args: {
			title: 'Dashboard section title'
		}
	});
</script>

<Story name="Title only" />

<Story name="With subtitle" args={{ subtitle: 'A subtitle for this dashboard' }} />

<Story
	name="With eyebrow and subtitle"
	args={{ eyebrow: 'Overview', subtitle: 'A subtitle for this dashboard' }}
/>
