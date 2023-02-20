// import { error } from '@sveltejs/kit';
import { redirect } from "@sveltejs/kit";
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
  const { session } = await getSupabase(event)
  const pathname = event.url.pathname

  console.log(Boolean(session) + ' : ' +  pathname)
  if (!session && pathname !== '/auth') {
    throw redirect(307, '/auth')
  }

  if (session && pathname !== '/') {
    throw redirect(307, '/')
  }

  return session
}