import { breakingNews } from "@/data/news";

const BreakingTicker = () => {
  const text = breakingNews.join("  •  ");

  return (
    <div
      className="ticker-bar py-2 overflow-hidden relative"
      role="marquee"
      aria-label="Breaking news headlines"
    >
      <div className="flex items-center">
        <span className="font-sans text-xs font-bold uppercase px-3 shrink-0 tracking-wider" aria-hidden="true">
          Breaking
        </span>
        <div className="overflow-hidden flex-1">
          <p className="animate-ticker whitespace-nowrap font-sans text-sm" aria-live="off">
            {text}  •  {text}
          </p>
        </div>
      </div>
      {/* Screen reader accessible list */}
      <div className="sr-only" aria-live="polite">
        <p>Breaking news:</p>
        <ul>
          {breakingNews.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BreakingTicker;
