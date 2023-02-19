// import { error } from '@sveltejs/kit';
import { redirect } from "@sveltejs/kit";
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
  const { session } = await getSupabase(event)
  if (!session && event.url.pathname !== '/auth') {
    throw redirect(301, '/auth')
  }

  if (event.url.pathname === '/auth') {
    throw redirect(301, '/')
  }

  return session
}