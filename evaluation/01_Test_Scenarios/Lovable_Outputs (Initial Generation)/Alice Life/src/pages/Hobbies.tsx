import { Gamepad2, Headphones, Camera, Palette, Bike, Coffee } from "lucide-react";
import Header from "@/components/Header";
import SkipToContent from "@/components/SkipToContent";
import usePageMeta from "@/hooks/usePageMeta";

const hobbies = [
  { name: "Gaming", icon: Gamepad2, desc: "RPGs and indie games on weekends" },
  { name: "Music", icon: Headphones, desc: "Lo-fi beats and bedroom producing" },
  { name: "Photography", icon: Camera, desc: "Street and golden hour shots" },
  { name: "Drawing", icon: Palette, desc: "Digital illustration on my iPad" },
  { name: "Cycling", icon: Bike, desc: "Morning rides around the city" },
  { name: "Coffee", icon: Coffee, desc: "Trying every pour-over method" },
];

const Hobbies = () => {
  usePageMeta({ title: "Hobbies", description: "What Alice does for fun — gaming, music, photography, drawing, cycling, and coffee." });

  return (
    <div className="min-h-screen bg-background">
      <SkipToContent />
      <Header />
      <main id="main-content" className="container py-16">
        <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-2">Hobbies</h1>
        <p className="text-muted-foreground mb-12">What I do for fun.</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl">
          {hobbies.map((h) => {
            const Icon = h.icon;
            return (
              <article
                key={h.name}
                className="group bg-card border border-border rounded-lg p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-primary/40"
              >
                <div className="w-10 h-10 rounded-md bg-primary/30 flex items-center justify-center text-primary-foreground/80 mb-3 group-hover:bg-primary transition-colors">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <h2 className="font-display text-base font-semibold text-card-foreground">{h.name}</h2>
                <p className="text-sm text-muted-foreground mt-1">{h.desc}</p>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Hobbies;
