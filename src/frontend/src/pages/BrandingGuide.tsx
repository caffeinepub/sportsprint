import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Image, Layers, Palette, Shirt } from "lucide-react";

const brandColours = [
  { name: "Silver", hex: "#C0C0C0", textClass: "text-gray-800" },
  { name: "Black", hex: "#000000", textClass: "text-white" },
  { name: "White", hex: "#FFFFFF", textClass: "text-gray-800", border: true },
];

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

const logoRules = [
  "Use the shield logo on banners and merchandise.",
  "Do not stretch or distort the logo in any direction.",
  "Do not recolour the logo outside the brand colours (Silver, Black, White).",
  "Maintain clear space around the logo equal to the height of the letter 'C'.",
  "Do not place the logo on busy backgrounds that reduce legibility.",
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

      {/* Brand Colours */}
      <section className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-5 h-5 text-primary" />
            <h2 className="font-heading text-2xl font-bold uppercase tracking-wide">
              Brand Colours
            </h2>
          </div>
          <div className="flex flex-wrap gap-4 mb-6">
            {brandColours.map((c) => (
              <div key={c.name} className="flex flex-col items-center gap-2">
                <div
                  className={`w-20 h-20 rounded-xl shadow-md flex items-end justify-center pb-2 ${
                    c.border ? "border border-gray-200" : ""
                  }`}
                  style={{ backgroundColor: c.hex }}
                >
                  <span
                    className={`text-xs font-mono font-bold ${c.textClass}`}
                  >
                    {c.hex}
                  </span>
                </div>
                <span className="text-sm font-semibold">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="py-12 px-4 bg-muted/40">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Layers className="w-5 h-5 text-primary" />
            <h2 className="font-heading text-2xl font-bold uppercase tracking-wide">
              Typography
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base uppercase tracking-widest text-muted-foreground">
                  Headings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p
                  className="text-3xl font-bold"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Montserrat Bold
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Used for all headings, titles, and prominent text.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base uppercase tracking-widest text-muted-foreground">
                  Body Text
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p
                  className="text-lg"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Montserrat Regular
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Used for paragraphs, descriptions, and general content.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Logo Usage */}
      <section className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Image className="w-5 h-5 text-primary" />
            <h2 className="font-heading text-2xl font-bold uppercase tracking-wide">
              Logo Usage Rules
            </h2>
          </div>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {logoRules.map((rule, i) => (
                  <li key={rule} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-navy text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-sm">{rule}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Logo File Requirements */}
      <section className="py-12 px-4 bg-muted/40">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Image className="w-5 h-5 text-primary" />
            <h2 className="font-heading text-2xl font-bold uppercase tracking-wide">
              Logo File Requirements
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
                If you need help creating or refining your logo, get in touch
                via{" "}
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
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
