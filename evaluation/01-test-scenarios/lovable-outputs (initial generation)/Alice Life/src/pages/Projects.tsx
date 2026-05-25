import { Smartphone, Globe, Terminal, Cpu } from "lucide-react";
import Header from "@/components/Header";
import SkipToContent from "@/components/SkipToContent";
import usePageMeta from "@/hooks/usePageMeta";

const projects = [
  { title: "Mood Tracker", desc: "A calming daily mood journal app", icon: Smartphone, stack: ["React Native", "Firebase"] },
  { title: "Portfolio v2", desc: "This very website you're looking at", icon: Globe, stack: ["React", "Tailwind"] },
  { title: "CLI Notes", desc: "A minimal command-line note-taking tool", icon: Terminal, stack: ["Node.js", "SQLite"] },
  { title: "ML Sketcher", desc: "Draw and let AI guess what it is", icon: Cpu, stack: ["Python", "TensorFlow"] },
  { title: "Study Buddy", desc: "Collaborative flashcard web app", icon: Globe, stack: ["Next.js", "Supabase"] },
  { title: "Pixel Garden", desc: "Grow a tiny pixel garden every day", icon: Smartphone, stack: ["Swift", "SpriteKit"] },
];

const Projects = () => {
  usePageMeta({ title: "Projects", description: "A collection of apps and tools Alice has built — from mood trackers to ML sketchers." });

  return (
    <div className="min-h-screen bg-background">
      <SkipToContent />
      <Header />
      <main id="main-content" className="container py-16">
        <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-2">Projects</h1>
        <p className="text-muted-foreground mb-12">A collection of things I've built.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => {
            const Icon = p.icon;
            return (
              <article
                key={p.title}
                className="group bg-card border border-border rounded-lg p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-primary/40"
              >
                <div className="w-10 h-10 rounded-md bg-primary/30 flex items-center justify-center text-primary-foreground/80 mb-4 group-hover:bg-primary transition-colors">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <h2 className="font-display text-lg font-semibold text-card-foreground">{p.title}</h2>
                <p className="text-sm text-muted-foreground mt-1 mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2" aria-label={`Tech stack: ${p.stack.join(", ")}`}>
                  {p.stack.map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Projects;
