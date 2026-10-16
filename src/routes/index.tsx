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
      <section className="relative overflow-hidden border-b bg-hero-overlay">
        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-28 md:pt-36">
          <p className="eyebrow animate-fade-up">Machine-ready · .DST · .EMB</p>
          <h1 className="mt-6 max-w-4xl animate-fade-up text-5xl font-medium leading-[1.02] md:text-7xl">
            The standard for <span className="text-muted-foreground">African embroidery.</span>
          </h1>
          <p className="mt-6 max-w-lg animate-fade-up text-lg text-muted-foreground">
            Curated machine-ready DST and EMB files from Africa's master digitizers.
          </p>
          <form className="mt-10 flex max-w-2xl animate-fade-up items-center rounded-full border bg-card p-1.5 transition focus-within:border-foreground/40" onSubmit={(e) => e.preventDefault()}>
            <Search className="ml-4 h-4 w-4 text-muted-foreground" strokeWidth={1.4} />
            <input placeholder="Search Agbada neckline, cap band, gele..." className="flex-1 bg-transparent px-3 py-3 text-sm outline-none placeholder:text-muted-foreground" />
            <Link to="/marketplace" className="rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition hover:shadow-glow">Search</Link>
          </form>
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((c) => (
              <Link key={c.name} to="/marketplace" className="rounded-full border px-4 py-1.5 text-xs text-muted-foreground transition hover:border-foreground/40 hover:text-foreground">{c.name}</Link>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden border-t py-6 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
          <div className="flex w-max animate-marquee gap-12 hover:[animation-play-state:paused]">
            {[0, 1].flatMap((k) =>
              ["#AgbadaMasterpieces", "#DSTFormat", "#InstantDownload", "#SenatorKaftan", "#WilcomEMB", "#AgbadaMasterpieces", "#DSTFormat", "#InstantDownload", "#SenatorKaftan", "#WilcomEMB"].map((t, i) => (
                <span key={`${k}-${i}`} aria-hidden={k === 1} className="flex items-center gap-12 whitespace-nowrap text-2xl font-medium tracking-tight text-foreground/80 md:text-4xl">
                  {t}<span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                </span>
              )),
            )}
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
              <Icon className="h-4 w-4 text-foreground" strokeWidth={1.3} /> {t}
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
                <ArrowUpRight className="h-4 w-4 text-foreground" strokeWidth={1.4} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pt-28">
        <div className="flex items-end justify-between">
          <div><p className="eyebrow">Curated</p><h2 className="mt-3 text-4xl md:text-5xl">Featured designs</h2></div>
          <Link to="/marketplace" className="text-sm text-muted-foreground hover:text-foreground">View all →</Link>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
          {designs.slice(0, 8).map((d) => <ProductCard key={d.id} d={d} />)}
        </div>
      </section>
    </>
  );
}
