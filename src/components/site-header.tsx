import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Search, ShoppingBag, User } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none" className="text-gold" aria-hidden>
        <circle cx="16" cy="16" r="14.5" stroke="currentColor" strokeWidth="1" />
        <path d="M7 19c4-9 8 6 12-3s5-4 6-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="25" cy="14" r="1.4" fill="currentColor" />
      </svg>
      <span className="font-display text-2xl tracking-tight">
        EMB <span className="italic text-gold">Connect</span>
      </span>
    </Link>
  );
}

const nav = [
  { to: "/marketplace", label: "Marketplace" },
  { to: "/how-it-works", label: "How it Works" },
  { to: "/digitizing", label: "Digitizing" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const { items } = useCart();
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 py-4">
        <Logo />
        <nav className="hidden gap-9 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-sm text-gold" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <span className="hidden rounded-full border px-3 py-1 text-xs sm:inline">₦ NGN</span>
          <Link to="/marketplace" aria-label="Search" className="text-foreground/70 hover:text-gold">
            <Search className="h-[18px] w-[18px]" strokeWidth={1.4} />
          </Link>
          <Link to="/cart" aria-label="Cart" className="relative text-foreground/70 hover:text-gold">
            <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.4} />
            {items.length > 0 && (
              <span className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-gold text-[10px] font-medium text-primary-foreground">
                {items.length}
              </span>
            )}
          </Link>
          <AccountMenu />
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-12 md:flex-row md:items-center">
        <Logo />
        <p className="text-xs text-muted-foreground">© 2026 EMB Connect · Machine-ready African embroidery</p>
      </div>
    </footer>
  );
}

export function PageIntro({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-12 pt-20">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-4 text-5xl md:text-6xl">{title}</h1>
      {sub && <p className="mt-4 max-w-xl text-muted-foreground">{sub}</p>}
    </div>
  );
}

function AccountMenu() {
  const [open, setOpen] = useState(false);
  const { user, profile, loading } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    const { error } = await supabase.auth.signOut();
    if (error) { toast.error(error.message); return; }
    await navigate({ to: '/auth', replace: true });
  }
  const item = "block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-accent";
  return (
    <div className="relative" onMouseLeave={() => setOpen(false)}>
      <Button variant="outline" size="icon" onClick={() => setOpen(!open)} aria-label={user ? 'Your account' : 'Account'} aria-expanded={open} className="h-8 w-8 rounded-full text-foreground/70">
        <User className="h-4 w-4" strokeWidth={1.4} />
      </Button>
      {open && (
        <div className="absolute right-0 top-full z-50 w-56 pt-2">
          <div className="rounded-xl border bg-popover p-1.5 shadow-soft" onClick={() => setOpen(false)}>
            <p className="break-words px-3 py-2 text-xs text-muted-foreground">{loading ? 'Loading account…' : user ? profile?.display_name || user.email : 'Sign in to EMB Connect'}</p>
            {!user && !loading && <><Link to="/auth" className={item}>Sign in</Link><Link to="/signup" className={item}>Create account</Link></>}
            {user && <Button variant="ghost" onClick={signOut} className="w-full justify-start">Sign out</Button>}
            <div className="my-1 h-px bg-border" />
            <Link to="/dashboard" className={item}>Buyer dashboard</Link>
            <Link to="/seller" className={item}>Seller portal</Link>
          </div>
        </div>
      )}
    </div>
  );
}
