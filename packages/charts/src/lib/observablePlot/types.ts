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
	eventName: any,
	eventHandler: any,
	markShape?: string
) => (index: any, scales: any, values: any, dimensions: any, context: any, next: any) => any;

export type AddEventHandlerInnerFunction = (
	eventName: any,
	eventHandler: any,
	marks: any,
	values: any,
	index: any
) => void;

export type RegisterTooltipFunction = (
	posStore: any,
	markShape?: string
) => (index: any, scales: any, values: any, dimensions: any, context: any, next: any) => any;

export type EventHandler = any;
