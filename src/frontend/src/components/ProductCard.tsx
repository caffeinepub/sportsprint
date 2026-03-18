import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import type { Product } from "../backend.d.ts";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function formatPrice(pence: bigint): string {
  return `£${(Number(pence) / 100).toFixed(2)}`;
}

export default function ProductCard({ product, index = 1 }: ProductCardProps) {
  const sizes = product.sizes
    ? product.sizes
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];
  const colors = product.colors
    ? product.colors
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean)
    : [];
  const hasImage = product.imageUrl && product.imageUrl.trim() !== "";

  return (
    <div
      className="bg-card rounded-lg overflow-hidden border border-border group hover:shadow-card transition-all duration-300"
      data-ocid={`product.item.${index}`}
    >
      {/* Image */}
      <div className="aspect-square bg-muted relative overflow-hidden">
        {hasImage ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary to-muted">
            <span className="text-5xl font-heading font-black uppercase text-muted-foreground/20">
              {product.category?.[0] || "S"}
            </span>
          </div>
        )}
        <div className="absolute top-2 left-2">
          <Badge className="text-xs uppercase tracking-wide bg-navy text-white border-0 rounded-sm">
            {product.category || "Apparel"}
          </Badge>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-heading font-bold text-sm uppercase tracking-wide mb-1 line-clamp-2 leading-snug">
          {product.name}
        </h3>
        <p className="text-2xl font-black text-primary mb-3">
          {formatPrice(product.priceInPence)}
        </p>

        {/* Sizes */}
        {sizes.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {sizes.slice(0, 5).map((size) => (
              <span
                key={size}
                className="text-xs border border-border rounded-sm px-1.5 py-0.5 text-muted-foreground font-medium"
              >
                {size}
              </span>
            ))}
            {sizes.length > 5 && (
              <span className="text-xs text-muted-foreground">
                +{sizes.length - 5}
              </span>
            )}
          </div>
        )}

        {/* Colors */}
        {colors.length > 0 && (
          <p className="text-xs text-muted-foreground mb-3 line-clamp-1">
            {colors.join(" · ")}
          </p>
        )}

        <Link to="/product/$id" params={{ id: product.id.toString() }}>
          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs uppercase tracking-widest font-bold hover:bg-primary hover:text-white hover:border-primary transition-all"
            data-ocid={`product.button.${index}`}
          >
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}
