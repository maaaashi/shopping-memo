import { getSupabase } from '@supabase/auth-helpers-sveltekit';

/** @type {import('./$types').Actions} */
export const actions = {
	login: async (event) => {
    const { supabaseClient } = await getSupabase(event)
    const formData = await event.request.formData();
    const email = formData.get('email');
    const password = formData.get('password');

    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    })

    let status = 200
    if (error) status = error.status!

    return {
      status: status
    }
  },
};