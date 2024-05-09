import db from '$lib/db';

export async function load() {
	const agg = [{ $group: { _id: '$title', total: { $sum: 1 } } }];

	const events = await db.collection('Events').find({}).toArray();
	return {
		status: 200,
		events: JSON.stringify(events)
	};
}
