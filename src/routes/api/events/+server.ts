import { json } from '@sveltejs/kit';
import { writer } from '$lib/db';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const search = url.searchParams.get('search');

	let events = await writer
		.collection('Events')
		.find({
			$or: [
				{ title: new RegExp('.*' + search + '.*', 'i') },
				{ system: new RegExp('.*' + search + '.*', 'i') }
			]
		})
		.toArray();

	return json(events, { status: 201 });
}
