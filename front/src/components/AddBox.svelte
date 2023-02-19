<script lang="ts">
  import supabase from "$lib/supabase";
  import { Button, Input } from "flowbite-svelte";
  export let memos: Memo[];

  interface Memo {
		id: string;
		user_id: string;
		content: string;
		checked: boolean;
		created_at: string;
	}

  let new_memo = '';

  const insertMemo = async () => {
  const query = supabase
    .from('memos')
    .insert({
      content: new_memo
    })

    await query

    new_memo = ''
  }
</script>

<footer class="p-5">
  <form on:submit|preventDefault={insertMemo} class="flex">
    <Input bind:value={new_memo}/>
    <Button type="submit" color="green">登録</Button>
  </form>
</footer>

<style scoped>
  footer {
    width: calc(100vw);
  }
</style>