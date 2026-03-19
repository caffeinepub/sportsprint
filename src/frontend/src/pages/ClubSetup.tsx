import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Link, useParams } from "@tanstack/react-router";
import {
  ChevronRight,
  Loader2,
  Pencil,
  Plus,
  Shield,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import type { Club, Product } from "../backend.d.ts";
import { formatPrice } from "../components/ProductCard";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAllClubs,
  useCreateProduct,
  useDeleteProduct,
  useIsAdmin,
  useProductsByClub,
  useUpdateClub,
  useUpdateProduct,
} from "../hooks/useQueries";

const EMPTY_PRODUCT = (clubId: bigint): Product => ({
  id: 0n,
  clubId,
  name: "",
  description: "",
  priceInPence: 0n,
  category: "",
  sizes: "XS,S,M,L,XL,XXL",
  colors: "",
  imageUrl: "",
  isActive: true,
});

const SHIRT_COLORS = [
  { label: "Blue", value: "#1E6BFF" },
  { label: "Red", value: "#E63946" },
  { label: "Yellow", value: "#FFD600" },
  { label: "White", value: "#FFFFFF" },
];

const SHIRT_PATH =
  "M 60,40 L 30,30 L 0,70 L 40,85 L 40,320 L 260,320 L 260,85 L 300,70 L 270,30 L 240,40 Q 220,10 180,5 Q 150,0 120,5 Q 80,10 60,40 Z";

type ArtworkItem = {
  id: string;
  dataUrl: string;
  x: number;
  y: number;
  scale: number;
};

type DragState = {
  artworkId: string;
  startX: number;
  startY: number;
  origX: number;
  origY: number;
} | null;

function TshirtDesigner() {
  const [tshirtColor, setTshirtColor] = useState("#1E6BFF");
  const [view, setView] = useState<"front" | "back">("front");
  const [artworks, setArtworks] = useState<ArtworkItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dragging, setDragging] = useState<DragState>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const selectedArtwork = artworks.find((a) => a.id === selectedId) ?? null;

  const handleFilesSelected = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files ?? []);
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          const dataUrl = ev.target?.result as string;
          const id = Math.random().toString(36).slice(2);
          setArtworks((prev) => [
            ...prev,
            { id, dataUrl, x: 110, y: 120, scale: 1 },
          ]);
          setSelectedId(id);
        };
        reader.readAsDataURL(file);
      }
      // reset so same file can be re-uploaded
      e.target.value = "";
    },
    [],
  );

  const handleArtworkMouseDown = useCallback(
    (e: React.MouseEvent, art: ArtworkItem) => {
      e.preventDefault();
      e.stopPropagation();
      setSelectedId(art.id);
      setDragging({
        artworkId: art.id,
        startX: e.clientX,
        startY: e.clientY,
        origX: art.x,
        origY: art.y,
      });
    },
    [],
  );

  const handleArtworkTouchStart = useCallback(
    (e: React.TouchEvent, art: ArtworkItem) => {
      e.stopPropagation();
      const touch = e.touches[0];
      setSelectedId(art.id);
      setDragging({
        artworkId: art.id,
        startX: touch.clientX,
        startY: touch.clientY,
        origX: art.x,
        origY: art.y,
      });
    },
    [],
  );

  const handleSvgMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragging) return;
      const art = artworks.find((a) => a.id === dragging.artworkId);
      if (!art) return;
      const dx = e.clientX - dragging.startX;
      const dy = e.clientY - dragging.startY;
      const rect = svgRef.current?.getBoundingClientRect();
      const scaleX = rect ? 300 / rect.width : 1;
      const scaleY = rect ? 340 / rect.height : 1;
      const newX = Math.max(0, Math.min(220, dragging.origX + dx * scaleX));
      const newY = Math.max(0, Math.min(260, dragging.origY + dy * scaleY));
      setArtworks((prev) =>
        prev.map((a) =>
          a.id === dragging.artworkId ? { ...a, x: newX, y: newY } : a,
        ),
      );
    },
    [dragging, artworks],
  );

  const handleSvgTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!dragging) return;
      e.preventDefault();
      const touch = e.touches[0];
      const rect = svgRef.current?.getBoundingClientRect();
      const scaleX = rect ? 300 / rect.width : 1;
      const scaleY = rect ? 340 / rect.height : 1;
      const dx = touch.clientX - dragging.startX;
      const dy = touch.clientY - dragging.startY;
      const newX = Math.max(0, Math.min(220, dragging.origX + dx * scaleX));
      const newY = Math.max(0, Math.min(260, dragging.origY + dy * scaleY));
      setArtworks((prev) =>
        prev.map((a) =>
          a.id === dragging.artworkId ? { ...a, x: newX, y: newY } : a,
        ),
      );
    },
    [dragging],
  );

  const stopDragging = useCallback(() => setDragging(null), []);

  const removeArtwork = (id: string) => {
    setArtworks((prev) => prev.filter((a) => a.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const updateScale = (id: string, scale: number) => {
    setArtworks((prev) => prev.map((a) => (a.id === id ? { ...a, scale } : a)));
  };

  return (
    <Card data-ocid="tshirt_designer.card">
      <CardHeader>
        <CardTitle className="font-heading font-bold uppercase tracking-tight text-base">
          T-Shirt Designer
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Upload artwork, pick a colour, then drag it into position on the
          shirt.
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* SVG Canvas */}
          <div className="flex-shrink-0 flex flex-col items-center gap-3">
            <svg
              ref={svgRef}
              viewBox="0 0 300 340"
              width="300"
              height="340"
              style={{
                touchAction: "none",
                cursor: dragging ? "grabbing" : "default",
              }}
              onMouseMove={handleSvgMouseMove}
              onMouseUp={stopDragging}
              onMouseLeave={stopDragging}
              onTouchMove={handleSvgTouchMove}
              onTouchEnd={stopDragging}
              aria-label="T-shirt design canvas"
              data-ocid="tshirt_designer.canvas_target"
            >
              <title>T-shirt design canvas</title>
              <defs>
                <clipPath id="tshirt-clip">
                  <path d={SHIRT_PATH} />
                </clipPath>
              </defs>

              {/* Fill */}
              <rect
                x="0"
                y="0"
                width="300"
                height="340"
                fill={tshirtColor}
                clipPath="url(#tshirt-clip)"
              />

              {/* Artworks */}
              {artworks.map((art) => {
                const w = 80 * art.scale;
                const h = 80 * art.scale;
                const isSelected = art.id === selectedId;
                return (
                  <g key={art.id}>
                    {isSelected && (
                      <rect
                        x={art.x - 2}
                        y={art.y - 2}
                        width={w + 4}
                        height={h + 4}
                        fill="none"
                        stroke="#6366f1"
                        strokeWidth="2"
                        strokeDasharray="6 3"
                        clipPath="url(#tshirt-clip)"
                      />
                    )}
                    <image
                      href={art.dataUrl}
                      x={art.x}
                      y={art.y}
                      width={w}
                      height={h}
                      clipPath="url(#tshirt-clip)"
                      style={{ cursor: "grab" }}
                      onMouseDown={(e) => handleArtworkMouseDown(e, art)}
                      onTouchStart={(e) => handleArtworkTouchStart(e, art)}
                    />
                  </g>
                );
              })}

              {/* Shirt outline */}
              <path
                d={SHIRT_PATH}
                fill="none"
                stroke={tshirtColor === "#FFFFFF" ? "#aaa" : "rgba(0,0,0,0.25)"}
                strokeWidth="1.5"
              />

              {/* Back label */}
              {view === "back" && (
                <text
                  x="150"
                  y="55"
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="bold"
                  fill={tshirtColor === "#FFFFFF" ? "#aaa" : "rgba(0,0,0,0.3)"}
                  fontFamily="sans-serif"
                  letterSpacing="4"
                >
                  BACK
                </text>
              )}
            </svg>
            <p className="text-xs text-muted-foreground">
              Drag artwork to reposition
            </p>
          </div>

          {/* Controls */}
          <div className="flex-1 space-y-6">
            {/* Colour picker */}
            <div>
              <p className="text-xs uppercase tracking-widest font-bold mb-3">
                T-Shirt Colour
              </p>
              <div className="flex gap-3">
                {SHIRT_COLORS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    title={c.label}
                    onClick={() => setTshirtColor(c.value)}
                    className="relative rounded-full border-2 transition-all"
                    style={{
                      width: 36,
                      height: 36,
                      backgroundColor: c.value,
                      borderColor:
                        tshirtColor === c.value ? "#6366f1" : "#d1d5db",
                      boxShadow:
                        tshirtColor === c.value
                          ? "0 0 0 3px #6366f133"
                          : undefined,
                    }}
                    data-ocid="tshirt_designer.toggle"
                  >
                    {c.value === "#FFFFFF" && (
                      <span className="absolute inset-0 rounded-full border border-gray-300" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Front / Back toggle */}
            <div>
              <p className="text-xs uppercase tracking-widest font-bold mb-3">
                View
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={view === "front" ? "default" : "outline"}
                  onClick={() => setView("front")}
                  className="text-xs uppercase tracking-widest font-bold"
                  data-ocid="tshirt_designer.tab"
                >
                  Front
                </Button>
                <Button
                  size="sm"
                  variant={view === "back" ? "default" : "outline"}
                  onClick={() => setView("back")}
                  className="text-xs uppercase tracking-widest font-bold"
                  data-ocid="tshirt_designer.tab"
                >
                  Back
                </Button>
              </div>
            </div>

            {/* Upload */}
            <div>
              <p className="text-xs uppercase tracking-widest font-bold mb-3">
                Upload Artwork
              </p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-border rounded-lg p-5 flex flex-col items-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                data-ocid="tshirt_designer.upload_button"
              >
                <Upload className="w-6 h-6" />
                <span className="text-sm font-medium">
                  Click to upload artwork
                </span>
                <span className="text-xs">
                  PNG, JPG, SVG — multiple allowed
                </span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFilesSelected}
              />
            </div>

            {/* Artwork list */}
            {artworks.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-widest font-bold mb-3">
                  Artworks ({artworks.length})
                </p>
                <div className="space-y-2">
                  {artworks.map((art, i) => (
                    <button
                      type="button"
                      key={art.id}
                      onClick={() => setSelectedId(art.id)}
                      className={`w-full flex items-center gap-3 p-2 rounded-lg border cursor-pointer transition-colors text-left ${
                        selectedId === art.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-muted-foreground/40"
                      }`}
                      data-ocid={`tshirt_designer.item.${i + 1}`}
                    >
                      <img
                        src={art.dataUrl}
                        alt={`Artwork ${i + 1}`}
                        className="w-10 h-10 rounded object-contain bg-muted"
                      />
                      <span className="flex-1 text-sm font-medium">
                        Artwork {i + 1}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeArtwork(art.id);
                        }}
                        className="text-muted-foreground hover:text-destructive transition-colors p-1"
                        data-ocid={`tshirt_designer.delete_button.${i + 1}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Scale slider for selected artwork */}
            {selectedArtwork && (
              <div data-ocid="tshirt_designer.panel">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs uppercase tracking-widest font-bold">
                    Scale
                  </p>
                  <span className="text-xs text-muted-foreground font-mono">
                    {selectedArtwork.scale.toFixed(1)}×
                  </span>
                </div>
                <Slider
                  min={0.5}
                  max={3}
                  step={0.1}
                  value={[selectedArtwork.scale]}
                  onValueChange={([v]) => updateScale(selectedArtwork.id, v)}
                  data-ocid="tshirt_designer.toggle"
                />
              </div>
            )}

            {artworks.length === 0 && (
              <p className="text-xs text-muted-foreground italic">
                No artwork uploaded yet. Upload an image to start designing.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ClubPreview({ club }: { club: Club }) {
  return (
    <div className="rounded-xl overflow-hidden border border-border shadow-sm">
      <div
        className="p-8 flex flex-col items-center gap-4"
        style={{
          background: `linear-gradient(135deg, ${club.primaryColor || "#1E6BFF"} 0%, ${club.primaryColor || "#1E6BFF"}cc 100%)`,
        }}
      >
        {club.logoUrl ? (
          <img
            src={club.logoUrl}
            alt={`${club.name} logo`}
            className="w-20 h-20 rounded-full object-cover border-4 border-white/30 shadow-lg"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div
            className="w-20 h-20 rounded-full border-4 border-white/30 flex items-center justify-center text-2xl font-black"
            style={{ color: club.secondaryColor || "#FFFFFF" }}
          >
            {club.name
              ? club.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)
              : "?"}
          </div>
        )}
        <div className="text-center">
          <h3
            className="font-heading font-black text-2xl uppercase tracking-tight"
            style={{ color: club.secondaryColor || "#FFFFFF" }}
          >
            {club.name || "Club Name"}
          </h3>
          <p
            className="text-sm mt-1 opacity-80"
            style={{ color: club.secondaryColor || "#FFFFFF" }}
          >
            {club.description || "Club description will appear here"}
          </p>
        </div>
      </div>
      <div className="bg-card p-4">
        <div className="flex gap-3 justify-center">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div
              className="w-4 h-4 rounded-sm border border-border"
              style={{ backgroundColor: club.primaryColor || "#1E6BFF" }}
            />
            Primary
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div
              className="w-4 h-4 rounded-sm border border-border"
              style={{ backgroundColor: club.secondaryColor || "#FFFFFF" }}
            />
            Secondary
          </div>
        </div>
      </div>
    </div>
  );
}

function InlineProductForm({
  initial,
  onSubmit,
  onCancel,
  isPending,
}: {
  initial: Product;
  onSubmit: (p: Product) => void;
  onCancel: () => void;
  isPending: boolean;
}) {
  const [form, setForm] = useState<Product>(initial);
  const setField = (field: keyof Product, value: string | bigint | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.category) {
      toast.error("Name and Category are required");
      return;
    }
    onSubmit(form);
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-muted/30 border border-border rounded-lg p-6 mt-4"
      data-ocid="club_setup.product.panel"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-bold text-sm uppercase tracking-widest">
          {initial.id === 0n ? "Add New Product" : "Edit Product"}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          data-ocid="club_setup.product.close_button"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label
              htmlFor="cs-prod-name"
              className="text-xs uppercase tracking-widest font-bold"
            >
              Product Name *
            </Label>
            <Input
              id="cs-prod-name"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              placeholder="Pro Running Jersey"
              data-ocid="club_setup.product.input"
            />
          </div>
          <div>
            <Label
              htmlFor="cs-prod-cat"
              className="text-xs uppercase tracking-widest font-bold"
            >
              Category *
            </Label>
            <Input
              id="cs-prod-cat"
              value={form.category}
              onChange={(e) => setField("category", e.target.value)}
              placeholder="Jerseys"
              data-ocid="club_setup.product.input"
            />
          </div>
        </div>
        <div>
          <Label
            htmlFor="cs-prod-desc"
            className="text-xs uppercase tracking-widest font-bold"
          >
            Description
          </Label>
          <Textarea
            id="cs-prod-desc"
            value={form.description}
            onChange={(e) => setField("description", e.target.value)}
            rows={2}
            placeholder="Product description..."
            data-ocid="club_setup.product.textarea"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label
              htmlFor="cs-prod-price"
              className="text-xs uppercase tracking-widest font-bold"
            >
              Price (pence)
            </Label>
            <Input
              id="cs-prod-price"
              type="number"
              value={Number(form.priceInPence)}
              onChange={(e) =>
                setField(
                  "priceInPence",
                  BigInt(Math.max(0, Number.parseInt(e.target.value) || 0)),
                )
              }
              placeholder="2499"
              data-ocid="club_setup.product.input"
            />
            {form.priceInPence > 0n && (
              <p className="text-xs text-muted-foreground mt-1">
                = {formatPrice(form.priceInPence)}
              </p>
            )}
          </div>
          <div>
            <Label
              htmlFor="cs-prod-img"
              className="text-xs uppercase tracking-widest font-bold"
            >
              Image URL
            </Label>
            <Input
              id="cs-prod-img"
              value={form.imageUrl}
              onChange={(e) => setField("imageUrl", e.target.value)}
              placeholder="https://..."
              data-ocid="club_setup.product.input"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label
              htmlFor="cs-prod-sizes"
              className="text-xs uppercase tracking-widest font-bold"
            >
              Sizes (comma-separated)
            </Label>
            <Input
              id="cs-prod-sizes"
              value={form.sizes}
              onChange={(e) => setField("sizes", e.target.value)}
              placeholder="XS,S,M,L,XL,XXL"
              data-ocid="club_setup.product.input"
            />
          </div>
          <div>
            <Label
              htmlFor="cs-prod-colors"
              className="text-xs uppercase tracking-widest font-bold"
            >
              Colours (comma-separated)
            </Label>
            <Input
              id="cs-prod-colors"
              value={form.colors}
              onChange={(e) => setField("colors", e.target.value)}
              placeholder="Royal Blue,White,Black"
              data-ocid="club_setup.product.input"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Switch
            id="cs-prod-active"
            checked={form.isActive}
            onCheckedChange={(checked) => setField("isActive", checked)}
            data-ocid="club_setup.product.switch"
          />
          <Label htmlFor="cs-prod-active" className="text-sm">
            Active (visible in shop)
          </Label>
        </div>
        <div className="flex gap-3 justify-end pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            data-ocid="club_setup.product.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            data-ocid="club_setup.product.submit_button"
          >
            {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {initial.id === 0n ? "Add Product" : "Save Changes"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}

export default function ClubSetup() {
  const { id } = useParams({ strict: false }) as { id: string };
  const clubId = BigInt(id || "0");

  const { login, loginStatus } = useInternetIdentity();
  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();
  const { data: clubs, isLoading: clubsLoading } = useAllClubs();
  const { data: products, isLoading: productsLoading } =
    useProductsByClub(clubId);

  const updateClub = useUpdateClub();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const club = clubs?.find((c) => c.id === clubId);

  const [form, setForm] = useState<Club | null>(null);
  const activeForm: Club = form ??
    club ?? {
      id: clubId,
      name: "",
      slug: "",
      description: "",
      logoUrl: "",
      primaryColor: "#1E6BFF",
      secondaryColor: "#FFFFFF",
    };

  // Sync form once club loads (only if not yet edited)
  if (club && form === null) {
    setForm(club);
  }

  const setField = (field: keyof Club, value: string) =>
    setForm((prev) => ({ ...(prev ?? activeForm), [field]: value }));

  const [productFormState, setProductFormState] = useState<{
    open: boolean;
    product: Product;
  }>({ open: false, product: EMPTY_PRODUCT(clubId) });

  const isLoggedIn = loginStatus === "success";

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div
          className="text-center max-w-md mx-auto px-4"
          data-ocid="club_setup.panel"
        >
          <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="font-heading font-black text-2xl uppercase tracking-tight mb-3">
            Club Setup
          </h1>
          <p className="text-muted-foreground mb-8">
            Please log in to access club setup.
          </p>
          <Button
            size="lg"
            onClick={() => login()}
            className="font-bold uppercase tracking-widest text-xs"
            data-ocid="club_setup.primary_button"
          >
            Login
          </Button>
        </div>
      </div>
    );
  }

  if (adminLoading || clubsLoading) {
    return (
      <div
        className="max-w-7xl mx-auto px-4 py-20"
        data-ocid="club_setup.loading_state"
      >
        <Skeleton className="h-8 w-72 mb-4" />
        <Skeleton className="h-4 w-48 mb-10" />
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-3 space-y-4">
            <Skeleton className="h-12" />
            <Skeleton className="h-24" />
            <Skeleton className="h-12" />
          </div>
          <div className="col-span-2">
            <Skeleton className="h-64 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div
          className="text-center max-w-md mx-auto px-4"
          data-ocid="club_setup.error_state"
        >
          <Shield className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h1 className="font-heading font-black text-2xl uppercase tracking-tight mb-3">
            Access Denied
          </h1>
          <p className="text-muted-foreground">
            You do not have admin privileges.
          </p>
        </div>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center" data-ocid="club_setup.error_state">
          <h1 className="font-heading font-black text-2xl uppercase tracking-tight mb-3">
            Club Not Found
          </h1>
          <Link to="/admin">
            <Button variant="outline" data-ocid="club_setup.secondary_button">
              Back to Admin
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSaveClub = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateClub.mutateAsync(activeForm);
      toast.success("Club updated successfully");
    } catch {
      toast.error("Failed to update club");
    }
  };

  const handleCreateProduct = async (product: Product) => {
    try {
      await createProduct.mutateAsync(product);
      toast.success("Product added");
      setProductFormState({ open: false, product: EMPTY_PRODUCT(clubId) });
    } catch {
      toast.error("Failed to add product");
    }
  };

  const handleUpdateProduct = async (product: Product) => {
    try {
      await updateProduct.mutateAsync(product);
      toast.success("Product updated");
      setProductFormState({ open: false, product: EMPTY_PRODUCT(clubId) });
    } catch {
      toast.error("Failed to update product");
    }
  };

  const handleDeleteProduct = async (productId: bigint) => {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    try {
      await deleteProduct.mutateAsync(productId);
      toast.success("Product deleted");
    } catch {
      toast.error("Failed to delete product");
    }
  };

  const openAddProduct = () =>
    setProductFormState({ open: true, product: EMPTY_PRODUCT(clubId) });

  const openEditProduct = (product: Product) =>
    setProductFormState({ open: true, product });

  const closeProductForm = () =>
    setProductFormState({ open: false, product: EMPTY_PRODUCT(clubId) });

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <div className="bg-navy py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className="flex items-center gap-2 text-sm text-white/60 mb-4"
            data-ocid="club_setup.panel"
          >
            <Link
              to="/admin"
              className="hover:text-white transition-colors"
              data-ocid="club_setup.link"
            >
              Admin
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link
              to="/admin"
              className="hover:text-white transition-colors"
              data-ocid="club_setup.link"
            >
              Clubs
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">{club.name}</span>
          </nav>
          <h1 className="font-heading font-black text-white text-3xl uppercase tracking-tight">
            Club Setup
          </h1>
          <p className="text-white/60 text-sm mt-1">
            {club.name} — manage branding and products
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Branding + Preview */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-8"
        >
          <Card className="lg:col-span-3" data-ocid="club_setup.card">
            <CardHeader>
              <CardTitle className="font-heading font-bold uppercase tracking-tight text-base">
                Club Branding
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveClub} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="cs-name"
                      className="text-xs uppercase tracking-widest font-bold"
                    >
                      Club Name *
                    </Label>
                    <Input
                      id="cs-name"
                      value={activeForm.name}
                      onChange={(e) => setField("name", e.target.value)}
                      placeholder="Manchester City Running Club"
                      data-ocid="club_setup.input"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="cs-slug"
                      className="text-xs uppercase tracking-widest font-bold"
                    >
                      Slug *
                    </Label>
                    <Input
                      id="cs-slug"
                      value={activeForm.slug}
                      onChange={(e) =>
                        setField(
                          "slug",
                          e.target.value.toLowerCase().replace(/\s+/g, "-"),
                        )
                      }
                      placeholder="manchester-city-rc"
                      data-ocid="club_setup.input"
                    />
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor="cs-desc"
                    className="text-xs uppercase tracking-widest font-bold"
                  >
                    Description
                  </Label>
                  <Textarea
                    id="cs-desc"
                    value={activeForm.description}
                    onChange={(e) => setField("description", e.target.value)}
                    rows={3}
                    placeholder="About this club..."
                    data-ocid="club_setup.textarea"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="cs-logo"
                    className="text-xs uppercase tracking-widest font-bold"
                  >
                    Logo URL
                  </Label>
                  <Input
                    id="cs-logo"
                    value={activeForm.logoUrl}
                    onChange={(e) => setField("logoUrl", e.target.value)}
                    placeholder="https://..."
                    data-ocid="club_setup.input"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="cs-primary"
                      className="text-xs uppercase tracking-widest font-bold"
                    >
                      Primary Colour
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="cs-primary"
                        value={activeForm.primaryColor}
                        onChange={(e) =>
                          setField("primaryColor", e.target.value)
                        }
                        placeholder="#1E6BFF"
                        className="font-mono"
                        data-ocid="club_setup.input"
                      />
                      <input
                        type="color"
                        value={activeForm.primaryColor || "#1E6BFF"}
                        onChange={(e) =>
                          setField("primaryColor", e.target.value)
                        }
                        className="w-10 h-10 rounded cursor-pointer border border-border flex-shrink-0"
                      />
                    </div>
                  </div>
                  <div>
                    <Label
                      htmlFor="cs-secondary"
                      className="text-xs uppercase tracking-widest font-bold"
                    >
                      Secondary Colour
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="cs-secondary"
                        value={activeForm.secondaryColor}
                        onChange={(e) =>
                          setField("secondaryColor", e.target.value)
                        }
                        placeholder="#FFFFFF"
                        className="font-mono"
                        data-ocid="club_setup.input"
                      />
                      <input
                        type="color"
                        value={activeForm.secondaryColor || "#FFFFFF"}
                        onChange={(e) =>
                          setField("secondaryColor", e.target.value)
                        }
                        className="w-10 h-10 rounded cursor-pointer border border-border flex-shrink-0"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <Button
                    type="submit"
                    disabled={updateClub.isPending}
                    className="font-bold uppercase tracking-widest text-xs"
                    data-ocid="club_setup.save_button"
                  >
                    {updateClub.isPending && (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    )}
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="lg:col-span-2">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">
                Preview
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <ClubPreview club={activeForm} />
            <p className="text-xs text-muted-foreground mt-3 text-center">
              Live preview updates as you edit
            </p>
          </div>
        </motion.div>

        {/* T-Shirt Designer */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <TshirtDesigner />
        </motion.div>

        {/* Products */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          data-ocid="club_setup.panel"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-heading font-bold text-xl uppercase tracking-tight">
                Club Products
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                {productsLoading
                  ? "Loading..."
                  : `${products?.length ?? 0} product${
                      (products?.length ?? 0) !== 1 ? "s" : ""
                    }`}
              </p>
            </div>
            <Button
              size="sm"
              onClick={openAddProduct}
              className="text-xs uppercase tracking-widest font-bold"
              data-ocid="club_setup.product.open_modal_button"
            >
              <Plus className="w-4 h-4 mr-2" /> Add Product
            </Button>
          </div>

          {productsLoading ? (
            <Skeleton
              className="h-48 rounded-lg"
              data-ocid="club_setup.loading_state"
            />
          ) : (
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <Table data-ocid="club_setup.product.table">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs uppercase tracking-widest font-bold">
                      Name
                    </TableHead>
                    <TableHead className="text-xs uppercase tracking-widest font-bold">
                      Category
                    </TableHead>
                    <TableHead className="text-xs uppercase tracking-widest font-bold">
                      Price
                    </TableHead>
                    <TableHead className="text-xs uppercase tracking-widest font-bold">
                      Sizes
                    </TableHead>
                    <TableHead className="text-xs uppercase tracking-widest font-bold">
                      Colours
                    </TableHead>
                    <TableHead className="text-xs uppercase tracking-widest font-bold">
                      Active
                    </TableHead>
                    <TableHead className="text-xs uppercase tracking-widest font-bold text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!products || products.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center py-12 text-muted-foreground"
                        data-ocid="club_setup.product.empty_state"
                      >
                        No products yet for this club. Add the first one above.
                      </TableCell>
                    </TableRow>
                  ) : (
                    products.map((product, i) => (
                      <TableRow
                        key={product.id.toString()}
                        data-ocid={`club_setup.product.row.${i + 1}`}
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {product.imageUrl ? (
                              <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-9 h-9 rounded object-cover"
                              />
                            ) : (
                              <div className="w-9 h-9 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground font-bold">
                                {product.category?.[0] || "?"}
                              </div>
                            )}
                            <span className="font-medium text-sm">
                              {product.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {product.category}
                        </TableCell>
                        <TableCell className="text-sm font-bold">
                          {formatPrice(product.priceInPence)}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {product.sizes.split(",").map((s) => (
                              <Badge
                                key={s}
                                variant="outline"
                                className="text-xs px-1.5 py-0"
                              >
                                {s.trim()}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {product.colors
                              .split(",")
                              .slice(0, 3)
                              .map((c) => (
                                <span
                                  key={c}
                                  className="text-xs text-muted-foreground"
                                >
                                  {c.trim()}
                                </span>
                              ))}
                            {product.colors.split(",").length > 3 && (
                              <span className="text-xs text-muted-foreground">
                                +{product.colors.split(",").length - 3}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={product.isActive}
                            onCheckedChange={async (checked) => {
                              try {
                                await updateProduct.mutateAsync({
                                  ...product,
                                  isActive: checked,
                                });
                              } catch {
                                toast.error("Failed to update product");
                              }
                            }}
                            data-ocid={`club_setup.product.switch.${i + 1}`}
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-1 justify-end">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditProduct(product)}
                              data-ocid={`club_setup.product.edit_button.${i + 1}`}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-destructive hover:text-destructive"
                              data-ocid={`club_setup.product.delete_button.${i + 1}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}

          {productFormState.open && (
            <InlineProductForm
              initial={productFormState.product}
              onSubmit={
                productFormState.product.id === 0n
                  ? handleCreateProduct
                  : handleUpdateProduct
              }
              onCancel={closeProductForm}
              isPending={createProduct.isPending || updateProduct.isPending}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}
