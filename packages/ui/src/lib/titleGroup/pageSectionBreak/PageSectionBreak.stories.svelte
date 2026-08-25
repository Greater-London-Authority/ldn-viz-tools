<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import PageSectionBreak from './PageSectionBreak.svelte';

	/**
	 * `PageSectionBreak` — marks a new section within a long-form prose page.
	 *
	 * May appear several times down a page, one per section; sits below
	 * [PageTitle](./?path=/docs/ui-components-titlegroup-pagetitle--documentation)'s hero in the prose titling ladder.
	 *
	 ** This component exists as a convenience wrapper as correct element structure within a flow container would produce the same result
	 *
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components - Layout And Themes/TitleGroup/Prose/PageSectionBreak',
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
