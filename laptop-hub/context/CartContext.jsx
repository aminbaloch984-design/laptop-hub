"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CheckCircle2, Info } from "lucide-react";

const CartContext = createContext(null);

const STORAGE_KEY = "laptophub:cart:v1";
export const FREE_SHIPPING_THRESHOLD = 200000;
export const SHIPPING_FEE = 2500;

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState(null);
  const timer = useRef(null);

  // Load once on the client (localStorage is not available during SSR).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setItems(
            parsed.filter(
              (item) =>
                item &&
                typeof item.id === "string" &&
                typeof item.price === "number" &&
                typeof item.quantity === "number"
            )
          );
        }
      }
    } catch {
      // Corrupt or unavailable storage — start with an empty cart.
    }
    setHydrated(true);
  }, []);

  // Persist after hydration so the server-rendered markup never mismatches.
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage might be full or blocked (private mode) — ignore.
    }
  }, [items, hydrated]);

  const showToast = useCallback((message, tone = "success") => {
    setToast({ message, tone, key: Date.now() });
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 2800);
  }, []);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  const addItem = useCallback(
    (product, quantity = 1) => {
      const max = Number.isFinite(product.stock) ? product.stock : 99;
      setItems((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: Math.min(item.quantity + quantity, max) }
              : item
          );
        }
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            brand: product.brand,
            price: product.price,
            image: product.image ?? null,
            processor: product.processor ?? null,
            ram: product.ram ?? null,
            storage: product.storage ?? null,
            stock: max,
            quantity: Math.min(quantity, max),
          },
        ];
      });
      showToast(`${product.name} added to cart`);
    },
    [showToast]
  );

  const removeItem = useCallback(
    (id) => {
      setItems((prev) => prev.filter((item) => item.id !== id));
      showToast("Item removed from cart", "info");
    },
    [showToast]
  );

  const updateQuantity = useCallback((id, quantity) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, Math.min(quantity, item.stock ?? 99)),
            }
          : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    showToast("Cart cleared", "info");
  }, [showToast]);

  const count = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const shipping = useMemo(() => {
    if (subtotal === 0) return 0;
    return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  }, [subtotal]);

  const value = useMemo(
    () => ({
      items,
      hydrated,
      count,
      subtotal,
      shipping,
      total: subtotal + shipping,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      showToast,
    }),
    [
      items,
      hydrated,
      count,
      subtotal,
      shipping,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      showToast,
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}

      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed inset-x-0 bottom-5 z-[120] flex justify-center px-4"
      >
        {toast ? (
          <div
            key={toast.key}
            className="flex max-w-sm animate-fade-up items-center gap-3 rounded-2xl bg-ink px-4 py-3 text-sm font-medium text-white shadow-lift"
          >
            {toast.tone === "success" ? (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true" />
            ) : (
              <Info className="h-5 w-5 shrink-0 text-accent-400" aria-hidden="true" />
            )}
            <span>{toast.message}</span>
          </div>
        ) : null}
      </div>
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside <CartProvider>");
  }
  return context;
}
