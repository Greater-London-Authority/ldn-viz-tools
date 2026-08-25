<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DashboardSectionTitle from './DashboardSectionTitle.svelte';

	/**
	 * `DashboardSectionTitle` — groups a run of cards or panels within a dashboard, a
	 * mid-dashboard heading.
	 *
	 * Sits one step below [DashboardTitle](.?path=/docs/ui-components-titlegroup-dashboarditle--documentation);
	 * may appear several times down a page.
	 *
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components - Layout And Themes/TitleGroup/Product/DashboardSectionTitle',
		component: DashboardSectionTitle,
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
