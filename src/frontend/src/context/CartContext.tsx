import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export interface CartItem {
  productId: string;
  productName: string;
  price: bigint;
  size: string;
  color: string;
  quantity: number;
  imageUrl: string;
}

interface CartContextValue {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: bigint;
  addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (
    productId: string,
    size: string,
    color: string,
    qty: number,
  ) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "sportsPrintCart";

function serializeCart(items: CartItem[]): string {
  return JSON.stringify(
    items.map((item) => ({ ...item, price: item.price.toString() })),
  );
}

function deserializeCart(raw: string): CartItem[] {
  try {
    const parsed = JSON.parse(raw) as Array<
      Omit<CartItem, "price"> & { price: string }
    >;
    return parsed.map((item) => ({ ...item, price: BigInt(item.price) }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? deserializeCart(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, serializeCart(cartItems));
  }, [cartItems]);

  const addToCart = useCallback(
    (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
      setCartItems((prev) => {
        const idx = prev.findIndex(
          (ci) =>
            ci.productId === item.productId &&
            ci.size === item.size &&
            ci.color === item.color,
        );
        if (idx >= 0) {
          return prev.map((ci, i) =>
            i === idx
              ? { ...ci, quantity: ci.quantity + (item.quantity ?? 1) }
              : ci,
          );
        }
        return [...prev, { ...item, quantity: item.quantity ?? 1 }];
      });
    },
    [],
  );

  const removeFromCart = useCallback(
    (productId: string, size: string, color: string) => {
      setCartItems((prev) =>
        prev.filter(
          (ci) =>
            !(
              ci.productId === productId &&
              ci.size === size &&
              ci.color === color
            ),
        ),
      );
    },
    [],
  );

  const updateQuantity = useCallback(
    (productId: string, size: string, color: string, qty: number) => {
      if (qty <= 0) {
        setCartItems((prev) =>
          prev.filter(
            (ci) =>
              !(
                ci.productId === productId &&
                ci.size === size &&
                ci.color === color
              ),
          ),
        );
      } else {
        setCartItems((prev) =>
          prev.map((ci) =>
            ci.productId === productId && ci.size === size && ci.color === color
              ? { ...ci, quantity: qty }
              : ci,
          ),
        );
      }
    },
    [],
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartCount = cartItems.reduce((sum, ci) => sum + ci.quantity, 0);
  const cartTotal = cartItems.reduce(
    (sum, ci) => sum + ci.price * BigInt(ci.quantity),
    0n,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
