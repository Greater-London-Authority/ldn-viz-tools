<script lang="ts">
	import Button from '../button/Button.svelte';
	import type { LdnButtonProps } from '../button/types';

	let {
		slim = true,
		variant = 'text',
		emphasis = 'muted',
		...restprops
	}: LdnButtonProps = $props();
</script>

<Button
	{slim}
	{variant}
	{emphasis}
	aria-label="View privacy policy"
	{...restprops}
	href="https://www.london.gov.uk/who-we-are/governance-and-spending/privacy-policies"
	target="_blank"
	rel="noopener"
>
	Privacy Policies
</Button>
