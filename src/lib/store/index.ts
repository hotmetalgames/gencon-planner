import { writable } from 'svelte/store';

export const userStore = writable(null);
export const filterStore = writable(2);
export const searchStore = writable('');
