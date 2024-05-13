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
