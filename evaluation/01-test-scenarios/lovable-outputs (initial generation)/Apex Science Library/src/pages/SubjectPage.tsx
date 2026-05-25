import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { FileText } from "lucide-react";
import { SidebarLayout } from "@/components/SidebarLayout";
import { subjects, topics } from "@/data/mockData";
import { PageHead } from "@/components/PageHead";

const levels = ["All", "Undergraduate", "Graduate"];
const departments = ["All", "Physics", "Mathematics", "Biology", "Chemistry"];

const SubjectPage = () => {
  const { subjectId } = useParams();
  const [level, setLevel] = useState("All");
  const [dept, setDept] = useState("All");

  const subject = subjects.find((s) => s.id === subjectId);
  const filtered = topics
    .filter((t) => t.subjectId === subjectId)
    .filter((t) => level === "All" || t.level === level)
    .filter((t) => dept === "All" || t.department === dept);

  return (
    <SidebarLayout>
      <PageHead title={`${subject?.name ?? "Subject"} Resources`} description={`Browse ${subject?.name ?? ""} study resources and materials.`} />
      <div className="flex flex-col md:flex-row" id="main-content">
        {/* Filter Sidebar */}
        <aside className="w-full md:w-56 shrink-0 border-b md:border-b-0 md:border-r border-border p-6" aria-label="Filters">
          <h2 className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-4">Filters</h2>
          <fieldset className="mb-6">
            <legend className="font-body text-sm font-medium text-foreground mb-2">Academic Level</legend>
            {levels.map((l) => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                aria-pressed={level === l}
                className={`block w-full text-left px-3 py-1.5 rounded text-sm font-body transition-colors focus:outline-none focus:ring-2 focus:ring-ring ${
                  level === l ? "bg-accent text-primary font-medium" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l}
              </button>
            ))}
          </fieldset>
          <fieldset>
            <legend className="font-body text-sm font-medium text-foreground mb-2">Department</legend>
            {departments.map((d) => (
              <button
                key={d}
                onClick={() => setDept(d)}
                aria-pressed={dept === d}
                className={`block w-full text-left px-3 py-1.5 rounded text-sm font-body transition-colors focus:outline-none focus:ring-2 focus:ring-ring ${
                  dept === d ? "bg-accent text-primary font-medium" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {d}
              </button>
            ))}
          </fieldset>
        </aside>

        {/* Resource Feed */}
        <div className="flex-1 p-6">
          <h1 className="font-heading text-2xl font-bold text-foreground mb-6">
            {subject?.name ?? "Subject"} Resources
          </h1>
          <div className="space-y-4" role="list" aria-label="Resources">
            {filtered.length === 0 && (
              <p className="text-muted-foreground font-body" role="status">No resources match your filters.</p>
            )}
            {filtered.map((topic) => (
              <Link
                key={topic.id}
                to={`/topic/${topic.id}`}
                role="listitem"
                className="block bg-card border border-border rounded-lg p-5 hover:shadow-md hover:border-primary/30 transition-all animate-fade-in focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <div className="flex items-start gap-4">
                  <FileText className="h-6 w-6 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <h3 className="font-heading text-base font-bold text-primary mb-1">{topic.title}</h3>
                    <p className="font-body text-sm text-muted-foreground">{topic.description}</p>
                    <div className="flex gap-3 mt-2">
                      <span className="text-xs font-body bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                        {topic.level}
                      </span>
                      <span className="text-xs font-body bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                        {topic.fileType}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default SubjectPage;
