import { describe, test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import MapControlGroup, { MapControlGroupPositions } from './MapControlGroup.svelte';

const positionClasses: Record<keyof typeof MapControlGroupPositions, string> = {
	TopLeft: 'top-6 left-6',
	TopCenter: 'top-6 left-1/2 -translate-x-1/2 transform items-center',
	TopRight: 'top-6 right-6 items-end',
	TopRightOffset: 'top-16 right-6 items-end',
	CenterRight: 'top-1/2 -translate-y-1/2 right-6 transform items-end',
	BottomRight: 'bottom-11 right-6 items-end',
	BottomCenter: 'bottom-11 left-1/2 -translate-x-1/2 transform items-center',
	BottomLeft: 'bottom-11 left-6',
	CenterLeft: 'top-1/2 -translate-y-1/2 left-6 transform'
};

describe('MapControlGroup', () => {
	test.each(Object.keys(MapControlGroupPositions) as Array<keyof typeof MapControlGroupPositions>)(
		'renders the Tailwind position classes for position=%s',
		(position) => {
			const { container } = render(MapControlGroup, { props: { position } });

			const div = container.querySelector('div');
			expect(div).toBeTruthy();

			for (const cls of positionClasses[position].split(' ')) {
				expect(div!.className).toContain(cls);
			}
		}
	);

	test('appends a custom `classes` prop alongside the position classes', () => {
		const { container } = render(MapControlGroup, {
			props: { position: 'TopLeft', classes: 'my-custom-class' }
		});

		const div = container.querySelector('div');
		expect(div).toBeTruthy();
		expect(div!.className).toContain('my-custom-class');
		for (const cls of positionClasses.TopLeft.split(' ')) {
			expect(div!.className).toContain(cls);
		}
	});
});
