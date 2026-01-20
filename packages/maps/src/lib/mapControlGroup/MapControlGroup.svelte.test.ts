import { describe, test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from '@vitest/browser/context';
import MapControlGroup from './MapControlGroup.svelte';
import { createRawSnippet } from 'svelte';


// N.B. could test positioning based on which classes are applied, but this feels brittle


describe('MapControlGroup', () => {

  describe('Rendering children', () => {
    test('renders child', async () => {
      const children = createRawSnippet(() => ({
        render: () => '<span data-testid="test-child"">Child Content</span>',
        setup: () => {
        }
      }));

      render(MapControlGroup, {
        props: {
          children: children
        }
      });

      const child = page.getByTestId('test-child');
      await expect.element(child).toBeInTheDocument();
      await expect.element(child).toHaveTextContent('Child Content');
    });

    test('renders when children is undefined', async () => {
      const { container } = render(MapControlGroup, {
        props: {}
      });

      const group = container.querySelector('div');
      expect(group).toBeTruthy();

      // Should render empty but valid container
      expect(group?.textContent?.trim()).toBe('');
    });
  });


  describe('Custom classes', () => {
    test('applies custom classes', async () => {
      const { container } = render(MapControlGroup, {
        props: {
          classes: 'custom-class-1 custom-class-2',
          children: () => 'Test'
        }
      });

      const group = container.querySelector('div');
      expect(group?.className).toContain('custom-class-1');
      expect(group?.className).toContain('custom-class-2');
    });

    test('combines custom classes with position classes', async () => {
      const { container } = render(MapControlGroup, {
        props: {
          position: 'TopRight',
          classes: 'my-custom-class',
          children: () => 'Test'
        }
      });

      const group = container.querySelector('div');
      // Should have both position classes and custom class
      expect(group?.className).toContain('top-6');
      expect(group?.className).toContain('right-6');
      expect(group?.className).toContain('my-custom-class');
    });

    test('handles empty classes prop', async () => {
      const { container } = render(MapControlGroup, {
        props: {
          classes: '',
          children: () => 'Test'
        }
      });

      const group = container.querySelector('div');
      expect(group).toBeTruthy();
      // Should still have default classes
      expect(group?.className).toContain('absolute');
    });
  });
});
