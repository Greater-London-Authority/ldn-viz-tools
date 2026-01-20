import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';

import ChartContainer from './ChartContainer.svelte';

describe('ChartContainer', () => {
  it('should render title when provided', async () => {
    const { container } = render(ChartContainer, {
      props: { title: 'Test Chart' }
    });

    const captureElement = container.querySelector('#captureElement');
    expect(captureElement).toBeTruthy();
    expect(captureElement.textContent).toContain('Test Chart');
  });

  it('should render subtitle when provided', async () => {
    const { container } = render(ChartContainer, {
      props: { title: 'Chart', subTitle: 'Subtitle' }
    });

    const captureElement = container.querySelector('#captureElement');
    expect(captureElement).toBeTruthy();
    expect(captureElement.textContent).toContain('Subtitle');
  });

  it('should render source when provided', async () => {
    const { container } = render(ChartContainer, {
      props: { source: 'Some data source' }
    });
    const captureElement = container.querySelector('#captureElement');
    expect(captureElement).toBeTruthy();
    expect(captureElement.textContent).toContain('Some data source');
  });


  it('should render byline when provided', async () => {
    const { container } = render(ChartContainer, {
      props: { byline: 'A byline' }
    });

    const captureElement = container.querySelector('#captureElement');
    expect(captureElement).toBeTruthy();
    expect(captureElement.textContent).toContain('A byline');
  });

  it('should set alt-test', async () => {
    const { container } = render(ChartContainer, {
      props: { alt: 'Alt-text for the chart....' }
    });

    const altElement = container.querySelector('.sr-only');
    expect(altElement).toBeTruthy();
    expect(altElement.textContent).toContain('Alt-text for the chart....');
  });



  it('should show export buttons when showExport is true', async () => {
    const { container } = render(ChartContainer, {
      props: { imageDownloadButton: true }
    });

    const captureElement = container.querySelector('#captureElement');
    expect(captureElement).toBeTruthy();
    expect(captureElement.textContent).toContain('Download as');
  });

  it('should hide export buttons when showExport is false', async () => {
    const { container } = render(ChartContainer, {
      props: { imageDownloadButton: false }
    });

    const captureElement = container.querySelector('#captureElement');
    expect(captureElement).toBeTruthy();
    expect(captureElement.textContent).not.toContain('Download as');
  });
});