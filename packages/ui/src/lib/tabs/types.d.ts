import type { IconSource } from '@steeze-ui/heroicons';

export interface Tab {
	id: string;
	label: string;
	icon?: IconSource;
	rawIcon?: ComponentType;
	content: ComponentType;
}
