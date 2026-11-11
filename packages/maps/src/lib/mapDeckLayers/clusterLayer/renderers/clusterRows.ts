/**
 * Counts the points in each category returned by `getKey`, in `order` first and then in order
 * of first appearance. Categories with no points are omitted.
 */
export const tallyBy = <DataT>(
	points: DataT[],
	getKey: (d: DataT) => string,
	order: string[] = []
): { key: string; count: number }[] => {
	const counts = new Map<string, number>(order.map((key) => [key, 0]));
	for (const p of points) {
		const key = getKey(p);
		counts.set(key, (counts.get(key) ?? 0) + 1);
	}
	return [...counts].map(([key, count]) => ({ key, count })).filter((s) => s.count > 0);
};
