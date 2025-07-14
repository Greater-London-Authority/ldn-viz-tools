<script lang="ts">
	import { NavigationMenu } from '@ldn-viz/ui';

	let { navigation } = $props();
</script>

<div class="w-96">
	<NavigationMenu items={navigation} ariaLabel="SiteNavigation" />
</div>
