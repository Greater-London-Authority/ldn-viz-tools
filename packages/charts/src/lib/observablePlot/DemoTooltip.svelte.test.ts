import { describe, expect, it } from 'vitest';
import { writable } from 'svelte/store';
import { render } from 'vitest-browser-svelte';

import DemoTooltip from './DemoTooltip.svelte';

describe('DemoTooltip', () => {
	it('renders nothing when the tooltipData context value is falsy', async () => {
		const tooltipData = writable(undefined);

		const { container } = render(DemoTooltip, {
			context: new Map([['tooltipData', tooltipData]])
		});

		expect(container.textContent).toBe('');
	});

	it('renders the Value field from context when set', async () => {
		const tooltipData = writable({ Value: 42 });

		const { container } = render(DemoTooltip, {
			context: new Map([['tooltipData', tooltipData]])
		});

		expect(container.textContent).toContain('Custom');
		expect(container.textContent).toContain('Value from Data: 42');
	});
});
