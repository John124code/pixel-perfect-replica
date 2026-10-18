import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { authHead } from '@/lib/auth';
export const Route = createFileRoute('/forgot-password')({ head: () => authHead('Forgot password', 'Recover access to your EMB Connect account.'), component: ForgotPassword });
function ForgotPassword() {
  const [busy, setBusy] = useState(false); const [message, setMessage] = useState(''); const [error, setError] = useState('');
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); const email = String(new FormData(e.currentTarget).get('email')).trim(); setBusy(true); setError('');
    try { const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` }); if (error) throw error; setMessage('If an account exists for this email, you’ll receive a password reset link.'); }
    catch (e) { setError(e instanceof Error ? e.message : 'Please try again.'); } finally { setBusy(false); }
  }
  return <section className="mx-auto max-w-md px-6 py-20"><h1 className="font-sans text-3xl font-semibold">Reset your password</h1><p className="mt-3 text-sm text-muted-foreground">We’ll send you a secure reset link.</p>{message ? <p role="status" className="mt-8 text-sm">{message}</p> : <form onSubmit={submit} className="mt-8 space-y-5"><label htmlFor="email" className="block text-sm font-medium">Email address</label><Input id="email" type="email" name="email" required autoComplete="email" className="h-11"/>{error && <p role="alert" className="text-sm text-destructive">{error}</p>}<Button disabled={busy} className="h-11 w-full bg-foreground text-background hover:bg-foreground/90">{busy ? 'Sending…' : 'Send reset link'}</Button></form>}<Link to="/auth" className="mt-6 inline-block text-sm underline">Back to sign in</Link></section>;
}