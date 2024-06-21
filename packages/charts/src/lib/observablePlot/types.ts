import type { RenderFunction } from '@observablehq/plot';

export interface Position {
	index: number;
	x: number;
	y: number;
	clientX: number;
	clientY: number;
	pageX: number;
	pageY: number;
	layerX: number;
	layerY: number;
}

interface PositionStore {
	set: (data: Position | undefined) => void;
}

export type AddClickFunction = (
	posStore: PositionStore,
	markShape?: string
) => (
	index: number[],
	scales: any,
	values: any,
	dimensions: any,
	context: any,
	next: RenderFunction | undefined
) => SVGElement | null;
