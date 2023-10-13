<script lang="ts">
	import { ArrowRightIcon } from '@rgossiaux/svelte-heroicons/solid';

	import { classNames } from '../utils/classNames';

	export let href = '';
	export let newWindow = false;
	export let rounded = false;

	export let green = false;
</script>

<a
	{href}
	target={newWindow ? '_blank' : '_self'}
	rel={newWindow ? 'noopener noreferrer' : ''}
	class={classNames(
		green
			? 'bg-core-green-600 hover:bg-core-green-700 text-white'
			: 'bg-core-grey-700 hover:bg-core-grey-800 text-white',
		green ? '' : 'dark:bg-core-grey-200 dark:group dark:hover:bg-core-grey-300 dark:text-black',
		'group transition h-full flex flex-col max-w-xl',
		rounded ? 'rounded-lg' : ''
	)}
>
	<div class="p-4 max-w-xl h-full">
		<slot name="body" />
	</div>
	<div
		class={classNames(
			green ? 'bg-core-green-800' : 'bg-core-grey-800 group-hover:bg-core-blue-600',
			green ? '' : 'dark:bg-core-grey-300 dark:group-hover:bg-core-blue-600',
			'p-4 mt-4 flex justify-between  transition',
			rounded ? 'rounded-b-lg' : ''
		)}
	>
		<slot name="footer" />
		<slot name="icon">
			<ArrowRightIcon class="h-6 w-6" />
		</slot>
	</div>
</a>
