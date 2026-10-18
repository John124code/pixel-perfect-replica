import { createContext, useContext } from 'react';
import type { User } from '@supabase/supabase-js';

export interface AuthState {
  user: User | null;
  loading: boolean;
  recovery: boolean;
  profile: { display_name: string; avatar_url: string | null } | null;
}
export const AuthContext = createContext<AuthState>({ user: null, loading: true, recovery: false, profile: null });
export function useAuth() { return useContext(AuthContext); }

export function authHead(title: string, description: string) {
  return { meta: [{ title: `${title} — EMB Connect` }, { name: 'description', content: description },
    { property: 'og:title', content: `${title} — EMB Connect` }, { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] };
}