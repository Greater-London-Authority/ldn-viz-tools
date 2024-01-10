<script lang="ts">
	import { createDialog } from 'svelte-headlessui';
	import Transition from 'svelte-transition';

	import { classNames } from '../utils/classNames';

	export let dialog = createDialog({ label: '' });

	export let isOpen = false;

	export let title: string;
	export let description: string;
	export let width:
		| 'xs'
		| 'sm'
		| 'md'
		| 'lg'
		| 'xl'
		| '2xl'
		| '3xl'
		| '4xl'
		| '5xl'
		| '6xl'
		| '7xl'
		| 'full' = 'md';

	const hasChildren = Object.keys($$slots).length > 0;

	const widthClasses = {
		xs: 'max-w-xs',
		sm: 'max-w-sm',
		md: 'max-w-md',
		lg: 'max-w-lg',
		xl: 'max-w-xl',
		'2xl': 'max-w-2xl',
		'3xl': 'max-w-3xl',
		'4xl': 'max-w-4xl',
		'5xl': 'max-w-5xl',
		'6xl': 'max-w-6xl',
		'7xl': 'max-w-7xl',
		full: 'max-w-full'
	};

	$: modalClass = classNames(
		'inline-block w-full my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl space-y-2 pb-4 pointer-events-auto',
		widthClasses[width]
	);
</script>

<div class="flex w-full flex-col items-center justify-center">
	<div class="relative z-10">
		<Transition show={$dialog.expanded}>
			<Transition
				enter="ease-out duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<button class="fixed inset-0 bg-black bg-opacity-25" on:click={dialog.close} />
			</Transition>

			<div class="fixed inset-0 overflow-y-auto">
				<div class="flex min-h-full items-center justify-center p-4 text-center">
					<Transition
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<div class={modalClass} use:dialog.modal>
							<div class="bg-core-grey-600 text-white p-2 relative">
								<h1>{title}</h1>
								<button
									on:click={dialog.close}
									class="bg-core-grey-500 absolute top-2 right-2 hover:bg-core-grey-800"
								>
									<span class="sr-only">Close</span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-6 h-6"
									>
										<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>

							{#if description}
								<div class="px-2">{description}</div>
							{/if}

							{#if hasChildren && description}
								<div class="border-dotted border-t border-core-grey-300 pt-4 mx-2 text-sm">
									<slot />
								</div>
							{:else if hasChildren}
								<div class="border-dotted border-core-grey-300 mx-2 text-sm">
									<slot />
								</div>
							{/if}
						</div>
					</Transition>
				</div>
			</div>
		</Transition>
	</div>
</div>
