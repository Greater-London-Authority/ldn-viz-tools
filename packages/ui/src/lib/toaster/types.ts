// ToastType is a collection of valid toast message types.
export enum ToastType {
	Notice = 'Notice',
	Success = 'Success',
	Warning = 'Warning',
	Error = 'Error'
}

// ToastMessage represents a message with functionality for posting, removing
// and refreshing itself.
export interface ToastMessage {
	// text is just the message text to be displayed to the end user.
	text: string;

	// id is used as the ToastMessage id. It is auto-generated if falsey after
	// string trimming.
	id: string;

	// postId is always auto-generated and uniquely identifies the display
	// instance of the ToastMessage, i.e. calling ToastMessage.post twice will
	// result in new postId being generated (if timeToLive is greater than zero)
	// while id always remains the same.
	postId?: any;

	// type is the ToastType that controls styling and indicates urgency of the
	// message to the end user. By default this will be ToastType.Notice.
	type: ToastType;

	// closeButton is true if a close button should be displayed.
	closeButton: boolean;

	// post is used to post or refresh the message within its Toaster.
	post: () => void;

	// remove is used to remove the message from the Toaster. This is called when
	// timeout is hit but may also be called by the user dev to cancel early.
	remove: () => void;
}

// ToastMessageOptions are optional parameters to newToastMessage and
// postToastMessage.
export interface ToastMessageOptions {
	id?: string;
	type?: ToastType;
	timeToLive?: number;
	closeButton?: boolean;
}
