<script>
	import "../app.postcss";
	import './styles.css';
	import Header from '../components/Header.svelte';

	export let data;
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
