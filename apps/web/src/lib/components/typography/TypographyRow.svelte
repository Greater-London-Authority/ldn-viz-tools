<script lang="ts">
	interface item {
		text: string;
		usage: string;
		class: string;
	}

	let { text, usage, class: classes }: item = $props();
</script>

<div class="border-color-ui-border-secondary w-full border-b py-4">
	<div class="grid grid-cols-2 items-end">
		<div class={classes}>{text}</div>
		<div class="text-color-text-secondary">{usage}</div>
	</div>
</div>
