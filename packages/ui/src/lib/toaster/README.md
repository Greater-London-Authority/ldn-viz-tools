# Temporary documentation

**Author**: Paul Williams

If this component can be integrated into application shells then the post message function can be an instance property, e.g. `export const newToast`, which can be bound `<Toaster bind:newToast />`. Then we can do something like `setContext('toaster', toasterStore )` in the application shell making toasting an application shell feature. `toasterStore` will need to be a store (preferred) or object, holding the Toaster's functions, as context can only be set during component initialisation.

This might be needed if toasting layout and styling needs to differ based upon the kind of application, i.e. map vs dashboard vs story scroller. I think this is quite likely.

This may require some guards in the user component in some cases but it's unavoidable if instance binding on `newToast` is used with Svelte contexts (a static `newToast` won't have this problem):

```js
const toaster = getContext('toaster');
let errorMsg = '';

$: if ($toaster && errorMsg) {
	$toaster.newToast(errorMsg).post();
}
```

Current component works as follows.

## Usage

**Step 1**: Put the toaster somewhere. This can be almost anywhere but within the `+layout.svelte` or applied via the application shell is best.

```svelte
<script lang="ts">
	import Toaster from '@ldn-viz/ui';
	import { ToasterPosition } from '@ldn-viz/ui';
</script>

<!-- Example 1 -->
<Toaster />

<!-- Example 2 -->
<Toaster position="BottomRight" classes="max-w-[250px]" />

<!-- Example 3 -->
<Toaster
	position={ToasterPosition.TopCenter}
	title="Additional attributes applied via ...$$restProps"
/>
```

**Step 2**: Create and post a message.

```svelte
<script lang="ts">
	import { newToastMessage, ToastType, ToastMessageOptions } from '@ldn-viz/ui';

	const staticToast = newToastMessage('This is a warning!', {
		// Type: ToastMessageOptions
		// An id is rarely needed but prevents HMR duplicates.
		id: 'a-warning-toast',
		type: ToastType.Warning,
		closeButton: true
	});

	const fireAndForget = () => {
		newToastMessage('I just want you to know that...').post();
	};
</script>

<!-- Repeated clicks will refresh the toast -->
<button on:click={staticToast.post}> Give warning </button>

<!-- Repeated clicks will create duplicate toasts -->
<button on:click={fireAndForget}> Give notice </button>
```

## Props

```js
import { ToasterPosition } from '@ldn-viz/ui'

// position is used to layout the Toaster. You can specify your own classes
// for positioning via the classes property if you want something bespoke.
export let position = "TopCenter" | ToasterPosition.TopCenter;

// classes for applying additional classes. These are appended to the class
// string so they have implicit but weak priority over other styles.
export let classes = ""

// ...$$restProps applied to the top level element.
export let ...$$restProps
```

## Slots

No slots.

## Context

No context values.

## Static

### (Function) `newToastMessage`

**JavaScript**

```js
import { newToastMessage } from '@ldn-viz/ui';

const toast = newToastMessage('The message', {
	id: 'my-id',
	type: 'Success',
	timeToLive: 10000, // 10 seconds
	closeButton: true
});
```

**TypeScript**

```ts
import { newToastMessage, ToastType, ToastMessageOptions, ToastMessage } from '@ldn-viz/ui';

const toastOptions: ToastMessageOptions = {
	id: 'my-id',
	type: ToastType.Success,
	timeToLive: 10000, // 10 seconds
	closeButton: true
};

const toast: ToastMessage = newToastMessage('The message', toastOptions);
```

**Usage**

```ts
import { newToastMessage } from '@ldn-viz/ui';

const toast = newToastMessage('I just want you to know that...');

// Post then manually remove after 1 second.
toast.post();
setTimeout(toast.remove, 1000);
```

## Types

```ts
// TODO: It'd be nice if we could render the ./types file here!
// TODO: Which is completely possible.
import type {
	ToasterPosition,     // enum
	ToastType,           // enum
	ToastMessage,        // interface
	ToastMessageOptions, // interface
}
```
