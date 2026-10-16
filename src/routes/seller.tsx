import { createFileRoute } from "@tanstack/react-router";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { designs, formatNaira } from "@/lib/data";
import { PageIntro } from "@/components/site-header";

export const Route = createFileRoute("/seller")({
  head: () => ({
    meta: [
      { title: "Seller Portal — EMB Connect" },
      { name: "description", content: "Upload DST and EMB designs, track revenue and manage listings." },
      { property: "og:title", content: "Seller Portal — EMB Connect" },
      { property: "og:description", content: "The digitizer's workspace on EMB Connect." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Seller,
});

const mine = designs.filter((d) => d.designer === "Tunde Stitchworks" || d.designer === "Ade Digitals");

function Seller() {
  return (
    <>
      <PageIntro eyebrow="Digitizer portal" title="Your studio." />
      <div className="mx-auto max-w-7xl space-y-10 px-6">
        <div className="grid gap-5 sm:grid-cols-3">
          {[["Revenue (30d)", formatNaira(684000)], ["Sales", "71"], ["Active listings", String(mine.length)]].map(([k, v]) => (
            <div key={k} className="rounded-2xl border p-7"><p className="text-xs text-muted-foreground">{k}</p><p className="mt-3 font-display text-4xl">{v}</p></div>
          ))}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); toast.success("Design submitted for review"); }} className="grid gap-6 rounded-2xl border p-8 md:grid-cols-2">
          <div className="space-y-4">
            <p className="eyebrow">New listing</p>
            <input required placeholder="Design title" className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-foreground" />
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="Price (₦)" type="number" className="rounded-xl border px-4 py-3 text-sm outline-none focus:border-foreground" />
              <input placeholder="Stitch count" type="number" className="rounded-xl border px-4 py-3 text-sm outline-none focus:border-foreground" />
            </div>
            <select className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-foreground">
              {["Agbada", "Senator / Kaftan", "Dansiki", "Caps", "Women's"].map((c) => <option key={c}>{c}</option>)}
            </select>
            <button className="rounded-full bg-primary px-7 py-3 text-sm text-primary-foreground hover:shadow-glow">Publish design</button>
          </div>
          <div className="grid gap-3">
            {[["Design files", ".dst,.emb", ".DST / .EMB"], ["Preview images", "image/*", "JPG / PNG"]].map(([l, a, h]) => (
              <label key={l} className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center hover:border-foreground">
                <Upload className="h-5 w-5 text-foreground" strokeWidth={1.3} />
                <span className="mt-2 text-sm">{l}</span>
                <span className="text-xs text-muted-foreground">{h}</span>
                <input type="file" accept={a} multiple className="hidden" />
              </label>
            ))}
          </div>
        </form>
        <div className="overflow-hidden rounded-2xl border">
          <table className="w-full text-sm">
            <thead className="bg-muted text-left text-xs text-muted-foreground"><tr><th className="p-4 font-normal">Design</th><th className="p-4 font-normal">Price</th><th className="p-4 font-normal">Sales</th><th className="p-4 font-normal">Status</th></tr></thead>
            <tbody className="divide-y">
              {mine.map((d, i) => (
                <tr key={d.id}><td className="p-4">{d.title}</td><td className="p-4">{formatNaira(d.price)}</td><td className="p-4">{12 + i * 7}</td><td className="p-4"><span className="rounded-full bg-secondary px-2.5 py-1 text-xs text-foreground">Live</span></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
