<script lang="ts">
	import { filterStore, userStore, searchStore } from './store';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

	let user = '';
	let search = '';

	const handleUserBlur = async () => {
		const userObj = await fetch('/api/user', {
			method: 'POST',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ user: user })
		});

		const userStr = await userObj.text();
		userStore.set(JSON.parse(userStr));
	};

	const handleSearchBlur = async () => {
		searchStore.set(search);
	};

	let filter: number = $filterStore;
</script>

<div class="header">
	<label class="block text-sm font-bold mb-2" for="username"> Username </label>
	<input
		class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
		bind:value={user}
		on:blur={handleUserBlur}
	/>
	<RadioGroup>
		<RadioItem
			bind:group={filter}
			name="justify"
			value={0}
			on:change={() => {
				filterStore.set(0);
			}}>All</RadioItem
		>
		<RadioItem
			bind:group={filter}
			name="justify"
			value={1}
			on:change={() => {
				filterStore.set(1);
			}}>Liked</RadioItem
		>
		<RadioItem
			bind:group={filter}
			name="justify"
			value={3}
			on:change={() => {
				filterStore.set(3);
			}}>Excluded</RadioItem
		>
		<RadioItem
			bind:group={filter}
			name="justify"
			value={2}
			on:change={() => {
				filterStore.set(2);
			}}>Filtered</RadioItem
		>
	</RadioGroup>

	<label class="block text-sm font-bold mb-2" for="username"> Search </label>
	<input
		class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
		bind:value={search}
		on:blur={handleSearchBlur}
	/>
	<a href="/calendar">Calendar</a>
	<a href="/">List</a>
</div>

<style>
	.header {
		display: flex;
		justify-content: flex-end;
		gap: 2rem;
	}
</style>
