<script lang="ts">
	import { DatePicker } from '@svelte-plugins/datepicker';
	import { format } from 'date-fns';
	import Input from '../../lib/input/Input.svelte';
	import { randomId } from '../utils/randomId';

	export let dateFormat = 'MM/dd/yy';

	/**
	 * Represents the start date for a date picker.
	 */
	export let startDate: any = new Date();

	/**
	 * Represents the end date for a date picker.
	 */
	export let endDate: any = null;

	/**
	 * Represents the start time for the date picker (in HH:mm format).
	 */
	export let startDateTime: string = '00:00';

	/**
	 * Represents the end time for the date picker (in HH:mm format).
	 */
	export let endDateTime: string = '00:00';

	/**
	 * Represents the current date.
	 */
	export let today: Date = new Date();

	/**
	 * Represents the default year for the date picker.
	 */
	export let defaultYear: number = today.getFullYear();

	/**
	 * Represents the default month for the date picker.
	 */
	export let defaultMonth: number = today.getMonth();

	/**
	 * Represents the start day of the week (0 for Sunday, 1 for Monday, etc.).
	 */
	export let startOfWeek: number = 0;

	/**
	 * Indicates whether the date picker has multiple panes.
	 */
	export let isMultipane: boolean = false;

	/**
	 * Indicates whether the date picker is in range mode.
	 */
	export let isRange: boolean = false;

	/**
	 * Indicates whether the date picker is open.
	 */
	export let isOpen: boolean = false;

	/**
	 * Specifies the alignment of the date picker (e.g., 'left', 'center', 'right').
	 */
	export let align: string = 'left';

	/**
	 * Represents the theme of the date picker.
	 */
	export let theme: string = '';

	/**
	 * An array of disabled dates.
	 */
	export let disabledDates: Date[] = [];

	/**
	 * An array of enabled dates.
	 */
	export let enabledDates: Date[] = [];

	/**
	 * Callback function to handle day click events.
	 */
	export let onDayClick: (event: object) => void = (): void => {};

	/**
	 * Callback function to handle the navigation click event for months and years
	 */
	export let onNavigationChange: (event: object) => void = (): void => {};

	/**
	 * Indicates whether the date picker should always be shown.
	 */
	export let alwaysShow: boolean = false;

	/**
	 * Indicates whether year controls are displayed in the date picker.
	 */
	export let showYearControls: boolean = true;

	/**
	 * Indicates whether preset options are displayed in the date picker.
	 */
	export let showPresets: boolean = false;

	/**
	 * Indicates whether the time picker is shown in the date picker.
	 */
	export let showTimePicker: boolean = false;

	/**
	 * Indicates whether future dates are enabled.
	 */
	export let enableFutureDates: boolean = false;

	/**
	 * Indicates whether past dates are enabled.
	 */
	export let enablePastDates: boolean = true;

	/**
	 * An array of preset date range labels.
	 */
	export let presetLabels: string[] = [
		'Today',
		'Last 7 Days',
		'Last 30 Days',
		'Last 60 Days',
		'Last 90 Days',
		'Last Year'
	];

	/**
	 * An array of day-of-week labels.
	 */
	export let dowLabels: string[] = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

	/**
	 * An array of month labels.
	 */
	export let monthLabels: string[] = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	/**
	 * Determines if the default font "Rubik" should be loaded.
	 */
	let includeFont = false;

	/**
	 * The number of milliseconds in a day.
	 */
	export const MILLISECONDS_IN_DAY: number = 24 * 60 * 60 * 1000;

	/**
	 * Calculates a date based on the number of days from today.
	 */
	export const getDateFromToday = (days: number): number => {
		return Date.now() - days * MILLISECONDS_IN_DAY;
	};

	/**
	 * An array of preset date ranges with labels and start/end timestamps.
	 */
	export let presetRanges: object[] = [
		{
			label: presetLabels[0],
			start: getDateFromToday(0),
			end: getDateFromToday(0)
		},
		{
			label: presetLabels[1],
			start: getDateFromToday(6),
			end: getDateFromToday(0)
		},
		{
			label: presetLabels[2],
			start: getDateFromToday(29),
			end: getDateFromToday(0)
		},
		{
			label: presetLabels[3],
			start: getDateFromToday(59),
			end: getDateFromToday(0)
		},
		{
			label: presetLabels[4],
			start: getDateFromToday(89),
			end: getDateFromToday(0)
		},
		{
			label: presetLabels[5],
			start: getDateFromToday(364),
			end: getDateFromToday(0)
		}
	];

	/**
	 * The `type` of the `<input>` element (see [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types)).
	 */
	export let type = 'text';

	/**
	 * The `id` of the `<input>` element: defaults to a randomly-generated value.
	 */
	export let id = randomId();

	/**
	 * Text displayed above the `<input>` element.
	 */
	export let label = '';

	/**
	 * The `name` of the `<input>` element. Defaults to same value as `id`. Optional, unless value of the input needs to be included with a form submission.
	 */
	export let name = id;

	/**
	 * Text that appears below the `<input>` element, in smaller font than the `label`.
	 */
	export let description = '';

	/**
	 * Determines which edge of the `<input>` the description is aligned with.
	 */
	export let descriptionAlignment: 'left' | 'right' = 'left';

	/**
	 * Help text to be displayed in tooltip
	 */
	export let hint = '';

	/**
	 * Text to be displayed next to icon in tooltip trigger.
	 */
	export let hintLabel = 'more info';

	/**
	 * If `false`, then `required` attribute is applied to `<input>`.
	 */
	export let optional = false;

	/**
	 * If `true`, then user is prevented from interacting with the `<input>`.
	 */
	export let disabled = false;

	/**
	 * Message to be displayed below `<input>` in red text (replacing description).
	 * If set, then the border of the `<input>` is also red.
	 */
	export let error = '';

	export let placeholder = '';

	const toggleDatePicker = () => (isOpen = !isOpen);

	const formatDate = (dateString: string | number | Date) => {
		return (dateString && format(new Date(dateString), dateFormat)) || '';
	};

	let formattedStartDate = formatDate(startDate);

	const onChange = () => {
		startDate = new Date(formattedStartDate);
	};

	$: formattedStartDate = formatDate(startDate);
</script>

<DatePicker
	bind:isOpen
	bind:startDate
	bind:endDate
	{includeFont}
	{enablePastDates}
	{enableFutureDates}
	{startDateTime}
	{endDateTime}
	{today}
	{defaultYear}
	{defaultMonth}
	{startOfWeek}
	{isMultipane}
	{isRange}
	{align}
	{theme}
	{disabledDates}
	{enabledDates}
	{onDayClick}
	{onNavigationChange}
	{alwaysShow}
	{showYearControls}
	{showPresets}
	{showTimePicker}
	{presetLabels}
	{dowLabels}
	{monthLabels}
	{MILLISECONDS_IN_DAY}
	{getDateFromToday}
	{presetRanges}
>
	<Input
		{disabled}
		{optional}
		{type}
		{name}
		{label}
		{description}
		{descriptionAlignment}
		{placeholder}
		{hint}
		{hintLabel}
		bind:value={formattedStartDate}
		bind:error
		{...$$restProps}
		on:click={toggleDatePicker}
	/>
</DatePicker>
