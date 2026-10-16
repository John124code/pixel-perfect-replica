import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { CartProvider, useCart } from "@/lib/cart";
import { designs } from "@/lib/data";

const [first, second, third] = designs;
if (!first || !second || !third) throw new Error("the catalogue needs at least three designs");

function Consumer() {
  const { items, add } = useCart();
  return (
    <div>
      <button onClick={() => add(first)}>add first design</button>
      <span data-testid="count">{items.length}</span>
      <span data-testid="titles">{items.map((i) => i.title).join(",")}</span>
    </div>
  );
}

const readStorage = () => JSON.parse(localStorage.getItem("emb-cart") ?? "[]") as string[];

describe("Cart persistence", () => {
  beforeEach(() => localStorage.clear());

  it("writes an added design to localStorage", () => {
    render(
      <CartProvider>
        <Consumer />
      </CartProvider>,
    );

    fireEvent.click(screen.getByText("add first design"));

    expect(screen.getByTestId("count").textContent).toBe("1");
    expect(readStorage()).toEqual([first.id]);
  });

  it("restores the cart when the app starts again", async () => {
    localStorage.setItem("emb-cart", JSON.stringify([second.id, third.id]));

    render(
      <CartProvider>
        <Consumer />
      </CartProvider>,
    );

    await waitFor(() => expect(screen.getByTestId("count").textContent).toBe("2"));
    expect(screen.getByTestId("titles").textContent).toBe(`${second.title},${third.title}`);
  });

  it("drops saved ids that are no longer in the catalogue", async () => {
    localStorage.setItem("emb-cart", JSON.stringify(["removed-design", first.id]));

    render(
      <CartProvider>
        <Consumer />
      </CartProvider>,
    );

    await waitFor(() => expect(screen.getByTestId("count").textContent).toBe("1"));
    expect(screen.getByTestId("titles").textContent).toBe(first.title);
  });
});
