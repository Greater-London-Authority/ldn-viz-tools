import { describe, test, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import MapControlBorough from './MapControlBorough.svelte';
import boroughs from './boroughs.json';
import { GREATER_LONDON_BOUNDS } from '../themes/bounds';

// The `Select` component wraps `svelecte`, which is not a native <select> - it
// renders a text-input-like control that opens a custom listbox of plain
// `div`s on click (see packages/ui/src/lib/select/Select.svelte and
// node_modules/svelecte/dist/Svelecte.svelte). There is no ARIA role wired up
// for the control or its options, so we drive/inspect it via the DOM
// directly rather than `page.getByRole`.

const openDropdown = async () => {
	const input = document.querySelector('input.sv-input--text') as HTMLInputElement;
	expect(input).toBeTruthy();
	input.click();
	await vi.waitFor(() => {
		expect(document.querySelector('.sv_dropdown.is-open')).toBeTruthy();
	});
};

const dropdownOptionLabels = () =>
	Array.from(
		document.querySelectorAll('.sv_dropdown .sv-item--wrap.in-dropdown .sv-item--content')
	).map((el) => el.textContent?.trim());

const clickDropdownOption = (label: string) => {
	const items = Array.from(document.querySelectorAll('.sv_dropdown .sv-item--wrap.in-dropdown'));
	const target = items.find(
		(el) => el.querySelector('.sv-item--content')?.textContent?.trim() === label
	);
	expect(target).toBeTruthy();
	(target as HTMLElement).click();
};

describe('MapControlBorough', () => {
	test('the options list shows "Show all of Greater London" first, then boroughs sorted alphabetically by name', async () => {
		const map = { fitBounds: vi.fn() };
		render(MapControlBorough, { props: { map } });

		await openDropdown();

		const expectedNames = [
			'Show all of Greater London',
			...boroughs.map((b) => b.properties.name).sort((a, b) => (a > b ? 1 : b > a ? -1 : 0))
		];

		expect(dropdownOptionLabels()).toEqual(expectedNames);
	});

	test('defaults selectedBorough to "London Borough of Barnet" and zooms to its bounds on mount', async () => {
		const map = { fitBounds: vi.fn() };
		render(MapControlBorough, { props: { map } });

		const barnet = boroughs.find((b) => b.properties.borough === 'London Borough of Barnet')!;

		await vi.waitFor(() => {
			expect(map.fitBounds).toHaveBeenCalledWith(barnet.bounds);
		});
	});

	test('selecting "GREATER LONDON" calls map.fitBounds with GREATER_LONDON_BOUNDS', async () => {
		const map = { fitBounds: vi.fn() };
		render(MapControlBorough, { props: { map } });

		// Wait for (and discard) the initial mount effect for the default borough.
		await vi.waitFor(() => expect(map.fitBounds).toHaveBeenCalledTimes(1));
		map.fitBounds.mockClear();

		await openDropdown();
		clickDropdownOption('Show all of Greater London');

		await vi.waitFor(() => {
			expect(map.fitBounds).toHaveBeenCalledWith(GREATER_LONDON_BOUNDS);
		});
	});

	test("selecting a named borough calls map.fitBounds with that borough's bounds from boroughs.json", async () => {
		const map = { fitBounds: vi.fn() };
		render(MapControlBorough, { props: { map } });

		await vi.waitFor(() => expect(map.fitBounds).toHaveBeenCalledTimes(1));
		map.fitBounds.mockClear();

		const greenwich = boroughs.find((b) => b.properties.name === 'Greenwich')!;

		await openDropdown();
		clickDropdownOption(greenwich.properties.name);

		await vi.waitFor(() => {
			expect(map.fitBounds).toHaveBeenCalledWith(greenwich.bounds);
		});
	});

	test('selectedBorough is bindable: selecting a borough updates the bound value', async () => {
		const map = { fitBounds: vi.fn() };
		// Pass the same value as the component's own default explicitly, so
		// that `selectedBorough` is a genuine two-way binding from the start
		// (Svelte disallows binding `undefined` to a prop that has a
		// `$bindable` fallback - see `props_invalid_value`).
		const props = $state<{ selectedBorough?: string; map?: typeof map }>({
			selectedBorough: 'London Borough of Barnet',
			map
		});
		render(MapControlBorough, { props });

		const greenwich = boroughs.find((b) => b.properties.name === 'Greenwich')!;

		await openDropdown();
		clickDropdownOption(greenwich.properties.name);

		await vi.waitFor(() => {
			expect(props.selectedBorough).toBe(greenwich.properties.borough);
		});
	});
});
