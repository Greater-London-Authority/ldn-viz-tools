<script context="module" lang="ts">
	import Message, { type MessageType } from './Message.svelte';
	import { writable, type Writable } from 'svelte/store';
	import { toCSS } from '../util.js';

	type MessageProps = {
		id: string;
		type: MessageType;
		text: string;
		remove: () => void;
	} 

	const TIME_TO_LIVE = 4000;
	const MAX_MESSAGES = 3
	const messages: Writable<MessageProps[]> = writable([]);

	export const postMessage = (type: MessageType, text: string) => {
		const msg: MessageProps = {
			id: crypto.randomUUID(),
			type: type,
			text: text,
			remove: () => {},
		}

		msg.remove = () => {
			messages.update((msgList: MessageProps[]) => {
				return msgList.filter((m) => m.id !== msg.id);
			});
		}

		addMessage(msg);
		return msg;
	};

	const addMessage = (msg: MessageProps) => {
		messages.update((msgList: MessageProps[]) => {
			msgList = [msg, ...msgList]
			limitMessages(msgList)
			return msgList
		})

		setTimeout(msg.remove, TIME_TO_LIVE);
	};

	const limitMessages = (msgList: MessageProps[]) => {
		while (msgList.length > MAX_MESSAGES) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			msgList.pop().remove()
		}
	}
</script>

<script lang="ts">
	export let styles = {};

	const defaultStyles = {
		position: 'fixed',
		bottom: '8px',
		right: '8px'
	};

	const style = toCSS({
		...defaultStyles,
		...styles
	});
</script>

<div class="flex flex-col gap-4 z-40" {style}>
	{#each $messages as msg (msg.id)}
		<Message {...msg} />
	{/each}
</div>
