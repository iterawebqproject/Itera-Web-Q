import { useParams, Link } from "react-router-dom";
import { SidebarLayout } from "@/components/SidebarLayout";
import { topics } from "@/data/mockData";
import { BookOpen, User, Clock, Award } from "lucide-react";
import { PageHead } from "@/components/PageHead";

const TopicPage = () => {
  const { topicId } = useParams();
  const topic = topics.find((t) => t.id === topicId);

  if (!topic) {
    return (
      <SidebarLayout>
        <PageHead title="Topic Not Found" />
        <div className="p-10 text-center text-muted-foreground" role="status">Topic not found.</div>
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout>
      <PageHead title={topic.title} description={topic.description} />
      <div id="main-content">
        {/* Course Header */}
        <header className="bg-primary px-8 py-10">
          <h1 className="font-heading text-3xl font-bold text-primary-foreground">{topic.title}</h1>
          <p className="font-body text-primary-foreground/80 mt-2">{topic.level} · {topic.department}</p>
        </header>

        {/* Course Overview */}
        <div className="p-8 grid md:grid-cols-2 gap-8">
          <section className="animate-fade-in" aria-labelledby="summary-heading">
            <h2 id="summary-heading" className="font-heading text-xl font-bold text-foreground mb-4">Course Summary</h2>
            <p className="font-body text-muted-foreground leading-relaxed">{topic.description}</p>
            <p className="font-body text-muted-foreground leading-relaxed mt-4">
              This course provides a comprehensive exploration of fundamental principles and their applications.
              Students will engage with problem sets, laboratory exercises, and analytical frameworks designed
              to build a rigorous understanding of the subject matter.
            </p>
            <div className="mt-6 flex gap-4">
              <Link
                to={`/topic-outline/${topic.id}`}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-body text-sm font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                Start Learning
              </Link>
            </div>
          </section>

          {/* Instructor Info Box */}
          <section className="bg-card border border-border rounded-lg p-6 animate-fade-in" style={{ animationDelay: "0.1s" }} aria-labelledby="instructor-heading">
            <h3 id="instructor-heading" className="font-heading text-lg font-bold text-foreground mb-4">Instructor Information</h3>
            <dl className="space-y-4">
              {[
                { icon: User, label: "Instructor", value: "Dr. A. Henderson" },
                { icon: Clock, label: "Duration", value: "16 Weeks" },
                { icon: Award, label: "Credits", value: "4 Credit Hours" },
                { icon: BookOpen, label: "Prerequisites", value: "None" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
                  <div>
                    <dt className="text-xs text-muted-foreground font-body">{item.label}</dt>
                    <dd className="text-sm text-foreground font-body font-medium">{item.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default TopicPage;
