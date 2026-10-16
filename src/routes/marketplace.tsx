import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { designs } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { PageIntro } from "@/components/site-header";

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "Marketplace — EMB Connect" },
      { name: "description", content: "Browse machine-ready Agbada, Senator, Kaftan, Dansiki, Cap and Gele embroidery files." },
      { property: "og:title", content: "Marketplace — EMB Connect" },
      { property: "og:description", content: "Browse machine-ready African embroidery files." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Marketplace,
});

const cats = ["All", "Agbada", "Senator / Kaftan", "Dansiki", "Caps", "Women's"];

function Marketplace() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const list = designs.filter(
    (d) => (cat === "All" || d.category === cat) && d.title.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <>
      <PageIntro eyebrow="Marketplace" title="Every stitch, ready." sub="Filter by garment and download instantly after checkout." />
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-4 border-y py-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`rounded-full border px-4 py-1.5 text-xs transition ${cat === c ? "border-highlight bg-highlight text-primary-foreground" : "hover:border-highlight"}`}>{c}</button>
            ))}
          </div>
          <label className="flex items-center gap-2 rounded-full border px-4 py-2">
            <Search className="h-4 w-4 text-muted-foreground" strokeWidth={1.4} />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search designs" className="bg-transparent text-sm outline-none" />
          </label>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
          {list.map((d, i) => <ProductCard key={d.id} d={d} index={i} />)}
        </div>
        {list.length === 0 && <p className="py-20 text-center text-muted-foreground">No designs match your search.</p>}
      </div>
    </>
  );
}
