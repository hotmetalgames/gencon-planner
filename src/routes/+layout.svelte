<script>
	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';

	// This contains the bulk of Skeletons required styles:
	// NOTE: this will be renamed skeleton.css in the v2.x release.
	import '@skeletonlabs/skeleton/styles/skeleton.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.postcss';
	import { AppBar, AppShell } from '@skeletonlabs/skeleton';
	import User from '$lib/user.svelte';
</script>

<AppShell>
	<svelte:fragment slot="header"><AppBar><User /></AppBar></svelte:fragment>
	<svelte:fragment slot="sidebarLeft" />
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<!-- <svelte:fragment slot="pageFooter" /> -->
	<!-- (footer) -->
</AppShell>
