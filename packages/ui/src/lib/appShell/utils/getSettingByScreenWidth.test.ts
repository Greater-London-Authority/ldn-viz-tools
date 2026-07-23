import { describe, expect, it } from 'vitest';
import { getSetting, getSettingByScreenWidth } from './getSettingByScreenWidth';

describe('getSetting (default tailwind breakpoints)', () => {
	const settings = { initial: 'i', sm: 's', md: 'm', lg: 'l' };

	it('returns the initial setting below the smallest breakpoint', () => {
		expect(getSetting(settings, 500)).toBe('i');
	});

	it('returns the setting for the largest breakpoint at or below the width', () => {
		expect(getSetting(settings, 700)).toBe('s'); // >= 640 (sm), < 768 (md)
		expect(getSetting(settings, 800)).toBe('m'); // >= 768 (md), < 1024 (lg)
	});

	it('falls back to a smaller breakpoint when the matching one has no value', () => {
		// At 2000px xl/2xl match by width, but settings has no xl/2xl value,
		// so the largest *defined* setting (lg) is used.
		expect(getSetting(settings, 2000)).toBe('l');
	});

	it('matches exactly at a breakpoint boundary', () => {
		expect(getSetting(settings, 640)).toBe('s'); // exactly sm
		expect(getSetting(settings, 639)).toBe('i'); // one below sm
		expect(getSetting(settings, 768)).toBe('m'); // exactly md
	});

	it('falls back to settings.initial when no non-initial breakpoint has a value', () => {
		expect(getSetting({ initial: 'only' }, 2000)).toBe('only');
	});
});

describe('getSettingByScreenWidth (custom breakpoints)', () => {
	const customScreens = { initial: 0, big: 1000 };
	const getCustom = getSettingByScreenWidth(customScreens);
	const settings = { initial: 'small', big: 'huge' };

	it('uses the custom breakpoint object', () => {
		expect(getCustom(settings, 500)).toBe('small');
		expect(getCustom(settings, 1500)).toBe('huge');
		expect(getCustom(settings, 1000)).toBe('huge'); // exactly at the custom breakpoint
	});
});
