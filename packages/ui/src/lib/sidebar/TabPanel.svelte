<script lang="ts">
	import type { Tab } from './sidebarState';

	import { isWideView } from './sidebarState';

	export let tabs: Tab[] = [];

	let classes = 'w-full h-52';
	$: classes = $isWideView ? 'h-full w-52' : 'w-full h-52';
</script>

<div role="tabpanel" class="bg-core-grey-800 {classes}">
	<slot>
		<div class="text-white h-full w-full pt-8 flex justify-center">Todo</div>
	</slot>
</div>
