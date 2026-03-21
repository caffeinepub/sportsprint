import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function PaymentSuccess() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  const orderRef = `SP-${Date.now().toString(36).toUpperCase()}`;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
        data-ocid="payment.success_state"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </motion.div>

        <h1 className="font-heading font-black text-3xl uppercase tracking-tight mb-3 text-foreground">
          Payment Successful!
        </h1>
        <p className="text-muted-foreground mb-2">
          Thank you for your order. Your custom sportswear is being prepared.
        </p>
        <div className="bg-muted rounded-lg px-4 py-3 mb-6 inline-block">
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
            Order Reference
          </p>
          <p className="font-mono font-bold text-lg text-foreground">
            {orderRef}
          </p>
        </div>
        <p className="text-sm text-muted-foreground mb-8">
          Please save your order reference. You will receive a confirmation once
          your order is processed.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/stock">
            <Button
              className="font-bold uppercase tracking-widest"
              data-ocid="payment.primary_button"
            >
              <ShoppingBag className="w-4 h-4 mr-2" /> Continue Shopping
            </Button>
          </Link>
          <Link to="/">
            <Button
              variant="outline"
              className="font-bold uppercase tracking-widest"
              data-ocid="payment.secondary_button"
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
