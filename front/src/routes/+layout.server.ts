// import { error } from '@sveltejs/kit';
import { redirect } from "@sveltejs/kit";
import supabase from "../supabase";

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
  const session = await supabase.auth.getSession()

  if (session.data.session) {
    return session;
  }

  if (url.pathname !== '/auth') {
    throw redirect(301, '/auth')
  }
}