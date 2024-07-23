import { extent } from 'd3-array';
import { scaleOrdinal, scaleThreshold } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';

import { getThresholdBreaksColorsLabels } from '@ldn-viz/utils';
import type { ColorScale } from './types';

export const getCategoricalColorScale = (values) => {
	return scaleOrdinal(schemeCategory10).domain(values);
};

export const getContinuousColorScale = (
	columnName: string,
	domainType: string,
	columnValues: number[]
) => {
	let domain: Iterable<any>;
	if (domainType === 'ZeroToMax') {
		domain = [0, extent(columnValues)[1]];
	} else if (domainType === 'MinToMax') {
		domain = extent(columnValues);
	} else {
		domain = domainType as [number, number];
	}

	const colorScale = getThresholdBreaksColorsLabels({
		extent: extent(domain) as number[],
		breakCount: 10,
		anchorToZero: false,
		discreteZeroBin: false
	}) as unknown as ColorScale;

	return scaleThreshold<string | number, string>()
		.domain(colorScale.breaks)
		.range(colorScale.colors);
};
