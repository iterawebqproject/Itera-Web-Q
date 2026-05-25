const ReadTimeBadge = ({ minutes }: { minutes: number }) => (
  <span className="inline-block font-body text-[10px] tracking-[0.2em] uppercase px-3 py-1 border border-border text-muted-foreground">
    {minutes} min read
  </span>
);

export default ReadTimeBadge;
