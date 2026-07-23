import { createRawSnippet } from 'svelte';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import NonIdealState from './NonIdealState.svelte';

// NonIdealState does not have a `variant` prop / status colour scheme like
// Callout; instead it toggles between an icon and a spinner (`spinner` prop),
// and each of icon/title/children can be overridden via snippets. These tests
// cover the default icon+title, custom icon/title, spinner mode, and children.

describe('NonIdealState Component', () => {
	it('renders the default icon and default title when nothing is customised', async () => {
		const { container } = render(NonIdealState, {});

		await expect.element(page.getByText('Nothing to display')).toBeInTheDocument();

		// Default icon is the heroicons ExclamationTriangle, rendered `h-6 w-6` and hidden from AT.
		const icon = container.querySelector('svg.h-6.w-6');
		expect(icon).not.toBeNull();
		expect(icon).toHaveAttribute('aria-hidden', 'true');
	});

	it('renders custom title and children content', async () => {
		const title = createRawSnippet(() => ({
			render: () => '<span>Oh no!</span>',
			setup: () => {}
		}));
		const children = createRawSnippet(() => ({
			render: () => '<span>Something terrible has happened!</span>',
			setup: () => {}
		}));

		render(NonIdealState, { title, children });

		await expect.element(page.getByText('Oh no!')).toBeInTheDocument();
		await expect.element(page.getByText('Something terrible has happened!')).toBeInTheDocument();
	});

	it('renders a custom icon snippet instead of the default icon', async () => {
		const icon = createRawSnippet(() => ({
			render: () => '<svg class="custom-icon" aria-hidden="true"></svg>',
			setup: () => {}
		}));

		const { container } = render(NonIdealState, { icon });

		expect(container.querySelector('svg.custom-icon')).not.toBeNull();
		// The default ExclamationTriangle icon (h-6 w-6, no other classes) should be replaced.
		expect(container.querySelector('svg.h-6.w-6')).toBeNull();
	});

	it('renders a LoadingIndicator instead of the icon when spinner is true', async () => {
		const { container } = render(NonIdealState, { spinner: true });

		// The default icon should not be present.
		expect(container.querySelector('svg.h-6.w-6')).toBeNull();

		// LoadingIndicator is rendered with `h-12 w-12` classes (see NonIdealState.svelte);
		// in the default (non reduced-motion) test environment it renders the Spinner svg.
		const spinnerSvg = container.querySelector('svg.h-12.w-12');
		expect(spinnerSvg).not.toBeNull();
		expect(spinnerSvg).toHaveAttribute('viewBox', '0 0 100 100');
	});

	it('renders children inside their own container below the title', async () => {
		const children = createRawSnippet(() => ({
			render: () => '<span>The server did not respond.</span>',
			setup: () => {}
		}));

		render(NonIdealState, { children });

		await expect.element(page.getByText('The server did not respond.')).toBeInTheDocument();
	});
});
