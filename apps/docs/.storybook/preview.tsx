import { Controls, Description, Primary, Stories, Subtitle, Title } from '@storybook/blocks';
import type { Preview } from '@storybook/svelte';
import React from 'react';

import '../src/app.postcss';

const preview: Preview = {
	parameters: {
		layout: 'centered',
		docs: {
			toc: true,
			page: () => (
				<>
					<Title />
					<Subtitle />
					<Description />
					<Primary />
					<Controls />
					<Stories includePrimary={false} />
				</>
			)
		},
		backgrounds: { disable: true },
		actions: { argTypesRegex: '^on[A-Z].*' },
		options: {
			showPanel: false
		},
		controls: {
			expanded: true,
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		},
		darkMode: {
			classTarget: 'html',
			stylePreview: true,
			appContentBg: 'black'
		}
	}
};

export default preview;
