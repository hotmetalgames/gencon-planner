import db from '$lib/db';

export async function load() {
	const agg = [{ $group: { _id: '$title', total: { $sum: 1 } } }];

	const events = await db.collection('Events').aggregate(agg, { allowDiskUse: true }).toArray();
	return {
		status: 200,
		events: events
	};
}
