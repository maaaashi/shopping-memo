<script lang="ts">
  import { Heading, Label, Input, A } from "flowbite-svelte";
  import FaRegEyeSlash from 'svelte-icons/fa/FaRegEyeSlash.svelte'
  import FaRegEye from 'svelte-icons/fa/FaRegEye.svelte'
  import supabase from "$lib/supabase";
  import { goto } from "$app/navigation";

  let email = ''
  let password = ''
  let viewPassword = false
  let passwordFormType: 'password' | 'text' = 'password'
  let confirm_password = ''
  let viewConfirmPassword = false
  let confirmPasswordFormType: 'password' | 'text' = 'password'

  export let error_message = ''
  export let message = ''

  const clickHandler = (): void => {
    viewPassword = !viewPassword
    if (viewPassword) passwordFormType = 'text'
    else passwordFormType = 'password'
  }

  const clickConfirmHandler = (): void => {
    viewConfirmPassword = !viewConfirmPassword
    if (viewConfirmPassword) confirmPasswordFormType = 'text'
    else confirmPasswordFormType = 'password'
  }

  const signup = async () => {
    if (password !== confirm_password) {
      error_message = 'パスワードが一致しません。'
      setTimeout(() => {
        error_message = ''
        goto('/auth')
      }, 2000);
      return
    }

    const { error } = await supabase.auth.signUp({
      email, password
    })

    if (error) {
      error_message = error.message
      setTimeout(() => {
        error_message = ''
      }, 2000);
    } else {
      message = 'メールをご確認ください。'
      setTimeout(() => {
        message = ''
      }, 2000);
      goto('/auth')
    }
  }
</script>

<form on:submit|preventDefault={signup} >
  <div class="text-center">
    <Heading tag="h3">SignUp</Heading>
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

  <Label for="confirm_password">confirm</Label>
  <Input
    id="confirm_password"
    name="confirm_password"
    bind:value={confirm_password}
    type={confirmPasswordFormType}
    required
  >
    <button type="button" class="h-1/2" slot="right" on:click={clickConfirmHandler}>
      {#if viewConfirmPassword}
        <FaRegEye />
        {:else}
        <FaRegEyeSlash />
      {/if}
    </button>
  </Input>
  <button class="submit" >サインアップ</button>
  <div class="ml-auto mr-0 w-fit mt-3">
    <A href="/auth">> signin</A>
  </div>
</form>