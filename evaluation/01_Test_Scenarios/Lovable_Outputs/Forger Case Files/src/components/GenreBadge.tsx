const colorMap: Record<string, string> = {
  Action: "bg-secondary/15 text-secondary",
  Comedy: "bg-primary/15 text-primary",
  "Slice of Life": "bg-accent/15 text-accent",
  Drama: "bg-secondary/20 text-secondary",
  Thriller: "bg-foreground/10 text-foreground",
};

const GenreBadge = ({ genre }: { genre: string }) => (
  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${colorMap[genre] || "bg-muted text-muted-foreground"}`}>
    {genre}
  </span>
);

export default GenreBadge;
