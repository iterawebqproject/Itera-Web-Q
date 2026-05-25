import { FolderOpen, Feather, BookOpen, Heart } from "lucide-react";
import BentoCard from "@/components/BentoCard";
import Header from "@/components/Header";
import SkipToContent from "@/components/SkipToContent";
import usePageMeta from "@/hooks/usePageMeta";

const Index = () => {
  usePageMeta({ title: "Home", description: "Alice's personal website — exploring code, words, books, and everything in between." });

  return (
    <div className="min-h-screen bg-background">
      <SkipToContent />
      <Header />
      <main id="main-content" className="container py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
            Hey, I'm Alice ✦
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Explorer of code, words, books, and everything in between.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-3xl mx-auto" role="navigation" aria-label="Explore sections">
          <BentoCard to="/projects" icon={FolderOpen} title="Projects" description="Things I've built and shipped" className="md:col-span-2 md:row-span-2" />
          <BentoCard to="/writing" icon={Feather} title="Writing" description="Thoughts & essays" className="md:col-span-2" />
          <BentoCard to="/reading" icon={BookOpen} title="Reading" description="My bookshelf" className="md:col-span-1" />
          <BentoCard to="/hobbies" icon={Heart} title="Hobbies" className="md:col-span-1" />
        </div>
      </main>
    </div>
  );
};

export default Index;
