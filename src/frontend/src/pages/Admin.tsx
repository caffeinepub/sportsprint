import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import { Loader2, Pencil, Plus, Settings, Shield, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Club, Product } from "../backend.d.ts";
import { formatPrice } from "../components/ProductCard";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAllClubs,
  useCreateClub,
  useCreateProduct,
  useDeleteClub,
  useDeleteProduct,
  useGeneralStock,
  useIsAdmin,
  useUpdateClub,
  useUpdateProduct,
} from "../hooks/useQueries";

const EMPTY_CLUB: Club = {
  id: 0n,
  name: "",
  slug: "",
  description: "",
  logoUrl: "",
  primaryColor: "#1E6BFF",
  secondaryColor: "#FFFFFF",
};

const EMPTY_PRODUCT: Product = {
  id: 0n,
  clubId: -1n,
  name: "",
  description: "",
  priceInPence: 0n,
  category: "",
  sizes: "XS,S,M,L,XL,XXL",
  colors: "",
  imageUrl: "",
  isActive: true,
};

function ClubForm({
  initial,
  onSubmit,
  isPending,
  onClose,
}: {
  initial: Club;
  onSubmit: (c: Club) => void;
  isPending: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Club>(initial);

  const set = (field: keyof Club, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.slug) {
      toast.error("Name and Slug are required");
      return;
    }
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label
            htmlFor="club-name"
            className="text-xs uppercase tracking-widest font-bold"
          >
            Club Name *
          </Label>
          <Input
            id="club-name"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Manchester City Running Club"
            data-ocid="admin.club.input"
          />
        </div>
        <div>
          <Label
            htmlFor="club-slug"
            className="text-xs uppercase tracking-widest font-bold"
          >
            Slug *
          </Label>
          <Input
            id="club-slug"
            value={form.slug}
            onChange={(e) =>
              set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))
            }
            placeholder="manchester-city-rc"
            data-ocid="admin.club.input"
          />
        </div>
      </div>
      <div>
        <Label
          htmlFor="club-desc"
          className="text-xs uppercase tracking-widest font-bold"
        >
          Description
        </Label>
        <Textarea
          id="club-desc"
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          rows={3}
          placeholder="About this club..."
          data-ocid="admin.club.textarea"
        />
      </div>
      <div>
        <Label
          htmlFor="club-logo"
          className="text-xs uppercase tracking-widest font-bold"
        >
          Logo URL
        </Label>
        <Input
          id="club-logo"
          value={form.logoUrl}
          onChange={(e) => set("logoUrl", e.target.value)}
          placeholder="https://..."
          data-ocid="admin.club.input"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label
            htmlFor="club-primary"
            className="text-xs uppercase tracking-widest font-bold"
          >
            Primary Colour
          </Label>
          <div className="flex gap-2">
            <Input
              id="club-primary"
              value={form.primaryColor}
              onChange={(e) => set("primaryColor", e.target.value)}
              placeholder="#1E6BFF"
              data-ocid="admin.club.input"
            />
            <input
              type="color"
              value={form.primaryColor || "#1E6BFF"}
              onChange={(e) => set("primaryColor", e.target.value)}
              className="w-10 h-10 rounded cursor-pointer border border-border"
            />
          </div>
        </div>
        <div>
          <Label
            htmlFor="club-secondary"
            className="text-xs uppercase tracking-widest font-bold"
          >
            Secondary Colour
          </Label>
          <div className="flex gap-2">
            <Input
              id="club-secondary"
              value={form.secondaryColor}
              onChange={(e) => set("secondaryColor", e.target.value)}
              placeholder="#FFFFFF"
              data-ocid="admin.club.input"
            />
            <input
              type="color"
              value={form.secondaryColor || "#FFFFFF"}
              onChange={(e) => set("secondaryColor", e.target.value)}
              className="w-10 h-10 rounded cursor-pointer border border-border"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-3 justify-end pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          data-ocid="admin.club.cancel_button"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          data-ocid="admin.club.submit_button"
        >
          {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {initial.id === 0n ? "Create Club" : "Update Club"}
        </Button>
      </div>
    </form>
  );
}

function ProductForm({
  initial,
  clubs,
  onSubmit,
  isPending,
  onClose,
}: {
  initial: Product;
  clubs: Club[];
  onSubmit: (p: Product) => void;
  isPending: boolean;
  onClose: () => void;
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label
            htmlFor="prod-name"
            className="text-xs uppercase tracking-widest font-bold"
          >
            Product Name *
          </Label>
          <Input
            id="prod-name"
            value={form.name}
            onChange={(e) => setField("name", e.target.value)}
            placeholder="Pro Running Jersey"
            data-ocid="admin.product.input"
          />
        </div>
        <div>
          <Label
            htmlFor="prod-cat"
            className="text-xs uppercase tracking-widest font-bold"
          >
            Category *
          </Label>
          <Input
            id="prod-cat"
            value={form.category}
            onChange={(e) => setField("category", e.target.value)}
            placeholder="Jerseys"
            data-ocid="admin.product.input"
          />
        </div>
      </div>
      <div>
        <Label
          htmlFor="prod-desc"
          className="text-xs uppercase tracking-widest font-bold"
        >
          Description
        </Label>
        <Textarea
          id="prod-desc"
          value={form.description}
          onChange={(e) => setField("description", e.target.value)}
          rows={2}
          data-ocid="admin.product.textarea"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label
            htmlFor="prod-price"
            className="text-xs uppercase tracking-widest font-bold"
          >
            Price (pence)
          </Label>
          <Input
            id="prod-price"
            type="number"
            value={Number(form.priceInPence)}
            onChange={(e) =>
              setField(
                "priceInPence",
                BigInt(Math.max(0, Number.parseInt(e.target.value) || 0)),
              )
            }
            placeholder="2499"
            data-ocid="admin.product.input"
          />
          <p className="text-xs text-muted-foreground mt-1">
            ={" "}
            {form.priceInPence > 0n ? formatPrice(form.priceInPence) : "£0.00"}
          </p>
        </div>
        <div>
          <Label
            htmlFor="prod-club"
            className="text-xs uppercase tracking-widest font-bold"
          >
            Club (or General Stock)
          </Label>
          <select
            id="prod-club"
            value={form.clubId.toString()}
            onChange={(e) => setField("clubId", BigInt(e.target.value))}
            className="w-full h-10 border border-input rounded-md px-3 text-sm bg-background"
            data-ocid="admin.product.select"
          >
            <option value="-1">General Stock</option>
            {clubs.map((c) => (
              <option key={c.id.toString()} value={c.id.toString()}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label
            htmlFor="prod-sizes"
            className="text-xs uppercase tracking-widest font-bold"
          >
            Sizes (comma-separated)
          </Label>
          <Input
            id="prod-sizes"
            value={form.sizes}
            onChange={(e) => setField("sizes", e.target.value)}
            placeholder="XS,S,M,L,XL,XXL"
            data-ocid="admin.product.input"
          />
        </div>
        <div>
          <Label
            htmlFor="prod-colors"
            className="text-xs uppercase tracking-widest font-bold"
          >
            Colours (comma-separated)
          </Label>
          <Input
            id="prod-colors"
            value={form.colors}
            onChange={(e) => setField("colors", e.target.value)}
            placeholder="Royal Blue,White,Black"
            data-ocid="admin.product.input"
          />
        </div>
      </div>
      <div>
        <Label
          htmlFor="prod-img"
          className="text-xs uppercase tracking-widest font-bold"
        >
          Image URL
        </Label>
        <Input
          id="prod-img"
          value={form.imageUrl}
          onChange={(e) => setField("imageUrl", e.target.value)}
          placeholder="https://..."
          data-ocid="admin.product.input"
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="prod-active"
          checked={form.isActive}
          onChange={(e) => setField("isActive", e.target.checked)}
          className="w-4 h-4"
          data-ocid="admin.product.checkbox"
        />
        <Label htmlFor="prod-active" className="text-sm">
          Active (visible in shop)
        </Label>
      </div>
      <div className="flex gap-3 justify-end pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          data-ocid="admin.product.cancel_button"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          data-ocid="admin.product.submit_button"
        >
          {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {initial.id === 0n ? "Create Product" : "Update Product"}
        </Button>
      </div>
    </form>
  );
}

export default function Admin() {
  const { login, loginStatus } = useInternetIdentity();
  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();
  const { data: clubs, isLoading: clubsLoading } = useAllClubs();
  const { data: products, isLoading: productsLoading } = useGeneralStock();

  const createClub = useCreateClub();
  const updateClub = useUpdateClub();
  const deleteClub = useDeleteClub();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [clubDialog, setClubDialog] = useState<{ open: boolean; club: Club }>({
    open: false,
    club: EMPTY_CLUB,
  });
  const [productDialog, setProductDialog] = useState<{
    open: boolean;
    product: Product;
  }>({
    open: false,
    product: EMPTY_PRODUCT,
  });

  const isLoggedIn = loginStatus === "success";

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-4"
          data-ocid="admin.panel"
        >
          <div className="w-16 h-16 bg-navy rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-heading font-black text-2xl uppercase tracking-tight mb-3">
            Admin Area
          </h1>
          <p className="text-muted-foreground mb-8">
            Please log in to access the admin dashboard.
          </p>
          <Button
            size="lg"
            onClick={() => login()}
            className="bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest text-xs"
            data-ocid="admin.primary_button"
          >
            Login to Admin
          </Button>
        </motion.div>
      </div>
    );
  }

  if (adminLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <Skeleton className="h-12 w-64 mb-8" data-ocid="admin.loading_state" />
        <Skeleton className="h-64 rounded-lg" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div
          className="text-center max-w-md mx-auto px-4"
          data-ocid="admin.error_state"
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

  const handleCreateClub = async (club: Club) => {
    try {
      await createClub.mutateAsync(club);
      toast.success("Club created successfully");
      setClubDialog({ open: false, club: EMPTY_CLUB });
    } catch {
      toast.error("Failed to create club");
    }
  };

  const handleUpdateClub = async (club: Club) => {
    try {
      await updateClub.mutateAsync(club);
      toast.success("Club updated successfully");
      setClubDialog({ open: false, club: EMPTY_CLUB });
    } catch {
      toast.error("Failed to update club");
    }
  };

  const handleDeleteClub = async (clubId: bigint) => {
    if (!confirm("Delete this club? This cannot be undone.")) return;
    try {
      await deleteClub.mutateAsync(clubId);
      toast.success("Club deleted");
    } catch {
      toast.error("Failed to delete club");
    }
  };

  const handleCreateProduct = async (product: Product) => {
    try {
      await createProduct.mutateAsync(product);
      toast.success("Product created successfully");
      setProductDialog({ open: false, product: EMPTY_PRODUCT });
    } catch {
      toast.error("Failed to create product");
    }
  };

  const handleUpdateProduct = async (product: Product) => {
    try {
      await updateProduct.mutateAsync(product);
      toast.success("Product updated");
      setProductDialog({ open: false, product: EMPTY_PRODUCT });
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

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <div className="bg-navy py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary" />
            <h1 className="font-heading font-black text-white text-3xl uppercase tracking-tight">
              Admin Dashboard
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Tabs defaultValue="clubs" data-ocid="admin.tab">
          <TabsList className="mb-8">
            <TabsTrigger
              value="clubs"
              className="uppercase tracking-widest text-xs font-bold"
              data-ocid="admin.tab"
            >
              Clubs ({clubs?.length ?? 0})
            </TabsTrigger>
            <TabsTrigger
              value="products"
              className="uppercase tracking-widest text-xs font-bold"
              data-ocid="admin.tab"
            >
              Products ({products?.length ?? 0})
            </TabsTrigger>
          </TabsList>

          {/* Clubs Tab */}
          <TabsContent value="clubs">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading font-bold text-xl uppercase tracking-tight">
                Manage Clubs
              </h2>
              <Dialog
                open={clubDialog.open && clubDialog.club.id === 0n}
                onOpenChange={(open) =>
                  setClubDialog({ open, club: EMPTY_CLUB })
                }
              >
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    className="text-xs uppercase tracking-widest font-bold"
                    data-ocid="admin.club.open_modal_button"
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Club
                  </Button>
                </DialogTrigger>
                <DialogContent
                  className="max-w-lg"
                  data-ocid="admin.club.dialog"
                >
                  <DialogHeader>
                    <DialogTitle className="font-heading font-bold uppercase tracking-tight">
                      Create New Club
                    </DialogTitle>
                  </DialogHeader>
                  <ClubForm
                    initial={EMPTY_CLUB}
                    onSubmit={handleCreateClub}
                    isPending={createClub.isPending}
                    onClose={() =>
                      setClubDialog({ open: false, club: EMPTY_CLUB })
                    }
                  />
                </DialogContent>
              </Dialog>
            </div>

            {clubsLoading ? (
              <Skeleton
                className="h-48 rounded-lg"
                data-ocid="admin.loading_state"
              />
            ) : (
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <Table data-ocid="admin.club.table">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs uppercase tracking-widest font-bold">
                        Club
                      </TableHead>
                      <TableHead className="text-xs uppercase tracking-widest font-bold">
                        Slug
                      </TableHead>
                      <TableHead className="text-xs uppercase tracking-widest font-bold">
                        Colours
                      </TableHead>
                      <TableHead className="text-xs uppercase tracking-widest font-bold text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {!clubs || clubs.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          className="text-center py-12 text-muted-foreground"
                          data-ocid="admin.club.empty_state"
                        >
                          No clubs yet. Add your first club above.
                        </TableCell>
                      </TableRow>
                    ) : (
                      clubs.map((club, i) => (
                        <TableRow
                          key={club.id.toString()}
                          data-ocid={`admin.club.row.${i + 1}`}
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div
                                className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold"
                                style={{
                                  backgroundColor: `${club.primaryColor}22`,
                                  color: club.primaryColor,
                                }}
                              >
                                {club.name
                                  .split(" ")
                                  .map((w) => w[0])
                                  .join("")
                                  .slice(0, 2)}
                              </div>
                              <span className="font-medium text-sm">
                                {club.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground font-mono">
                            {club.slug}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <div
                                className="w-5 h-5 rounded-sm border border-border"
                                style={{ backgroundColor: club.primaryColor }}
                              />
                              <div
                                className="w-5 h-5 rounded-sm border border-border"
                                style={{ backgroundColor: club.secondaryColor }}
                              />
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                              <Link
                                to="/admin/clubs/$id"
                                params={{ id: club.id.toString() }}
                                data-ocid={`admin.club.link.${i + 1}`}
                              >
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-xs font-bold"
                                >
                                  <Settings className="w-3.5 h-3.5 mr-1" />
                                  Setup
                                </Button>
                              </Link>
                              <Dialog
                                open={
                                  clubDialog.open &&
                                  clubDialog.club.id === club.id
                                }
                                onOpenChange={(open) =>
                                  setClubDialog({
                                    open,
                                    club: open ? club : EMPTY_CLUB,
                                  })
                                }
                              >
                                <DialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    data-ocid={`admin.club.edit_button.${i + 1}`}
                                  >
                                    <Pencil className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent
                                  className="max-w-lg"
                                  data-ocid="admin.club.dialog"
                                >
                                  <DialogHeader>
                                    <DialogTitle className="font-heading font-bold uppercase tracking-tight">
                                      Edit Club
                                    </DialogTitle>
                                  </DialogHeader>
                                  <ClubForm
                                    initial={club}
                                    onSubmit={handleUpdateClub}
                                    isPending={updateClub.isPending}
                                    onClose={() =>
                                      setClubDialog({
                                        open: false,
                                        club: EMPTY_CLUB,
                                      })
                                    }
                                  />
                                </DialogContent>
                              </Dialog>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteClub(club.id)}
                                className="text-destructive hover:text-destructive"
                                data-ocid={`admin.club.delete_button.${i + 1}`}
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
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading font-bold text-xl uppercase tracking-tight">
                Manage Products
              </h2>
              <Dialog
                open={productDialog.open && productDialog.product.id === 0n}
                onOpenChange={(open) =>
                  setProductDialog({ open, product: EMPTY_PRODUCT })
                }
              >
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    className="text-xs uppercase tracking-widest font-bold"
                    data-ocid="admin.product.open_modal_button"
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent
                  className="max-w-lg max-h-[90vh] overflow-y-auto"
                  data-ocid="admin.product.dialog"
                >
                  <DialogHeader>
                    <DialogTitle className="font-heading font-bold uppercase tracking-tight">
                      Create New Product
                    </DialogTitle>
                  </DialogHeader>
                  <ProductForm
                    initial={EMPTY_PRODUCT}
                    clubs={clubs || []}
                    onSubmit={handleCreateProduct}
                    isPending={createProduct.isPending}
                    onClose={() =>
                      setProductDialog({ open: false, product: EMPTY_PRODUCT })
                    }
                  />
                </DialogContent>
              </Dialog>
            </div>

            {productsLoading ? (
              <Skeleton
                className="h-48 rounded-lg"
                data-ocid="admin.loading_state"
              />
            ) : (
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <Table data-ocid="admin.product.table">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs uppercase tracking-widest font-bold">
                        Product
                      </TableHead>
                      <TableHead className="text-xs uppercase tracking-widest font-bold">
                        Category
                      </TableHead>
                      <TableHead className="text-xs uppercase tracking-widest font-bold">
                        Price
                      </TableHead>
                      <TableHead className="text-xs uppercase tracking-widest font-bold">
                        Status
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
                          colSpan={5}
                          className="text-center py-12 text-muted-foreground"
                          data-ocid="admin.product.empty_state"
                        >
                          No products yet. Add your first product above.
                        </TableCell>
                      </TableRow>
                    ) : (
                      products.map((product, i) => (
                        <TableRow
                          key={product.id.toString()}
                          data-ocid={`admin.product.row.${i + 1}`}
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              {product.imageUrl ? (
                                <img
                                  src={product.imageUrl}
                                  alt={product.name}
                                  className="w-10 h-10 rounded object-cover"
                                />
                              ) : (
                                <div className="w-10 h-10 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground font-bold">
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
                            <span
                              className={`text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-sm ${
                                product.isActive
                                  ? "bg-green-100 text-green-700"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {product.isActive ? "Active" : "Hidden"}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                              <Dialog
                                open={
                                  productDialog.open &&
                                  productDialog.product.id === product.id
                                }
                                onOpenChange={(open) =>
                                  setProductDialog({
                                    open,
                                    product: open ? product : EMPTY_PRODUCT,
                                  })
                                }
                              >
                                <DialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    data-ocid={`admin.product.edit_button.${i + 1}`}
                                  >
                                    <Pencil className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent
                                  className="max-w-lg max-h-[90vh] overflow-y-auto"
                                  data-ocid="admin.product.dialog"
                                >
                                  <DialogHeader>
                                    <DialogTitle className="font-heading font-bold uppercase tracking-tight">
                                      Edit Product
                                    </DialogTitle>
                                  </DialogHeader>
                                  <ProductForm
                                    initial={product}
                                    clubs={clubs || []}
                                    onSubmit={handleUpdateProduct}
                                    isPending={updateProduct.isPending}
                                    onClose={() =>
                                      setProductDialog({
                                        open: false,
                                        product: EMPTY_PRODUCT,
                                      })
                                    }
                                  />
                                </DialogContent>
                              </Dialog>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteProduct(product.id)}
                                className="text-destructive hover:text-destructive"
                                data-ocid={`admin.product.delete_button.${i + 1}`}
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
