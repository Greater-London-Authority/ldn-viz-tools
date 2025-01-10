<script context="module">
	const isCookieControlManagedByParent = () => {
		if (window.location === window.parent.location) {
			return false;
		}

		try {
			const londonGovDomains = ['.london.gov.uk'];
			const url = document.referrer;
			const hostname = new URL(url).hostname;

			for (const domain of londonGovDomains) {
				if (hostname.endsWith(domain)) {
					return true;
				}
			}

			return false;
		} catch (err) {
			return false;
		}
	};
</script>

<script>
	/**
	 * The `CookieControlSettings` component provides a button which can be clicked on to open the cookie settings modal.
	 * @component
	 * */
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	const cookieControlStore = writable(null);

	onMount(() => {
		if (!isCookieControlManagedByParent()) {
			cookieControlStore.set(window.CookieControl);
		}
	});

	$: cookieControlStore.set(window.CookieControl);
</script>

{#if $cookieControlStore}
	<button aria-label="View cookie settings" on:click={$cookieControlStore.open}>
		Cookie Settings
	</button>
{/if}
