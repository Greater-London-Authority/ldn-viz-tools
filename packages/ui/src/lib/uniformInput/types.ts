export interface InputOption {
	value: string;
	label: string;
	hint?: string;
	hintLabel?: string;
}

export interface UniformInputProps {
	type: string;
	name?: string;
	required?: boolean;
	disabled?: boolean;
	id?: string;
	label?: string;
	description?: string;
	placeholder?: string;
	color?: string;
	rows?: number | string;
	options?: InputOption[];
	value?: unknown;
	error?: string;
}
