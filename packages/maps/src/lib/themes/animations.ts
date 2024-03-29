import { type AnimationOptions, type FlyOptions } from 'maplibre-gl';

// https://easings.net/
export const easeOutQuad = (t) => 1 - (1 - t) * (1 - t);
export const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

export const ZOOM_ANIMATION_OPTIONS: AnimationOptions = {
	animate: true,
	duration: 1000,
	easing: easeOutQuart,
	freezeElevation: true
};

export const GLIDE_ANIMATION_OPTIONS: FlyOptions = {
	animate: true,
	duration: 1000,
	easing: easeOutQuad
	// TODO: Play around with:
	// - curve
	// - screenSpeed (& maxDuration)
	// - speed (& maxDuration)
};

export const FLY_ANIMATION_OPTIONS: FlyOptions = {
	animate: true,
	duration: 300,
	easing: easeOutQuad
};
