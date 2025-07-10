import type { Snippet } from 'svelte';
import type { ChangeEventHandler } from 'svelte/elements';

export interface InputProps {
	label?: string;
	id?: string;
	descriptionId?: string;
	description?: string;
	descriptionAlignment?: 'left' | 'right';
	hint?: string;
	hintLabel?: string;
	errorId?: string;
	error?: string;
	disabled?: boolean;
	optional?: boolean;
	customOverlay?: Snippet;
	children?: Snippet;
	onchange?: ChangeEventHandler<HTMLInputElement>;
}
