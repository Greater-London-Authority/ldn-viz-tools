import { describe, it, expect } from 'vitest';
import { colorWithBestContrast } from './colorWithBestContrast';
import colors from '@ldn-viz/themes/styles/js/theme-tokens';

describe('colorWithBestContrast', () => {
  describe('black and white contrasts', () => {
    it('chooses black rather than white for white background, regardless of order of choices', () => {
      expect(colorWithBestContrast('#FFFFFF', '#FFFFFF', '#000000')).toBe('#000000');
      expect(colorWithBestContrast('#FFFFFF', '#000000', '#FFFFFF')).toBe('#000000');
    });

    it('chooses white rather than black for black background, regardless of order of choices', () => {
      expect(colorWithBestContrast('#000000', '#FFFFFF', '#000000')).toBe('#FFFFFF');
      expect(colorWithBestContrast('#000000', '#000000', '#FFFFFF')).toBe('#FFFFFF');
    });
  });


  describe('primary color backgrounds', () => {
    it('chooses white for red background', () => {
      expect(colorWithBestContrast('#FF0000', '#FFFFFF', '#000000')).toBe('#FFFFFF');
    });

    it('chooses white for blue background', () => {
      expect(colorWithBestContrast('#0000FF', '#FFFFFF', '#000000')).toBe('#FFFFFF');
    });

    it('chooses white for green background', () => {
      expect(colorWithBestContrast('#00FF00', '#FFFFFF', '#000000')).toBe('#000000');
    });
  });

  describe('background colors from data theme tokens', () => {
    it('chooses white rather than black for primary background', () => {
      expect(
        colorWithBestContrast(colors.theme.light.color.data.primary, '#FFFFFF', '#000000')
      ).toBe('#FFFFFF');
    });


    it('chooses white rather than black for secondary background', () => {
      expect(
        colorWithBestContrast(colors.theme.light.color.data.secondary, '#FFFFFF', '#000000')
      ).toBe('#FFFFFF');
    });

    it('chooses white rather than black for tertiary background', () => {
      expect(
        colorWithBestContrast(colors.theme.light.color.data.tertiary, '#FFFFFF', '#000000')
      ).toBe('#FFFFFF');
    });

    it('chooses white rather than black for positive background', () => {
      expect(
        colorWithBestContrast(colors.theme.light.color.data.positive, '#FFFFFF', '#000000')
      ).toBe('#FFFFFF');
    });
    it('chooses white rather than black for negative background', () => {
      expect(
        colorWithBestContrast(colors.theme.light.color.data.negative, '#FFFFFF', '#000000')
      ).toBe('#FFFFFF');
    });


    it('chooses white rather than black for male background', () => {
      expect(
        colorWithBestContrast(colors.theme.light.color.data.male, '#FFFFFF', '#000000')
      ).toBe('#FFFFFF');
    });

    it('chooses white rather than black for female background', () => {
      expect(
        colorWithBestContrast(colors.theme.light.color.data.female, '#FFFFFF', '#000000')
      ).toBe('#FFFFFF');
    });


    it('chooses black rather than black for empty background', () => {
      expect(
        colorWithBestContrast(colors.theme.light.color.data.empty, '#FFFFFF', '#000000')
      ).toBe('#000000');
    });

    it('chooses black rather than white for yellow background', () => {
      expect(
        colorWithBestContrast(
          colors.theme.light.color.data.categorical.yellow,
          '#FFFFFF',
          '#000000'
        )
      ).toBe('#000000');
    });
  });


  describe('color format support', () => {
    it('handles RGB format for background', () => {
      expect(colorWithBestContrast('rgb(255, 255, 255)', '#FFFFFF', '#000000')).toBe('#000000');
    });

    it('handles RGB format for text colors', () => {
      expect(colorWithBestContrast('#FFFFFF', 'rgb(255, 255, 255)', 'rgb(0, 0, 0)')).toBe(
        'rgb(0, 0, 0)'
      );
    });

    it('handles named CSS colors', () => {
      expect(colorWithBestContrast('white', 'white', 'black')).toBe('black');
      expect(colorWithBestContrast('black', 'white', 'black')).toBe('white');
    });

    it('handles short hex notation', () => {
      expect(colorWithBestContrast('#FFF', '#FFF', '#000')).toBe('#000');
      expect(colorWithBestContrast('#000', '#FFF', '#000')).toBe('#FFF');
    });

    it('handles HSL format', () => {
      expect(colorWithBestContrast('hsl(0, 0%, 100%)', '#FFFFFF', '#000000')).toBe('#000000');
      expect(colorWithBestContrast('hsl(0, 0%, 0%)', '#FFFFFF', '#000000')).toBe('#FFFFFF');
    });

    it('handles lowercase hex colors', () => {
      expect(colorWithBestContrast('#ffffff', '#ffffff', '#000000')).toBe('#000000');
    });

    it('handles mixed case hex colors', () => {
      expect(colorWithBestContrast('#FfFfFf', '#FFFFFF', '#000000')).toBe('#000000');
    });
  });


  describe('non-black/white text color choices', () => {
    it('chooses higher contrast color from two colored options on white', () => {
      const result = colorWithBestContrast('#FFFFFF', '#AAAAAA', '#333333');
      expect(result).toBe('#333333');
    });

    it('chooses higher contrast color from two colored options on black', () => {
      const result = colorWithBestContrast('#000000', '#666666', '#CCCCCC');
      expect(result).toBe('#CCCCCC');
    });

    it('chooses dark blue over light blue on white background', () => {
      const result = colorWithBestContrast('#FFFFFF', '#ADD8E6', '#00008B');
      expect(result).toBe('#00008B');
    });

    it('chooses light blue over dark blue on dark background', () => {
      const result = colorWithBestContrast('#222222', '#ADD8E6', '#00008B');
      expect(result).toBe('#ADD8E6');
    });
  });

  describe('edge cases', () => {
    it('handles identical background and text color options', () => {
      const result = colorWithBestContrast('#888888', '#888888', '#000000');
      expect(result).toBe('#000000');
    });

    it('handles all three colors being the same', () => {
      const result = colorWithBestContrast('#888888', '#888888', '#888888');
      expect(result).toBe('#888888');
    });

    it('handles very similar colors', () => {
      const result = colorWithBestContrast('#FEFEFE', '#FFFFFF', '#000000');
      expect(result).toBe('#000000');
    });
  });

});
