import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Clock, Package, Truck } from "lucide-react";

const deliveryOptions = [
  {
    icon: Truck,
    title: "Standard Delivery",
    time: "5–7 working days",
    price: "Free over £75",
    priceDetail: "£3.99 under £75",
    color: "text-primary",
    desc: "Our most popular delivery option. Orders placed before 2pm are dispatched the same day.",
  },
  {
    icon: Clock,
    title: "Express Delivery",
    time: "2–3 working days",
    price: "£9.99",
    priceDetail: "Any order size",
    color: "text-amber-500",
    desc: "Need it faster? Express delivery is available for all in-stock items. Order before 12pm for same-day dispatch.",
  },
  {
    icon: Package,
    title: "Custom / Printed Orders",
    time: "3–4 weeks",
    price: "Free",
    priceDetail: "Included in price",
    color: "text-blue-500",
    desc: "All custom printed club gear requires a production window of 3–4 weeks before dispatch. We'll keep you updated throughout.",
  },
];

const trackingSteps = [
  "Order confirmation email sent immediately",
  "Dispatch confirmation with tracking number (stock items)",
  "In-production update for custom orders at 1 week and 2 weeks",
  "Shipped notification with courier tracking link",
  "Delivered confirmation",
];

const additionalInfo = [
  {
    title: "Delivery Address",
    body: "We can deliver to home, business, or club premises. Please double-check your address at checkout.",
  },
  {
    title: "Missed Deliveries",
    body: "Our couriers will leave a card and attempt re-delivery. You can also arrange collection from a local depot.",
  },
  {
    title: "Large Club Orders",
    body: "Bulk orders over 50 items may be shipped on a pallet. We'll contact you to arrange delivery.",
  },
  {
    title: "International",
    body: "We currently ship within the UK only. International delivery is coming soon — contact us to be notified.",
  },
];

export default function DeliveryInfo() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-navy text-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Truck className="w-6 h-6 text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-white/50">
              Club Support
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Delivery Information
          </h1>
          <p className="text-lg text-white/70 max-w-2xl">
            Fast, reliable delivery across the UK. We deliver to home addresses,
            club facilities, and business addresses.
          </p>
        </div>
      </section>

      {/* Delivery Options */}
      <section className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-2xl font-bold mb-8 uppercase tracking-wide">
            Delivery Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {deliveryOptions.map((opt) => (
              <Card key={opt.title} className="relative overflow-hidden">
                <CardHeader className="pb-3">
                  <opt.icon className={`w-8 h-8 mb-2 ${opt.color}`} />
                  <CardTitle className="text-lg">{opt.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary">{opt.time}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{opt.desc}</p>
                  <Separator />
                  <div>
                    <p className="text-xl font-bold">{opt.price}</p>
                    <p className="text-xs text-muted-foreground">
                      {opt.priceDetail}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Order Tracking */}
      <section className="py-12 px-4 bg-muted/40">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-2xl font-bold mb-6 uppercase tracking-wide">
            Order Tracking
          </h2>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-4">
                {trackingSteps.map((step) => (
                  <li key={step} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">{step}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">
                    Need help tracking an order?
                  </strong>{" "}
                  Contact our team at{" "}
                  <a
                    href="mailto:hello@sportsprint.co.uk"
                    className="text-primary underline"
                  >
                    hello@sportsprint.co.uk
                  </a>{" "}
                  or call{" "}
                  <a href="tel:08001234567" className="text-primary underline">
                    0800 123 4567
                  </a>
                  .
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Additional Notes */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-2xl font-bold mb-6 uppercase tracking-wide">
            Additional Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {additionalInfo.map((item) => (
              <Card key={item.title}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
