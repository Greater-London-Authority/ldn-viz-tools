import type { Component } from 'svelte';
import type { ColSpec, ResolvedColSpec } from './types';
import { renderer, axisRenderer } from '../renderers';

type RendererMap = Record<string, Component>;

const rendererMap: RendererMap = renderer as unknown as RendererMap;
const axisRendererMap: RendererMap = axisRenderer as unknown as RendererMap;

/**
 * Resolves a renderer name to its component
 * Returns the input if it's already a component, or looks up by name.
 */
export function resolveRenderer(
	nameOrComponent: string | Component | undefined
): Component | undefined {
	if (!nameOrComponent) {
		return undefined;
	}

	if (typeof nameOrComponent === 'string') {
		const resolved = rendererMap[nameOrComponent];
		if (!resolved) {
			console.warn(`Unknown renderer: ${nameOrComponent}`);
		}
		return resolved;
	}

	return nameOrComponent;
}

/**
 * Resolves an axis renderer name to its component.
 */
export function resolveAxisRenderer(
	nameOrComponent: string | Component | undefined
): Component | undefined {
	if (!nameOrComponent) {
		return undefined;
	}

	if (typeof nameOrComponent === 'string') {
		const resolved = axisRendererMap[nameOrComponent];
		if (!resolved) {
			console.warn(`Unknown axis renderer: ${nameOrComponent}`);
		}
		return resolved;
	}

	return nameOrComponent;
}

/**
 * Resolves all renderer strings in a column spec to their components.
 * Returns an object that delegates property access to the source column
 * for mutable properties like computedWidth, while providing resolved renderers.
 */
export function resolveColumnRenderers(col: ColSpec): ResolvedColSpec {
	const resolvedCell = col.cell
		? {
				...col.cell,
				renderer: resolveRenderer(col.cell.renderer),
				axisRenderer: resolveAxisRenderer(col.cell.axisRenderer)
			}
		: undefined;

	const resolvedGroup = col.group
		? {
				...col.group,
				renderer: resolveRenderer(col.group.renderer)
			}
		: undefined;

	const resolvedColumn = col.column
		? {
				...col.column,
				renderer: resolveRenderer(col.column.renderer)
			}
		: undefined;

	const resolvedHeader = col.header
		? {
				...col.header,
				renderer: resolveRenderer(col.header.renderer)
			}
		: undefined;

	return {
		// Static properties (copied at resolution time)
		label: col.label,
		short_label: col.short_label,
		type: col.type,
		allowGrouping: col.allowGrouping,
		sortable: col.sortable,
		alignHeader: col.alignHeader,
		superscriptText: col.superscriptText,
		hintText: col.hintText,
		hintComponent: col.hintComponent,
		hintType: col.hintType,
		groups: col.groups,
		width: col.width,
		relativeWidth: col.relativeWidth,
		href: col.href,

		// Mutable property - delegate to source via getter
		get computedWidth() {
			return col.computedWidth;
		},

		// Resolved renderers
		cell: resolvedCell,
		group: resolvedGroup,
		column: resolvedColumn,
		header: resolvedHeader
	};
}

/**
 * Resolves all renderers in a list of column specs
 * Returns a new array - does NOT mutate the input
 */
export function resolveAllColumnRenderers(columns: ColSpec[]): ResolvedColSpec[] {
	return columns.map(resolveColumnRenderers);
}
