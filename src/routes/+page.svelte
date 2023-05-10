<script lang="ts">
	import { filterStore, userStore, searchStore } from '$lib/store/index.js';

	export let data;
	let filter: number = 2;

	let user: any = null;
	let excluded: Set<string> = new Set();
	let included: Set<string> = new Set();
	let shownEvents: Array<any> = [];
	let showModal = false;
	let activeEvent: any;
	let events = data.events;

	const refreshTable = () => {
		shownEvents = [];
		events.forEach((event) => {
			if (!excluded.has(event._id) && !included.has(event._id) && filter === 2) {
				shownEvents.push(event);
			} else if (filter === 1 && included.has(event._id)) {
				shownEvents.push(event);
			} else if (filter === 0) {
				shownEvents.push(event);
			} else if (excluded.has(event._id) && filter === 3) {
				shownEvents.push(event);
			}
		});
	};

	filterStore.subscribe((v) => {
		filter = v;
		refreshTable();
	});

	userStore.subscribe((userStored: any) => {
		if (userStored) {
			user = userStored.user;
		}
		if (user) {
			user.excluded.forEach((v: string) => {
				excluded.add(v);
			});
			user.included.forEach((v: string) => {
				included.add(v);
			});

			refreshTable();
		}
	});

	searchStore.subscribe(async (search: string) => {
		if (search.length > 0) {
			const searchParams = new URLSearchParams({ search: search });
			const filteredEvents = await fetch(`/api/events?${searchParams.toString()}`, {
				method: 'GET',
				cache: 'no-cache',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			const results = await filteredEvents.json();
			events = results.map((result: any) => {
				return {
					_id: result.title,
					total: -1
				};
			});
		} else {
			events = data.events;
		}

		refreshTable();
	});

	const onAdd = (id: string) => {
		if (user) {
			included.add(id);
			excluded.delete(id);
			user.included = Array.from(included);
			user.excluded = Array.from(excluded);
			refreshTable();
			onSave();
		}
	};

	const onRemove = (id: string) => {
		console.log('in here with', id);
		if (user) {
			excluded.add(id);
			included.delete(id);
			user.excluded = Array.from(excluded);
			user.included = Array.from(included);
			refreshTable();
			onSave();
		}
	};

	const onSave = async () => {
		const userObj = await fetch('/api/user', {
			method: 'PATCH',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ user: user })
		});

		// const userStr = await userObj.text();
		// userStore.set(JSON.parse(userStr));
	};

	const onInfo = async (id: string) => {
		const searchParams = new URLSearchParams({ title: id });
		const event = await fetch(`/api/event?${searchParams.toString()}`, {
			method: 'GET',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const body = await event.json();
		activeEvent = body;
		showModal = true;
	};

	refreshTable();
</script>

<div class="flex-auto w-full h-full flex overflow-hidden">
	<div id="page" class=" flex-1 overflow-x-hidden flex flex-col">
		<main id="page-content" class="flex-auto">
			<div class="table-container">
				<table class="table table-interactive" role="grid">
					<thead class="table-head">
						<tr>
							<th class="">Name</th>
							<th class="">Total Event Times</th>
							<th class="" />
						</tr>
					</thead>
					<tbody class="table-body">
						{#each shownEvents as event}
							<tr aria-rowindex="1">
								<td class="" role="gridcell" aria-colindex="1" tabindex="0">{event._id}</td>
								<td class="" role="gridcell" aria-colindex="2" tabindex="-1"
									>{event.total > 0 ? event.total : '-'}</td
								>
								<td class="" role="gridcell" aria-colindex="3" tabindex="-2">
									<button
										type="button"
										class="btn-icon variant-filled"
										on:click={() => {
											onInfo(event._id);
										}}
									>
										<i class="fa-solid fa-circle-info" /></button
									>
									<button
										type="button"
										class="btn-icon variant-filled"
										on:click={() => {
											onAdd(event._id);
										}}
									>
										<i class="fa-solid fa-check" />
									</button>
									<button
										type="button"
										class="btn-icon variant-filled"
										on:click={() => {
											onRemove(event._id);
										}}
									>
										<i class="fa-solid fa-circle-xmark" /></button
									>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</main>
	</div>
</div>

{#if showModal}
	<div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
		<div class="mt-3 text-center">
			<div class="card p-4">
				<h2>
					{#if activeEvent}
						{activeEvent.title}
					{/if}
					<button
						type="button"
						class="btn-icon variant-filled"
						on:click={() => {
							showModal = false;
						}}
					>
						<i class="fa-solid fa-circle-info" /></button
					>
					<button
						type="button"
						class="btn-icon variant-filled"
						on:click={() => {
							onAdd(activeEvent.title);
							showModal = false;
						}}
					>
						<i class="fa-solid fa-check" />
					</button>
					<button
						type="button"
						class="btn-icon variant-filled"
						on:click={() => {
							onRemove(activeEvent.title);
							showModal = false;
						}}
					>
						<i class="fa-solid fa-circle-xmark" /></button
					>
				</h2>
				{#if activeEvent}
					<div class="table-container">
						<table class="table table-interactive" role="grid">
							<thead class="table-head">
								<tr>
									<th class="" />
									<th class="" />
								</tr>
							</thead>
							<tbody class="table-body">
								<tr aria-rowindex="1">
									<td class="" role="gridcell" aria-colindex="1" tabindex="0">Group</td>
									<td class="" role="gridcell" aria-colindex="1" tabindex="0"
										>{activeEvent.group}</td
									>
								</tr>
								<tr aria-rowindex="1">
									<td class="" role="gridcell" aria-colindex="1" tabindex="0">Description</td>
									<td class="" role="gridcell" aria-colindex="1" tabindex="0"
										>{activeEvent.long_desc?.length > 0
											? activeEvent.long_desc
											: activeEvent.short_desc}</td
									>
								</tr>
								<tr aria-rowindex="1">
									<td class="" role="gridcell" aria-colindex="1" tabindex="0">Description</td>
									<td class="" role="gridcell" aria-colindex="1" tabindex="0">{activeEvent.type}</td
									>
								</tr>
								<tr aria-rowindex="1">
									<td class="" role="gridcell" aria-colindex="1" tabindex="0">System</td>
									<td class="" role="gridcell" aria-colindex="1" tabindex="0"
										>{activeEvent.system}</td
									>
								</tr>
								<tr aria-rowindex="1">
									<td class="" role="gridcell" aria-colindex="1" tabindex="0">Edition</td>
									<td class="" role="gridcell" aria-colindex="1" tabindex="0"
										>{activeEvent.rules_edition}</td
									>
								</tr>
								<tr aria-rowindex="1">
									<td class="" role="gridcell" aria-colindex="1" tabindex="0">Players</td>
									<td class="" role="gridcell" aria-colindex="1" tabindex="0"
										>{activeEvent.min_players} - {activeEvent.max_players}</td
									>
								</tr>
								<tr aria-rowindex="1">
									<td class="" role="gridcell" aria-colindex="1" tabindex="0">Link</td>
									<td class="" role="gridcell" aria-colindex="1" tabindex="0">
										<a
											href={`https://www.gencon.com/events?search=${activeEvent.id}`}
											target="popup">To GenCon</a
										></td
									>
								</tr>
							</tbody>
						</table>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	#my-modal {
		z-index: 200;
	}
</style>
