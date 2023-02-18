<script>
	import "../app.postcss";
	import './styles.css';
	import Header from '../components/Header.svelte';
</script>

<div class="app">
	<Header></Header>

	<main>
		<slot></slot>
	</main>
</div>
