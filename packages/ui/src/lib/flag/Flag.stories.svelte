<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Flag, { type FlagCondition } from './Flag.svelte';

	/**
	 * The `<Flag>` component displays a message at the top of a page (e.g., to indicate that it is in Beta release).
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components - Layout And Themes/Flag',
		component: Flag,
		tags: ['autodocs'],
		argTypes: {
			condition: {
				options: ['alpha', 'beta', 'alert', 'warning', 'positive', 'notice'],
				control: { type: 'select' }
			}
		}
	});

	const conditions: FlagCondition[] = ['alpha', 'beta', 'alert', 'warning', 'positive', 'notice'];
</script>

<Story name="Default" />

<Story name="Default Messages" asChild>
	<div class="flex flex-col gap-4">
		{#each conditions.filter((d) => d === 'alpha' || d === 'beta') as condition (condition)}
			<Flag {condition} />
		{/each}
	</div>
</Story>

<Story name="Levels" asChild>
	<div class="flex flex-col gap-4">
		{#each conditions as condition (condition)}
			<Flag {condition}>
				{condition}
			</Flag>
		{/each}
	</div>
</Story>

<Story name="Links" asChild>
	<Flag condition="alpha" link="https://apps.london.gov.uk">This site is in beta.</Flag>
</Story>

<!--
The `link` prop can be a 
 [mailto:// URL](https://datatracker.ietf.org/doc/html/rfc6068),
  and the `linkText` prop overrides the default link label. 
  -->
<Story name="mailto link with custom linkText" asChild>
	<Flag condition="beta" link="mailto://feedback@london.gov.uk" linkText="Email us your feedback">
		This site is in beta.
	</Flag>
</Story>
