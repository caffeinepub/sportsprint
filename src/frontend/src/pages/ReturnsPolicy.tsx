import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, ArrowLeft, CheckCircle, RefreshCw } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Contact Us",
    desc: "Email hello@sportsprint.co.uk within 30 days of delivery with your order number and reason for return.",
  },
  {
    step: "02",
    title: "Receive Return Label",
    desc: "We'll email a prepaid return label for faulty items. For change-of-mind returns, return postage is at your cost.",
  },
  {
    step: "03",
    title: "Pack & Post",
    desc: "Pack items securely in their original packaging where possible. Drop off at any Royal Mail location.",
  },
  {
    step: "04",
    title: "Refund Processed",
    desc: "Once we receive and inspect your return, we'll process your refund within 5–7 working days.",
  },
];

export default function ReturnsPolicy() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-navy text-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <RefreshCw className="w-6 h-6 text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-white/50">
              Club Support
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Returns Policy
          </h1>
          <p className="text-lg text-white/70 max-w-2xl">
            We want you to be completely happy with your order. Here's
            everything you need to know about returns and refunds.
          </p>
        </div>
      </section>

      {/* Policy Summary */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-2xl font-bold mb-6 uppercase tracking-wide">
            Policy at a Glance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-green-200">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <CardTitle className="text-base">Stock Items</CardTitle>
                  <Badge className="bg-green-100 text-green-800 ml-auto">
                    Returnable
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 30-day return window from delivery date</li>
                  <li>• Items must be unworn and in original condition</li>
                  <li>• Tags must still be attached</li>
                  <li>• Full refund or exchange available</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-orange-200">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  <CardTitle className="text-base">
                    Custom Printed Items
                  </CardTitle>
                  <Badge className="bg-orange-100 text-orange-800 ml-auto">
                    Non-Returnable
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Custom club gear is made to order</li>
                  <li>• Cannot be returned unless faulty</li>
                  <li>• Faulty items returned at our cost</li>
                  <li>• Full replacement or refund for faulty goods</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Alert className="mt-6 border-primary/30">
            <AlertTriangle className="h-4 w-4 text-primary" />
            <AlertTitle>Custom Orders</AlertTitle>
            <AlertDescription>
              Because all custom printed garments are produced specifically for
              your club, we cannot accept returns for change of mind. Please
              review your design proof carefully before approving production.
              Contact us immediately if you spot any errors.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* How to Return */}
      <section className="py-12 px-4 bg-muted/40">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-2xl font-bold mb-8 uppercase tracking-wide">
            How to Return
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.step} className="flex flex-col items-start">
                <div className="w-10 h-10 bg-navy text-white rounded-full flex items-center justify-center font-bold text-sm mb-4">
                  {s.step}
                </div>
                <h3 className="font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Faulty Items */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-2xl font-bold mb-6 uppercase tracking-wide">
            Faulty Items
          </h2>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <p className="text-sm text-muted-foreground">
                If your item arrives damaged, faulty, or not as described, we'll
                make it right at no cost to you. Please contact us within{" "}
                <strong>14 days of delivery</strong> with photos of the fault.
              </p>
              <Separator />
              <div className="flex items-start gap-3">
                <ArrowLeft className="w-4 h-4 text-primary mt-1 shrink-0 rotate-180" />
                <p className="text-sm">
                  Prepaid return label provided for all faulty items.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-primary mt-1 shrink-0" />
                <p className="text-sm">
                  Full refund or replacement dispatched within 5 working days of
                  return receipt.
                </p>
              </div>
              <Separator />
              <p className="text-sm text-muted-foreground">
                Questions? Reach us at{" "}
                <a
                  href="mailto:hello@sportsprint.co.uk"
                  className="text-primary underline"
                >
                  hello@sportsprint.co.uk
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
