import type { IconSource } from '@steeze-ui/heroicons';
import { type ComponentType } from 'svelte';

export interface Tab extends HTMLElement {
	id: string;
	label: string;
	icon?: IconSource;
	rawIcon?: ComponentType;
	content: ComponentType;
}
