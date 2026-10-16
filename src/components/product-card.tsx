import { Heart, Plus } from "lucide-react";
import { formatNaira, type Design } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";

export function ProductCard({ d }: { d: Design }) {
  const { add } = useCart();
  return (
    <article className="product-entry group overflow-hidden rounded-lg border bg-card transition-transform duration-500 hover:scale-[1.015]">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img src={d.image} alt={d.title} loading="lazy" width={816} height={816} className="embroidery-image h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded border border-foreground/10 bg-background/85 px-2.5 py-1 text-[10px] text-foreground backdrop-blur">
          {(d.stitches / 1000).toFixed(1)}k stitches
        </span>
        <Button variant="ghost" size="icon" aria-label={`Save ${d.title}`} title="Save design" className="absolute right-3 top-3 h-8 w-8 rounded-full bg-background/85 text-foreground">
          <Heart strokeWidth={1.4} />
        </Button>
        <Button onClick={() => add(d)} className="product-add absolute inset-x-3 bottom-3 h-10 translate-y-[140%] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
          <Plus /> Add to Cart
        </Button>
      </div>
      <div className="p-4">
        <p className="mb-2 text-[10px] uppercase tracking-widest text-muted-foreground">{d.category}</p>
        <h3 className="font-sans text-sm font-medium leading-6">{d.title}</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">by {d.designer}</p>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t pt-3">
          <div className="flex gap-1.5">
            {d.formats.map((f) => <span key={f} className="rounded border px-1.5 py-0.5 text-[10px] text-muted-foreground">{f}</span>)}
          </div>
          <p className="text-sm font-semibold tabular-nums">{formatNaira(d.price)}</p>
        </div>
      </div>
    </article>
  );
}
