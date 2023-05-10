import { json } from '@sveltejs/kit';
import { writer } from '$lib/db';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const title = url.searchParams.get('title');

	let event = await writer.collection('Events').findOne({ title: title });

	return json(event, { status: 201 });
}
