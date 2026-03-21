import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  ImagePlus,
  Shirt,
  ShoppingBag,
  Star,
  Upload,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { TshirtDesigner } from "../components/TshirtDesigner";

const steps = [
  {
    num: "01",
    icon: Users,
    title: "Contact Us",
    desc: "Get in touch via email or phone. Tell us about your club — sport, size, and what you need. We'll assign you a dedicated account manager.",
  },
  {
    num: "02",
    icon: Star,
    title: "Branding Setup",
    desc: "Submit your club logo and colour scheme. Our team will create a digital proof of your kit within 48 hours. We iterate until you're happy.",
  },
  {
    num: "03",
    icon: Shirt,
    title: "Product Selection",
    desc: "Choose from our range of 20+ garments. Select sizes, colours, and quantities. We'll configure your locker room with everything you need.",
  },
  {
    num: "04",
    icon: ShoppingBag,
    title: "Locker Room Launch",
    desc: "Your branded locker room goes live on the Clubkit Co site. Members can browse, order, and pay directly. You stay in control.",
  },
];

const tiers = [
  {
    name: "Starter",
    price: "£0",
    period: "setup fee",
    features: [
      "Up to 10 products",
      "Standard garment range",
      "1 logo placement",
      "Email support",
    ],
    highlight: false,
  },
  {
    name: "Club",
    price: "£49",
    period: "one-off",
    features: [
      "Up to 20 products",
      "Full garment range",
      "3 logo placements",
      "Priority support",
      "Design review service",
    ],
    highlight: true,
  },
  {
    name: "Academy",
    price: "£149",
    period: "one-off",
    features: [
      "Unlimited products",
      "Bespoke garment options",
      "Custom placements",
      "Dedicated account manager",
      "Seasonal refresh included",
    ],
    highlight: false,
  },
];

const timeline = [
  { time: "Day 1", label: "Initial enquiry & account setup" },
  { time: "Day 2–3", label: "Design proof created and sent for approval" },
  {
    time: "Day 5",
    label: "Product range confirmed and locker room configured",
  },
  { time: "Week 3–4", label: "First production run complete and dispatched" },
  { time: "Week 4+", label: "Locker room live — members can order anytime" },
];

function DropZone({
  label,
  preview,
  onFile,
  ocid,
}: {
  label: string;
  preview: string | null;
  onFile: (file: File) => void;
  ocid: string;
}) {
  const inputId = `dropzone-${ocid}`;
  const [dragging, setDragging] = useState(false);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith("image/")) onFile(file);
  }

  return (
    <div>
      <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 block">
        {label}
      </Label>
      <label
        htmlFor={inputId}
        data-ocid={ocid}
        className={`relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors block ${
          dragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/60 hover:bg-muted/40"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <input
          id={inputId}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onFile(file);
          }}
        />
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="mx-auto max-h-28 object-contain rounded"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 py-4 text-muted-foreground">
            <Upload className="w-8 h-8" />
            <p className="text-sm font-medium">
              Drop image here or click to upload
            </p>
            <p className="text-xs">PNG, JPG, SVG supported</p>
          </div>
        )}
      </label>
    </div>
  );
}

export default function ClubSetupInfo() {
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    clubName: "",
    clubDescription: "",
  });
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleLogoFile(file: File) {
    setLogoPreview(URL.createObjectURL(file));
  }

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required";
    if (!form.clubName.trim()) errs.clubName = "Club name is required";
    if (!form.clubDescription.trim())
      errs.clubDescription = "Club type/description is required";
    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    toast.success("Thanks! We'll be in touch within 24 hours.");
    setForm({ fullName: "", address: "", clubName: "", clubDescription: "" });
    setLogoPreview(null);
    setErrors({});
  }

  function field(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-navy text-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-white/50">
              Club Support
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Set Up Your Club
          </h1>
          <p className="text-lg text-white/70 max-w-2xl">
            Launch your own branded locker room in as little as 3–4 weeks. We
            handle the design, production, and fulfilment — you just share the
            link.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#enquiry-form">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-bold"
                data-ocid="club_setup.primary_button"
              >
                Start Enquiry <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </a>
            <Link to="/branding">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
                data-ocid="club_setup.secondary_button"
              >
                View Branding Guide
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section id="enquiry-form" className="py-16 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <ImagePlus className="w-5 h-5 text-primary" />
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Club Enquiry
              </span>
            </div>
            <h2 className="font-heading text-3xl font-bold mb-2">
              Tell Us About Your Club
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl">
              Fill in the form below and design your kit using our T-Shirt
              Designer. We'll prepare a bespoke quote and design proof within 48
              hours.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: Form Fields */}
              <form
                onSubmit={handleSubmit}
                data-ocid="club_setup.modal"
                noValidate
              >
                <Card className="shadow-card">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base uppercase tracking-wide">
                      Club Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="fullName"
                        className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                      >
                        Full Name *
                      </Label>
                      <Input
                        id="fullName"
                        data-ocid="club_setup.input"
                        placeholder="e.g. James Hargreaves"
                        value={form.fullName}
                        onChange={(e) => field("fullName", e.target.value)}
                        className={errors.fullName ? "border-destructive" : ""}
                      />
                      {errors.fullName && (
                        <p
                          className="text-xs text-destructive"
                          data-ocid="club_setup.error_state"
                        >
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Address */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="address"
                        className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                      >
                        Address
                      </Label>
                      <Textarea
                        id="address"
                        data-ocid="club_setup.textarea"
                        placeholder="Street, City, Postcode"
                        rows={3}
                        value={form.address}
                        onChange={(e) => field("address", e.target.value)}
                      />
                    </div>

                    {/* Club Name */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="clubName"
                        className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                      >
                        Club Name *
                      </Label>
                      <Input
                        id="clubName"
                        data-ocid="club_setup.input"
                        placeholder="e.g. Riverside Runners FC"
                        value={form.clubName}
                        onChange={(e) => field("clubName", e.target.value)}
                        className={errors.clubName ? "border-destructive" : ""}
                      />
                      {errors.clubName && (
                        <p
                          className="text-xs text-destructive"
                          data-ocid="club_setup.error_state"
                        >
                          {errors.clubName}
                        </p>
                      )}
                    </div>

                    {/* Club Description */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="clubDescription"
                        className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                      >
                        Club Type / Description *
                      </Label>
                      <Input
                        id="clubDescription"
                        data-ocid="club_setup.input"
                        placeholder="e.g. Running Club, Football Club, Cycling Club"
                        value={form.clubDescription}
                        onChange={(e) =>
                          field("clubDescription", e.target.value)
                        }
                        className={
                          errors.clubDescription ? "border-destructive" : ""
                        }
                      />
                      {errors.clubDescription && (
                        <p
                          className="text-xs text-destructive"
                          data-ocid="club_setup.error_state"
                        >
                          {errors.clubDescription}
                        </p>
                      )}
                    </div>

                    {/* Logo Upload */}
                    <DropZone
                      label="Club Logo"
                      preview={logoPreview}
                      onFile={handleLogoFile}
                      ocid="club_setup.upload_button"
                    />

                    <Button
                      type="submit"
                      className="w-full bg-primary text-white font-bold hover:bg-primary/90 mt-2"
                      size="lg"
                      data-ocid="club_setup.submit_button"
                    >
                      Send Enquiry <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </form>

              {/* Right: T-Shirt Designer + Logo Preview */}
              <div className="flex flex-col gap-4">
                <TshirtDesigner />

                {/* Logo Preview Card */}
                {logoPreview && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="shadow-card">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base uppercase tracking-wide">
                          Club Logo
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <img
                          src={logoPreview}
                          alt="Club logo preview"
                          className="mx-auto max-h-24 object-contain rounded"
                        />
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Tip */}
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="pt-4 pb-4">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      <span className="font-bold text-primary">Tip:</span>{" "}
                      Upload a PNG with a transparent background for the
                      cleanest result on garments. SVG files also work great.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-2xl font-bold mb-10 uppercase tracking-wide">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {steps.map((s) => (
              <Card key={s.num} className="relative overflow-hidden">
                <div className="absolute top-0 right-0 text-7xl font-black text-muted/30 leading-none pr-4 pt-2 select-none">
                  {s.num}
                </div>
                <CardHeader className="pb-3">
                  <s.icon className="w-7 h-7 text-primary mb-2" />
                  <CardTitle>{s.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 px-4 bg-muted/40">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-5 h-5 text-primary" />
            <h2 className="font-heading text-2xl font-bold uppercase tracking-wide">
              Typical Timeline
            </h2>
          </div>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {timeline.map((item) => (
                  <div key={item.time} className="flex items-center gap-4">
                    <Badge
                      variant="outline"
                      className="shrink-0 w-20 justify-center text-xs font-bold"
                    >
                      {item.time}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm">{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-2xl font-bold mb-2 uppercase tracking-wide">
            Pricing Tiers
          </h2>
          <p className="text-muted-foreground mb-8">
            All tiers include your branded locker room hosted on Clubkit Co. No
            monthly fees.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <Card
                key={tier.name}
                className={tier.highlight ? "border-primary shadow-lg" : ""}
              >
                {tier.highlight && (
                  <div className="bg-primary text-white text-center text-xs font-bold uppercase tracking-widest py-1.5 rounded-t-[calc(var(--radius)-1px)]">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{tier.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-black">{tier.price}</span>
                    <span className="text-muted-foreground text-sm ml-1">
                      {tier.period}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Separator />
                  <ul className="space-y-2">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#enquiry-form" className="block pt-2">
                    <Button
                      className={`w-full ${
                        tier.highlight
                          ? "bg-primary text-white hover:bg-primary/90"
                          : ""
                      }`}
                      variant={tier.highlight ? "default" : "outline"}
                      data-ocid="club_setup.primary_button"
                    >
                      Get Started
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
