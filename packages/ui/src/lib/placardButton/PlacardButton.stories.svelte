<script>
	import { DocumentDownloadIcon } from '@rgossiaux/svelte-heroicons/solid';
	import { Meta, Story } from '@storybook/addon-svelte-csf';

	import PlacardButton from './PlacardButton.svelte';
</script>

<Meta title="Ui/PlacardButton" component={PlacardButton} />

<Story name="With Body Only">
	<PlacardButton>
		<span slot="body">
			The full dataset that this explorer is based on is available for download from the London
			Datastore, along with other documents like the Technical Report, which contains the
			questionnaires from the survey.
		</span>
		<span slot="footer">The Survey of Londoners on London Datastore</span>
	</PlacardButton>
</Story>

<Story name="With Title Only">
	<PlacardButton>
		<span slot="title"> Download the User Guide. </span>
		<span slot="footer">PDF</span>
		<span slot="icon"><DocumentDownloadIcon class="h-6 w-6" /></span>
	</PlacardButton>
</Story>

<Story name="With Title Only - Green">
	<PlacardButton green>
		<span slot="title"> Download the User Guide. </span>
		<span slot="footer">PDF</span>
		<span slot="icon"><DocumentDownloadIcon class="h-6 w-6" /></span>
	</PlacardButton>
</Story>

<Story name="With Title and Body">
	<PlacardButton>
		<span slot="title"> Getting the Data. </span>
		<span slot="body">
			The full dataset that this explorer is based on is available for download from the London
			Datastore, along with other documents like the Technical Report, which contains the
			questionnaires from the survey.
		</span>
		<span slot="footer">The Survey of Londoners on London Datastore</span>
	</PlacardButton>
</Story>
