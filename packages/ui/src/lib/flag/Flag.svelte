<script lang="ts">
	import { classNames } from '../utils/classNames';

	type flagType = 'alpha' | 'beta' | 'alert' | 'warning' | 'positive' | 'notice';
	export let level: flagType = 'alpha';

	export let link = '';
	export let linkText = 'Please provide feedback here';

	const colorClass: Record<flagType, string> = {
		alpha: 'bg-core-glaPink-500',
		beta: 'bg-core-blue-600',
		alert: 'bg-core-red-500', // or 100, or 500
		warning: 'bg-core-orange-500',
		positive: 'bg-core-green-600',
		notice: 'bg-core-blue-600'
	};

	const defaultMessage = {
		alpha: 'Alpha Preview',
		beta: 'Beta preview'
	};
</script>

<div class={classNames('w-full min-h-[24px] h-fit flex justify-between px-4', colorClass[level])}>
	<div class="text-white uppercase text-base">
		<slot>
			{defaultMessage[level]}
		</slot>
	</div>

	{#if link}
		<a href={link} class="text-white underline">{linkText}</a>
	{/if}
</div>
