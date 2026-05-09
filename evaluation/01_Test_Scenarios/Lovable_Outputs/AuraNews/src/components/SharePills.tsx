import { Twitter, Facebook, Link as LinkIcon } from "lucide-react";

export function SharePills() {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Share</span>
      {[
        { icon: Twitter, label: "Twitter" },
        { icon: Facebook, label: "Facebook" },
        { icon: LinkIcon, label: "Copy Link" },
      ].map(({ icon: Icon, label }) => (
        <button
          key={label}
          className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
          aria-label={label}
        >
          <Icon className="w-4 h-4" />
        </button>
      ))}
    </div>
  );
}
