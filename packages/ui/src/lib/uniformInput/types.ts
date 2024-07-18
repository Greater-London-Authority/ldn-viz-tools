export interface InputOption {
	value: ValueType;
	label: string;
}

export interface UniformInputProps {
	type: string;
	name: string;
	required?: boolean;
	disabled?: boolean;
	id?: string;
	label?: string;
	description?: string;
	placeholder?: string;
	rows?: number | string;
	options?: InputOption[];
	value?: unknown;
	error?: string;
}
