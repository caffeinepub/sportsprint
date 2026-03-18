import type { Club, Product } from "../backend.d.ts";

export const SAMPLE_CLUBS: Club[] = [
  {
    id: 1n,
    name: "Manchester City Running Club",
    slug: "manchester-city-rc",
    description:
      "One of the largest running clubs in the North West, welcoming runners of all abilities from 5K to ultramarathon.",
    logoUrl: "",
    primaryColor: "#1E6BFF",
    secondaryColor: "#FFFFFF",
  },
  {
    id: 2n,
    name: "Sheffield Eagles FC",
    slug: "sheffield-eagles-fc",
    description:
      "Grassroots football club competing in the South Yorkshire Amateur League. Founded 1987.",
    logoUrl: "",
    primaryColor: "#CC2200",
    secondaryColor: "#FFFFFF",
  },
  {
    id: 3n,
    name: "Yorkshire Tri Club",
    slug: "yorkshire-tri",
    description:
      "Competitive triathlon club covering swim, bike and run events across the county and nationally.",
    logoUrl: "",
    primaryColor: "#007A4D",
    secondaryColor: "#FFD700",
  },
  {
    id: 4n,
    name: "Bristol Thunder RFC",
    slug: "bristol-thunder-rfc",
    description:
      "Amateur rugby union club with men's, women's and junior sections. Training Tuesdays and Thursdays.",
    logoUrl: "",
    primaryColor: "#1A1A2E",
    secondaryColor: "#C8A600",
  },
  {
    id: 5n,
    name: "London Athletics AC",
    slug: "london-athletics-ac",
    description:
      "Track and field athletics club based in East London. Competing at regional and national championships.",
    logoUrl: "",
    primaryColor: "#111111",
    secondaryColor: "#C8A600",
  },
  {
    id: 6n,
    name: "Cardiff Swim Squad",
    slug: "cardiff-swim-squad",
    description:
      "Competitive swimming club for ages 12 and up. Open water and pool events across Wales and beyond.",
    logoUrl: "",
    primaryColor: "#006B9F",
    secondaryColor: "#FF6B35",
  },
];

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 1n,
    clubId: -1n,
    name: "Pro Running Jersey",
    description:
      "Lightweight moisture-wicking performance jersey with breathable mesh panels. Perfect for training and race day.",
    priceInPence: 2499n,
    category: "Jerseys",
    sizes: "XS,S,M,L,XL,XXL",
    colors: "Royal Blue,White,Black,Red",
    imageUrl: "/assets/generated/product-running-jersey.dim_600x600.jpg",
    isActive: true,
  },
  {
    id: 2n,
    clubId: -1n,
    name: "Training Shorts",
    description:
      "Durable lightweight shorts with inner brief lining and deep side pockets. Ideal for all sports.",
    priceInPence: 1899n,
    category: "Shorts",
    sizes: "S,M,L,XL,XXL",
    colors: "Navy,Black,White,Grey",
    imageUrl: "/assets/generated/product-training-shorts.dim_600x600.jpg",
    isActive: true,
  },
  {
    id: 3n,
    clubId: -1n,
    name: "Club Polo Shirt",
    description:
      "Classic piqué polo with embroidered club badge space. Smart casual for club events and presentations.",
    priceInPence: 2299n,
    category: "Polos",
    sizes: "XS,S,M,L,XL,XXL,3XL",
    colors: "Black,Navy,White,Royal Blue,Red",
    imageUrl: "/assets/generated/product-polo-shirt.dim_600x600.jpg",
    isActive: true,
  },
  {
    id: 4n,
    clubId: -1n,
    name: "Performance Track Jacket",
    description:
      "Full-zip track jacket with contrast side panels and zip pockets. Warm-up and cool-down essential.",
    priceInPence: 4499n,
    category: "Jackets",
    sizes: "S,M,L,XL,XXL",
    colors: "Black/Blue,Navy/White,All Black",
    imageUrl: "/assets/generated/product-track-jacket.dim_600x600.jpg",
    isActive: true,
  },
];
