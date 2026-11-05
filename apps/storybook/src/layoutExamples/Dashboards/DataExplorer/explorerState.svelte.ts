import { getContext, setContext } from 'svelte';
import {
	componentGroups,
	months,
	usage,
	type ComponentGroup,
	type Team
} from '../../DemoData/designSystemUsage';

// Sidebar tabs are components that take no props, so the filter state they
// share with the canvas is passed through context.
const key = Symbol('explorer');

export class ExplorerState {
	team: Team | undefined = $state();
	groups: ComponentGroup[] = $state([...componentGroups]);
	fromMonth = $state(0);
	minimumRenders = $state('0');

	rows = $derived(
		usage.filter(
			(d) =>
				(!this.team || d.team === this.team) &&
				this.groups.includes(d.group) &&
				d.month >= months[this.fromMonth] &&
				d.renders >= Number(this.minimumRenders)
		)
	);

	reset() {
		this.team = undefined;
		this.groups = [...componentGroups];
		this.fromMonth = 0;
		this.minimumRenders = '0';
	}
}

export const setExplorerState = () => setContext(key, new ExplorerState());
export const getExplorerState = () => getContext<ExplorerState>(key);
