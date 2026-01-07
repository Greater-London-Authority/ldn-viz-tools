import { writable, type Writable } from 'svelte/store';
import { randomId } from '../utils/randomId';
import type { ToastMessage, ToastMessageOptions } from './types';
import { ToastType } from './types';

const DEFAULT_TIME_TO_LIVE = 5000;
const MAX_MESSAGES = 3;

export const messages: Writable<ToastMessage[]> = writable([]);

// newToastMessage creates a storable message that can be posted or refreshed
// by the user dev using the ToastMessage.post function.
//
// Often there is no need to store and reuse a toast. You can simple fire and
// forget: newToastMessage("This is a notice!").post().
export const newToastMessage = (text: string, options: ToastMessageOptions = {}) => {
	const id = options.id ? options.id : randomId();
	const type = options.type ? options.type : ToastType.Notice;
	const timeToLive = options.timeToLive ? options.timeToLive : DEFAULT_TIME_TO_LIVE;

	const msg: ToastMessage = {
		text: text,
		id: id,
		type: type,
		closeButton: !!options.closeButton,
		post: () => {},
		remove: () => {}
	};

	msg.post = () => {
		removeMessage(msg);
		postMessage(msg, timeToLive);
	};

	msg.remove = () => {
		removeMessage(msg);
	};

	return msg;
};

const postMessage = (msg: ToastMessage, timeToLive = 0) => {
	clearTimeout(msg.postId);
	showMessage(msg);

	if (timeToLive > 0) {
		msg.postId = setTimeout(msg.remove, timeToLive);
	}
};

const showMessage = (msg: ToastMessage) => {
	messages.update((msgList) => {
		return [msg, ...msgList].slice(0, MAX_MESSAGES);
	});
};

const removeMessage = (msg: ToastMessage) => {
	messages.update((msgList) => {
		return msgList.filter((m) => m.id !== msg.id);
	});
};
