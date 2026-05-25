import { useState, useEffect, useCallback } from "react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const slides = [
  { image: hero1, title: "Shaping the Future\nof Consumer Brands", subtitle: "Innovation meets responsibility" },
  { image: hero2, title: "Sustainability\nAt Our Core", subtitle: "Building a better tomorrow, today" },
  { image: hero3, title: "Our People,\nOur Strength", subtitle: "A global team driving impact" },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);

  useEffect(() => {
    if (paused || prefersReducedMotion) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, prefersReducedMotion, next]);

  return (
    <section
      className="relative h-[90vh] min-h-[600px] overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Hero image slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
          aria-hidden={i !== current}
          role="group"
          aria-roledescription="slide"
          aria-label={`Slide ${i + 1} of ${slides.length}`}
        >
          <img
            src={slide.image}
            alt=""
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "auto"}
            decoding={i === 0 ? "sync" : "async"}
          />
          <div className="absolute inset-0 bg-secondary/60" />
        </div>
      ))}
      <div className="absolute inset-0 flex items-center justify-center text-center px-6">
        <div aria-live="polite" aria-atomic="true">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-primary-foreground leading-tight whitespace-pre-line mb-4">
            {slides[current].title}
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 font-light">
            {slides[current].subtitle}
          </p>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3" role="tablist" aria-label="Slide controls">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            role="tab"
            aria-selected={i === current}
            className={`w-3 h-3 rounded-full transition-all ${
              i === current ? "bg-primary scale-125" : "bg-primary-foreground/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
