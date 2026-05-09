import { useEffect, useState } from "react";

const stocks = [
  { symbol: "VTG", price: "142.38", change: "+1.24%" },
  { symbol: "S&P 500", price: "5,892.11", change: "+0.45%" },
  { symbol: "DJIA", price: "42,187.50", change: "-0.12%" },
  { symbol: "NASDAQ", price: "18,439.20", change: "+0.78%" },
  { symbol: "FTSE", price: "8,102.55", change: "+0.33%" },
  { symbol: "EUR/USD", price: "1.0892", change: "-0.05%" },
];

const StockTicker = () => {
  const [paused, setPaused] = useState(false);

  // Pause animation when tab is hidden (Green Software)
  useEffect(() => {
    const handler = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);

  return (
    <div
      className="bg-deep-blue text-deep-blue-foreground overflow-hidden"
      role="marquee"
      aria-label="Stock prices ticker"
    >
      <div
        className={`flex whitespace-nowrap py-2 motion-safe:animate-ticker-scroll ${paused ? "[animation-play-state:paused]" : ""}`}
      >
        {[...stocks, ...stocks].map((s, i) => (
          <span key={i} className="inline-flex items-center gap-2 mx-6 text-xs font-medium">
            <span className="font-bold">{s.symbol}</span>
            <span className="opacity-80">{s.price}</span>
            <span className={s.change.startsWith("+") ? "text-green-400" : "text-red-400"} aria-label={s.change.startsWith("+") ? "up" : "down"}>
              {s.change}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default StockTicker;
