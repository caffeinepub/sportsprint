import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Clock, Package, Truck } from "lucide-react";

const deliveryOptions = [
  {
    icon: Truck,
    title: "Standard Delivery",
    time: "3–7 working days",
    price: "£4.99",
    priceDetail: "Free on orders over £50",
    color: "text-primary",
    desc: "Orders are processed within 2 working days. Standard delivery via the most reliable and cost-effective shipping service available.",
  },
  {
    icon: Clock,
    title: "Express Delivery",
    time: "Faster delivery",
    price: "£9.99",
    priceDetail: "Any order size",
    color: "text-amber-500",
    desc: "Need it sooner? Express delivery is available for all in-stock items. Contact us to arrange express dispatch.",
  },
  {
    icon: Package,
    title: "Custom / Printed Orders",
    time: "3–4 weeks",
    price: "Included",
    priceDetail: "In the order price",
    color: "text-blue-500",
    desc: "All custom printed club gear requires a production window before dispatch. We'll keep you updated throughout the process.",
  },
];

const trackingSteps = [
  "Order confirmation shown on screen after payment",
  "Orders processed within 2 working days of purchase",
  "Standard delivery: 3–7 working days depending on location",
  "We deliver within the United Kingdom only",
  "Free delivery on all orders over £50",
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
    title: "Delivery Region",
    body: "We currently ship within the United Kingdom only. Contact us at JTtreasures@gmail.com for any queries.",
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

      {/* Order Info */}
      <section className="py-12 px-4 bg-muted/40">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-2xl font-bold mb-6 uppercase tracking-wide">
            Order & Dispatch
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
                    Need help with an order?
                  </strong>{" "}
                  Contact us at{" "}
                  <a
                    href="mailto:JTtreasures@gmail.com"
                    className="text-primary underline"
                  >
                    JTtreasures@gmail.com
                  </a>{" "}
                  or call{" "}
                  <a href="tel:07568195033" className="text-primary underline">
                    07568 195033
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
