import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, Printer, Search, Users } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { SAMPLE_CLUBS, SAMPLE_PRODUCTS } from "../data/sampleData";
import { useAllClubs, useGeneralStock } from "../hooks/useQueries";

const CATEGORIES = [
  {
    label: "Jerseys",
    icon: "👕",
    desc: "Performance running & cycling jerseys",
  },
  { label: "Shorts", icon: "🩳", desc: "Training and competition shorts" },
  { label: "Jackets", icon: "🧥", desc: "Warm-up and track jackets" },
  { label: "Polos", icon: "👔", desc: "Club polos and casual wear" },
];

export default function Home() {
  const [clubSearch, setClubSearch] = useState("");
  const navigate = useNavigate();
  const { data: clubs } = useAllClubs();
  const { data: stockProducts } = useGeneralStock();

  const displayClubs = (clubs && clubs.length > 0 ? clubs : SAMPLE_CLUBS).slice(
    0,
    6,
  );
  const displayProducts = (
    stockProducts && stockProducts.length > 0 ? stockProducts : SAMPLE_PRODUCTS
  ).slice(0, 4);

  const handleClubSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/clubs", search: { q: clubSearch } as any });
  };

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-sports.dim_1920x800.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/70 to-navy/90" />
        <motion.div
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-4">
            Premium Custom Sportswear
          </p>
          <h1 className="font-heading font-black text-white text-5xl md:text-7xl uppercase leading-none tracking-tight mb-6">
            Custom Gear.
            <br />
            <span className="text-primary">Your Team.</span>
            <br />
            Your Way.
          </h1>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
            Performance Apparel, Club Locker Rooms &amp; Premium Customisation
            for every sport.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/clubs">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest text-xs px-8"
                data-ocid="hero.primary_button"
              >
                Browse Club Locker Rooms <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/stock">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white bg-white/10 hover:bg-white/20 font-bold uppercase tracking-widest text-xs px-8"
                data-ocid="hero.secondary_button"
              >
                Explore Stock Shop
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── Services ── */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading font-black text-3xl md:text-4xl uppercase tracking-tight mb-3">
              What We Offer
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              From grassroots clubs to national teams — we’ve got your kit
              covered.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              className="relative rounded-lg overflow-hidden group cursor-pointer h-80"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="/assets/generated/service-locker-room.dim_800x600.jpg"
                alt="Club Locker Rooms"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-primary font-bold text-xs uppercase tracking-widest">
                    For Clubs
                  </span>
                </div>
                <h3 className="font-heading font-black text-white text-2xl uppercase tracking-tight mb-2">
                  Club Locker Rooms
                </h3>
                <p className="text-white/70 text-sm mb-4">
                  Your own branded shop with all your club’s kit in one place.
                </p>
                <Link to="/clubs">
                  <Button
                    size="sm"
                    className="bg-primary text-white text-xs uppercase tracking-widest font-bold"
                    data-ocid="services.primary_button"
                  >
                    Find Your Club <ChevronRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="relative rounded-lg overflow-hidden group cursor-pointer h-80"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="/assets/generated/service-printing.dim_800x600.jpg"
                alt="Custom Printing"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-2 mb-2">
                  <Printer className="w-5 h-5 text-primary" />
                  <span className="text-primary font-bold text-xs uppercase tracking-widest">
                    Bespoke
                  </span>
                </div>
                <h3 className="font-heading font-black text-white text-2xl uppercase tracking-tight mb-2">
                  Custom Printing
                </h3>
                <p className="text-white/70 text-sm mb-4">
                  Screen print, embroidery, and sublimation on any garment.
                </p>
                <Link to="/stock">
                  <Button
                    size="sm"
                    className="bg-primary text-white text-xs uppercase tracking-widest font-bold"
                    data-ocid="services.secondary_button"
                  >
                    Shop Stock <ChevronRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Category Tiles ── */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-black text-2xl uppercase tracking-tight mb-8 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link
                  to="/stock"
                  search={{ category: cat.label } as any}
                  className="block bg-white rounded-lg p-6 text-center hover:shadow-card transition-shadow group border border-border"
                  data-ocid={`category.item.${i + 1}`}
                >
                  <span className="text-4xl mb-3 block">{cat.icon}</span>
                  <h3 className="font-heading font-bold text-sm uppercase tracking-wide mb-1 group-hover:text-primary transition-colors">
                    {cat.label}
                  </h3>
                  <p className="text-xs text-muted-foreground">{cat.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Club Locker Room Band ── */}
      <section className="py-20 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-3">
              Member Clubs
            </p>
            <h2 className="font-heading font-black text-white text-3xl md:text-4xl uppercase tracking-tight mb-4">
              Find Your Club
            </h2>
            <p className="text-white/50 max-w-lg mx-auto">
              Browse our partner clubs and access their dedicated locker room
              with all their branded kit.
            </p>
          </motion.div>

          {/* Club Logo Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-12">
            {displayClubs.map((club, i) => (
              <motion.div
                key={club.id.toString()}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Link
                  to="/clubs/$slug"
                  params={{ slug: club.slug }}
                  className="block"
                  data-ocid={`clubs.item.${i + 1}`}
                >
                  <div
                    className="aspect-square rounded-lg flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
                    style={{
                      backgroundColor: `${club.primaryColor}33`,
                      border: `2px solid ${club.primaryColor}55`,
                    }}
                  >
                    {club.logoUrl ? (
                      <img
                        src={club.logoUrl}
                        alt={club.name}
                        className="w-12 h-12 object-contain"
                      />
                    ) : (
                      <span
                        className="font-heading font-black text-xl"
                        style={{ color: club.primaryColor }}
                      >
                        {club.name
                          .split(" ")
                          .map((w) => w[0])
                          .join("")
                          .slice(0, 3)}
                      </span>
                    )}
                  </div>
                  <p className="text-white/60 text-xs text-center mt-2 font-medium line-clamp-2 leading-tight">
                    {club.name}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Search */}
          <form
            onSubmit={handleClubSearch}
            className="max-w-lg mx-auto flex gap-3"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input
                value={clubSearch}
                onChange={(e) => setClubSearch(e.target.value)}
                placeholder="ENTER YOUR CLUB NAME..."
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/30 placeholder:text-xs placeholder:tracking-widest uppercase text-sm"
                data-ocid="clubs.search_input"
              />
            </div>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest text-xs"
              data-ocid="clubs.submit_button"
            >
              Search
            </Button>
          </form>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-2">
                In Stock Now
              </p>
              <h2 className="font-heading font-black text-3xl md:text-4xl uppercase tracking-tight">
                Featured Gear
              </h2>
            </div>
            <Link to="/stock">
              <Button
                variant="outline"
                size="sm"
                className="text-xs uppercase tracking-widest font-bold hidden sm:flex"
                data-ocid="featured.button"
              >
                View All <ArrowRight className="ml-2 w-3 h-3" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayProducts.map((product, i) => (
              <motion.div
                key={product.id.toString()}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <ProductCard product={product} index={i + 1} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/stock">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest text-xs"
                data-ocid="featured.primary_button"
              >
                Browse All Products <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
