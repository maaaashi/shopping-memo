<script lang="ts">
  import { Button } from "flowbite-svelte";
  import FaCheckCircle from 'svelte-icons/fa/FaCheckCircle.svelte'
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
</script>

<div class="w-4/5 mx-auto mt-5 border rounded p-3 flex justify-between">
  <div>
    {memo.content}
  </div>
  <button class={btnClass(memo.checked)}>
    <FaCheckCircle />
  </button>
</div>
