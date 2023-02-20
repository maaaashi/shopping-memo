import { writable, type Writable } from "svelte/store";
import type { AuthSession } from '@supabase/supabase-js'
export const sessionStore: Writable<AuthSession | null> = writable()