import { writable, type Writable } from 'svelte/store';
import type { ToastMessage, ToastMessageOptions } from './types';
import { ToastType } from './types';

const DEFAULT_TIME_TO_LIVE = 4000;
const MAX_MESSAGES = 3;

export const messages: Writable<ToastMessage[]> = writable([]);

// newToastMessage creates a storable message that can be posted or refreshed
// by the user dev using the ToastMessage.post function.
//
// E.g. when a user tries to advance to the next form page but the current
// form page contains errors, spamming the next button should only refresh the
// existing error message and not create a long list of duplicate messages.
export const newToastMessage = (text: string, options: ToastMessageOptions = {}) => {
	const id = options.id ? options.id : crypto.randomUUID();
	const type = options.type ? options.type : ToastType.Notice;

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
		postMessage(msg, 'timeToLive' in options ? options.timeToLive : DEFAULT_TIME_TO_LIVE);
	};

	msg.remove = () => {
		removeMessage(msg);
	};

	return msg;
};

// postToastMessage creates and posts a new message.
//
// It is intended for situations where you just need to tell the end user
// something and there is little or no chance of the message being repeated
// before timeout or where the precise text content changes from message to
// message.
export const postToastMessage = (text: string, options: ToastMessageOptions = {}) => {
	const msg = newToastMessage(text, options);
	msg.post();
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
