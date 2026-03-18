import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, SlidersHorizontal } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { SAMPLE_PRODUCTS } from "../data/sampleData";
import { useGeneralStock } from "../hooks/useQueries";

const SKELETON_KEYS = ["a", "b", "c", "d", "e", "f", "g", "h"];

export default function StockShop() {
  const { data: products, isLoading } = useGeneralStock();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "name">(
    "name",
  );

  const displayProducts =
    products && products.length > 0
      ? products.filter((p) => p.isActive)
      : SAMPLE_PRODUCTS;

  const categories = [
    "ALL",
    ...Array.from(new Set(displayProducts.map((p) => p.category))),
  ];

  let filtered = displayProducts.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      selectedCategory === "ALL" || p.category === selectedCategory;
    return matchSearch && matchCat;
  });

  filtered = [...filtered].sort((a, b) => {
    if (sortBy === "price-asc") return Number(a.priceInPence - b.priceInPence);
    if (sortBy === "price-desc") return Number(b.priceInPence - a.priceInPence);
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div className="bg-navy py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-primary font-bold text-xs uppercase tracking-widest mb-3">
              Ready to Ship
            </p>
            <h1 className="font-heading font-black text-white text-4xl md:text-5xl uppercase tracking-tight mb-4">
              Stock Shop
            </h1>
            <p className="text-white/50 max-w-xl">
              Premium performance sportswear available for custom printing.
              Browse, select your size and colour, and we’ll print your club’s
              branding.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters bar */}
      <div className="border-b border-border bg-white sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="pl-10 w-56"
              data-ocid="stock.search_input"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm border transition-colors ${
                  selectedCategory === cat
                    ? "bg-primary text-white border-primary"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
                }`}
                data-ocid="stock.tab"
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="text-xs uppercase tracking-widest border border-border rounded px-2 py-1.5 bg-background text-foreground"
              data-ocid="stock.select"
            >
              <option value="name">A–Z</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-6">
          {filtered.length} Product{filtered.length !== 1 ? "s" : ""}
        </p>

        {isLoading ? (
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
            data-ocid="stock.loading_state"
          >
            {SKELETON_KEYS.map((k) => (
              <Skeleton key={k} className="aspect-square rounded-lg" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24" data-ocid="stock.empty_state">
            <p className="font-heading font-bold text-lg uppercase tracking-wide text-muted-foreground">
              No products found
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id.toString()}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.5) }}
              >
                <ProductCard product={product} index={i + 1} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
