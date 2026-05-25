import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  variant: "admin" | "all";
  children: React.ReactNode;
}

const StatusBadge = ({ variant, children }: StatusBadgeProps) => (
  <Badge
    className={
      variant === "admin"
        ? "bg-accent text-accent-foreground text-xs"
        : "bg-secondary text-secondary-foreground text-xs"
    }
  >
    {children}
  </Badge>
);

export default StatusBadge;
