<script lang="ts">
	import {
		CookieControlSettings,
		LogoCIU,
		LogoMayor,
		Overlay,
		PrivacyPolicyLink,
		Sidebar,
		SidebarFooter,
		SidebarHeader,
		ThemeSwitcher
	} from '@ldn-viz/ui';
</script>

<Sidebar>
	{#snippet header()}
		<SidebarHeader title="App title">
			{#snippet subTitle()}
				<p>A subtitle for your app</p>
			{/snippet}

			{#snippet hint()}
				<Overlay
					overlayType="modal"
					modalTitle="About"
					modalDescription="This is the modal description"
					modalWidth="3xl"
				>
					A helpful description of your app - if required
				</Overlay>
			{/snippet}
		</SidebarHeader>
	{/snippet}

	{#snippet footer()}
		<SidebarFooter>
			<div class="flex justify-between">
				<LogoMayor class="max-w-[165px]" />
				<LogoCIU class="max-w-[165px]" />
			</div>
			{#snippet menu()}
				<div class="flex justify-between">
					<ul class="flex space-x-2">
						<li><CookieControlSettings size="sm" /></li>
						<li><PrivacyPolicyLink size="sm" /></li>
					</ul>
					<ThemeSwitcher size="xs" />
				</div>
			{/snippet}
		</SidebarFooter>
	{/snippet}
</Sidebar>
