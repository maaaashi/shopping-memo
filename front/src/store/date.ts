import { writable, type Writable } from "svelte/store";
export const storeSelectDate: Writable<Date> = writable(new Date())