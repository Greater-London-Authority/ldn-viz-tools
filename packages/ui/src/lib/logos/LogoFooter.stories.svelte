<script>
	import { Meta, Story } from '@storybook/addon-svelte-csf';

	import LogoFooter from './LogoFooter.svelte';
	import LogoLOTI from './LogoLOTI.svelte';
</script>

<Meta title="Ui/LogoFooter" component={LogoFooter} />

<Story name="Default">
	<div class="border-2 border-core-grey-400 bg-white h-96 flex flex-col justify-between">
		<p>
			Default CIU footer shows <code>&lt;LogoMayor&gt;</code> (left) and
			<code>&lt;LogoCIU&gt;</code> (right). The footer will size itself to its content.
		</p>
		<LogoFooter />
	</div>
</Story>

<Story name="Where to use">
	<div class="border-2 border-core-grey-400 bg-white flex flex-col">
		<div class="h-96 flex justify-between gap-4">
			<div class="flex flex-col justify-between">
				<p>
					The footer can be applied any where <code>&lt;footer&gt;</code> would normally occur such as
					a page footer.
				</p>
			</div>
			<div class="border-2 border-core-grey-400 w-1/2 flex flex-col justify-between">
				<p>Or in a sub component such as a sidebar or modal.</p>
				<LogoFooter classes="mt-auto" />
			</div>
		</div>
		<LogoFooter classes="mt-auto" />
	</div>
</Story>

<Story name="Named slots">
	<div class="border-2 border-core-grey-400 bg-white h-96 flex flex-col">
		<p>
			Replace default logos with custom ones or text by slotting content into the <b>left</b> and
			<b>right</b> named slots.
		</p>
		<p>
			For example, <code>&lt;LogoLOTI slot="right" class="w-16 p-2" /&gt;</code>. You may have to
			set the logo's size, padding, and other CSS properties so it fits well. Then check it's still
			readable with different base font sizes.
		</p>
		<p>
			Remove a logo by slotting an empty element, e.g. <code>&lt;div slot="left" /&gt;</code>.
		</p>
		<div class="grow" />
		<LogoFooter>
			<div slot="left" />
			<LogoLOTI slot="right" class="w-16 p-2" />
		</LogoFooter>
	</div>
</Story>

<style>
	p {
		@apply text-core-grey-800 p-2;
	}

	code {
		@apply text-core-blue-800;
	}
</style>
