import { getContent } from '$lib/utils';

export async function load({ params }) {
	return getContent(params.slug);
}
