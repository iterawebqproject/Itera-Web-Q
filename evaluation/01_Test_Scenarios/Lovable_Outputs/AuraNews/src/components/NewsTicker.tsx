const headlines = [
  "Breaking: Global Wellness Summit Opens in Geneva",
  "New Study Links Sleep Quality to Creative Output",
  "Cultural Renaissance in Southeast Asian Cinema",
  "WHO Reports Record Investment in Mental Health",
  "Indie Music Scene Thrives Despite Streaming Challenges",
  "Mediterranean Diet Named Best for 7th Consecutive Year",
];

export function NewsTicker() {
  return (
    <div
      className="bg-ticker text-ticker-foreground overflow-hidden py-2.5"
      role="marquee"
      aria-label="Breaking news headlines"
    >
      <div className="flex whitespace-nowrap ticker-animate">
        {[...headlines, ...headlines].map((h, i) => (
          <span key={i} className="mx-8 text-sm font-medium tracking-wide" aria-hidden={i >= headlines.length}>
            <span className="font-bold mr-2" aria-hidden="true">●</span>
            {h}
          </span>
        ))}
      </div>
      {/* Screen reader accessible version */}
      <div className="sr-only" aria-live="polite">
        Breaking news: {headlines.join(". ")}
      </div>
    </div>
  );
}
