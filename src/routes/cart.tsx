import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { formatNaira } from "@/lib/data";
import { PageIntro } from "@/components/site-header";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Cart & Checkout — EMB Connect" },
      { name: "description", content: "Review your embroidery files and pay with Paystack, Flutterwave or bank transfer." },
      { property: "og:title", content: "Cart & Checkout — EMB Connect" },
      { property: "og:description", content: "Secure checkout for machine-ready embroidery files." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Cart,
});

const gateways = [
  { id: "paystack", name: "Paystack", note: "Cards, bank, USSD — instant download." },
  { id: "flutterwave", name: "Flutterwave", note: "Cards and mobile money — instant download." },
  { id: "bank", name: "Direct Bank Transfer", note: "Files are released once our team verifies your payment (usually within 2 hours)." },
];

function Cart() {
  const { items, remove, total, clear } = useCart();
  const [pay, setPay] = useState("paystack");
  return (
    <>
      <PageIntro eyebrow="Checkout" title="Your cart" />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_400px]">
        <div className="divide-y border-y">
          {items.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-muted-foreground">Your cart is empty.</p>
              <Link to="/marketplace" className="mt-4 inline-block text-highlight">Browse the marketplace →</Link>
            </div>
          )}
          {items.map((d) => (
            <div key={d.id} className="flex items-center gap-5 py-5">
              <img src={d.image} alt={d.title} className="h-20 w-20 rounded-xl border object-cover" />
              <div className="flex-1">
                <p className="font-normal">{d.title}</p>
                <p className="text-xs text-muted-foreground">{d.designer} · {d.formats.join(" / ")}</p>
              </div>
              <p>{formatNaira(d.price)}</p>
              <button onClick={() => remove(d.id)} aria-label="Remove" className="text-muted-foreground hover:text-destructive"><X className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
        <aside className="h-fit rounded-2xl border p-7">
          <p className="eyebrow">Payment method</p>
          <div className="mt-5 space-y-3">
            {gateways.map((g) => (
              <label key={g.id} className={`block cursor-pointer rounded-xl border p-4 transition ${pay === g.id ? "border-highlight bg-highlight-soft" : "hover:border-highlight/50"}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" checked={pay === g.id} onChange={() => setPay(g.id)} className="accent-[var(--highlight)]" />
                  <span className="text-sm font-normal">{g.name}</span>
                </div>
                <p className="mt-1.5 pl-6 text-xs text-muted-foreground">{g.note}</p>
              </label>
            ))}
          </div>
          <div className="mt-6 flex justify-between border-t pt-5">
            <span className="text-muted-foreground">Total</span>
            <span className="text-xl">{formatNaira(total)}</span>
          </div>
          <button
            disabled={!items.length}
            onClick={() => { toast.success("Order placed — files available in My Downloads"); clear(); }}
            className="mt-6 w-full rounded-full bg-highlight py-3.5 text-sm text-primary-foreground transition hover:shadow-glow disabled:opacity-40"
          >
            Pay {formatNaira(total)}
          </button>
        </aside>
      </div>
    </>
  );
}
