import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, ShieldCheck, Lock, Download, ArrowUpRight } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { categories, designs } from "@/lib/data";
import { ProductCard } from "@/components/product-card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EMB Connect — The Gold Standard of African Embroidery" },
      { name: "description", content: "Curated machine-ready DST and EMB files for Agbada, Senator, Kaftan, Dansiki, Caps and Gele from Africa's master digitizers." },
      { property: "og:title", content: "EMB Connect — The Gold Standard of African Embroidery" },
      { property: "og:description", content: "Machine-ready DST and EMB embroidery files from Africa's master digitizers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <img src={hero} alt="Gold embroidery thread on dark fabric" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative mx-auto max-w-7xl px-6 py-32 md:py-44">
          <p className="eyebrow">Machine-ready · DST · EMB</p>
          <h1 className="mt-6 max-w-3xl text-5xl leading-[1.05] text-foreground md:text-7xl">
            The Gold Standard of <em className="text-highlight">African Embroidery.</em>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-foreground/75">
            Curated machine-ready DST and EMB files from Africa's master digitizers.
          </p>
          <form className="mt-10 flex max-w-2xl items-center rounded-full border border-highlight bg-background p-1.5 shadow-soft" onSubmit={(e) => e.preventDefault()}>
            <Search className="ml-4 h-4 w-4 text-muted-foreground" strokeWidth={1.4} />
            <input placeholder="Search Agbada neckline, cap band, gele..." className="flex-1 bg-transparent px-3 py-3 text-sm outline-none placeholder:text-muted-foreground" />
            <Link to="/marketplace" className="rounded-full bg-highlight px-7 py-3 text-sm text-primary-foreground transition hover:shadow-glow">Search</Link>
          </form>
          <div className="mt-6 flex flex-wrap gap-2">
            {["#Agbada", "#SenatorKaftan", "#Dansiki", "#Caps"].map((t) => (
              <Link key={t} to="/marketplace" className="rounded-full border border-foreground/25 px-4 py-1.5 text-xs text-foreground/85 backdrop-blur transition hover:border-highlight hover:text-highlight">{t}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 sm:grid-cols-3">
          {[
            { i: ShieldCheck, t: "Verified Digitizers" },
            { i: Lock, t: "Secure Paystack Payments" },
            { i: Download, t: "Instant Post-Checkout Downloads" },
          ].map(({ i: Icon, t }) => (
            <div key={t} className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
              <Icon className="h-4 w-4 text-highlight" strokeWidth={1.3} /> {t}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pt-28">
        <div className="flex items-end justify-between">
          <div><p className="eyebrow">Browse</p><h2 className="mt-3 text-4xl md:text-5xl">Shop by category</h2></div>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-5">
          {categories.map((c) => (
            <Link key={c.name} to="/marketplace" className="group relative aspect-[3/4] overflow-hidden rounded-2xl border">
              <img src={c.image} alt={c.name} loading="lazy" width={816} height={816} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-xl bg-background/90 px-4 py-3 backdrop-blur">
                <div><p className="text-sm font-normal">{c.name}</p><p className="text-[11px] text-muted-foreground">{c.count} designs</p></div>
                <ArrowUpRight className="h-4 w-4 text-highlight" strokeWidth={1.4} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pt-28">
        <div className="flex items-end justify-between">
          <div><p className="eyebrow">Curated</p><h2 className="mt-3 text-4xl md:text-5xl">Featured designs</h2></div>
          <Link to="/marketplace" className="text-sm text-muted-foreground hover:text-highlight">View all →</Link>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
          {designs.slice(0, 8).map((d) => <ProductCard key={d.id} d={d} />)}
        </div>
      </section>
    </>
  );
}
