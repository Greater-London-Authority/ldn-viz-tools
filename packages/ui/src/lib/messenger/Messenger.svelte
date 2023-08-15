<script context="module" lang="ts">
	import Message, { MessageType } from './Message.svelte';
	import { writable, type Writable } from 'svelte/store';
	import { objectToCSS } from '../util.js';

	type UserMessage = {
		id: string;
		type: MessageType;
		text: string;
		remove: () => void;
	};

	const DEFAULT_TIME_TO_LIVE: number = 3500;
	const MAX_MESSAGES: number = 3;
	const messages: Writable<UserMessage[]> = writable([]);

	export const postMessage = (
		text: string,
		type = MessageType.Notice,
		timeToLive = DEFAULT_TIME_TO_LIVE
	) => {
		const msg = newMessage(text, type);
		showMessage(msg);
		removeMesssageAfter(msg, timeToLive);
		return msg;
	};

	const newMessage = (text: string, type: MessageType): UserMessage => {
		const id = crypto.randomUUID();

		return {
			id: id,
			type: type,
			text: text,
			remove: () => removeMessage(id)
		};
	};

	const showMessage = (msg: UserMessage) => {
		messages.update((msgList: UserMessage[]) => {
			msgList = [msg, ...msgList];
			return limitNumberOfMessages(msgList);
		});
	};

	const removeMessage = (id: string) => {
		messages.update((msgList: UserMessage[]) => {
			return msgList.filter((m) => m.id !== id);
		});
	};

	const removeMesssageAfter = (msg: UserMessage, timeToLive: number) => {
		if (timeToLive > 0) {
			setTimeout(msg.remove, timeToLive);
		}
	};

	const limitNumberOfMessages = (msgList: UserMessage[]) => {
		return msgList.slice(0, MAX_MESSAGES);
	};
</script>

<script lang="ts">
	export let styles = {};

	const defaultStyles = {
		position: 'fixed',
		bottom: '8px',
		right: '8px'
	};

	const style = objectToCSS({
		...defaultStyles,
		...styles
	});
</script>

<div class="flex flex-col gap-4 z-40" {style}>
	{#each $messages as msg (msg.id)}
		<Message {...msg} />
	{/each}
</div>
