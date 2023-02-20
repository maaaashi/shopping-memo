<script lang="ts">
  import { Button, Navbar, NavBrand, NavHamburger, NavLi, NavUl } from 'flowbite-svelte'
  import { Datepicker } from 'svelte-calendar';
  import { storeSelectDate } from '../store/date';
  import rep from '$lib/images/rep.jpeg'
  import supabase from '$lib/supabase';
  import { sessionStore } from '../store/session';
  import FaRegCalendarAlt from 'svelte-icons/fa/FaRegCalendarAlt.svelte'

  const logout = async () => {
    await supabase.auth.signOut()
  }
</script>

<Navbar let:hidden let:toggle>
  <NavBrand href="/">
    <img
      src={rep}
      class="mr-3 h-6 sm:h-9"
    />
    <div class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
      SHOPPING-MEMO
    </div>
  </NavBrand>
  {#if $sessionStore}
    <Datepicker bind:selected={$storeSelectDate} let:key let:send let:receive>
      <button class="border rounded-lg" in:receive|local={{ key }} out:send|local={{ key }}>
        <div class="block md:hidden h-10 p-1">
          <FaRegCalendarAlt />
        </div>
        <div class="hidden md:block">
          <Button color="light">
            日付変更
          </Button>
        </div>
      </button>
    </Datepicker>
    <NavHamburger on:click={toggle} />
    <NavUl {hidden}>
      <NavLi>
        <Button color="light" on:click={logout}>ログアウト</Button>
      </NavLi>
    </NavUl>
  {/if}
</Navbar>