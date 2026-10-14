import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
          <DropdownMenu>
            <DropdownMenuTrigger aria-label="Account" className="grid h-8 w-8 place-items-center rounded-full border text-foreground/70 hover:border-gold hover:text-gold">
              <User className="h-4 w-4" strokeWidth={1.4} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal text-muted-foreground">Sign in to EMB Connect</DropdownMenuLabel>
              <DropdownMenuItem>Continue with Google</DropdownMenuItem>
              <DropdownMenuItem>Continue with Email</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><Link to="/dashboard">Buyer dashboard</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link to="/seller">Seller portal</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link to="/admin">Admin panel</Link></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
