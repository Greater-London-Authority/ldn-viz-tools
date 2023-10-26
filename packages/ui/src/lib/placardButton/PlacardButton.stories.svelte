<script>
	import { DocumentDownloadIcon } from '@rgossiaux/svelte-heroicons/solid';
	import { Meta, Story } from '@storybook/addon-svelte-csf';

	import PlacardButton from './PlacardButton.svelte';
</script>

<Meta title="Ui/PlacardButton" component={PlacardButton} />

<Story name="With Body Only">
	<div class="max-w-xl">
		<PlacardButton>
			<span slot="body">
				The full dataset that this explorer is based on is available for download from the London
				Datastore, along with other documents like the Technical Report, which contains the
				questionnaires from the survey.
			</span>
			<span slot="footer">The Survey of Londoners on London Datastore</span>
		</PlacardButton>
	</div>
</Story>

<Story name="With Title Only">
	<div class="max-w-xl">
		<PlacardButton>
			<span slot="title"> Download the User Guide. </span>
			<span slot="footer">PDF</span>
			<span slot="icon"><DocumentDownloadIcon class="h-6 w-6" /></span>
		</PlacardButton>
	</div>
</Story>

<Story name="With Title and Body">
	<div class="max-w-xl">
		<PlacardButton>
			<span slot="title"> Getting the Data. </span>
			<span slot="body">
				The full dataset that this explorer is based on is available for download from the London
				Datastore, along with other documents like the Technical Report, which contains the
				questionnaires from the survey.
			</span>
			<span slot="footer">The Survey of Londoners on London Datastore</span>
		</PlacardButton>
	</div>
</Story>

<Story name="Extra-wide, with limited text width">
	<div class="max-w-3xl">
		<PlacardButton>
			<span slot="title">Getting the Data.</span>
			<span slot="body">
				The full dataset that this explorer is based on is available for download from the London
				Datastore, along with other documents like the Technical Report, which contains the
				questionnaires from the survey.
			</span>
			<span slot="footer">The Survey of Londoners on London Datastore</span>
		</PlacardButton>
	</div>
</Story>
