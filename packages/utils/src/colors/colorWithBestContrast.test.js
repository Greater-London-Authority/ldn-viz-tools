import { expect, test } from 'vitest';
import { colorWithBestContrast } from './colorWithBestContrast';
import colors from '@ldn-viz/themes/styles/js/theme-tokens';

test('chooses white rather than black for white background, regardless sof order of choices', () => {
  expect(colorWithBestContrast('#FFFFFF', '#FFFFFF', '#000000')).toBe('#000000');
  expect(colorWithBestContrast('#FFFFFF', '#000000', '#FFFFFF')).toBe('#000000');

});

test('chooses black rather than white for black background, regardless sof order of choices', () => {
  expect(colorWithBestContrast('#000000', '#FFFFFF', '#000000')).toBe('#FFFFFF');
  expect(colorWithBestContrast('#000000', '#000000', '#FFFFFF')).toBe('#FFFFFF');
});

test('chooses black rather than white for yellow background', () => {
  expect(colorWithBestContrast(colors.theme.light.color.data.categorical.yellow, '#FFFFFF', '#000000')).toBe('#000000');
});

test('chooses white rather than black for primary background', () => {
  expect(colorWithBestContrast(colors.theme.light.color.data.primary, '#FFFFFF', '#000000')).toBe('#FFFFFF');
});
