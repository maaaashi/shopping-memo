<script lang="ts">
  import { Alert } from "flowbite-svelte";
  import { fade } from "svelte/transition";
  import { page } from "$app/stores";
  import SignIn from "$components/SignIn.svelte";
  import SignUp from "$components/SignUp.svelte";

  let message = ''
  let error_message = ''
  $: mode = $page.url.searchParams.get('mode')
</script>

{#if error_message}
  <div transition:fade class="absolute top-4 right-0">
    <Alert color="red" accent>
      <span slot="icon"><svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg></span>
      {error_message}
    </Alert>
  </div>
{/if}

{#if message}
  <div transition:fade class="absolute top-4 right-0">
    <Alert color="green" accent>
      <span slot="icon"><svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg></span>
      {message}
    </Alert>
  </div>
{/if}

<div class="h-full w-4/5 sm:w-3/5 lg:w-2/5 mx-auto mt-10 p-5 border bg-gray-100 rounded-lg">
  {#if mode === 'signup'}
    <SignUp bind:error_message bind:message/>
  {:else}
    <SignIn bind:error_message/>
  {/if}
</div>
