import type { IconSource } from '@steeze-ui/heroicons';
import type { Component } from 'svelte';

export interface Tab {
	id: string;
	label: string;
	icon?: IconSource;
	rawIcon?: Component;
	content: Component;
}
