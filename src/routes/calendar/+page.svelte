<script lang="ts">
	import Calendar from '$lib/calendar.svelte';
	import { userStore } from '$lib/store';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { DateTime } from 'luxon';

	export let data;
	let included: Set<string> = new Set();
	let dayEvents = new Map();
	let events = data.events ? JSON.parse(data.events) : [];

	const refresh = () => {
		events.forEach((v) => {
			if (included.has(v.title)) {
				const date = DateTime.fromFormat(v.start_date, 'MM/dd/yyyy t');
				if (!dayEvents.has(date.toFormat('ccc'))) {
					dayEvents.set(date.toFormat('ccc'), []);
				}
				dayEvents.get(date.toFormat('ccc')).push(v);
			}
		});
		console.log(dayEvents);
	};

	userStore.subscribe((userStored: any) => {
		let user;
		if (userStored) {
			user = userStored.user;
		}
		if (user) {
			user.included.forEach((v: string) => {
				included.add(v);
			});

			refresh();
		}
	});

	const days = ['Thu', 'Fri', 'Sat', 'Sun'];
</script>

<Accordion>
	{#each days as day}
		<AccordionItem open>
			<div slot="summary">{day}</div>
			<Calendar {day} slot="content" events={dayEvents.get(day)} />
		</AccordionItem>
	{/each}
</Accordion>
