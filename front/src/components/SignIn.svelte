<script lang="ts">
  import { Heading, Label, Input, A } from "flowbite-svelte";
  import FaRegEyeSlash from 'svelte-icons/fa/FaRegEyeSlash.svelte'
  import FaRegEye from 'svelte-icons/fa/FaRegEye.svelte'
  import supabase from "$lib/supabase";
  import { goto } from "$app/navigation";

  let viewPassword = false
  let email = ''
  let password = ''
  let passwordFormType: 'password' | 'text' = 'password'

  export let error_message = ''

  const clickHandler = (): void => {
    viewPassword = !viewPassword
    if (viewPassword) passwordFormType = 'text'
    else passwordFormType = 'password'
  }

  const signin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email, password
    })

    if (error) {
      error_message = error.message
      setTimeout(() => {
        error_message = ''
      }, 2000);
    } else {
      goto('/')
    }
  }
</script>

<form on:submit|preventDefault={signin} >
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
  <div class="ml-auto mr-0 w-fit mt-3">
    <A href="/auth?mode=signup">> signup</A>
  </div>
</form>