import penguinCSV from '@observablehq/sample-datasets/penguins.csv?raw';
import { csvParse } from 'd3-dsv';

export const penguins = csvParse(penguinCSV);

export const randomVals = [...Array(1000)].map(() => ({ x: Math.random() }));

export * from './yearlyData';
export * from './monthlyData';
