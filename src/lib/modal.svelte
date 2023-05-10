<script lang="ts">
	export let showModal: boolean;

	let dialog: HTMLDialogElement; // HTMLDialogElement

	console.log(showModal);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if showModal}
	<div
		class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
	>
		<div on:click|stopPropagation>
			<slot name="header" />
			<hr />
			<slot />
			<hr />
			<!-- svelte-ignore a11y-autofocus -->
			<button autofocus on:click={() => dialog.close()}>close modal</button>
		</div>
	</div>
{/if}
