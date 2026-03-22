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

const topSizes = [
  { size: "S", chest: "36–38", waist: "30–32", notes: "Standard fit" },
  { size: "M", chest: "38–40", waist: "32–34", notes: "Standard fit" },
  { size: "L", chest: "40–42", waist: "34–36", notes: "Standard fit" },
  { size: "XL", chest: "42–44", waist: "36–38", notes: "Standard fit" },
  { size: "XXL", chest: "44–46", waist: "38–40", notes: "Standard fit" },
];

const bottomSizes = [
  { size: "S", waist: "28–30", hips: "36–38", notes: "Standard fit" },
  { size: "M", waist: "30–32", hips: "38–40", notes: "Standard fit" },
  { size: "L", waist: "32–34", hips: "40–42", notes: "Standard fit" },
  { size: "XL", waist: "34–36", hips: "42–44", notes: "Standard fit" },
  { size: "XXL", waist: "36–38", hips: "44–46", notes: "Standard fit" },
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
            garments. All measurements are in inches (UK sizing).
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
            Size Charts (UK)
          </h2>
          <Tabs defaultValue="tops">
            <TabsList className="mb-6">
              <TabsTrigger value="tops" data-ocid="size_guide.tab">
                T-Shirt / Hoodie / Sweatshirt
              </TabsTrigger>
              <TabsTrigger value="bottoms" data-ocid="size_guide.tab">
                Shorts / Joggers
              </TabsTrigger>
            </TabsList>
            <TabsContent value="tops">
              <Card>
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-bold text-foreground">
                          Size
                        </TableHead>
                        <TableHead>Chest (inches)</TableHead>
                        <TableHead>Waist (inches)</TableHead>
                        <TableHead>Notes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topSizes.map((row) => (
                        <TableRow key={row.size}>
                          <TableCell>
                            <Badge variant="outline" className="font-bold">
                              {row.size}
                            </Badge>
                          </TableCell>
                          <TableCell>{row.chest}</TableCell>
                          <TableCell>{row.waist}</TableCell>
                          <TableCell className="text-muted-foreground">
                            {row.notes}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="bottoms">
              <Card>
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-bold text-foreground">
                          Size
                        </TableHead>
                        <TableHead>Waist (inches)</TableHead>
                        <TableHead>Hips (inches)</TableHead>
                        <TableHead>Notes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bottomSizes.map((row) => (
                        <TableRow key={row.size}>
                          <TableCell>
                            <Badge variant="outline" className="font-bold">
                              {row.size}
                            </Badge>
                          </TableCell>
                          <TableCell>{row.waist}</TableCell>
                          <TableCell>{row.hips}</TableCell>
                          <TableCell className="text-muted-foreground">
                            {row.notes}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Contact */}
      <section className="py-12 px-4 bg-muted/40">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                Not sure about your size? Contact us at{" "}
                <a
                  href="mailto:JTtreasures@gmail.com"
                  className="text-primary underline"
                >
                  JTtreasures@gmail.com
                </a>{" "}
                or call{" "}
                <a href="tel:07568195033" className="text-primary underline">
                  07568 195033
                </a>{" "}
                and we'll be happy to help.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
