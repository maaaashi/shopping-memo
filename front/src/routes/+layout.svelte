<script>
	import "../app.postcss";
	import './styles.css';
	import Header from '$components/Header.svelte';
	import supabase from "$lib/supabase";
	import { onMount } from "svelte";
	import { sessionStore } from "$store/session";

	const getSession = async () => {
		const { data } = await supabase.auth.getSession()
		sessionStore.set(data.session)
	}

  onMount(() => {
		supabase.auth.onAuthStateChange((_event, _session) => {
			sessionStore.set(_session)
    })
  })
</script>

<div class="app">
	<header class="border-b-2">
		<Header />
	</header>

	{#await getSession()}
		ログイン情報取得中...
	{:then session}
		<main>
			<slot></slot>
		</main>
	{/await}

</div>
