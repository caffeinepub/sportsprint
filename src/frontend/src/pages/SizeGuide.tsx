import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Ruler } from "lucide-react";

const mensSizes = [
  { size: "XS", chest: "34-36", waist: "28-30", hips: "34-36" },
  { size: "S", chest: "36-38", waist: "30-32", hips: "36-38" },
  { size: "M", chest: "38-40", waist: "32-34", hips: "38-40" },
  { size: "L", chest: "40-42", waist: "34-36", hips: "40-42" },
  { size: "XL", chest: "42-44", waist: "36-38", hips: "42-44" },
  { size: "2XL", chest: "44-46", waist: "38-40", hips: "44-46" },
  { size: "3XL", chest: "46-48", waist: "40-42", hips: "46-48" },
];

const womensSizes = [
  { size: "XS", chest: "31-33", waist: "24-26", hips: "33-35" },
  { size: "S", chest: "33-35", waist: "26-28", hips: "35-37" },
  { size: "M", chest: "35-37", waist: "28-30", hips: "37-39" },
  { size: "L", chest: "37-39", waist: "30-32", hips: "39-41" },
  { size: "XL", chest: "39-41", waist: "32-34", hips: "41-43" },
  { size: "2XL", chest: "41-43", waist: "34-36", hips: "43-45" },
  { size: "3XL", chest: "43-45", waist: "36-38", hips: "45-47" },
];

function SizeTable({ data }: { data: typeof mensSizes }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-bold text-foreground">Size</TableHead>
          <TableHead>Chest (inches)</TableHead>
          <TableHead>Waist (inches)</TableHead>
          <TableHead>Hips (inches)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.size}>
            <TableCell>
              <Badge variant="outline" className="font-bold">
                {row.size}
              </Badge>
            </TableCell>
            <TableCell>{row.chest}</TableCell>
            <TableCell>{row.waist}</TableCell>
            <TableCell>{row.hips}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const garments = [
  {
    name: "Performance Jersey",
    note: "Athletic fit — size up if between sizes",
  },
  { name: "Training Shorts", note: "Relaxed fit — true to size" },
  { name: "Club Jacket", note: "Regular fit — size up for layering" },
  { name: "Polo Shirt", note: "Slim fit — size up for comfort" },
];

export default function SizeGuide() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-navy text-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Ruler className="w-6 h-6 text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-white/50">
              Club Support
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Size Guide
          </h1>
          <p className="text-lg text-white/70 max-w-2xl">
            Find your perfect fit across our full range of sports and club
            garments. All measurements are in inches unless stated otherwise.
          </p>
        </div>
      </section>

      {/* How to Measure */}
      <section className="py-12 px-4 bg-muted/40">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-2xl font-bold mb-6 uppercase tracking-wide">
            How to Measure
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: "Chest",
                desc: "Measure around the fullest part of your chest, keeping the tape horizontal.",
              },
              {
                label: "Waist",
                desc: "Measure around your natural waist, just above the belly button.",
              },
              {
                label: "Hips",
                desc: "Measure around the fullest part of your hips and seat.",
              },
            ].map((item) => (
              <Card key={item.label}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base uppercase tracking-widest text-primary">
                    {item.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Size Tables */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-2xl font-bold mb-6 uppercase tracking-wide">
            Size Charts
          </h2>
          <Tabs defaultValue="mens">
            <TabsList className="mb-6">
              <TabsTrigger value="mens" data-ocid="size_guide.tab">
                Men's
              </TabsTrigger>
              <TabsTrigger value="womens" data-ocid="size_guide.tab">
                Women's
              </TabsTrigger>
            </TabsList>
            <TabsContent value="mens">
              <Card>
                <CardContent className="pt-6">
                  <SizeTable data={mensSizes} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="womens">
              <Card>
                <CardContent className="pt-6">
                  <SizeTable data={womensSizes} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Per-Garment Fit Notes */}
      <section className="py-12 px-4 bg-muted/40">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-2xl font-bold mb-6 uppercase tracking-wide">
            Fit Notes by Garment
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {garments.map((g) => (
              <Card key={g.name}>
                <CardHeader className="pb-1">
                  <CardTitle className="text-base">{g.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{g.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
