<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import PageSectionBreak from './PageSectionBreak.svelte';

	/**
	 * `PageSectionBreak` — marks a new section within a longform page.
	 *
	 * May appear several times down a page, one per section; sits below
	 * [PageTitle](./?path=/docs/ui-components-layout-and-themes-titlegroup-longform-pagetitle--documentation), one level below the page's title.
	 *
	 * This component exists as a convenience wrapper as correct element structure within a flow container would produce the same result
	 *
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components - Layout And Themes/TitleGroup/Longform/PageSectionBreak',
		component: PageSectionBreak,
		tags: ['autodocs'],
		args: {
			title: 'Population'
		}
	});
</script>

<Story name="Title only" />

<Story name="With subtitle" args={{ subtitle: 'How the city has grown over the last decade' }} />

<Story
	name="With eyebrow and subtitle"
	args={{ eyebrow: 'Demographics', subtitle: 'How the city has grown over the last decade' }}
/>
