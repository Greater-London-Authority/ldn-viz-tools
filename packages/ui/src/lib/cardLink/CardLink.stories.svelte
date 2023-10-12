<script>
	import { Meta, Story } from '@storybook/addon-svelte-csf';

	import CardLink from './CardLink.svelte';
</script>

<Meta title="Ui/CardLink" component={CardLink} />

<Story name="Default">
	<CardLink>
		<span slot="body">
			The full dataset that this explorer is based on is available for download from the London
			Datastore, along with other documents like the Technical Report, which contains the
			questionnaires from the survey.
		</span>
		<span slot="footer">The Survey of Londoners on London Datastore</span>
	</CardLink>
</Story>
