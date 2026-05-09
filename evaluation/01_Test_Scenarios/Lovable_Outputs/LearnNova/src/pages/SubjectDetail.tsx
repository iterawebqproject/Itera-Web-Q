import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { courses } from "@/data/courses";

const tabs = ["Lesson Notes", "Downloads"] as const;

const SubjectDetail = () => {
  const { courseId, lessonId } = useParams();
  const course = courses.find((c) => c.id === courseId);
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("Lesson Notes");

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center text-muted-foreground" role="alert">Course not found.</div>
      </div>
    );
  }

  const currentIndex = course.lessons.findIndex((l) => l.id === lessonId) || 0;
  const currentLesson = course.lessons[currentIndex] || course.lessons[0];
  const prevLesson = course.lessons[currentIndex - 1];
  const nextLesson = course.lessons[currentIndex + 1];

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 container py-6" id="main-content">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Video placeholder */}
            <div className="bg-foreground/5 rounded-xl aspect-video flex items-center justify-center mb-4" role="region" aria-label="Video player">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-3">
                  <Play className="h-7 w-7 text-primary-foreground ml-1" aria-hidden="true" />
                </div>
                <p className="font-heading font-bold text-foreground">{currentLesson.title}</p>
                <p className="text-sm text-muted-foreground">{currentLesson.duration}</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b mb-4" role="tablist" aria-label="Lesson resources">
              {tabs.map((t) => (
                <button
                  key={t}
                  role="tab"
                  aria-selected={activeTab === t}
                  aria-controls={`tabpanel-${t.replace(/\s/g, '-').toLowerCase()}`}
                  id={`tab-${t.replace(/\s/g, '-').toLowerCase()}`}
                  onClick={() => setActiveTab(t)}
                  className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${activeTab === t ? "border-primary-dark text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div
              role="tabpanel"
              id={`tabpanel-${activeTab.replace(/\s/g, '-').toLowerCase()}`}
              aria-labelledby={`tab-${activeTab.replace(/\s/g, '-').toLowerCase()}`}
              className="text-sm text-muted-foreground min-h-[120px]"
            >
              {activeTab === "Lesson Notes" ? (
                <div>
                  <p className="mb-2">Welcome to <strong className="text-foreground">{currentLesson.title}</strong>. In this lesson, you'll explore the key concepts and practical exercises designed to build your understanding step by step.</p>
                  <p>Take your time with each section and practice the examples provided. Don't hesitate to revisit previous lessons if you need a refresher.</p>
                </div>
              ) : (
                <div>
                  <p className="mb-3">Downloadable resources for this lesson:</p>
                  <ul className="space-y-2">
                    <li className="px-3 py-2 border rounded-md"><span aria-hidden="true">📄</span> Lesson Slides (PDF)</li>
                    <li className="px-3 py-2 border rounded-md"><span aria-hidden="true">📝</span> Practice Exercises (PDF)</li>
                    <li className="px-3 py-2 border rounded-md"><span aria-hidden="true">💻</span> Starter Code (ZIP)</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Lesson sidebar */}
          <aside className="lg:w-72 shrink-0" aria-label="Chapter navigation">
            <h3 className="font-heading font-bold text-foreground mb-3">Chapters</h3>
            <nav aria-label="Lesson chapters" className="flex flex-col gap-1">
              {course.lessons.map((lesson, i) => (
                <Link
                  key={lesson.id}
                  to={`/subject-detail/${course.id}/${lesson.id}`}
                  aria-current={lesson.id === currentLesson.id ? "page" : undefined}
                  className={`px-3 py-2 rounded-md text-sm transition-colors ${lesson.id === currentLesson.id ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground hover:bg-accent"}`}
                >
                  {i + 1}. {lesson.title}
                  <span className="ml-auto text-xs opacity-70 float-right">{lesson.duration}</span>
                </Link>
              ))}
            </nav>
          </aside>
        </div>

        {/* Navigation */}
        <nav className="flex items-center justify-between mt-8 pt-6 border-t" aria-label="Lesson navigation">
          {prevLesson ? (
            <Button asChild variant="outline" size="sm">
              <Link to={`/subject-detail/${course.id}/${prevLesson.id}`}>
                <ChevronLeft className="h-4 w-4 mr-1" aria-hidden="true" /> Previous
              </Link>
            </Button>
          ) : <div />}
          {nextLesson ? (
            <Button asChild size="sm" className="bg-primary-dark text-card hover:bg-primary-dark/90">
              <Link to={`/subject-detail/${course.id}/${nextLesson.id}`}>
                Next <ChevronRight className="h-4 w-4 ml-1" aria-hidden="true" />
              </Link>
            </Button>
          ) : (
            <Button asChild size="sm" className="bg-primary-dark text-card hover:bg-primary-dark/90">
              <Link to={`/subject/${course.id}`}>Back to Course</Link>
            </Button>
          )}
        </nav>
      </main>

      <SiteFooter />
    </div>
  );
};

export default SubjectDetail;
