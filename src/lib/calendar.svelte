<script>
	export let day;
	export let events;
	import { DateTime } from 'luxon';

	console.log('Events', events);
	let show = [];
	if (events) {
		events.forEach((v) => {
			const start = DateTime.fromFormat(v.start_date, 'MM/dd/yyyy t');
			const end = DateTime.fromFormat(v.end_date, 'MM/dd/yyyy t');
			console.log('start hour', start.toFormat('H'));
			show.push({
				start: parseInt(start.toFormat('H')) - 8,
				end: parseInt(end.toFormat('H')) - 8,
				title: v.title
			});
		});
		show = [...show];
	}

	const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
</script>

<div class="grid">
	{#each hours as hour, idx}
		<div style:gridArea={idx + 1}>{hour}</div>
	{/each}
	{#each show as event, idx}
		<div
			class="color"
			style:--grid-end={event.end}
			style:--grid-start={event.start}
			style:--grid-row={idx + 2}
		>
			{event.title}
		</div>
	{/each}
</div>

<style>
	.color {
		background-color: #0fba81;
		color: #000;
		grid-column-end: var(--grid-end, 0);
		grid-column-start: var(--grid-start, 0);
		grid-row-start: var(--grid-row, 0);
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(15, 1fr);
		grid-template-rows: repeat(5, 1fr);
		grid-column-gap: 0px;
		grid-row-gap: 0px;
	}
	.div1 {
		grid-area: 3 / 7 / 4 / 8;
	}
	.div2 {
		grid-area: 1 / 1 / 2 / 5;
	}
	.div3 {
		grid-area: 1 / 4 / 2 / 5;
	}
</style>
