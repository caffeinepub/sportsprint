import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Check, Ruler, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { formatPrice } from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { SAMPLE_PRODUCTS } from "../data/sampleData";
import { useProductById } from "../hooks/useQueries";

export default function ProductDetail() {
  const { id } = useParams({ from: "/product/$id" });
  const productId = id ? BigInt(id) : undefined;
  const { data: product, isLoading } = useProductById(productId);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const displayProduct =
    product ||
    SAMPLE_PRODUCTS.find((p) => p.id.toString() === id) ||
    SAMPLE_PRODUCTS[0];

  const sizes = displayProduct.sizes
    ? displayProduct.sizes
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];
  const colors = displayProduct.colors
    ? displayProduct.colors
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean)
    : [];

  const [selectedSize, setSelectedSize] = useState(sizes[0] || "");
  const [selectedColor, setSelectedColor] = useState(colors[0] || "");
  const hasImage =
    displayProduct.imageUrl && displayProduct.imageUrl.trim() !== "";

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (!selectedColor) {
      toast.error("Please select a colour");
      return;
    }
    addToCart({
      productId: displayProduct.id.toString(),
      productName: displayProduct.name,
      price: displayProduct.priceInPence,
      size: selectedSize,
      color: selectedColor,
      imageUrl: displayProduct.imageUrl || "",
    });
    toast.success(`Added ${displayProduct.name} to your basket!`, {
      action: {
        label: "View Basket",
        onClick: () => navigate({ to: "/basket" }),
      },
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Skeleton
            className="aspect-square rounded-lg"
            data-ocid="product.loading_state"
          />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-12 w-1/3" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/stock"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-xs uppercase tracking-widest font-bold mb-8 transition-colors"
          data-ocid="product.link"
        >
          <ArrowLeft className="w-3 h-3" /> Back to Stock
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="aspect-square bg-muted rounded-lg overflow-hidden"
          >
            {hasImage ? (
              <img
                src={displayProduct.imageUrl}
                alt={displayProduct.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary to-muted">
                <span className="font-heading font-black text-8xl uppercase text-muted-foreground/20">
                  {displayProduct.category?.[0] || "S"}
                </span>
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="bg-navy text-white border-0 text-xs uppercase tracking-widest rounded-sm mb-3">
              {displayProduct.category || "Apparel"}
            </Badge>
            <h1 className="font-heading font-black text-3xl md:text-4xl uppercase tracking-tight mb-2">
              {displayProduct.name}
            </h1>
            <p className="text-4xl font-black text-primary mb-6">
              {formatPrice(displayProduct.priceInPence)}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {displayProduct.description}
            </p>

            {/* Size selector */}
            {sizes.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-heading font-bold text-sm uppercase tracking-widest">
                    Size
                  </h3>
                  <button
                    type="button"
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Ruler className="w-3 h-3" /> Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      type="button"
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 text-sm font-bold border rounded-sm transition-all ${
                        selectedSize === size
                          ? "bg-primary text-white border-primary"
                          : "border-border text-foreground hover:border-primary hover:text-primary"
                      }`}
                      data-ocid="product.toggle"
                    >
                      {selectedSize === size && (
                        <Check className="inline w-3 h-3 mr-1" />
                      )}
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colour selector */}
            {colors.length > 0 && (
              <div className="mb-8">
                <h3 className="font-heading font-bold text-sm uppercase tracking-widest mb-3">
                  Colour{selectedColor ? `: ${selectedColor}` : ""}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      type="button"
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 text-sm font-bold border rounded-sm transition-all ${
                        selectedColor === color
                          ? "bg-primary text-white border-primary"
                          : "border-border text-foreground hover:border-primary hover:text-primary"
                      }`}
                      data-ocid="product.toggle"
                    >
                      {selectedColor === color && (
                        <Check className="inline w-3 h-3 mr-1" />
                      )}
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Button
              size="lg"
              onClick={handleAddToCart}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest text-sm mb-3"
              data-ocid="product.primary_button"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Custom printing available for clubs — contact us for bulk orders
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
