import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { formatNaira } from "@/lib/data";
import { PageIntro } from "@/components/site-header";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel — EMB Connect" },
      { name: "description", content: "Platform revenue, transactions, vendor approvals and custom requests." },
      { property: "og:title", content: "Admin Panel — EMB Connect" },
      { property: "og:description", content: "EMB Connect platform control center." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Admin,
});

const tx = [
  ["#10482", "Chinedu Tailors", "Paystack", 22000, "Paid"],
  ["#10481", "Bola Couture", "Bank Transfer", 15000, "Awaiting verification"],
  ["#10480", "Hausa Fabrics", "Flutterwave", 9000, "Paid"],
  ["#10479", "Kemi Styles", "Paystack", 13500, "Paid"],
] as const;

function Admin() {
  const [vendors, setVendors] = useState([
    { name: "Ibadan Digitize Hub", designs: 18, status: "Pending" },
    { name: "Port Harcourt Stitch", designs: 7, status: "Pending" },
    { name: "Lagos Needle House", designs: 42, status: "Approved" },
  ]);
  const setStatus = (n: string, s: string) => setVendors((v) => v.map((x) => (x.name === n ? { ...x, status: s } : x)));
  return (
    <>
      <PageIntro eyebrow="Admin" title="Control center." />
      <div className="mx-auto max-w-7xl space-y-10 px-6">
        <div className="grid gap-5 sm:grid-cols-4">
          {[["Platform revenue", formatNaira(4820000)], ["Transactions", "1,284"], ["Vendors", "86"], ["Open requests", "12"]].map(([k, v]) => (
            <div key={k} className="rounded-2xl border p-6"><p className="text-xs text-muted-foreground">{k}</p><p className="mt-3 font-display text-3xl">{v}</p></div>
          ))}
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-2xl border p-6">
            <p className="eyebrow">Transaction log</p>
            <div className="mt-4 divide-y text-sm">
              {tx.map(([id, who, via, amt, st]) => (
                <div key={id} className="flex items-center justify-between py-3">
                  <div><p>{who}</p><p className="text-xs text-muted-foreground">{id} · {via}</p></div>
                  <div className="text-right"><p>{formatNaira(amt)}</p><p className={`text-xs ${st === "Paid" ? "text-success" : "text-gold"}`}>{st}</p></div>
                </div>
              ))}
            </div>
          </section>
          <section className="rounded-2xl border p-6">
            <p className="eyebrow">Vendor approvals</p>
            <div className="mt-4 divide-y text-sm">
              {vendors.map((v) => (
                <div key={v.name} className="flex items-center justify-between py-3">
                  <div><p>{v.name}</p><p className="text-xs text-muted-foreground">{v.designs} designs · {v.status}</p></div>
                  {v.status === "Pending" && (
                    <div className="flex gap-2">
                      <button onClick={() => setStatus(v.name, "Approved")} className="rounded-full bg-gold px-4 py-1.5 text-xs text-primary-foreground">Approve</button>
                      <button onClick={() => setStatus(v.name, "Rejected")} className="rounded-full border px-4 py-1.5 text-xs">Reject</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
        <section className="rounded-2xl border p-6">
          <p className="eyebrow">Custom design requests</p>
          <div className="mt-4 divide-y text-sm">
            {[["Royal crest for wedding agbada", "Agbada", "Quote sent"], ["Church logo on caps (x40)", "Caps", "New"], ["Gele border floral", "Women's", "In production"]].map(([t, c, s]) => (
              <div key={t} className="flex justify-between py-3"><div><p>{t}</p><p className="text-xs text-muted-foreground">{c}</p></div><span className="text-xs text-gold">{s}</span></div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
