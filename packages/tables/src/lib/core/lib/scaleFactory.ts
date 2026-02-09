import { extent } from 'd3-array';
import { scaleBand, scaleOrdinal, scaleThreshold } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { getThresholdBreaksColorsLabels } from '@ldn-viz/utils';
import type {
	ColSpec,
	ColorScale,
	ColorScaleFn,
	ColorScaleMap,
	DataRow,
	PositionScaleMap
} from './types';

/**
 * Creates a categorical color scale for discrete string values
 */
export function createCategoricalColorScale(values: string[]) {
	return scaleOrdinal(schemeCategory10).domain(values);
}

export type DomainType = 'ZeroToMax' | 'MinToMax' | [number, number];

/**
 * Creates a continuous color scale for numeric values
 */
export function createContinuousColorScale(
	domainType: DomainType,
	columnValues: number[]
): (value: number) => string {
	let domain: [number, number];
	const [minVal, maxVal] = extent(columnValues) as [number, number];

	if (domainType === 'ZeroToMax') {
		domain = [0, maxVal];
	} else if (domainType === 'MinToMax') {
		domain = [minVal, maxVal];
	} else {
		domain = domainType;
	}

	const colorScale = getThresholdBreaksColorsLabels({
		extent: domain,
		breakCount: 10,
		anchorToZero: false,
		discreteZeroBin: false
	}) as unknown as ColorScale;

	return scaleThreshold<number, string>().domain(colorScale.breaks).range(colorScale.colors);
}

/**
 * Creates all color scales for the given columns based on data values
 *
 * @param data - The data rows
 * @param columns - Column specifications
 * @returns Map of column name to color scale function
 */
export function createColorScales(data: DataRow[], columns: ColSpec[]): ColorScaleMap {
	const scales = new Map<string, ColorScaleFn>();

	if (!columns || data.length === 0) {
		return scales;
	}

	for (const colSpec of columns) {
		const fieldName = colSpec.short_label;
		const values = data.map((d) => d[fieldName]).filter((d) => d != null);

		if (values.length === 0) {
			// No valid values - provide a fallback scale
			scales.set(fieldName, () => 'lightgrey');
			continue;
		}

		const firstValue = values[0];

		if (typeof firstValue === 'string') {
			const uniqueValues = [...new Set(values as string[])];
			const baseScale = createCategoricalColorScale(uniqueValues);
			scales.set(fieldName, (val: unknown) => (val == null ? 'lightgrey' : baseScale(String(val))));
		} else if (typeof firstValue === 'number') {
			const baseScale = createContinuousColorScale('MinToMax', values as number[]);
			scales.set(fieldName, (val: unknown) =>
				val == null ? 'lightgrey' : baseScale(val as number)
			);
		} else if (firstValue instanceof Date) {
			// TODO: Implement date color scales
			scales.set(fieldName, () => 'lightgrey');
		} else {
			// Unknown type - fallback
			scales.set(fieldName, () => 'lightgrey');
		}
	}

	return scales;
}

/**
 * Creates position scales for categorical columns
 *
 * @param data - The data rows
 * @param columns - Column specifications
 * @returns Map of column name to position scale
 */
export function createPositionScales(data: DataRow[], columns: ColSpec[]): PositionScaleMap {
	const scales = new Map<string, ReturnType<typeof scaleBand<string>>>();

	if (!columns || data.length === 0) {
		return scales;
	}

	for (const colSpec of columns) {
		if (colSpec.type !== 'categorical') {
			continue;
		}

		const fieldName = colSpec.short_label;
		const values = data.map((d) => d[fieldName]).filter((d) => d != null);
		const uniqueValues = [...new Set(values)].sort().map(String);

		scales.set(fieldName, scaleBand<string>().range([0, 1]).domain(uniqueValues));
	}

	return scales;
}
