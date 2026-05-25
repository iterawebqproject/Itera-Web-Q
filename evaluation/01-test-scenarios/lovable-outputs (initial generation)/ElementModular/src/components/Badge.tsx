const ModularBadge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded-full">
    {children}
  </span>
);

export default ModularBadge;
