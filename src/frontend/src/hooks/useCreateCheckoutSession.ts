import { useMutation } from "@tanstack/react-query";
import { createActorWithConfig } from "../config";

export interface CheckoutSession {
  id: string;
  url: string;
}

// Must exactly match the Candid ShoppingItem type in the backend
export interface ShoppingItem {
  name: string;
  currency: string;
  quantity: bigint;
  amount: bigint;
}

export function useCreateCheckoutSession() {
  return useMutation({
    mutationFn: async (items: ShoppingItem[]): Promise<CheckoutSession> => {
      const actor = await createActorWithConfig();
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      const result = await actor.createCheckoutSession(
        items,
        `${baseUrl}/payment-success`,
        `${baseUrl}/payment-failure`,
      );
      let parsed: unknown;
      try {
        parsed = JSON.parse(result as string);
      } catch {
        throw new Error(`Invalid response from payment service: ${result}`);
      }
      // If Stripe returned an error object, surface it
      if (parsed !== null && typeof parsed === "object" && "error" in parsed) {
        const errObj = parsed as { error: { message?: string } };
        throw new Error(
          `Stripe error: ${
            errObj.error?.message ?? JSON.stringify(errObj.error)
          }`,
        );
      }
      const session = parsed as CheckoutSession;
      if (!session?.url) {
        throw new Error(
          `Stripe session missing url. Response: ${JSON.stringify(parsed)}`,
        );
      }
      return session;
    },
  });
}
