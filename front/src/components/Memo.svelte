<script lang="ts">
  import FaCheckCircle from 'svelte-icons/fa/FaCheckCircle.svelte'
  import supabase from '$lib/supabase';
  import FaTrash from 'svelte-icons/fa/FaTrash.svelte'
  import type { Memo } from '$types/memo';

  export let memo: Memo;

  const btnClass = (checked: boolean): string => {
    if (checked) return 'h-5 text-green-400'
    else return 'h-5 text-gray-400'
  }

  const checkedHandler = async () => {
    memo.checked = !memo.checked
    await supabase
      .from('memos')
      .update({ checked: memo.checked })
      .eq('id', memo.id)
  }

  const cardClass = (checked: boolean) => {
    let classname = 'w-full border rounded p-3 flex justify-between'
    if (checked) return classname + ' bg-gray-300'
    else return classname
  }

  const deleteMemo = async () => {
    await supabase
      .from('memos')
      .delete()
      .eq('id', memo.id)
  }
</script>

<div class="w-11/12 flex mt-5 ml-5">
  <button on:click={deleteMemo} class="text-red-300 h-5 icon mx-3 hover:text-red-600">
    <FaTrash />
  </button>
  <div class={cardClass(memo.checked)}>
    <div>
      {memo.content}
    </div>
    <button on:click={checkedHandler} class={btnClass(memo.checked)}>
      <FaCheckCircle />
    </button>
  </div>
</div>

<style scoped>
  .checked {
    background-color: gray;
    color: white;
  }

  .icon {
    margin-top: 15px;
  }
</style>