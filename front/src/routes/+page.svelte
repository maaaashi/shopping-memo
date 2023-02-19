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

	let all_memos: Memo[] = [];

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
      .order('created_at', { ascending: false })

		if (isMemo(data)) {
			all_memos = data
			return data
		}
		return []
	}

	const shopping_memos = derived(
		storeSelectDate,
		async ($storeSelectDate) => await getTodayMemo($storeSelectDate)
	)
	$shopping_memos

	const MemoChannel = supabase.channel('memos')

	MemoChannel
		.on (
			'postgres_changes',
			{ event: 'INSERT', schema: 'public', table: 'memos' },
			(payload) => {
				const payload_new = payload.new as Memo
				all_memos = [payload_new, ...all_memos]
			}
		)
		.on (
			'postgres_changes',
			{ event: 'UPDATE', schema: 'public', table: 'memos' },
			async (payload) => {
				const targetIndex = all_memos.findIndex(memo => memo.id === payload.old.id)
				const payload_new = payload.new as Memo
				if (targetIndex) {
					all_memos[targetIndex] = payload_new
				}
			}
		)
		.on (
			'postgres_changes',
			{ event: 'DELETE', schema: 'public', table: 'memos' },
			(payload) => {
				const targetIndex = all_memos.findIndex(memo => memo.id === payload.old.id)
				all_memos.splice(targetIndex, 1)
				all_memos = all_memos
			}
		)
		.subscribe()
</script>

<svelte:head>
	<title>SHOPPING MEMO</title>
</svelte:head>

{#each all_memos as memo}
	<Memo memo={memo}/>
{/each}