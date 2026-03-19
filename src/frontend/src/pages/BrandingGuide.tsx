import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Image, Layers, Palette, Shirt } from "lucide-react";

const placements = [
  {
    label: "Left Chest",
    popular: true,
    desc: "The most common placement. Small logo (approx 8cm) above the left breast. Ideal for club crests.",
  },
  {
    label: "Back Centre",
    popular: false,
    desc: "Large print across the upper or full back. Great for sponsor names or bold club branding.",
  },
  {
    label: "Right Sleeve",
    popular: false,
    desc: "Secondary branding location. Typically used for sponsor logos or season year.",
  },
  {
    label: "Left Sleeve",
    popular: false,
    desc: "Mirror of right sleeve. Can carry league or association logos.",
  },
  {
    label: "Front Centre",
    popular: false,
    desc: "Bold central placement below the collar. Suits minimalist designs and wordmarks.",
  },
  {
    label: "Lower Back",
    popular: false,
    desc: "Player name and number placement. Paired with front chest number for match-day kits.",
  },
];

const colourTips = [
  {
    tip: "Use 2–3 club colours maximum",
    detail: "More than 3 colours increases cost and reduces visual clarity.",
  },
  {
    tip: "Ensure contrast against garment colour",
    detail:
      "White logo on a white shirt won't print. Choose logo colours that contrast with your chosen kit colour.",
  },
  {
    tip: "Provide PMS/Pantone references",
    detail:
      "For exact colour matching, share your Pantone codes. This avoids colour drift during production.",
  },
  {
    tip: "Test in greyscale",
    detail:
      "If your logo still reads clearly in black and white, it will work on any background.",
  },
];

const logoSpecs = [
  {
    label: "File Format",
    value: "PNG or SVG",
    note: "SVG preferred for scalability. PNG must have a transparent background.",
  },
  {
    label: "Minimum Resolution",
    value: "300px wide",
    note: "For print quality, we recommend 1000px+ or a vector SVG file.",
  },
  {
    label: "Colour Mode",
    value: "RGB or CMYK",
    note: "Send in RGB for screen previews, CMYK for final production if available.",
  },
];

export default function BrandingGuide() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-navy text-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Palette className="w-6 h-6 text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-white/50">
              Club Support
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Branding Guide
          </h1>
          <p className="text-lg text-white/70 max-w-2xl">
            Get the most from your club branding. Follow these guidelines for
            sharp, professional results every time.
          </p>
        </div>
      </section>

      {/* Logo Requirements */}
      <section className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Image className="w-5 h-5 text-primary" />
            <h2 className="font-heading text-2xl font-bold uppercase tracking-wide">
              Logo Requirements
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {logoSpecs.map((item) => (
              <Card key={item.label}>
                <CardHeader className="pb-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    {item.label}
                  </span>
                  <CardTitle className="text-2xl text-primary">
                    {item.value}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Colour Tips */}
      <section className="py-12 px-4 bg-muted/40">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-5 h-5 text-primary" />
            <h2 className="font-heading text-2xl font-bold uppercase tracking-wide">
              Colour Selection Tips
            </h2>
          </div>
          <div className="space-y-4">
            {colourTips.map((item, i) => (
              <Card key={item.tip}>
                <CardContent className="flex items-start gap-4 pt-6">
                  <div className="w-8 h-8 bg-navy text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-semibold mb-1">{item.tip}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.detail}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Print Placements */}
      <section className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Shirt className="w-5 h-5 text-primary" />
            <h2 className="font-heading text-2xl font-bold uppercase tracking-wide">
              Print Placements
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {placements.map((p) => (
              <Card key={p.label}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{p.label}</CardTitle>
                    {p.popular && (
                      <Badge className="bg-primary text-white">Popular</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Artwork Submission */}
      <section className="py-12 px-4 bg-muted/40">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Layers className="w-5 h-5 text-primary" />
            <h2 className="font-heading text-2xl font-bold uppercase tracking-wide">
              Submitting Your Artwork
            </h2>
          </div>
          <Card>
            <CardContent className="pt-6 space-y-4 text-sm text-muted-foreground">
              <p>
                Once your club locker room is set up, you'll be invited to
                submit your artwork via our club admin portal. Our design team
                will review your files and send a digital proof for approval
                before production begins.
              </p>
              <Separator />
              <p>
                If you need help creating or refining your logo, our in-house
                design service can help — starting from £49.{" "}
                <a
                  href="mailto:hello@sportsprint.co.uk"
                  className="text-primary underline"
                >
                  Get in touch
                </a>{" "}
                to find out more.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
