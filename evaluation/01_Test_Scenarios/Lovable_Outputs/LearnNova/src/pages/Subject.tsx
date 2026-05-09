import { useParams, Link } from "react-router-dom";
import { Clock, Star, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { courses } from "@/data/courses";

const Subject = () => {
  const { courseId } = useParams();
  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center text-muted-foreground" role="alert">Course not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* Hero */}
      <section className="bg-primary" aria-label="Course overview">
        <div className="container py-12 sm:py-16">
          <p className="text-sm font-medium text-primary-foreground/70 mb-2">{course.level} · {course.category}</p>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-primary-foreground mb-3">{course.title}</h1>
          <p className="text-primary-foreground/80 max-w-2xl mb-6">{course.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-primary-foreground/70 mb-6">
            <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-primary-foreground text-primary-foreground" aria-hidden="true" /> <span>{course.rating} rating</span></span>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" aria-hidden="true" /> <span>{course.duration}</span></span>
            <span className="flex items-center gap-1"><BookOpen className="h-4 w-4" aria-hidden="true" /> <span>{course.modules.length} modules</span></span>
          </div>
          <Button asChild size="lg" className="bg-card text-foreground hover:bg-card/90">
            <Link to={`/subject-detail/${course.id}/1`}>Enroll — {course.price}</Link>
          </Button>
        </div>
      </section>

      <main className="flex-1 container py-10" id="main-content">
        {/* Syllabus */}
        <h2 className="font-heading text-xl font-bold mb-4">Syllabus</h2>
        <ol className="flex flex-col gap-3 mb-10 list-none p-0">
          {course.modules.map((m, i) => (
            <li key={i} className="border border-border rounded-lg p-4 flex items-center justify-between">
              <p className="font-medium text-foreground">Module {i + 1}: {m.title}</p>
              <span className="text-sm text-muted-foreground shrink-0">{m.duration}</span>
            </li>
          ))}
        </ol>

        {/* Instructor */}
        <h2 className="font-heading text-xl font-bold mb-4">Instructor</h2>
        <div className="flex items-start gap-4 border border-border rounded-lg p-5">
          <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center shrink-0" aria-hidden="true">
            <span className="text-xl font-bold text-accent-foreground">{course.instructor[0]}</span>
          </div>
          <div>
            <p className="font-heading font-bold text-foreground">{course.instructor}</p>
            <p className="text-sm text-muted-foreground mt-1">{course.instructorBio}</p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Subject;
