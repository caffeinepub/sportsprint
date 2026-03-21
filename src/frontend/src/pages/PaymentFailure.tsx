import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { AlertCircle, ArrowLeft, RefreshCw } from "lucide-react";
import { motion } from "motion/react";

export default function PaymentFailure() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
        data-ocid="payment.error_state"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6"
        >
          <AlertCircle className="w-12 h-12 text-red-500" />
        </motion.div>

        <h1 className="font-heading font-black text-3xl uppercase tracking-tight mb-3 text-foreground">
          Payment Cancelled
        </h1>
        <p className="text-muted-foreground mb-8">
          Your payment was not completed. Your basket has been saved — you can
          try again whenever you're ready.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/basket">
            <Button
              className="font-bold uppercase tracking-widest"
              data-ocid="payment.primary_button"
            >
              <RefreshCw className="w-4 h-4 mr-2" /> Try Again
            </Button>
          </Link>
          <Link to="/">
            <Button
              variant="outline"
              className="font-bold uppercase tracking-widest"
              data-ocid="payment.secondary_button"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
