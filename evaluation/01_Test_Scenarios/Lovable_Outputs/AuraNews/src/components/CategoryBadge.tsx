import { Link } from "react-router-dom";

interface CategoryBadgeProps {
  category: string;
  to?: string;
}

export function CategoryBadge({ category, to }: CategoryBadgeProps) {
  const cls = "inline-block text-xs font-semibold uppercase tracking-widest text-primary border border-primary/30 px-2.5 py-0.5 rounded-sm hover:bg-primary hover:text-primary-foreground transition-colors";

  if (to) {
    return <Link to={to} className={cls}>{category}</Link>;
  }
  return <span className={cls}>{category}</span>;
}
