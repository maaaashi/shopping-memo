<script>
	import "../app.postcss";
	import './styles.css';
	import Header from '../components/Header.svelte';
	import { onMount } from "svelte";
	import supabase from "$lib/supabase";
  import { invalidate } from "$app/navigation";
  import Footer from "../components/AddBox.svelte";

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

	<!-- {@debug data} -->
	<main>
		<slot></slot>
	</main>
</div>
