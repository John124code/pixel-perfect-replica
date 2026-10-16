import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { designs, type Design } from "./data";

const STORAGE_KEY = "emb-cart";

type CartCtx = {
  items: Design[];
  add: (d: Design) => void;
  remove: (id: string) => void;
  clear: () => void;
  total: number;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Design[]>([]);
  const skipWrite = useRef(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const ids: unknown = JSON.parse(raw);
      if (!Array.isArray(ids)) return;
      setItems(ids.map((id) => designs.find((d) => d.id === id)).filter((d): d is Design => Boolean(d)));
    } catch {
      /* ignore unreadable or corrupt storage */
    }
  }, []);

  useEffect(() => {
    if (skipWrite.current) {
      skipWrite.current = false;
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items.map((i) => i.id)));
    } catch {
      /* storage unavailable (private mode, quota) */
    }
  }, [items]);

  const add = (d: Design) => {
    setItems((prev) => (prev.some((i) => i.id === d.id) ? prev : [...prev, d]));
    toast.success(`${d.title} added to cart`);
  };
  const remove = (id: string) => setItems((p) => p.filter((i) => i.id !== id));
  const clear = () => setItems([]);
  const total = items.reduce((s, i) => s + i.price, 0);
  return <Ctx.Provider value={{ items, add, remove, clear, total }}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
}
