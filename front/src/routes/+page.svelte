<script lang="ts">
	import { storeSelectDate } from "$store/date";
	import supabase from "$lib/supabase";
	import { derived } from "svelte/store";
	import Memo from "$components/Memo.svelte";
  import AddBox from "$components/AddBox.svelte";
  import { Button, Heading, P } from "flowbite-svelte";
	import type { Memo as MemoType } from "$types/memo";
	import { sessionStore } from "$store/session";
	import { Datepicker } from 'svelte-calendar';

	const isMemo = (targets: unknown[] | null): targets is MemoType[] => {
		if (targets === null) return false
		return targets.every(target => {
			return typeof target === "object" &&
			target !== null &&
			typeof (target as MemoType).id === "string" &&
			typeof (target as MemoType).user_id === "string" &&
			typeof (target as MemoType).content === "string" &&
			typeof (target as MemoType).checked === "boolean" &&
			typeof (target as MemoType).created_at === "string";
		})
	}

	let all_memos: MemoType[] = [];
	let loading = false

	const getTodayMemo = async (selectDate: Date): Promise<MemoType[]> => {
		loading = true
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
			loading = false
			return data
		}

		loading = false
		return []
	}

	const shopping_memos = derived(
		storeSelectDate,
		async ($storeSelectDate) => await getTodayMemo($storeSelectDate)
	)
	$shopping_memos

	const MemoChannel = supabase.channel('memos')
		.on (
			'postgres_changes',
			{ event: '*', schema: 'public', table: 'memos' },
			(payload) => {
				switch(payload.eventType) {
					case 'INSERT':
						const insertMemo = payload.new as MemoType
						all_memos = [insertMemo, ...all_memos]
						break;
					case 'UPDATE':
						const updateIndex = all_memos.findIndex(memo => memo.id === payload.old.id)
						const updateMemo = payload.new as MemoType
						if (updateIndex) {
							all_memos[updateIndex] = updateMemo
						}
						break;
					case 'DELETE':
						const deleteIndex = all_memos.findIndex(memo => memo.id === payload.old.id)
						all_memos.splice(deleteIndex, 1)
						all_memos = all_memos
						break;
				}
			}
		)

	MemoChannel.subscribe()
</script>

<svelte:head>
	<title>SHOPPING MEMO</title>
</svelte:head>

{#if $sessionStore}
	<main>
		<div class="justify-center flex mt-5">
			<Datepicker bind:selected={$storeSelectDate} let:key let:send let:receive>
				<button class="border rounded-lg" in:receive|local={{ key }} out:send|local={{ key }}>
					<Button color="light">
						<Heading tag="h3" >
							{$storeSelectDate.toLocaleDateString()}
						</Heading>
					</Button>
				</button>
			</Datepicker>
			<div class="p-3">
				<Heading tag="h3">
					買い物リスト
				</Heading>
			</div>
		</div>
		{#if loading}
			読み込み中...
		{:else}
			{#each all_memos as memo}
				<Memo memo={memo}/>
			{:else}
				買うものないなあ
			{/each}
		{/if}
	</main>

	<div class="absolute bottom-0">
		<AddBox bind:memos={all_memos}/>
	</div>
{:else}
	<div class="h-fit w-4/5 sm:w-3/5 lg:w-2/5 mx-auto mt-10 p-5 border bg-gray-100 rounded-lg text-center">
		<p class="mb-5">サインインしてご利用ください。</p>
		<Button href="/auth">GO SignIn</Button>
	</div>
{/if}


<style scoped>
	main {
		height: calc(100vh - 130px);
		overflow-y: auto;
	}
</style>