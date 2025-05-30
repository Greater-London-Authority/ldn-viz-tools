import type { Snippet } from 'svelte';
import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

type ButtonAsButton = Omit<HTMLButtonAttributes, 'href' | 'type'> & {
	href?: never;
	type?: HTMLButtonAttributes['type'];
	disabled?: HTMLButtonAttributes['disabled'];
};

type ButtonAsLink = Omit<HTMLAnchorAttributes, 'href' | 'type'> & {
	href: HTMLAnchorAttributes['href'];
	type?: never;
	disabled?: HTMLButtonAttributes['disabled'];
};

export type ButtonProps = (ButtonAsButton | ButtonAsLink) & {
	variant?: 'brand' | 'square' | 'solid' | 'outline' | 'text';
	emphasis?: 'primary' | 'secondary' | 'caution' | 'positive' | 'negative';
	size?: 'xs' | 'sm' | 'md' | 'lg';
	title?: string;
	slim?: boolean;
	class?: string;
	fullWidth?: boolean;
	ref?: HTMLElement | null;
	children?: Snippet;
};
