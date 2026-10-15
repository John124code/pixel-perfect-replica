import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site-header";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How it Works — EMB Connect" },
      { name: "description", content: "Find, pay and download machine-ready embroidery files in minutes." },
      { property: "og:title", content: "How it Works — EMB Connect" },
      { property: "og:description", content: "From search to stitch in three steps." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <>
      <PageIntro eyebrow="How it works" title="From search to stitch." />
      <div className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-2xl border bg-border px-0 md:grid-cols-3">
        {[
          ["01", "Discover", "Browse curated designs from verified digitizers by garment, style and stitch count."],
          ["02", "Pay securely", "Checkout with Paystack, Flutterwave or direct bank transfer in Naira."],
          ["03", "Download & stitch", "Get DST and EMB files instantly, with free version updates forever."],
        ].map(([n, t, d]) => (
          <div key={n} className="bg-background p-10">
            <p className="font-display text-5xl text-gold">{n}</p>
            <h3 className="mt-6 text-3xl">{t}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </>
  ),
});
