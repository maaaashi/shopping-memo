<script lang="ts">
  import { Button, Navbar, NavBrand, NavHamburger, NavLi, NavUl } from 'flowbite-svelte'
  import rep from '$lib/images/rep.jpeg'
  import supabase from '$lib/supabase';
  import { sessionStore } from '$store/session';

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
    <NavHamburger on:click={toggle} />
    <NavUl {hidden}>
      <NavLi>
        <Button color="light" on:click={logout}>ログアウト</Button>
      </NavLi>
    </NavUl>
  {/if}
</Navbar>