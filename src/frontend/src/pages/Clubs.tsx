import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { Search, Users } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Club } from "../backend.d.ts";
import { SAMPLE_CLUBS } from "../data/sampleData";
import { useAllClubs } from "../hooks/useQueries";

const SKELETON_KEYS = ["a", "b", "c", "d", "e", "f"];

export default function Clubs() {
  const { data: clubs, isLoading } = useAllClubs();
  const [search, setSearch] = useState("");

  const displayClubs: Club[] = clubs && clubs.length > 0 ? clubs : SAMPLE_CLUBS;
  const filtered = displayClubs.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="bg-background min-h-screen">
      {/* Page header */}
      <div className="bg-navy py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-primary font-bold text-xs uppercase tracking-widest">
                Member Clubs
              </span>
            </div>
            <h1 className="font-heading font-black text-white text-4xl md:text-5xl uppercase tracking-tight mb-4">
              Club Locker Rooms
            </h1>
            <p className="text-white/50 max-w-xl">
              Each club has its own dedicated locker room with custom branded
              kit. Find yours below.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search bar */}
      <div className="border-b border-border bg-white sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search clubs..."
              className="pl-10"
              data-ocid="clubs.search_input"
            />
          </div>
        </div>
      </div>

      {/* Clubs grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="clubs.loading_state"
          >
            {SKELETON_KEYS.map((k) => (
              <Skeleton key={k} className="h-48 rounded-lg" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24" data-ocid="clubs.empty_state">
            <Users className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="font-heading font-bold text-lg uppercase tracking-wide text-muted-foreground">
              No clubs found
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Try a different search term
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((club, i) => (
              <motion.div
                key={club.id.toString()}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                data-ocid={`clubs.item.${i + 1}`}
              >
                <Link to="/clubs/$slug" params={{ slug: club.slug }}>
                  <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-card transition-all duration-300 group">
                    {/* Club color banner */}
                    <div
                      className="h-3"
                      style={{
                        background: `linear-gradient(90deg, ${club.primaryColor}, ${club.secondaryColor || `${club.primaryColor}99`})`,
                      }}
                    />
                    <div className="p-6">
                      {/* Logo */}
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 border-2"
                          style={{
                            backgroundColor: `${club.primaryColor}18`,
                            borderColor: `${club.primaryColor}44`,
                          }}
                        >
                          {club.logoUrl ? (
                            <img
                              src={club.logoUrl}
                              alt={club.name}
                              className="w-10 h-10 object-contain"
                            />
                          ) : (
                            <span
                              className="font-heading font-black text-lg"
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
                        <div className="flex-1 min-w-0">
                          <h3 className="font-heading font-bold text-sm uppercase tracking-wide leading-snug group-hover:text-primary transition-colors">
                            {club.name}
                          </h3>
                          <Badge
                            variant="secondary"
                            className="mt-1 text-xs uppercase tracking-wide"
                          >
                            View Locker Room
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {club.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
