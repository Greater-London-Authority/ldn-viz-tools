<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DashboardTitle from './DashboardTitle.svelte';

	/**
	 * `DashboardTitle` — the top-level title of a dashboard.
	 *
	 * Sits at the top of the product titling ladder, above
	 * [SectionTitle](./?path=/docs/ui-components-titlegroup-sectiontitle--documentation).
	 *
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components/TitleGroup/DashboardTitle',
		component: DashboardTitle,
		tags: ['autodocs'],
		args: {
			title: 'Dashboard title'
		}
	});
</script>

<Story name="Title only" />

<Story name="With subtitle" args={{ subtitle: 'A subtitle for this dashboard' }} />

<Story
	name="With eyebrow and subtitle"
	args={{ eyebrow: 'Region', subtitle: 'A subtitle for this dashboard' }}
/>
