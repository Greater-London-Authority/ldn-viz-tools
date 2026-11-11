import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { get, writable, type Writable } from 'svelte/store';

import { theme_os_dark, theme_os_light_vts } from '@ldn-viz/maps';

// `mode-watcher`'s `mode` is a `$state`-backed object with a reactive
// `current` accessor (see mode-watcher/dist/states.svelte.js). For these
// tests we only need its value to be whatever it is *at mount time*, so a
// plain mutable object with a `current` field is a sufficient stand-in.
const mockMode = vi.hoisted(() => ({ current: 'light' as 'light' | 'dark' }));

vi.mock('mode-watcher', async (importOriginal) => {
	const actual = await importOriginal<typeof import('mode-watcher')>();
	return { ...actual, mode: mockMode };
});

// `MapLibre` is Map.svelte's only child component, and is invoked directly
// (statically) rather than dynamically, so Svelte compiles the reference to
// a direct function call of `(anchor, props) => ...`. Replacing it with a
// plain recording function lets us inspect exactly what `Map.svelte`
// forwards (in particular `style`) without needing a real MapLibre GL
// canvas/WebGL context.
const mapLibreCalls = vi.hoisted(() => [] as any[]);

vi.mock('./MapLibre.svelte', () => ({
	default: (_anchor: unknown, props: unknown) => {
		mapLibreCalls.push(props);
	}
}));

// Browser-mode ESM module namespaces are non-configurable, so `vi.spyOn`
// cannot patch `setContext` on an imported module object directly (see
// https://vitest.dev/guide/browser/#limitations). Instead, mock `svelte`
// itself, keeping every real export but wrapping `setContext` so calls are
// recorded while still delegating to the real implementation.
const setContextCalls = vi.hoisted(() => [] as [unknown, unknown][]);

vi.mock('svelte', async (importOriginal) => {
	const actual = await importOriginal<typeof import('svelte')>();
	return {
		...actual,
		setContext: (key: unknown, value: unknown) => {
			setContextCalls.push([key, value]);
			return actual.setContext(key, value);
		}
	};
});

import Map from './Map.svelte';

describe('Map.svelte', () => {
	beforeEach(() => {
		mockMode.current = 'light';
		mapLibreCalls.length = 0;
		setContextCalls.length = 0;
	});

	describe('identifyStyle (via the `style` prop forwarded to MapLibre)', () => {
		test('falls back to theme_os_light_vts when both lightStyle and darkStyle are null', async () => {
			await render(Map, {
				props: { disabled: true, lightStyle: null, darkStyle: null }
			});

			expect(mapLibreCalls).toHaveLength(1);
			expect(mapLibreCalls[0].style).toBe(theme_os_light_vts);
		});

		test('always uses darkStyle when only darkStyle is set, regardless of mode', async () => {
			const darkStyle = { version: 8, sources: {}, layers: [] } as any;

			mockMode.current = 'light';
			await render(Map, {
				props: { disabled: true, lightStyle: null, darkStyle }
			});
			expect(mapLibreCalls[0].style).toBe(darkStyle);

			mapLibreCalls.length = 0;
			mockMode.current = 'dark';
			await render(Map, {
				props: { disabled: true, lightStyle: null, darkStyle }
			});
			expect(mapLibreCalls[0].style).toBe(darkStyle);
		});

		test('always uses lightStyle when only lightStyle is set, regardless of mode', async () => {
			const lightStyle = { version: 8, sources: {}, layers: [] } as any;

			mockMode.current = 'dark';
			await render(Map, {
				props: { disabled: true, lightStyle, darkStyle: null }
			});
			expect(mapLibreCalls[0].style).toBe(lightStyle);

			mapLibreCalls.length = 0;
			mockMode.current = 'light';
			await render(Map, {
				props: { disabled: true, lightStyle, darkStyle: null }
			});
			expect(mapLibreCalls[0].style).toBe(lightStyle);
		});

		test('picks darkStyle when mode.current is "dark" and both styles are set', async () => {
			const lightStyle = { version: 8, sources: {}, layers: [], name: 'light' } as any;
			const darkStyle = { version: 8, sources: {}, layers: [], name: 'dark' } as any;

			mockMode.current = 'dark';
			await render(Map, {
				props: { disabled: true, lightStyle, darkStyle }
			});

			expect(mapLibreCalls[0].style).toBe(darkStyle);
		});

		test('picks lightStyle when mode.current is not "dark" and both styles are set', async () => {
			const lightStyle = { version: 8, sources: {}, layers: [], name: 'light' } as any;
			const darkStyle = { version: 8, sources: {}, layers: [], name: 'dark' } as any;

			mockMode.current = 'light';
			await render(Map, {
				props: { disabled: true, lightStyle, darkStyle }
			});

			expect(mapLibreCalls[0].style).toBe(lightStyle);
		});

		test('uses the real theme_os_dark/theme_os_light_vts defaults when no style props are supplied', async () => {
			mockMode.current = 'dark';
			await render(Map, { props: { disabled: true } });
			expect(mapLibreCalls[0].style).toBe(theme_os_dark);

			mapLibreCalls.length = 0;
			mockMode.current = 'light';
			await render(Map, { props: { disabled: true } });
			expect(mapLibreCalls[0].style).toBe(theme_os_light_vts);
		});
	});

	describe('default mapStore/mapCursorStore creation', () => {
		test('creates its own writable stores and sets them into context when not supplied as props', async () => {
			await render(Map, { props: { disabled: true } });

			const contextCalls = setContextCalls.filter(([key]) =>
				['mapStore', 'mapCursorStore'].includes(key as string)
			);

			expect(contextCalls).toHaveLength(2);

			const mapStoreCall = contextCalls.find(([key]) => key === 'mapStore');
			const mapCursorStoreCall = contextCalls.find(([key]) => key === 'mapCursorStore');

			expect(mapStoreCall).toBeDefined();
			expect(mapCursorStoreCall).toBeDefined();

			const mapStore = mapStoreCall![1] as Writable<unknown>;
			const mapCursorStore = mapCursorStoreCall![1] as Writable<unknown>;

			// Both are plain `writable` stores (subscribe/set/update), initialised to null.
			expect(typeof mapStore.subscribe).toBe('function');
			expect(typeof mapCursorStore.subscribe).toBe('function');
			expect(get(mapStore)).toBeNull();
			expect(get(mapCursorStore)).toBeNull();
		});

		test('sets the caller-supplied stores into context, rather than creating new ones, when supplied as props', async () => {
			const suppliedMapStore = writable(null);
			const suppliedMapCursorStore = writable(null);

			await render(Map, {
				props: {
					disabled: true,
					mapStore: suppliedMapStore,
					mapCursorStore: suppliedMapCursorStore
				}
			});

			const contextCalls = setContextCalls.filter(([key]) =>
				['mapStore', 'mapCursorStore'].includes(key as string)
			);

			expect(contextCalls).toHaveLength(2);
			expect(contextCalls.find(([key]) => key === 'mapStore')?.[1]).toBe(suppliedMapStore);
			expect(contextCalls.find(([key]) => key === 'mapCursorStore')?.[1]).toBe(
				suppliedMapCursorStore
			);
		});
	});
});
