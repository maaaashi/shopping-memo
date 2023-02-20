<script lang="ts">
  import supabase from "$lib/supabase";
  import { Button, Input } from "flowbite-svelte";
  import type { Memo } from "../types/memo";
  export let memos: Memo[];

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
    <Input required bind:value={new_memo}/>
    <Button type="submit" color="blue">＋</Button>
  </form>
</footer>

<style scoped>
  footer {
    width: calc(100vw);
  }
</style>