<script>
	import { LogoCIU, LogoMayor } from '@ldn-viz/ui';
</script>

<footer class="bg-core-grey-800 w-full flex flex-wrap justify-between text-white" {...$$restProps}>
	<div class="bg-core-grey-800 self-center">
		<slot name="left">
			<LogoMayor class="w-44 p-2 py-3 max-w-full" />
		</slot>
	</div>
	<div class="bg-core-grey-800 self-center">
		<slot name="right">
			<LogoCIU class="w-44 p-2 py-3 max-w-full" />
		</slot>
	</div>
</footer>
