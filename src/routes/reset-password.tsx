import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { authHead, useAuth } from '@/lib/auth';
export const Route = createFileRoute('/reset-password')({ head: () => authHead('New password', 'Set a new password for your EMB Connect account.'), component: ResetPassword });
function ResetPassword() {
  const { recovery, user, loading } = useAuth();
  const [linkRecovery, setLinkRecovery] = useState(false); const [busy, setBusy] = useState(false); const [error, setError] = useState(''); const [done, setDone] = useState(false);
  useEffect(() => { setLinkRecovery(new URLSearchParams(window.location.hash.slice(1)).get('type') === 'recovery'); }, []);
  const valid = Boolean(user && (recovery || linkRecovery));
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); if (!valid) return; const fields = new FormData(e.currentTarget); const password = String(fields.get('password'));
    if (password !== fields.get('confirm')) { setError('Passwords do not match.'); return; }
    setBusy(true); setError('');
    try { const { error } = await supabase.auth.updateUser({ password }); if (error) throw error; setDone(true); } catch (e) { setError(e instanceof Error ? e.message : 'Please try again.'); } finally { setBusy(false); }
  }
  return <section className="mx-auto max-w-md px-6 py-20"><h1 className="font-sans text-3xl font-semibold">Set a new password</h1>{loading ? <p className="mt-6">Checking your reset link…</p> : done ? <div role="status" className="mt-6"><p>Your password has been updated.</p><Link to="/" className="mt-4 inline-block underline">Continue to EMB Connect</Link></div> : !valid ? <div className="mt-6"><p className="text-sm text-muted-foreground">This reset link is invalid or expired.</p><Link to="/forgot-password" className="mt-4 inline-block text-sm underline">Request a new link</Link></div> : <form onSubmit={submit} className="mt-8 space-y-5"><div><label htmlFor="password" className="mb-2 block text-sm">New password</label><Input id="password" name="password" type="password" autoComplete="new-password" required minLength={8} className="h-11"/></div><div><label htmlFor="confirm" className="mb-2 block text-sm">Confirm password</label><Input id="confirm" name="confirm" type="password" autoComplete="new-password" required minLength={8} className="h-11"/></div>{error && <p role="alert" className="text-sm text-destructive">{error}</p>}<Button disabled={busy} className="h-11 w-full bg-foreground text-background hover:bg-foreground/90">{busy ? 'Saving…' : 'Update password'}</Button></form>}</section>;
}