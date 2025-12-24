import { atom, map } from "nanostores";
import { persistentAtom, persistentMap } from "@nanostores/persistent";
import type { Product } from "../data/products";

export interface CartItem extends Product {
  quantity: number;
}

// 1. Usamos persistentAtom con un codificador JSON
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

// 2. Ajustamos las funciones (persistentAtom no usa .setKey, usa .set)
// export function addToCart(product: Product) {
//   const current = cartItems.get();
//   const item = current[product.id];

//   cartItems.set({
//     ...current,
//     [product.id]: item
//       ? { ...item, quantity: item.quantity + 1 }
//       : { ...product, quantity: 1 },
//   });
// }
// export function addToCart(product: Product) {
//   const current = cartItems.get();
//   // Si no existe, lo creamos con 1, si existe sumamos 1
//   const existingItem = current[product.id];

//   cartItems.set({
//     ...current,
//     [product.id]: {
//       ...product,
//       quantity: existingItem ? existingItem.quantity + 1 : 1,
//     },
//   });
// }
export function addToCart(product: Product, quantity: number = 1) {
  const current = cartItems.get();
  const existingItem = current[product.id];

  cartItems.set({
    ...current,
    [product.id]: {
      ...product,
      // Si ya existe en el carrito, sumamos la nueva cantidad a la anterior
      // Si no existe, usamos la cantidad que viene del contador
      quantity: existingItem ? existingItem.quantity + quantity : quantity,
    },
  });
}

// export function updateQuantity(productId: string, quantity: number) {
//   if (quantity <= 0) {
//     removeFromCart(productId);
//     return;
//   }

//   const current = cartItems.get();
//   if (current[productId]) {
//     cartItems.set({
//       ...current,
//       [productId]: { ...current[productId], quantity },
//     });
//   }
// }
export function updateQuantity(productId: string, quantity: number) {
  const current = cartItems.get();
  if (current[productId]) {
    cartItems.set({
      ...current,
      [productId]: { ...current[productId], quantity: Math.max(0, quantity) },
    });
  }
}

// export function removeFromCart(productId: string) {
//   const current = cartItems.get();
//   const updated = { ...current };
//   delete updated[productId];
//   cartItems.set(updated);
// }
export function removeFromCart(productId: string) {
  const current = cartItems.get();
  const updated = { ...current };
  delete updated[productId];
  cartItems.set(updated);
}

// Vaciar carrito
export function clearCart() {
  cartItems.set({});
  customerName.set("");
  customerAddress.set("");
}

// Calcular total
// export function getCartTotal(): number {
//   const items = Object.values(cartItems.get());
//   return items.reduce((total, item) => total + item.price * item.quantity, 0);
// }
export function getCartTotal(): number {
  return Object.values(cartItems.get()).reduce(
    (t, i) => t + i.price * i.quantity,
    0
  );
}

// Obtener cantidad de items
export function getCartCount(): number {
  const items = Object.values(cartItems.get());
  return items.reduce((count, item) => count + item.quantity, 0);
}

// Generar mensaje de WhatsApp
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
