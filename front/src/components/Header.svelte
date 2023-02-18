<script lang="ts">
  import { Navbar, NavBrand } from 'flowbite-svelte'
  import { Datepicker } from 'svelte-calendar';
  import { page } from '$app/stores';

</script>

<Navbar>
  <NavBrand href="/">
    <img
      src="https://flowbite.com/docs/images/logo.svg"
      class="mr-3 h-6 sm:h-9"
      alt="Flowbite Logo"
    />
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
      SHOPPING-MEMO
    </span>
  </NavBrand>

  {#if $page.url.pathname !== '/auth'}
    <Datepicker />
  {/if}
</Navbar>