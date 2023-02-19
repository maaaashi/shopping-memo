<script lang="ts">
  import { Navbar, NavBrand } from 'flowbite-svelte'
  import { Datepicker } from 'svelte-calendar';
  import { page } from '$app/stores';
  import { storeSelectDate } from '../store';
  import rep from '$lib/images/rep.jpeg'
</script>

<Navbar>
  <NavBrand href="/">
    <img
      src={rep}
      class="mr-3 h-6 sm:h-9"
    />
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
      SHOPPING-MEMO
    </span>
  </NavBrand>

  {#if $page.url.pathname !== '/auth'}
    <Datepicker bind:selected={$storeSelectDate}/>
  {/if}
</Navbar>