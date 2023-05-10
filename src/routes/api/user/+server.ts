import { json } from '@sveltejs/kit';
import { writer } from '$lib/db';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const rawBody = await request.text();
	const body = JSON.parse(rawBody);

	let user = await writer.collection('Users').findOne({ name: body.user });

	if (!user) {
		await writer.collection('Users').insertOne({
			name: body.user,
			excluded: [],
			included: []
		});
		user = await writer.collection('Users').findOne({ name: body.user });
	}

	return json({ user: user || { name: body.user, excluded: [], included: [] } }, { status: 201 });
}

export async function PATCH({ request }) {
	const rawBody = await request.text();
	const body = JSON.parse(rawBody);
	await writer
		.collection('Users')
		.updateOne(
			{ name: body.user.name },
			{ $set: { excluded: body.user.excluded, included: body.user.included } }
		);
	const user = await writer.collection('Users').findOne({ name: body.user });
	return json({ user: user }, { status: 201 });
}
