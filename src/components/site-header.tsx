import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag, User } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-[11px] font-semibold tracking-tight text-primary-foreground">EC</span>
      <span className="text-lg font-medium tracking-tight text-foreground">
        EMB Connect
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
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/75 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 py-4">
        <Logo />
        <nav className="hidden gap-9 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-sm text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <span className="hidden rounded-full border px-3 py-1 text-xs sm:inline">₦ NGN</span>
          <Link to="/marketplace" aria-label="Search" className="text-foreground/70 hover:text-foreground">
            <Search className="h-[18px] w-[18px]" strokeWidth={1.4} />
          </Link>
          <Link to="/cart" aria-label="Cart" className="relative text-foreground/70 hover:text-foreground">
            <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.4} />
            {items.length > 0 && (
              <span className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
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
  const item = "block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-accent";
  return (
    <div className="relative" onMouseLeave={() => setOpen(false)}>
      <button onClick={() => setOpen(!open)} aria-label="Account" className="grid h-8 w-8 place-items-center rounded-full border text-foreground/70 hover:border-foreground hover:text-foreground">
        <User className="h-4 w-4" strokeWidth={1.4} />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 w-56 pt-2">
          <div className="rounded-xl border bg-popover p-1.5 shadow-soft" onClick={() => setOpen(false)}>
            <p className="px-3 py-2 text-xs text-muted-foreground">Sign in to EMB Connect</p>
            <button className={item}>Continue with Google</button>
            <button className={item}>Continue with Email</button>
            <div className="my-1 h-px bg-border" />
            <Link to="/dashboard" className={item}>Buyer dashboard</Link>
            <Link to="/seller" className={item}>Seller portal</Link>
            <Link to="/admin" className={item}>Admin panel</Link>
          </div>
        </div>
      )}
    </div>
  );
}
