import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, ShieldCheck, Lock, Download, ArrowUpRight, ArrowRight, Asterisk } from "lucide-react";
import { categories, designs } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "EMB Connect — African Embroidery, Reimagined" },
    { name: "description", content: "Discover curated machine-ready African embroidery designs. Browse Agbada, Senator, Kaftan and more in DST and EMB formats." },
    { property: "og:title", content: "EMB Connect — African Embroidery, Reimagined" },
    { property: "og:description", content: "Curated machine-ready African embroidery designs in DST and EMB formats." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Home,
});
const tags = ["#AgbadaMasterpieces", "#DSTFormat", "#InstantDownload", "#SenatorKaftan", "#WilcomEMB"];

function Home() {
  return <>
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-16 md:pb-20 md:pt-24">
        <div className="mb-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground"><span className="h-1.5 w-1.5 rounded-full bg-foreground" /> African craft. Digital precision.</div>
        <h1 className="max-w-5xl text-5xl font-medium leading-[1.1] sm:text-6xl md:text-7xl">EMB Connect<span className="mt-3 block text-muted-foreground">Every stitch. Reimagined.</span></h1>
        <div className="mt-8 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <p className="max-w-md text-base leading-7 text-muted-foreground">Extraordinary African embroidery, ready for your machine. Discover the next detail that makes your work unmistakable.</p>
          <Button asChild variant="outline" className="h-11 self-start md:self-auto"><Link to="/marketplace">Explore designs <ArrowUpRight /></Link></Button>
        </div>
        <form action="/marketplace" className="mt-10 flex max-w-2xl items-center gap-3 rounded-lg border bg-card p-2">
          <Search className="ml-3 h-5 w-5 shrink-0 text-muted-foreground" strokeWidth={1.5} />
          <input name="q" aria-label="Search embroidery designs" placeholder="Find your next design..." className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground" />
          <Button type="submit" className="h-11 px-4 sm:px-6"><span className="hidden sm:inline">Search</span><ArrowRight /></Button>
        </form>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="mr-2 text-xs text-muted-foreground">Popular</span>
          {categories.slice(0, 4).map(c => <Button key={c.name} asChild variant="outline" size="sm" className="rounded-full font-normal"><Link to="/marketplace">{c.name}</Link></Button>)}
        </div>
      </div>
      <div className="overflow-hidden border-y bg-card py-6" aria-label="Popular design tags">
        <div className="marquee-track">
          {[false, true].map(duplicate => <div key={String(duplicate)} className="marquee-group" aria-hidden={duplicate || undefined}>
            {tags.map(tag => <span key={tag} className="flex items-center gap-12 whitespace-nowrap font-display text-lg text-muted-foreground"><Asterisk className="h-4 w-4 text-foreground" strokeWidth={1.2} />{tag}</span>)}
          </div>)}
        </div>
      </div>
    </section>
    <section className="border-b">
      <div className="mx-auto grid max-w-7xl gap-5 px-6 py-7 sm:grid-cols-3">
        {[{ i: ShieldCheck, t: "Verified Digitizers" }, { i: Lock, t: "Secure Paystack Payments" }, { i: Download, t: "Instant Post-Checkout Downloads" }].map(({ i: Icon, t }) => <div key={t} className="flex items-center justify-center gap-3 text-xs text-muted-foreground"><Icon className="h-4 w-4 text-foreground" strokeWidth={1.3} />{t}</div>)}
      </div>
    </section>
    <section className="mx-auto max-w-7xl px-6 pt-16 md:pt-20">
      <div className="flex items-end justify-between gap-4"><div><p className="eyebrow">The collections</p><h2 className="mt-3 text-3xl md:text-4xl">Shop by category</h2></div><ArrowUpRight className="h-5 w-5" /></div>
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-5">
        {categories.map(c => <Link key={c.name} to="/marketplace" className="group overflow-hidden rounded-lg border bg-card">
          <div className="aspect-[4/3] overflow-hidden"><img src={c.image} alt={c.name} loading="lazy" width={816} height={816} className="embroidery-image h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
          <div className="flex items-center justify-between gap-2 p-3"><div><p className="text-xs font-medium sm:text-sm">{c.name}</p><p className="mt-1 text-[11px] text-muted-foreground">{c.count} designs</p></div><ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" /></div>
        </Link>)}
      </div>
    </section>
    <section className="mx-auto max-w-7xl px-6 pt-16 md:pt-20">
      <div className="flex items-end justify-between gap-4"><div><p className="eyebrow">Selected for you</p><h2 className="mt-3 text-3xl md:text-4xl">Featured designs</h2></div><Button asChild variant="ghost" className="px-0 text-muted-foreground"><Link to="/marketplace">View all <ArrowUpRight /></Link></Button></div>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4">{designs.slice(0, 8).map(d => <ProductCard key={d.id} d={d} />)}</div>
    </section>
  </>;
}
