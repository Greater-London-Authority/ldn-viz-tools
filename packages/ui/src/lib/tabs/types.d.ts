import type { IconSource } from '@steeze-ui/heroicons';
import { type ComponentType } from 'svelte';

export interface Tab {
	id: string;
	label: string;
	icon?: IconSource;
	rawIcon?: ComponentType;
	content: ComponentType;
}
