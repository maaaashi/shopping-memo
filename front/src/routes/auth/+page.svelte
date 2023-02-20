<script lang="ts">
  import { Heading, Input, Label, Alert } from "flowbite-svelte";
  import FaRegEyeSlash from 'svelte-icons/fa/FaRegEyeSlash.svelte'
  import FaRegEye from 'svelte-icons/fa/FaRegEye.svelte'
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { goto } from "$app/navigation";

  export let form: { status: number};

  const initError = (status: number): string => {
    if (status === 400) return '認証情報が違います。'
    return ''
  }

  $: error_message = initError(form?.status)

  let email = ''
  let password = ''
  let passwordFormType: 'password' | 'text' = 'password'
  let viewPassword = false

  const clickHandler = (): void => {
    viewPassword = !viewPassword
    if (viewPassword) passwordFormType = 'text'
    else passwordFormType = 'password'
  }

  onMount(() => {
    setTimeout(() => {
      error_message = ''
    }, 2000)

    if (form.status === 200) {
      goto('/')
    }
  })
</script>

{#if error_message}
  <div transition:fade class="absolute top-4 right-0">
    <Alert color="red" accent>
      <span slot="icon"><svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg></span>
      {error_message}
    </Alert>
  </div>
{/if}

<div class="h-full w-4/5 sm:w-3/5 lg:w-2/5 mx-auto mt-10 p-5 border bg-gray-100 rounded-lg">
  <form method="post" action="?/login" >
    <div class="text-center">
      <Heading tag="h3">SignIn</Heading>
    </div>
    <Label for="email">email</Label>
    <Input
      id="email"
      name="email"
      bind:value={email}
      type="email"
      required
    />

    <Label for="password">password</Label>
    <Input
      id="password"
      name="password"
      bind:value={password}
      type={passwordFormType}
      required
    >
      <button type="button" class="h-1/2" slot="right" on:click={clickHandler}>
        {#if viewPassword}
          <FaRegEye />
          {:else}
          <FaRegEyeSlash />
        {/if}
      </button>
    </Input>
    <button class="submit" >サインイン</button>
  </form>
</div>

<style lang="postcss">
  .submit {
    @apply w-full mt-5 text-center font-medium focus:ring-4 focus:outline-none inline-flex items-center justify-center px-5 py-2.5 text-sm text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 rounded-lg;
  }
</style>