import { Heart } from "lucide-react";
import { formatNaira, type Design } from "@/lib/data";
import { useCart } from "@/lib/cart";

export function ProductCard({ d, index = 0 }: { d: Design; index?: number }) {
  const { add } = useCart();
  return (
    <div className="group animate-fade-up" style={{ animationDelay: `${index * 70}ms` }}>
      <div className="relative aspect-square overflow-hidden rounded-2xl border bg-card transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:border-foreground/30 group-hover:shadow-glow">
        <img src={d.image} alt={d.title} loading="lazy" width={816} height={816} className="h-full w-full object-cover grayscale contrast-125 brightness-90 transition-transform duration-700 ease-out opacity-90 group-hover:scale-[1.06] group-hover:opacity-100" />
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[10px] tracking-wide backdrop-blur">
          {(d.stitches / 1000).toFixed(1)}k stitches
        </span>
        <button aria-label="Save" className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-background/90 text-foreground/60 hover:text-highlight">
          <Heart className="h-4 w-4" strokeWidth={1.4} />
        </button>
        <button
          onClick={() => add(d)}
          className="absolute inset-x-3 bottom-3 translate-y-[140%] rounded-full bg-highlight py-3 text-sm font-normal text-primary-foreground shadow-glow transition-transform duration-500 ease-out group-hover:translate-y-0"
        >
          Add to Cart
        </button>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-sans text-[15px] font-normal">{d.title}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">by {d.designer}</p>
          <div className="mt-2 flex gap-1.5">
            {d.formats.map((f) => (
              <span key={f} className="rounded-md border bg-card px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">{f}</span>
            ))}
          </div>
        </div>
        <p className="rounded-full border px-2.5 py-0.5 text-[13px] font-medium">{formatNaira(d.price)}</p>
      </div>
    </div>
  );
}
