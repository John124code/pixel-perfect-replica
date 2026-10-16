import { Heart } from "lucide-react";
import { formatNaira, type Design } from "@/lib/data";
import { useCart } from "@/lib/cart";

export function ProductCard({ d }: { d: Design }) {
  const { add } = useCart();
  return (
    <div className="group animate-fade-up rounded-2xl border bg-card p-3 transition duration-500 hover:-translate-y-1 hover:border-foreground/25 hover:shadow-glow">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
        <img src={d.image} alt={d.title} loading="lazy" width={816} height={816} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
        <span className="absolute left-3 top-3 rounded-full bg-background/70 px-2.5 py-1 text-[10px] tracking-wide backdrop-blur">
          {(d.stitches / 1000).toFixed(1)}k stitches
        </span>
        <button aria-label="Save" className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-background/90 text-foreground/60 hover:text-foreground">
          <Heart className="h-4 w-4" strokeWidth={1.4} />
        </button>
        <button
          onClick={() => add(d)}
          className="absolute inset-x-3 bottom-3 translate-y-[140%] rounded-full bg-primary py-3 text-sm font-normal text-primary-foreground shadow-glow transition-transform duration-500 ease-out group-hover:translate-y-0"
        >
          Add to Cart
        </button>
      </div>
      <div className="mt-4 flex items-start px-1 pb-1 justify-between gap-3">
        <div>
          <h3 className="font-sans text-[15px] font-normal">{d.title}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">by {d.designer}</p>
          <div className="mt-2 flex gap-1.5">
            {d.formats.map((f) => (
              <span key={f} className="rounded-md border font-mono px-1.5 py-0.5 text-[10px] text-muted-foreground">.{f}</span>
            ))}
          </div>
        </div>
        <p className="rounded-full border px-2.5 py-1 text-xs font-medium">{formatNaira(d.price)}</p>
      </div>
    </div>
  );
}
