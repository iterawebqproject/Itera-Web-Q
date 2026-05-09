import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const slides = [
  {
    image: hero1,
    title: "Whispers of Siam",
    subtitle: "A Journey Through Contemporary Thai Painting",
    cta: "View Exhibition",
    link: "/event",
  },
  {
    image: hero2,
    title: "Sculptural Dialogues",
    subtitle: "Monumental Works at BACC",
    cta: "Discover More",
    link: "/art",
  },
  {
    image: hero3,
    title: "Sacred Narratives",
    subtitle: "Traditional Meets Contemporary",
    cta: "Explore Now",
    link: "/gallery-museum",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent(index);
        setTimeout(() => setIsTransitioning(false), 100);
      }, 500);
    },
    [isTransitioning]
  );

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 fade-transition"
          style={{ opacity: i === current && !isTransitioning ? 1 : 0 }}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
            {...(i === 0 ? {} : { loading: "lazy" as const })}
          />
          <div className="absolute inset-0 bg-foreground/40" />
        </div>
      ))}

      <div className="absolute inset-0 flex items-center justify-center text-center z-10">
        <div
          className="fade-transition px-6"
          style={{ opacity: isTransitioning ? 0 : 1 }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-primary-foreground/70 mb-4">
            Thai Gallery Guide
          </p>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-primary-foreground mb-4">
            {slides[current].title}
          </h1>
          <p className="text-lg text-primary-foreground/80 mb-8 font-body">
            {slides[current].subtitle}
          </p>
          <Link
            to={slides[current].link}
            className="inline-block px-8 py-3 bg-primary text-primary-foreground text-xs tracking-[0.2em] uppercase hover:bg-primary/90 transition-colors duration-300"
          >
            {slides[current].cta}
          </Link>
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 text-primary-foreground/60 hover:text-primary-foreground transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} strokeWidth={1} />
      </button>
      <button
        onClick={next}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 text-primary-foreground/60 hover:text-primary-foreground transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight size={28} strokeWidth={1} />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-8 h-px transition-all duration-500 ${
              i === current ? "bg-primary-foreground" : "bg-primary-foreground/30"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
