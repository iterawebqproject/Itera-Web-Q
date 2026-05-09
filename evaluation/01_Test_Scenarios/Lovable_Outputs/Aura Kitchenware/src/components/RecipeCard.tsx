import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import type { Recipe } from "@/data/recipes";

const RecipeCard = ({ recipe }: { recipe: Recipe }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow"
  >
    <div className="aspect-[4/3] overflow-hidden">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
        width={800}
        height={600}
      />
    </div>
    <div className="p-4 space-y-2">
      <div className="flex gap-2 flex-wrap">
        {recipe.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>
      <h3 className="heading-display text-base">{recipe.title}</h3>
      <p className="text-xs text-muted-foreground">{recipe.prepTime} · {recipe.servings} servings</p>
      <Link
        to={`/recipes#recipe-${recipe.id}`}
        className="inline-block text-sm text-primary font-medium hover:underline mt-1"
      >
        View Recipe →
      </Link>
    </div>
  </motion.div>
);

export default RecipeCard;
