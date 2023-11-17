<script>
	export let position = "top-left"

	let positionClasses = ""

	if (position === "top-left") {
		positionClasses = "left-6 top-6"
	} else if (position === "bottom-left") {
		positionClasses = "left-6 bottom-6"
	}
</script>

<div class="absolute {positionClasses} z-40 flex flex-col space-y-2">
	<slot />
</div>