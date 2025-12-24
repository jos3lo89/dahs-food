import { atom, map } from "nanostores";
import { persistentAtom, persistentMap } from "@nanostores/persistent";
import type { Product } from "../data/products";

export interface CartItem extends Product {
  quantity: number;
}

export const cartItems = persistentAtom<Record<string, CartItem>>(
  "cart",
  {},
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);

export const customerName = atom<string>("");
export const customerAddress = atom<string>("");
export const isCartOpen = atom<boolean>(false);

export function addToCart(product: Product, quantity: number = 1) {
  const current = cartItems.get();
  const existingItem = current[product.id];

  cartItems.set({
    ...current,
    [product.id]: {
      ...product,
      quantity: existingItem ? existingItem.quantity + quantity : quantity,
    },
  });
}

export function updateQuantity(productId: string, quantity: number) {
  const current = cartItems.get();
  if (current[productId]) {
    cartItems.set({
      ...current,
      [productId]: { ...current[productId], quantity: Math.max(0, quantity) },
    });
  }
}

export function removeFromCart(productId: string) {
  const current = cartItems.get();
  const updated = { ...current };
  delete updated[productId];
  cartItems.set(updated);
}

export function clearCart() {
  cartItems.set({});
  customerName.set("");
  customerAddress.set("");
}

export function getCartTotal(): number {
  return Object.values(cartItems.get()).reduce(
    (t, i) => t + i.price * i.quantity,
    0
  );
}

export function getCartCount(): number {
  const items = Object.values(cartItems.get());
  return items.reduce((count, item) => count + item.quantity, 0);
}

export function generateWhatsAppMessage(): string {
  const items = Object.values(cartItems.get());
  const name = customerName.get();
  const address = customerAddress.get();
  const total = getCartTotal();

  let message = "🍽 *Nuevo Pedido de Desayunos*\n\n";

  items.forEach((item) => {
    message += `${item.name} x${item.quantity} = S/ ${(
      item.price * item.quantity
    ).toFixed(2)}\n`;
  });

  message += `\n*Total a pagar: S/ ${total.toFixed(2)}*\n\n`;
  message += `👤 Cliente: ${name}\n`;
  message += `📍 Dirección: ${address}`;

  return encodeURIComponent(message);
}
