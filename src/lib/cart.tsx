import { createContext, useContext, useState, type ReactNode } from "react";
import { toast } from "sonner";
import type { Design } from "./data";

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
