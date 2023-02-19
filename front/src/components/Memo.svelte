<script lang="ts">
  import FaCheckCircle from 'svelte-icons/fa/FaCheckCircle.svelte'
  import supabase from '$lib/supabase';

  interface Memo {
    id: string;
		user_id: string;
		content: string;
		checked: boolean;
		created_at: string;
	}

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
    let classname = 'w-4/5 mx-auto mt-5 border rounded p-3 flex justify-between'
    if (checked) return classname + ' bg-gray-300'
    else return classname
  }
</script>

<div class={cardClass(memo.checked)}>
  <div>
    {memo.content}
  </div>
  <button on:click={checkedHandler} class={btnClass(memo.checked)}>
    <FaCheckCircle />
  </button>
</div>

<style scoped>
  .checked {
    background-color: gray;
    color: white;
  }
</style>