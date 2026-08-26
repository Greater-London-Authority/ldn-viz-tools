<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DashboardTitle from './DashboardTitle.svelte';

	/**
	 * `DashboardTitle` — the top-level title of a dashboard.
	 *
	 * Sits at the top of the product titling ladder, above
	 * [SectionTitle](./?path=/docs/ui-components-titlegroup-sectiontitle--documentation).
	 *
	 * This component exists as a convenience wrapper as correct element structure within a flow container would produce the same result
	 *
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components - Layout And Themes/TitleGroup/Product/DashboardTitle',
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
