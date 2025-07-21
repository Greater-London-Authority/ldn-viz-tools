import { getContext, setContext } from 'svelte';

export class RadioButtonSolidState {
	selectedId = $state('');

	update = (val: string) => {
		this.selectedId = val;
	};
}

const RADIO_BUTTON_KEY = Symbol('RADIO');

export const setRadioButtonSolidState = () => {
	return setContext(RADIO_BUTTON_KEY, new RadioButtonSolidState());
};

export const getRadioButtonSolidState = () => {
	return getContext(RADIO_BUTTON_KEY);
};
