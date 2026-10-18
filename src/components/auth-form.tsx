import { Link, useNavigate } from '@tanstack/react-router';
import { useEffect, useState, type FormEvent } from 'react';
import { ArrowRight, Eye, EyeOff, Loader2, Mail, ShieldCheck } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable/index';
import '@lovable.dev/cloud-auth-js/styles.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/auth';

export function AuthForm({ signup = false }: { signup?: boolean }) {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [busy, setBusy] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  useEffect(() => { if (!loading && user) void navigate({ to: '/', replace: true }); }, [user, loading, navigate]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError(''); setNotice('');
    const fields = new FormData(event.currentTarget);
    const email = String(fields.get('email')).trim();
    const password = String(fields.get('password'));
    try {
      if (signup) {
        const { data, error } = await supabase.auth.signUp({ email, password, options: {
          emailRedirectTo: window.location.origin,
          data: { display_name: String(fields.get('name')).trim() },
        } });
        if (error) throw error;
        if (!data.session) setNotice('Check your email to confirm your account, then sign in.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        await navigate({ to: '/', replace: true });
      }
    } catch (error) { setError(error instanceof Error ? error.message : 'Unable to continue. Please try again.'); }
    finally { setBusy(false); }
  }
  async function social(provider: 'google' | 'lovable') {
    setBusy(true); setError('');
    try {
      const result = await lovable.auth.signInWithOAuth(provider, { redirect_uri: window.location.origin });
      if (result.error) { setError(result.error.message); return; }
      if (!result.redirected) await navigate({ to: '/', replace: true });
    } catch { setError('Sign-in could not complete. Please try again.'); }
    finally { setBusy(false); }
  }
  return <section className="mx-auto max-w-md px-6 pb-12 pt-14 sm:pt-20">
    <p className="text-xs font-medium uppercase tracking-normal text-success">EMB Connect · Your account</p>
    <h1 className="mt-3 font-sans text-3xl font-semibold tracking-normal">{signup ? 'Create your account' : 'Welcome back'}</h1>
    <p className="mt-3 text-sm text-muted-foreground">{signup ? 'Join the African embroidery community.' : 'Sign in to your EMB Connect account.'}</p>
    <div className="mt-8 grid gap-3">
      <Button variant="outline" className="h-11 w-full" disabled={busy} onClick={() => social('google')}><span className="text-base font-semibold" aria-hidden>G</span> Continue with Google</Button>
      <Button type="button" className="lovable-auth-button w-full" disabled={busy} onClick={() => social('lovable')}>Continue with Lovable</Button>
    </div>
    <div className="my-6 flex items-center gap-4 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border"/>or with email<span className="h-px flex-1 bg-border"/></div>
    {notice ? <div role="status" className="space-y-4 rounded-lg border p-6"><Mail className="text-success"/><h2 className="font-sans text-xl font-medium">Check your inbox</h2><p className="text-sm text-muted-foreground">{notice}</p><Link to="/auth" className="text-sm font-medium underline">Back to sign in</Link></div> : <form onSubmit={submit} className="space-y-5">
      {signup && <div><label htmlFor="name" className="mb-2 block text-sm font-medium">Full name</label><Input id="name" name="name" autoComplete="name" required maxLength={100} className="h-11" placeholder="Your full name"/></div>}
      <div><label htmlFor="email" className="mb-2 block text-sm font-medium">Email address</label><Input id="email" name="email" type="email" autoComplete="email" required className="h-11" placeholder="you@example.com"/></div>
      <div><div className="mb-2 flex items-center justify-between"><label htmlFor="password" className="text-sm font-medium">Password</label>{!signup && <Link to="/forgot-password" className="text-xs text-muted-foreground underline">Forgot password?</Link>}</div><div className="relative"><Input id="password" name="password" type={visible ? 'text' : 'password'} autoComplete={signup ? 'new-password' : 'current-password'} required minLength={signup ? 8 : undefined} className="h-11 pr-12" placeholder={signup ? 'Create a password' : 'Your password'}/><Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1" aria-label={visible ? 'Hide password' : 'Show password'} onClick={() => setVisible(!visible)}>{visible ? <EyeOff/> : <Eye/>}</Button></div></div>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      <Button type="submit" disabled={busy || loading} className="h-11 w-full bg-foreground text-background hover:bg-foreground/90">{busy ? <Loader2 className="animate-spin"/> : <ArrowRight/>}{signup ? 'Create account' : 'Sign in'}</Button>
    </form>}
    <p className="mt-7 text-center text-sm text-muted-foreground">{signup ? 'Already have an account? ' : 'New to EMB Connect? '}<Link to={signup ? '/auth' : '/signup'} className="font-medium text-foreground underline">{signup ? 'Sign in' : 'Create account'}</Link></p>
    <p className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="h-4 w-4"/> Secure account access</p>
  </section>;
}