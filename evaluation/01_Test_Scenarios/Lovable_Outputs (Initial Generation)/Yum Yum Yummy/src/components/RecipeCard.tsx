import { Link } from "react-router-dom";

interface RecipeCardProps {
  id: string;
  title: string;
  image: string;
  category: string;
  description?: string;
}

const RecipeCard = ({ id, title, image, category, description }: RecipeCardProps) => (
  <Link to={`/recipes?id=${id}`} className="recipe-card group block">
    <div className="overflow-hidden aspect-square">
      <img
        src={image}
        alt={title}
        loading="lazy"
        width={800}
        height={800}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-4 text-center">
      <span className="text-xs font-body text-primary font-medium uppercase tracking-wider">
        {category}
      </span>
      <h3 className="font-heading text-lg font-semibold text-card-foreground mt-1">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{description}</p>
      )}
    </div>
  </Link>
);

export default RecipeCard;
