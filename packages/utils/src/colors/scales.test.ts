import { describe, it, expect } from 'vitest';
import { getColorRamp } from './scales';

describe('getColorRamp', () => {
  describe('default parameters', () => {
    it('should return 5 colors by default', () => {
      const result = getColorRamp();
      expect(result).toHaveLength(5);
    });

    it('should return array of hex strings', () => {
      const result = getColorRamp();
      result.forEach((color) => {
        expect(typeof color).toBe('string');

        expect(color).toMatch(/^#[0-9a-f]{6}$/i);
      });
    });

    it('these colors should be distinct', () => {
      const result = getColorRamp();
      expect(result).toHaveLength(5);

      const uniqueColors = new Set(result);
      expect(uniqueColors.size).toEqual(5);
    });

    it('should use default blue color ramp', () => {
      const result = getColorRamp();
      expect(result).toHaveLength(5);

      const uniqueColors = new Set(result);
      expect(uniqueColors.size).toEqual(5);

      expect(result[0]).toBe('#0e7ed1');
      expect(result[4]).toBe('#b9dbfd');
    });
  });

  describe('custom color count', () => {
    it('should return 1 color when count is 1', () => {
      const result = getColorRamp({ count: 1 });
      expect(result).toHaveLength(1);
    });

    it('should return 2 colors when count is 2', () => {
      const result = getColorRamp({ count: 2 });
      expect(result).toHaveLength(2);
    });

    it('should return 3 colors when count is 3', () => {
      const result = getColorRamp({ count: 3 });
      expect(result).toHaveLength(3);
    });

    it('should return 10 colors when count is 10', () => {
      const result = getColorRamp({ count: 10 });
      expect(result).toHaveLength(10);
    });

    it('should return 100 colors when count is 100', () => {
      const result = getColorRamp({ count: 100 });
      expect(result).toHaveLength(100);
    });
  });

  describe('even and non-even interpolation are different', () => {
    it('should return different colors for even=true vs even=false', () => {
      const evenColors = getColorRamp({ count: 5, even: true });
      const nonEvenColors = getColorRamp({ count: 5, even: false });

      expect(evenColors).toHaveLength(5);
      expect(nonEvenColors).toHaveLength(5);

      // At least some colors should be different between the two approaches
      let differentCount = 0;
      for (let i = 0; i < 5; i++) {
        if (evenColors[i] !== nonEvenColors[i]) {
          differentCount++;
        }
      }
      expect(differentCount).toBeGreaterThan(0);
    });
  });

  describe('custom color arrays', () => {
    it('should interpolate between two custom colors', () => {
      const result = getColorRamp({ colors: ['#ff0000', '#0000ff'], count: 5 });
      expect(result).toHaveLength(5);
      expect(result[0]).toBe('#ff0000');
      expect(result[4]).toBe('#0000ff');
    });

    it('should interpolate between three colors', () => {
      const result = getColorRamp({
        colors: ['#ff0000', '#00ff00', '#0000ff'],
        count: 5
      });
      expect(result).toHaveLength(5);
      expect(result[0]).toBe('#ff0000');
      expect(result[4]).toBe('#0000ff');


    });

    it('should interpolate between four colors', () => {
      const result = getColorRamp({
        colors: ['#ff0000', '#ffff00', '#00ff00', '#0000ff'],
        count: 7
      });
      expect(result).toHaveLength(7);
    });

    it('should handle named colors', () => {
      const result = getColorRamp({ colors: ['red', 'blue'], count: 3 });
      expect(result).toHaveLength(3);
      expect(result[0]).toBe('#ff0000');
      expect(result[2]).toBe('#0000ff');

    });
  });

  describe('compressed extent', () => {
    it('should handle same start and end colors', () => {
      const result = getColorRamp({ colors: ['#ff0000', '#ff0000'], count: 5 });
      expect(result).toHaveLength(5);
      // All colors should be the same
      result.forEach((color) => {
        expect(color).toBe('#ff0000');
      });
    });

    it('should handle very similar colors', () => {
      const result = getColorRamp({ colors: ['#ff0000', '#ff0001'], count: 5 });
      expect(result).toHaveLength(5);
      expect(result[0]).toBe('#ff0000');
      expect(result[4]).toBe('#ff0001');
    });
  });
});

