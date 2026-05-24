import potOrange from "@/assets/product-pot-orange.jpg";
import potCream from "@/assets/product-pot-cream.jpg";
import panOrange from "@/assets/product-pan-orange.jpg";
import panCream from "@/assets/product-pan-cream.jpg";
import kettleOrange from "@/assets/product-kettle-orange.jpg";
import kettleCream from "@/assets/product-kettle-cream.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  badge?: "Best Seller" | "New";
  colors: { name: string; hex: string; image: string }[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Aura Dutch Oven",
    price: 185,
    category: "Pots",
    badge: "Best Seller",
    colors: [
      { name: "Terracotta", hex: "#FE5A1D", image: potOrange },
      { name: "Cream", hex: "#F5F0E8", image: potCream },
    ],
  },
  {
    id: "2",
    name: "Aura Ceramic Skillet",
    price: 125,
    category: "Pans",
    badge: "New",
    colors: [
      { name: "Terracotta", hex: "#FE5A1D", image: panOrange },
      { name: "Cream", hex: "#F5F0E8", image: panCream },
    ],
  },
  {
    id: "3",
    name: "Aura Tea Kettle",
    price: 95,
    category: "Kettles",
    badge: "New",
    colors: [
      { name: "Terracotta", hex: "#FE5A1D", image: kettleOrange },
      { name: "Cream", hex: "#F5F0E8", image: kettleCream },
    ],
  },
  {
    id: "4",
    name: "Aura Saucepan",
    price: 110,
    category: "Pots",
    colors: [
      { name: "Terracotta", hex: "#FE5A1D", image: potOrange },
      { name: "Cream", hex: "#F5F0E8", image: potCream },
    ],
  },
  {
    id: "5",
    name: "Aura Wok Pan",
    price: 145,
    category: "Pans",
    badge: "Best Seller",
    colors: [
      { name: "Terracotta", hex: "#FE5A1D", image: panOrange },
      { name: "Cream", hex: "#F5F0E8", image: panCream },
    ],
  },
  {
    id: "6",
    name: "Aura Pour-Over Kettle",
    price: 78,
    category: "Kettles",
    colors: [
      { name: "Terracotta", hex: "#FE5A1D", image: kettleOrange },
      { name: "Cream", hex: "#F5F0E8", image: kettleCream },
    ],
  },
];

export const categories = ["All", "Pots", "Pans", "Kettles"];
