import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CourseCard from "@/components/CourseCard";
import { courses, categories } from "@/data/courses";

const Index = () => {
  const [email, setEmail] = useState("");
  const topPicks = courses.slice(0, 4);
  const resumeCourse = courses[0];

  const handleNewsletterSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate newsletter signup
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1" id="main-content">
        {/* Resume Learning */}
        <section className="container py-8" aria-label="Resume learning">
          <div className="rounded-xl bg-primary p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-primary-foreground/70 mb-1">Resume Learning</p>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-primary-foreground">{resumeCourse.title}</h2>
              <p className="text-sm text-primary-foreground/70 mt-1">Module 2 · 45% complete</p>
            </div>
            <Button asChild className="bg-card text-foreground hover:bg-card/90 shrink-0">
              <Link to={`/subject-detail/${resumeCourse.id}/3`}>Continue <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" /></Link>
            </Button>
          </div>
        </section>

        {/* Categories */}
        <section className="container pb-6" aria-label="Browse categories">
          <h2 className="font-heading text-lg font-bold mb-3">Browse Categories</h2>
          <nav aria-label="Course categories" className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                className="px-4 py-2 rounded-full border border-primary text-sm font-medium text-foreground hover:bg-accent transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </nav>
        </section>

        {/* Top Picks */}
        <section className="container pb-10" aria-label="Top course picks">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-lg font-bold">Top Picks</h2>
            <Link to="/category/all" className="text-sm text-primary-dark hover:underline">View all</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topPicks.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-muted" aria-label="Newsletter signup">
          <div className="container py-8 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1">
              <h3 className="font-heading font-bold text-foreground">Stay in the loop</h3>
              <p className="text-sm text-muted-foreground">Get new course alerts and learning tips in your inbox.</p>
            </div>
            <form className="flex gap-2 w-full sm:w-auto" onSubmit={handleNewsletterSubmit}>
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <Input
                id="newsletter-email"
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="max-w-xs"
                required
                aria-required="true"
              />
              <Button type="submit" className="bg-primary-dark text-card hover:bg-primary-dark/90 shrink-0">Subscribe</Button>
            </form>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Index;
