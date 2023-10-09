<script>
	import { ArrowCircleDownIcon } from '@rgossiaux/svelte-heroicons/solid';

	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Button from './Button.svelte';

	const sizes = ['sm', 'md', 'lg'];
	const conditions = ['default', 'disabled', 'success', 'error', 'warning'];
	const variants = ['brand', 'square', 'solid', 'outline', 'text'];
</script>

<Meta title="Ui/Button" component={Button} />

<Template let:args>
	<Button {...args}>I'm a button from UI!</Button>
</Template>

<Story name="Summary table">
	<div class="flex flex-col gap-20 text-core-grey-600">
		{#each ['primary', 'secondary'] as emphasis}
			<div>
				<h2 class="font-bold">Emphasis: <span class="text-sm text-core-grey-400 font-mono">{emphasis}</span></h2>
				<div
					class="grid gap-2"
					style={`grid-template-columns: repeat(${1 + variants.length * sizes.length}, 1fr);`}
				>
					<!-- variants header -->
					<span class="font-bold">Variant:</span>
					{#each variants as variant, i}
						<div
							style={`grid-column: ${2 + sizes.length * i} / ${2 + sizes.length * (i + 1)}`}
							class="text-center border-b-2 border-gray-200 text-sm text-core-grey-400 font-mono"
						>
							{variant}
						</div>
					{/each}

					<!-- size header -->
					<span class="font-bold">Size:</span>
					{#each new Array(variants.length) as i}
						{#each sizes as size}
							<span class="text-center text-sm text-core-grey-400 font-mono">{size}</span>
						{/each}
					{/each}

					{#each conditions as condition}
						<span class="self-end text-sm text-core-grey-400 font-mono">{condition}</span>

						{#each variants as variant}
							{#each sizes as size}
								<div class="flex items-end justify-center">
									{#if condition === 'disabled'}
										<Button {emphasis} disabled {size} {variant}>
											{#if variant ==='square'}
												<ArrowCircleDownIcon class="w-6 h-6" aria-hidden="true" />
												{#if size === 'lg'}Button{/if}
											{:else}
												Button
											{/if}
										</Button>
									{:else}
										<Button {emphasis} {condition} {size} {variant}>
											{#if variant ==='square'}
												<ArrowCircleDownIcon class="w-6 h-6" aria-hidden="true" />
												{#if size === 'lg'}Button{/if}
											{:else}
												Button
											{/if}
										</Button>
									{/if}
								</div>
							{/each}
						{/each}
					{/each}
				</div>
			</div>
		{/each}
	</div>
</Story>

<Story name="Default" />

<Story name="Brand">
	<Button variant="brand">Brand Primary</Button>
	<Button variant="brand" condition="success">Success</Button>
	<Button variant="brand" condition="warning">Warning</Button>
	<Button variant="brand" condition="error">Error</Button>
	<Button variant="brand" emphasis="secondary">Brand Secondary</Button>
	<Button variant="brand" emphasis="secondary" condition="success">Success</Button>
	<Button variant="brand" emphasis="secondary" condition="warning">Warning</Button>
	<Button variant="brand" emphasis="secondary" condition="error">Error</Button>
	<Button variant="brand" disabled>Brand Primary (disabled)</Button>
</Story>

<Story name="Solid">
	<Button variant="solid">Solid Primary</Button>
	<Button variant="solid" condition="success">Success</Button>
	<Button variant="solid" condition="warning">Warning</Button>
	<Button variant="solid" condition="error">Error</Button>
	<Button variant="solid" emphasis="secondary">Solid Secondary</Button>
	<Button variant="solid" condition="success" emphasis="secondary">Success</Button>
	<Button variant="solid" condition="warning" emphasis="secondary">Warning</Button>
	<Button variant="solid" condition="error" emphasis="secondary">Error</Button>
	<Button variant="solid" disabled>Solid Primary (disabled)</Button>
</Story>

<Story name="Outline">
	<Button variant="outline">Outline Primary</Button>
	<Button variant="outline" condition="success">Success</Button>
	<Button variant="outline" condition="warning">Warning</Button>
	<Button variant="outline" condition="error">Error</Button>
	<Button variant="outline" emphasis="secondary">Outline Secondary</Button>
	<Button variant="outline" condition="success" emphasis="secondary">Success</Button>
	<Button variant="outline" condition="warning" emphasis="secondary">Warning</Button>
	<Button variant="outline" condition="error" emphasis="secondary">Error</Button>
	<Button variant="outline" disabled>Outline Primary (disabled)</Button>
</Story>

<Story name="Text">
	<Button variant="text">Text Primary</Button>
	<Button variant="text" condition="success">Success</Button>
	<Button variant="text" condition="warning">Warning</Button>
	<Button variant="text" condition="error">Error</Button>
	<Button variant="text" emphasis="secondary">Text Secondary</Button>
	<Button variant="text" condition="success" emphasis="secondary">Success</Button>
	<Button variant="text" condition="warning" emphasis="secondary">Warning</Button>
	<Button variant="text" condition="error" emphasis="secondary">Error</Button>
	<Button variant="text" disabled>Text Primary (disabled)</Button>
</Story>

<Story name="Square">
	<Button variant="square"><ArrowCircleDownIcon class="w-6 h-6" aria-hidden="true" /></Button>
	<Button variant="square" emphasis="secondary">
		<ArrowCircleDownIcon class="w-6 h-6" aria-hidden="true" />
	</Button>
	<Button variant="square" disabled>
		<ArrowCircleDownIcon class="w-6 h-6" aria-hidden="true" />
	</Button>

	<Button variant="square" size="sm">
		<ArrowCircleDownIcon class="w-6 h-6" aria-hidden="true" />
	</Button>
	<Button variant="square" size="md">
		<ArrowCircleDownIcon class="w-6 h-6" aria-hidden="true" />
	</Button>
	<Button variant="square" size="lg">
		<ArrowCircleDownIcon class="w-6 h-6 mb-1" aria-hidden="true" />
		Large
	</Button>
</Story>

<Story name="Disabled">
	<Button disabled>Default Variant</Button>
	<Button variant="brand" disabled>Brand Variant</Button>
	<Button variant="solid" disabled>Solid Variant</Button>
	<Button variant="outline" disabled>Outline Variant</Button>
	<Button variant="text" disabled>Text Variant</Button>
</Story>

<Story name="Sizes">
	<div class="flex items-end space-x-2">
		<Button size="sm">sm</Button>
		<Button size="md">md</Button>
		<Button size="lg">lg</Button>
	</div>
</Story>

<Story name="With Icon">
	<div class="flex space-y-2 flex-col w-40">
		<Button
			>Icon via slot
			<ArrowCircleDownIcon class="w-6 h-6 ml-2" aria-hidden="true" />
		</Button>
		<Button>
			<ArrowCircleDownIcon class="w-6 h-6 mr-2" aria-hidden="true" />
			Icon via slot
		</Button>
		<Button class="flex-col items-center">
			Icon via slot
			<ArrowCircleDownIcon class="w-6 h-6" aria-hidden="true" />
		</Button>
	</div>
</Story>

<Story name="With class prop">
	<Button class="text-core-darkPink-500 border-core-pink-700 bg-yellow-500"
		>Custom classes applied</Button
	>
</Story>

<Story name="Full width">
	<Button class="w-full">Custom classes applied</Button>
</Story>

<Story name="With Link">
	<Button href="#">Link</Button>
	<Button disabled href="#">Link</Button>
</Story>
