<script>
	import "../app.postcss";
	import './styles.css';
	import Header from '../components/Header.svelte';
	import { onMount } from "svelte";
	import supabase from "$lib/supabase";
  import { invalidate } from "$app/navigation";
  import { Button } from "flowbite-svelte";

	export let data;
	onMount(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(() => {
      invalidate('supabase:auth');
    });

    return () => {
      subscription.unsubscribe();
    };
  });
</script>

<div class="app">
	<header class="border-b-2">
		<Header />
	</header>

	{#if data?.user}
		<main>
			<slot></slot>
		</main>
	{:else}
		<div class="h-fit w-4/5 sm:w-3/5 lg:w-2/5 mx-auto mt-10 p-5 border bg-gray-100 rounded-lg text-center">
			<p class="mb-5">サインインしてご利用ください。</p>
			<Button href="/auth">GO SignIn</Button>
		</div>
	{/if}
</div>
