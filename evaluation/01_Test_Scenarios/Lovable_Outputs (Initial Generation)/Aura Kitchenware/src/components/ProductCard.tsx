import { useState } from "react";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [selectedColor, setSelectedColor] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.colors[selectedColor].image}
          alt={`${product.name} in ${product.colors[selectedColor].name}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          width={800}
          height={800}
        />
        {product.badge && (
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs">
            {product.badge}
          </Badge>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          {product.colors.map((color, i) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(i)}
              className={`w-6 h-6 rounded-full border-2 transition-all ${
                i === selectedColor ? "border-primary scale-110" : "border-border"
              }`}
              style={{ backgroundColor: color.hex }}
              aria-label={`Select ${color.name}`}
            />
          ))}
        </div>

        <div>
          <h3 className="heading-display text-base">{product.name}</h3>
          <p className="text-sm text-muted-foreground">${product.price}</p>
        </div>

        <Button size="sm" className="w-full">
          Shop Now
        </Button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
