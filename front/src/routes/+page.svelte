<script lang="ts">
	import { storeSelectDate } from "../store";
	import supabase from "$lib/supabase";
	import { derived } from "svelte/store";
	import Memo from "../components/Memo.svelte";

	interface Memo {
		id: string;
		user_id: string;
		content: string;
		checked: boolean;
		created_at: string;
	}

	const isMemo = (targets: unknown[] | null): targets is Memo[] => {
		if (targets === null) return false
		return targets.every(target => {
			return typeof target === "object" &&
			target !== null &&
			typeof (target as Memo).id === "string" &&
			typeof (target as Memo).user_id === "string" &&
			typeof (target as Memo).content === "string" &&
			typeof (target as Memo).checked === "boolean" &&
			typeof (target as Memo).created_at === "string";
		})
	}

	const getTodayMemo = async (selectDate: Date): Promise<Memo[]> => {
		const year = selectDate.getFullYear()
		const month = selectDate.getMonth() + 1
		const date = selectDate.getDate()
		const start = `${year}-${month}-${date} 00:00:00`
		const end = `${year}-${month}-${date} 23:59:59`

		const { data } = await supabase
			.from('memos')
			.select('*')
      .gt('created_at', start)
      .lt('created_at', end)
      .order('created_at', { ascending: true })

		if (isMemo(data)) return data
		return []
	}

	export const shopping_memos = derived(
		storeSelectDate,
		async ($storeSelectDate) => getTodayMemo($storeSelectDate)
	);

</script>

<svelte:head>
	<title>SHOPPING MEMO</title>
</svelte:head>

{#await $shopping_memos}
	...
{:then memos}
	{#each memos as memo}
		<Memo memo={memo}/>
	{/each}
{/await}