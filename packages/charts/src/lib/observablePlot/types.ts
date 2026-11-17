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

export type AddEventHandlerFunction = (
	eventName: string,
	eventHandler: EventHandler,
	markShape?: string
) => (
	index: number[],
	scales: any,
	values: any,
	dimensions: any,
	context: any,
	next: RenderFunction | undefined
) => SVGElement | null;

export type AddEventHandlerInnerFunction = (
	eventName: string,
	eventHandler: EventHandler,
	marks: ArrayLike<Element>,
	values: any,
	index: number[]
) => void;

export type RegisterTooltipFunction = (
	posStore: any,
	markShape?: string
) => (
	index: number[],
	scales: any,
	values: any,
	dimensions: any,
	context: any,
	next: RenderFunction | undefined
) => SVGElement | null;

export type EventHandler = any;
