<script>
	import { DocumentDownloadIcon } from '@rgossiaux/svelte-heroicons/solid';
	import { Meta, Story } from '@storybook/addon-svelte-csf';

	import PlacardButton from './PlacardButton.svelte';
</script>

<Meta title="Ui/CardLink" component={CardLink} />

<Story name="Default">
	<PlacardButton>
		<span slot="body">
			The full dataset that this explorer is based on is available for download from the London
			Datastore, along with other documents like the Technical Report, which contains the
			questionnaires from the survey.
		</span>
		<span slot="footer">The Survey of Londoners on London Datastore</span>
	</PlacardButton>
</Story>

<Story name="Rounded">
	<PlacardButton rounded>
		<span slot="body" class="text-3xl font-serif mb-2"> Download the User Guide. </span>
		<span slot="footer">PDF</span>
		<span slot="icon"><DocumentDownloadIcon class="h-6 w-6" /></span>
	</PlacardButton>
</Story>

<Story name="Green Rounded">
	<PlacardButton rounded green>
		<span slot="body" class="text-3xl font-serif mb-2"> Download the User Guide. </span>
		<span slot="footer">PDF</span>
		<span slot="icon"><DocumentDownloadIcon class="h-6 w-6" /></span>
	</PlacardButton>
</Story>
