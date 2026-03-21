import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import { formatPrice } from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { useCreateCheckoutSession } from "../hooks/useCreateCheckoutSession";

export default function Basket() {
  const {
    cartItems,
    cartTotal,
    cartCount,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();
  const checkout = useCreateCheckoutSession();

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    try {
      // Fields match stripe/stripe.mo ShoppingItem exactly: name, currency, amount, quantity
      const items = cartItems.map((ci) => ({
        name: `${ci.productName} (${ci.size}, ${ci.color})`,
        currency: "gbp",
        amount: ci.price,
        quantity: BigInt(ci.quantity),
      }));
      const session = await checkout.mutateAsync(items);
      if (session?.url) {
        clearCart();
        window.location.href = session.url;
      } else {
        toast.error("Could not start checkout. Please try again.");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Checkout failed";
      toast.error(msg);
    }
  };

  if (cartCount === 0) {
    return (
      <div
        className="min-h-screen bg-background flex flex-col items-center justify-center px-4"
        data-ocid="basket.empty_state"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="font-heading font-black text-3xl uppercase tracking-tight mb-3">
            Your Basket is Empty
          </h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added anything yet.
          </p>
          <Link to="/stock">
            <Button
              className="font-bold uppercase tracking-widest"
              data-ocid="basket.link"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Browse Stock Shop
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link
          to="/stock"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-xs uppercase tracking-widest font-bold mb-8 transition-colors"
          data-ocid="basket.link"
        >
          <ArrowLeft className="w-3 h-3" /> Continue Shopping
        </Link>
        <div className="flex items-baseline justify-between mb-8">
          <h1 className="font-heading font-black text-3xl uppercase tracking-tight">
            Your Basket
          </h1>
          <Badge variant="secondary" className="text-sm">
            {cartCount} item{cartCount !== 1 ? "s" : ""}
          </Badge>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cartItems.map((item, index) => (
                <motion.div
                  key={`${item.productId}-${item.size}-${item.color}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-card border border-border rounded-lg p-4 flex gap-4"
                  data-ocid={`basket.item.${index + 1}`}
                >
                  <div className="w-20 h-20 rounded bg-muted overflow-hidden flex-shrink-0">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.productName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                        <ShoppingBag className="w-6 h-6 text-muted-foreground/40" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-bold text-sm uppercase tracking-tight truncate">
                      {item.productName}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.size} · {item.color}
                    </p>
                    <p className="font-bold text-primary mt-1">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      type="button"
                      onClick={() =>
                        removeFromCart(item.productId, item.size, item.color)
                      }
                      className="text-muted-foreground hover:text-destructive transition-colors"
                      aria-label="Remove item"
                      data-ocid={`basket.delete_button.${index + 1}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-2 border border-border rounded">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.size,
                            item.color,
                            item.quantity - 1,
                          )
                        }
                        className="p-1 hover:bg-muted transition-colors"
                        aria-label="Decrease"
                        data-ocid={`basket.secondary_button.${index + 1}`}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-bold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.size,
                            item.color,
                            item.quantity + 1,
                          )
                        }
                        className="p-1 hover:bg-muted transition-colors"
                        aria-label="Increase"
                        data-ocid={`basket.secondary_button.${index + 1}`}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border rounded-lg p-6 sticky top-24"
              data-ocid="basket.panel"
            >
              <h2 className="font-heading font-black text-lg uppercase tracking-tight mb-4">
                Order Summary
              </h2>
              <Separator className="mb-4" />
              <div className="space-y-2 mb-4">
                {cartItems.map((item) => (
                  <div
                    key={`${item.productId}-${item.size}-${item.color}`}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-muted-foreground truncate mr-2">
                      {item.productName} x{item.quantity}
                    </span>
                    <span className="font-bold flex-shrink-0">
                      {formatPrice(item.price * BigInt(item.quantity))}
                    </span>
                  </div>
                ))}
              </div>
              <Separator className="mb-4" />
              <div className="flex justify-between font-black text-lg mb-2">
                <span>Subtotal</span>
                <span className="text-primary">{formatPrice(cartTotal)}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-6">
                Delivery calculated at checkout. UK standard delivery from
                £3.99.
              </p>
              <Button
                className="w-full font-bold uppercase tracking-widest"
                size="lg"
                onClick={handleCheckout}
                disabled={checkout.isPending}
                data-ocid="basket.primary_button"
              >
                {checkout.isPending
                  ? "Redirecting to Stripe..."
                  : "Proceed to Checkout"}
              </Button>
              {checkout.isError && (
                <p
                  className="text-xs text-destructive mt-2 text-center"
                  data-ocid="basket.error_state"
                >
                  {checkout.error instanceof Error
                    ? checkout.error.message
                    : "Checkout unavailable"}
                </p>
              )}
              <p className="text-xs text-muted-foreground text-center mt-3">
                Secure payment via Stripe
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
