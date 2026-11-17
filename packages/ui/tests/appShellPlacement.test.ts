import { expect, test } from '@playwright/test';

// A SvelteKit client-side navigation remounts <AppShell> and <Sidebar> together,
// and used to do so in an order that left the sidebar on the wrong side: the
// AppShell resolved `{ initial: 'left' }` first, then <Sidebar> overwrote the
// shared placement with its own prop default of 'right' and nothing re-ran the
// AppShell's effect to correct it. A cold load happened to resolve in the
// opposite order, which is why this only ever showed up after navigating.
//
// Component tests cannot cover this: only a real router produces the navigation
// ordering. Fixtures are in src/routes/tests/appshell-placement.

const A = '/tests/appshell-placement/a';
const B = '/tests/appshell-placement/b';

test('sidebar placement survives a client-side navigation', async ({ page }) => {
	await page.goto(A);
	await expect(page.getByTestId('placement')).toHaveText('left');

	// An <a> click inside the app is a client-side navigation, not a reload.
	await page.getByTestId('nav').click();
	await page.waitForURL(`**${B}`);

	await expect(page.getByTestId('placement')).toHaveText('left');
});

test('sidebar placement survives navigating back and forth', async ({ page }) => {
	await page.goto(A);
	await expect(page.getByTestId('placement')).toHaveText('left');

	await page.getByTestId('nav').click();
	await page.waitForURL(`**${B}`);
	await expect(page.getByTestId('placement')).toHaveText('left');

	await page.getByTestId('nav').click();
	await page.waitForURL(`**${A}`);
	await expect(page.getByTestId('placement')).toHaveText('left');
});

test('sidebar is rendered on the left of the viewport after navigating', async ({ page }) => {
	await page.goto(A);
	await page.getByTestId('nav').click();
	await page.waitForURL(`**${B}`);

	// Open the sidebar for the first time after the navigation - the exact
	// interaction that used to animate in from the wrong edge.
	await page.getByTitle('Toggle sidebar').click();

	const aside = page.locator('aside');
	await expect(aside).toBeVisible();

	const box = await aside.boundingBox();
	const viewport = page.viewportSize();
	expect(box).not.toBeNull();
	expect(viewport).not.toBeNull();

	// A left-placed sidebar starts in the left half of the window; the bug put
	// it flush against the right edge.
	expect(box!.x).toBeLessThan(viewport!.width / 2);
});
