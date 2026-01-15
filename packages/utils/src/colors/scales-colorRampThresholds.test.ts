import { describe, expect, it } from 'vitest';
import { getThresholdBreaksColorsLabels } from './scales';
import ldnColors from '@ldn-viz/themes/styles/js/theme-tokens';


describe('getThresholdBreaksColorsLabels', () => {
  describe('scale type detection - positive', () => {
    it('should detect positive scale for [0, 100]', () => {
      const result = getThresholdBreaksColorsLabels({ extent: [0, 100] });
      expect(result.breaks).toBeDefined();
      expect(result.colors).toBeDefined();
      expect(result.labels).toBeDefined();

      // Positive scale should have all breaks >= 0
      result.breaks.forEach((b) => expect(b).toBeGreaterThanOrEqual(0));
    });

    it('should detect positive scale for [10, 50]', () => {
      const result = getThresholdBreaksColorsLabels({ extent: [10, 50] });

      // All breaks should be positive
      result.breaks.forEach((b) => expect(b).toBeGreaterThan(0));
    });

    it('should anchor positive scale to zero when anchorToZero=true', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [10, 50],
        anchorToZero: true
      });

      // With discreteZeroBin, first break should be the offset value
      expect(result.breaks[0]).toEqual(0.001);
    });

    it('should not anchor to zero when anchorToZero=false', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [10, 50],
        anchorToZero: false,
        discreteZeroBin: false
      });

      // No breaks should be near zero
      const hasNearZero = result.breaks.some((b) => b < 1);
      expect(hasNearZero).toBe(false);
    });
  });

  describe('scale type detection - negative', () => {
    it('should detect negative scale for [-100, 0]', () => {
      const result = getThresholdBreaksColorsLabels({ extent: [-100, 0] });
      // All breaks should be <= 0 or the offset value
      result.breaks.forEach((b) => expect(b).toBeLessThanOrEqual(-0.001));
    });

    it('should detect negative scale for [-50, -10]', () => {
      const result = getThresholdBreaksColorsLabels({ extent: [-50, -10] });
      // Most breaks should be negative
      const negativeBreaks = result.breaks.filter((b) => b < -1);
      expect(negativeBreaks.length).toBeGreaterThan(0);
    });

    it('should anchor negative scale to zero when anchorToZero=true', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [-50, -10],
        anchorToZero: true
      });

      // With discreteZeroBin, last break should be negative offset
      expect(result.breaks[result.breaks.length - 1]).toEqual(-0.001);
    });
  });

  describe('scale type detection - diverging', () => {
    it('should detect diverging scale for [-50, 50]', () => {
      const result = getThresholdBreaksColorsLabels({ extent: [-50, 50] });
      // Should have both negative and positive breaks
      const negBreaks = result.breaks.filter((b) => b < -0.001);
      const posBreaks = result.breaks.filter((b) => b > 0.001);
      expect(negBreaks.length).toBeGreaterThan(0);
      expect(posBreaks.length).toBeGreaterThan(0);
    });

    it('should handle balanced diverging scale [-100, 100]', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [-100, 100],
        breakCount: 5
      });
      // Should have roughly equal breaks on both sides
      const negBreaks = result.breaks.filter((b) => b < -0.001);
      const posBreaks = result.breaks.filter((b) => b > 0.001);

      // For balanced, counts should be similar
      expect(Math.abs(negBreaks.length - posBreaks.length)).toBeLessThanOrEqual(1);
    });

    it('should handle unbalanced diverging scale [-20, 80]', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [-20, 80],
        breakCount: 5
      });

      // Should have both neg and pos breaks, but more positive
      const negBreaks = result.breaks.filter((b) => b < -0.001);
      const posBreaks = result.breaks.filter((b) => b > 0.001);
      expect(negBreaks.length).toBeGreaterThan(0);
      expect(posBreaks.length).toBeGreaterThan(negBreaks.length);
    });

    it('should handle unbalanced diverging scale [-90, 10]', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [-90, 10],
        breakCount: 5
      });

      // Should have both neg and pos breaks, but more negative
      const negBreaks = result.breaks.filter((b) => b < -0.001);
      const posBreaks = result.breaks.filter((b) => b > 0.001);
      expect(posBreaks.length).toBeGreaterThan(0);
      expect(negBreaks.length).toBeGreaterThan(posBreaks.length);
    });
  });

  describe('break count variations', () => {
    it('should respect custom breakCount of 3', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [0, 100],
        breakCount: 3
      });

      // should have breakCount  breaks for positive
      expect(result.breaks.length).toEqual(3);
    });

    it('should respect custom breakCount of 7', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [0, 100],
        breakCount: 7
      });

      // Actual breaks may be breakCount - 1 due to binning algorithm
      expect(result.breaks.length).toBeGreaterThanOrEqual(7 - 1);
    });

    it('should respect custom breakCount of 10', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [0, 100],
        breakCount: 10
      });
      expect(result.breaks.length).toBeGreaterThanOrEqual(10);
    });

    it('should adjust breakCount for diverging scales', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [-50, 50],
        breakCount: 5
      });
      // Diverging scales get more breaks
      expect(result.breaks.length).toBeGreaterThan(5);
    });
  });

  describe('zero bin handling - discreteZeroBin', () => {
    it('should create discrete zero bin when discreteZeroBin=true (positive)', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [0, 100],
        discreteZeroBin: true
      });

      // Should have offset breaks around zero
      expect(result.breaks[0]).toEqual(0.001);
    });

    it('should not create discrete zero bin when discreteZeroBin=false (positive)', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [0, 100],
        discreteZeroBin: false
      });
      // Should not have 0.001 as first break
      expect(result.breaks[0]).toBeGreaterThan(1);
    });

    it('should create discrete zero bin for diverging when discreteZeroBin=true', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [-50, 50],
        discreteZeroBin: true
      });

      // Should have both -0.001 and 0.001 in breaks
      const hasNegOffset = result.breaks.some((b) => Math.abs(b + 0.001) < 0.0001);
      const hasPosOffset = result.breaks.some((b) => Math.abs(b - 0.001) < 0.0001);
      expect(hasNegOffset).toBe(true);
      expect(hasPosOffset).toBe(true);
    });

    it('should use custom offsetZeroVal', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [0, 100],
        discreteZeroBin: true,
        offsetZeroVal: 0.2
      });
      // First break should be at custom offset
      expect(result.breaks[0]).toEqual(0.2);
    });
  });

  describe('label generation - formatting', () => {
    it('should format labels with default format ".0f"', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [0, 100],
        labelFormat: '.0f'
      });
      // Labels should be integers
      result.labels.forEach((label) => {
        expect(typeof label).toBe('string');
      });
      // First label should be "0" for positive scale with discreteZeroBin
      expect(result.labels[0]).toBe('0');
    });

    it('should format labels with ".2f" format', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [0, 100],
        labelFormat: '.2f',
        breakCount: 3
      });
      // Some labels should contain '.'
      const hasDecimal = result.labels.some((label) => label.includes('.'));
      expect(hasDecimal).toBe(true);
    });

    it('should format labels with percentage ".0%"', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [0, 1],
        labelFormat: '.0%',
        breakCount: 3
      });

      // Some labels should contain %
      const hasPercent = result.labels.some((label) => label.includes('%'));
      expect(hasPercent).toBe(true);
    });

    it('should prepend custom string to values', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [0, 100],
        valuePrepend: '$',
        breakCount: 3
      });

      // All labels should contain $
      const withPrepend = result.labels.every((label) => label.includes('$'));
      expect(withPrepend).toBe(true);
    });

    it('should append custom string to values', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [0, 100],
        valueAppend: 'kg',
        breakCount: 3
      });

      // All labels should contain kg
      const withAppend = result.labels.every((label) => label.includes('kg'));
      expect(withAppend).toBe(true);
    });

    it('should use both prepend and append', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [0, 100],
        valuePrepend: '~',
        valueAppend: 'm',
        breakCount: 3
      });
      // Should contain both ~ and m in labels
      const hasCustom = result.labels.some((label) => label.includes('~') && label.includes('m'));
      expect(hasCustom).toBe(true);
    });
  });

  describe('label generation - edge cases', () => {
    it('should generate "0" label for zero bin in positive scale', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [0, 100],
        discreteZeroBin: true
      });
      expect(result.labels[0]).toBe('0');
    });

    it('should generate "0" label for zero bin in negative scale', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [-100, 0],
        discreteZeroBin: true,
        anchorToZero: true
      });
      expect(result.labels[result.labels.length - 1]).toBe('0');
    });

    it('should generate "0" label for zero bin in diverging scale', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [-50, 50],
        discreteZeroBin: true
      });
      // Middle label should be "0"
      const zeroLabel = result.labels.find((label) => label === '0');
      expect(zeroLabel).toBe('0');
    });

    it('should generate first label with "< " for positive scale', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [0, 100],
        discreteZeroBin: false
      });

      expect(result.labels[0]).toMatch(/^</);
    });

    it('should generate last label with "+" for positive scale', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [0, 100]
      });
      expect(result.labels[result.labels.length - 1]).toMatch(/\+$/);
    });

    it('should generate first label with "< " for diverging scale', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [-50, 50]
      });
      expect(result.labels[0]).toMatch(/^</);
    });

    it('should generate last label with "+" for diverging scale', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [-50, 50]
      });
      expect(result.labels[result.labels.length - 1]).toMatch(/\+$/);
    });

    it('should generate "a to b" labels for middle bins', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [0, 100],
        discreteZeroBin: false,
        breakCount: 5
      });

      // Middle labels should contain " to "
      const middleLabels = result.labels.slice(1, -1);
      middleLabels.forEach((label) => {
        expect(label).toContain(' to ');
      });
    });
  });

  describe('color generation - array structure', () => {
    it('should generate colors array matching labels length', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [0, 100]
      });
      expect(result.colors.length).toBe(result.labels.length);
    });

    it('should generate breaks array with length = colors.length - 1', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [0, 100]
      });
      expect(result.breaks.length).toBe(result.colors.length - 1);
    });

    it('should return valid color strings', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [0, 100]
      });
      result.colors.forEach((color) => {
        expect(typeof color).toBe('string');
        expect(color).toMatch(/^#[0-9a-f]{6}$/i);
      });
    });
  });

  describe('color generation - positive scale', () => {
    it('should use positive color ramp for positive scale', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [0, 100],
        breakCount: 5

      });
      // Should have multiple colors
      expect(result.colors.length).toBeGreaterThan(1);

      // All colors should be valid
      result.colors.forEach((color) => {
        expect(color).toMatch(/^#[0-9a-f]{6}$/i);
      });
    });

    it('should include neutral color when discreteZeroBin=true', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [0, 100],
        discreteZeroBin: true,
        colors: {
          pos: { low: '#0000ff', high: '#000099' },
          neg: { low: '#ff0000', high: '#990000' },
          neutral: '#cccccc'
        }
      });

      // First color should be the neutral color
      expect(result.colors[0]).toBe('#cccccc');
    });

    it('should use custom positive colors', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [0, 100],
        breakCount: 3,
        colors: {
          pos: { low: '#ffff00', high: '#ff0000' },
          neg: { low: '#00ff00', high: '#0000ff' },
          neutral: '#cccccc'
        }
      });

      // Colors should be from the custom ramp
      expect(result.colors.length).toBeGreaterThan(0);
      expect(result.colors[0]).toBe('#cccccc');
      expect(result.colors[1]).toBe('#ffff00');
      expect(result.colors[3]).toBe('#ff0000');


      // all color should be hex codes
      result.colors.forEach((color) => {
        expect(color).toMatch(/^#[0-9a-f]{6}$/i);
      });
    });
  });

  describe('color generation - negative scale', () => {
    it('should use negative color ramp for negative scale', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [-100, 0],
        breakCount: 5
      });


      const defaultColors = ldnColors.theme.light.color.palette;
      expect(result.colors.length).toBeGreaterThan(0);
      expect(result.colors[0]).toBe(defaultColors.red[800]);
      expect(result.colors[5]).toBe(defaultColors.grey[200]); // as 0
    });

    it('should use custom negative colors', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [-100, -10],
        breakCount: 3,
        colors: {
          pos: { low: '#ffff00', high: '#ff0000' },
          neg: { low: '#00ff00', high: '#0000ff' },
          neutral: '#cccccc'
        }
      });
      expect(result.colors.length).toBeGreaterThan(0);

      expect(result.colors.length).toBeGreaterThan(0);
      expect(result.colors[0]).toBe('#0000ff');
      expect(result.colors[2]).toBe('#cccccc'); // TODO: is this right? should the scale end at neutral or negative.low?
    });
  });

  describe('color generation - diverging scale', () => {
    it('should use both neg and pos color ramps for diverging scale', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [-50, 50],
        discreteZeroBin: false,
        colors: {
          pos: { low: '#0000ff', high: '#000099' },
          neg: { low: '#ff0000', high: '#990000' },
          neutral: '#888888'
        }
      });

      expect(result.colors[4]).toEqual('#ff0000'); // neg.low
      expect(result.colors[5]).toEqual('#0000ff'); // pos.low
      expect(result.colors[10]).toEqual('#000099'); // pos.high

      // Neutral color should not be somewhere in the array
      expect(result.colors.includes('#888888')).toBe(false);


      // Should have colors from both ramps plus neutral
      expect(result.colors.length).toBeGreaterThan(3);
      result.colors.forEach((color) => {
        expect(color).toMatch(/^#[0-9a-f]{6}$/i);
      });
    });

    it('should include neutral color in middle when discreteZeroBin=true', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [-50, 50],
        discreteZeroBin: true,
        colors: {
          pos: { low: '#0000ff', high: '#000099' },
          neg: { low: '#ff0000', high: '#990000' },
          neutral: '#888888'
        }
      });

      expect(result.colors[4]).toEqual('#ff0000'); // neg.low
      expect(result.colors[5]).toEqual('#888888'); // neutral
      expect(result.colors[6]).toEqual('#0000ff'); // pos.low
      expect(result.colors[11]).toEqual('#000099'); // pos.high

      // Neutral color should be somewhere in the array
      expect(result.colors).toContain('#888888');
    });

    it('should output different colors depending on whether even=true', () => {
      const evenResult = getThresholdBreaksColorsLabels({
        extent: [-50, 50],
        even: true
      });
      const nonEvenResult = getThresholdBreaksColorsLabels({
        extent: [-50, 50],
        even: false
      });

      // Both should have valid colors
      expect(evenResult.colors.length).toBeGreaterThan(0);
      expect(nonEvenResult.colors.length).toBeGreaterThan(0);

      // At least some colors should be different
      let differentCount = 0;
      const minLength = Math.min(evenResult.colors.length, nonEvenResult.colors.length);
      for (let i = 0; i < minLength; i++) {
        if (evenResult.colors[i] !== nonEvenResult.colors[i]) {
          differentCount++;
        }
      }
      expect(differentCount).toBeGreaterThan(0);
    });
  });

  describe('edge cases and error handling', () => {
    it('should handle reversed extent [100, 0]', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [100, 0],
        breakCount: 5
      });

      // Should still work (d3.extent will sort it)
      expect(result.breaks.length).toBeGreaterThan(0);
      expect(result.colors.length).toBe(result.labels.length);
    });

    it('should handle negative reversed extent [0, -100]', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [0, -100],
        breakCount: 5
      });
      expect(result.breaks.length).toBeGreaterThan(0);
      expect(result.colors.length).toBe(result.labels.length);
    });

    it('should handle very small breakCount', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [0, 100],
        breakCount: 1
      });
      expect(result.breaks.length).toBeGreaterThanOrEqual(0);
      expect(result.colors.length).toBeGreaterThan(0);
    });

    it('should handle zero extent [0, 0] (e.g., single-value dataset)', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [0, 0],
        breakCount: 5
      });
      expect(result.breaks.length).toBeGreaterThanOrEqual(0);
      expect(result.colors.length).toBeGreaterThan(0);
      expect(result.labels.length).toBeGreaterThan(0);
    });

    it('should handle extremely wide domain [-1e10, 1e10]', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [-1e10, 1e10],
        breakCount: 5,
        labelFormat: '.2s'
      });

      expect(result.breaks.length).toBeGreaterThan(0);
      expect(result.colors.length).toBe(result.labels.length);
    });
  });

  describe('consistency checks', () => {
    it('should always have colors.length === labels.length', () => {
      const testCases = [
        { extent: [0, 100] },
        { extent: [-100, 0] },
        { extent: [-50, 50] },
        { extent: [0, 100], breakCount: 3 },
        { extent: [0, 100], breakCount: 10 },
        { extent: [-50, 50], discreteZeroBin: false }
      ];

      testCases.forEach((config) => {
        const result = getThresholdBreaksColorsLabels(config);
        expect(result.colors.length).toBe(result.labels.length);
      });
    });

    it('should always have breaks.length === colors.length - 1', () => {
      const testCases = [
        { extent: [0, 100] },
        { extent: [-100, 0] },
        { extent: [-50, 50] },
        { extent: [0, 100], breakCount: 3 },
        { extent: [0, 100], breakCount: 10 }
      ];

      testCases.forEach((config) => {
        const result = getThresholdBreaksColorsLabels(config);
        expect(result.breaks.length).toBe(result.colors.length - 1);
      });
    });

    it('should have breaks in ascending order', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [-50, 50],
        breakCount: 5
      });
      for (let i = 1; i < result.breaks.length; i++) {
        expect(result.breaks[i]).toBeGreaterThan(result.breaks[i - 1]);
      }
    });

    it('should generate non-empty labels', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [0, 100],
        breakCount: 5
      });
      result.labels.forEach((label) => {
        expect(label.length).toBeGreaterThan(0);
      });
    });

    it('should generate valid hex colors', () => {
      const result = getThresholdBreaksColorsLabels({
        extent: [-50, 50],
        breakCount: 5
      });
      result.colors.forEach((color) => {
        expect(color).toMatch(/^#[0-9a-f]{6}$/i);
      });
    });
  });
});


