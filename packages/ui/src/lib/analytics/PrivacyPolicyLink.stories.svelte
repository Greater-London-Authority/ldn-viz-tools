<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import PrivacyPolicyLink from './PrivacyPolicyLink.svelte';

	/**
	 * The `PrivacyPolicyLink` component provides a button which links to the GLA privacy policies page.
	 * It accepts the same props as `Button` (`LdnButtonProps`), but these should generaly not be used.
	 * */

	const { Story } = defineMeta({
		title: 'Ui/Components - Layout And Themes/Meta, Analytics And Cookies/PrivacyPolicyLink',
		component: PrivacyPolicyLink,
		tags: ['autodocs']
	});
</script>

<Story name="Default" args={{}} />
