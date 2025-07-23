<script module lang="ts">
	import { DocumentArrowDown } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import PlacardButton from './PlacardButton.svelte';

	/**
	 * The `<PlacardButton>` component creates a call-to-action link that includes a title and description.
	 *
	 * **Alternatives**: if the button does not need to be as visually prominent or include a description, consider using the [Button](./?path=/docs/ui-components-buttons-button--documentation) component with the `href` prop.
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components/Buttons/PlacardButton',
		component: PlacardButton,
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<div class="max-w-xl">
			<PlacardButton {...args}>
				{#snippet body()}
					The full dataset that this explorer is based on is available for download from the London
					Datastore, along with other documents like the Technical Report, which contains the
					questionnaires from the survey.
				{/snippet}
				{#snippet footer()}
					The Survey of Londoners on London Datastore
				{/snippet}
			</PlacardButton>
		</div>
	{/snippet}
</Story>

<Story name="With Body Only">
	{#snippet template(args)}
		<div class="max-w-xl">
			<PlacardButton {...args}>
				{#snippet body()}
					The full dataset that this explorer is based on is available for download from the London
					Datastore, along with other documents like the Technical Report, which contains the
					questionnaires from the survey.
				{/snippet}
				{#snippet footer()}
					The Survey of Londoners on London Datastore
				{/snippet}
			</PlacardButton>
		</div>
	{/snippet}
</Story>

<Story name="With Title Only">
	{#snippet template(args)}
		<div class="max-w-xl">
			<PlacardButton {...args}>
				{#snippet title()}
					Download the User Guide.
				{/snippet}
				{#snippet footer()}
					PDF
				{/snippet}
				{#snippet icon()}
					<Icon src={DocumentArrowDown} theme="solid" class="h-6 w-6" aria-hidden="true" />
				{/snippet}
			</PlacardButton>
		</div>
	{/snippet}
</Story>

<Story name="With Title and Body">
	{#snippet template(args)}
		<div class="max-w-xl">
			<PlacardButton {...args}>
				{#snippet title()}
					Getting the Data.
				{/snippet}
				{#snippet body()}
					The full dataset that this explorer is based on is available for download from the London
					Datastore, along with other documents like the Technical Report, which contains the
					questionnaires from the survey.
				{/snippet}
				{#snippet footer()}
					The Survey of Londoners on London Datastore
				{/snippet}
			</PlacardButton>
		</div>
	{/snippet}
</Story>

<Story name="Extra-wide, with limited text width">
	{#snippet template(args)}
		<div class="max-w-3xl">
			<PlacardButton {...args}>
				{#snippet title()}
					Getting the Data.
				{/snippet}
				{#snippet body()}
					The full dataset that this explorer is based on is available for download from the London
					Datastore, along with other documents like the Technical Report, which contains the
					questionnaires from the survey.
				{/snippet}
				{#snippet footer()}
					The Survey of Londoners on London Datastore
				{/snippet}
			</PlacardButton>
		</div>
	{/snippet}
</Story>

<Story name="Custom Colorway">
	{#snippet template(args)}
		<div class="max-w-xl">
			<PlacardButton {...args} colorWay={'blue'}>
				{#snippet title()}
					Getting the Data.
				{/snippet}
				{#snippet body()}
					The full dataset that this explorer is based on is available for download from the London
					Datastore, along with other documents like the Technical Report, which contains the
					questionnaires from the survey.
				{/snippet}
				{#snippet footer()}
					The Survey of Londoners on London Datastore
				{/snippet}
			</PlacardButton>
		</div>
	{/snippet}
</Story>
