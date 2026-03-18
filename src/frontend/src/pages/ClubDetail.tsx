import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Tag } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { SAMPLE_CLUBS, SAMPLE_PRODUCTS } from "../data/sampleData";
import { useClubBySlug, useProductsByClub } from "../hooks/useQueries";

const SKELETON_KEYS = ["a", "b", "c", "d", "e", "f", "g", "h"];

export default function ClubDetail() {
  const { slug } = useParams({ from: "/clubs/$slug" });
  const { data: club, isLoading: clubLoading } = useClubBySlug(slug);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const displayClub =
    club || SAMPLE_CLUBS.find((c) => c.slug === slug) || SAMPLE_CLUBS[0];

  const { data: products, isLoading: productsLoading } = useProductsByClub(
    displayClub?.id,
  );

  const sampleClubProducts = SAMPLE_PRODUCTS.map((p) => ({
    ...p,
    clubId: displayClub?.id || 1n,
  }));
  const displayProducts =
    products && products.length > 0
      ? products.filter((p) => p.isActive)
      : sampleClubProducts;

  const categories = [
    "ALL",
    ...Array.from(new Set(displayProducts.map((p) => p.category))),
  ];
  const filtered = displayProducts.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      selectedCategory === "ALL" || p.category === selectedCategory;
    return matchSearch && matchCat;
  });

  if (clubLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <Skeleton className="h-48 rounded-lg" data-ocid="club.loading_state" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Club hero banner */}
      <div
        className="relative py-20 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${displayClub.primaryColor}22 0%, ${displayClub.secondaryColor || displayClub.primaryColor}11 100%)`,
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background: `linear-gradient(90deg, ${displayClub.primaryColor}, ${displayClub.secondaryColor || displayClub.primaryColor})`,
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/clubs"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-xs uppercase tracking-widest font-bold mb-8 transition-colors"
            data-ocid="club.link"
          >
            <ArrowLeft className="w-3 h-3" /> All Clubs
          </Link>

          <div className="flex items-center gap-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-24 h-24 rounded-xl flex items-center justify-center flex-shrink-0 border-2"
              style={{
                backgroundColor: `${displayClub.primaryColor}22`,
                borderColor: `${displayClub.primaryColor}66`,
              }}
            >
              {displayClub.logoUrl ? (
                <img
                  src={displayClub.logoUrl}
                  alt={displayClub.name}
                  className="w-16 h-16 object-contain"
                />
              ) : (
                <span
                  className="font-heading font-black text-2xl"
                  style={{ color: displayClub.primaryColor }}
                >
                  {displayClub.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 3)}
                </span>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p
                className="font-bold text-xs uppercase tracking-widest mb-1"
                style={{ color: displayClub.primaryColor }}
              >
                Club Locker Room
              </p>
              <h1 className="font-heading font-black text-3xl md:text-4xl uppercase tracking-tight mb-2">
                {displayClub.name}
              </h1>
              <p className="text-muted-foreground max-w-xl">
                {displayClub.description}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Filters bar */}
      <div className="border-b border-border bg-white sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center gap-3">
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="pl-10 w-48"
              data-ocid="club.search_input"
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
                data-ocid="club.tab"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-6">
          {filtered.length} Product{filtered.length !== 1 ? "s" : ""}
        </p>

        {productsLoading ? (
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
            data-ocid="club.loading_state"
          >
            {SKELETON_KEYS.map((k) => (
              <Skeleton key={k} className="aspect-square rounded-lg" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24" data-ocid="club.empty_state">
            <p className="font-heading font-bold text-lg uppercase tracking-wide text-muted-foreground">
              No products found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
