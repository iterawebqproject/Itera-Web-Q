import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface BentoCardProps {
  to: string;
  icon: LucideIcon;
  title: string;
  description?: string;
  className?: string;
}

const BentoCard = ({ to, icon: Icon, title, description, className = "" }: BentoCardProps) => {
  return (
    <Link
      to={to}
      className={`group block bg-card border border-border rounded-lg p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${className}`}
      aria-label={description ? `${title} — ${description}` : title}
    >
      <div className="flex flex-col h-full justify-between gap-4">
        <div className="w-10 h-10 rounded-md bg-primary/30 flex items-center justify-center text-primary-foreground/80 group-hover:bg-primary transition-colors">
          <Icon size={20} aria-hidden="true" />
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-card-foreground">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default BentoCard;
