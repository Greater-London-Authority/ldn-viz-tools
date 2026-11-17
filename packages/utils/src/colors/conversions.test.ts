import { describe, it, expect } from 'vitest';
import { colorToRGBArray } from './conversions';

describe('colorToRGBArray', () => {
	describe('valid hex colors', () => {
		it('should convert short hex color #fff to RGB array', () => {
			const result = colorToRGBArray('#fff');
			expect(result).toEqual([255, 255, 255]);
		});

		it('should convert short hex color #000 to RGB array', () => {
			const result = colorToRGBArray('#000');
			expect(result).toEqual([0, 0, 0]);
		});

		it('should convert full hex color #ffffff to RGB array', () => {
			const result = colorToRGBArray('#ffffff');
			expect(result).toEqual([255, 255, 255]);
		});

		it('should convert full hex color #000000 to RGB array', () => {
			const result = colorToRGBArray('#000000');
			expect(result).toEqual([0, 0, 0]);
		});

		it('should convert arbitrary hex color #ff5733 to RGB array', () => {
			const result = colorToRGBArray('#ff5733');
			expect(result).toEqual([255, 87, 51]);
		});

		it('should return fallback for hex color without # prefix (not supported by d3-color)', () => {
			const result = colorToRGBArray('ff5733');
			expect(result).toEqual([128, 128, 128]);
		});

		it('should handle lowercase hex colors', () => {
			const result = colorToRGBArray('#abcdef');
			expect(result).toEqual([171, 205, 239]);
		});

		it('should handle uppercase hex colors', () => {
			const result = colorToRGBArray('#ABCDEF');
			expect(result).toEqual([171, 205, 239]);
		});
	});

	describe('valid RGB strings', () => {
		it('should convert rgb(255, 0, 0) to RGB array', () => {
			const result = colorToRGBArray('rgb(255, 0, 0)');
			expect(result).toEqual([255, 0, 0]);
		});

		it('should convert rgb(0, 255, 0) to RGB array', () => {
			const result = colorToRGBArray('rgb(0, 255, 0)');
			expect(result).toEqual([0, 255, 0]);
		});

		it('should convert rgb(0, 0, 255) to RGB array', () => {
			const result = colorToRGBArray('rgb(0, 0, 255)');
			expect(result).toEqual([0, 0, 255]);
		});

		it('should convert rgb(128, 128, 128) to RGB array', () => {
			const result = colorToRGBArray('rgb(128, 128, 128)');
			expect(result).toEqual([128, 128, 128]);
		});

		it('should handle RGB strings without spaces', () => {
			const result = colorToRGBArray('rgb(255,0,0)');
			expect(result).toEqual([255, 0, 0]);
		});
	});

	describe('valid named colors', () => {
		it('should convert "red" to RGB array', () => {
			const result = colorToRGBArray('red');
			expect(result).toEqual([255, 0, 0]);
		});

		it('should convert "blue" to RGB array', () => {
			const result = colorToRGBArray('blue');
			expect(result).toEqual([0, 0, 255]);
		});

		it('should convert "green" to RGB array', () => {
			const result = colorToRGBArray('green');
			expect(result).toEqual([0, 128, 0]);
		});

		it('should convert "white" to RGB array', () => {
			const result = colorToRGBArray('white');
			expect(result).toEqual([255, 255, 255]);
		});

		it('should convert "black" to RGB array', () => {
			const result = colorToRGBArray('black');
			expect(result).toEqual([0, 0, 0]);
		});
	});

	describe('invalid inputs and edge cases', () => {
		it('should return fallback [128, 128, 128] for empty string', () => {
			const result = colorToRGBArray('');
			expect(result).toEqual([128, 128, 128]);
		});

		it('should return fallback [128, 128, 128] for invalid color string', () => {
			const result = colorToRGBArray('not-a-color');
			expect(result).toEqual([128, 128, 128]);
		});

		it('should return fallback [128, 128, 128] for invalid hex', () => {
			const result = colorToRGBArray('#gggggg');
			expect(result).toEqual([128, 128, 128]);
		});

		it('should pass through out-of-range rgb values as-is (d3-color accepts them)', () => {
			const result = colorToRGBArray('rgb(999, 999, 999)');
			expect(result).toEqual([999, 999, 999]);
		});

		it('should pass through out of bounds rgb values as-is (d3-color accepts them)', () => {
			const result = colorToRGBArray('rgb(-10, 300, 500)');
			expect(result).toEqual([-10, 300, 500]);
		});

		it('should return fallback [128, 128, 128] for null-like string', () => {
			const result = colorToRGBArray('null');
			expect(result).toEqual([128, 128, 128]);
		});

		it('should return fallback [128, 128, 128] for undefined-like string', () => {
			const result = colorToRGBArray('undefined');
			expect(result).toEqual([128, 128, 128]);
		});
	});

	describe('edge cases with valid colors', () => {
		it('should handle pure red', () => {
			const result = colorToRGBArray('#ff0000');
			expect(result).toEqual([255, 0, 0]);
		});

		it('should handle pure green', () => {
			const result = colorToRGBArray('#00ff00');
			expect(result).toEqual([0, 255, 0]);
		});

		it('should handle pure blue', () => {
			const result = colorToRGBArray('#0000ff');
			expect(result).toEqual([0, 0, 255]);
		});

		it('should handle cyan', () => {
			const result = colorToRGBArray('#00ffff');
			expect(result).toEqual([0, 255, 255]);
		});

		it('should handle magenta', () => {
			const result = colorToRGBArray('#ff00ff');
			expect(result).toEqual([255, 0, 255]);
		});

		it('should handle yellow', () => {
			const result = colorToRGBArray('#ffff00');
			expect(result).toEqual([255, 255, 0]);
		});
	});

	describe('RGBA with alpha channel', () => {
		it('should convert rgba(255, 0, 0, 0.5) to RGB array (ignoring alpha)', () => {
			const result = colorToRGBArray('rgba(255, 0, 0, 0.5)');
			expect(result).toEqual([255, 0, 0]);
		});

		it('should return NaN values for rgba with 0 alpha (d3-color behavior)', () => {
			const result = colorToRGBArray('rgba(0, 255, 0, 0)');
			expect(result[0]).toBeNaN();
			expect(result[1]).toBeNaN();
			expect(result[2]).toBeNaN();
		});

		it('should convert rgba(0, 0, 255, 1) to RGB array', () => {
			const result = colorToRGBArray('rgba(0, 0, 255, 1)');
			expect(result).toEqual([0, 0, 255]);
		});
	});

	describe('whitespace handling', () => {
		it('should handle extra whitespace in rgb strings', () => {
			const result = colorToRGBArray('rgb( 255 , 0 , 0 )');
			expect(result).toEqual([255, 0, 0]);
		});

		it('should handle leading whitespace', () => {
			const result = colorToRGBArray('  #ffffff');
			expect(result).toEqual([255, 255, 255]);
		});

		it('should handle trailing whitespace', () => {
			const result = colorToRGBArray('#ffffff  ');
			expect(result).toEqual([255, 255, 255]);
		});
	});
});
