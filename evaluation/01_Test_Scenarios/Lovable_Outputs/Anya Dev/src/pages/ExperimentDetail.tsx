import { useParams, Link } from "react-router-dom";
import { contentItems, getCategoryIcon, getStatusColor } from "@/data/content";
import { ArrowLeft } from "lucide-react";

export default function ExperimentDetail() {
  const { id } = useParams<{ id: string }>();
  const item = contentItems.find((i) => i.id === id && i.category === "experiment");

  if (!item) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16">
        <p className="text-muted-foreground">Experiment not found.</p>
        <Link to="/experiments" className="text-secondary hover:underline mt-4 inline-block">
          ← Back to experiments
        </Link>
      </div>
    );
  }

  const sections = (item.content || "").split("\n\n");

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link
        to="/experiments"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-secondary transition-colors mb-10"
      >
        <ArrowLeft className="h-4 w-4" /> Back to experiments
      </Link>

      {/* Header */}
      <div className="flex items-start gap-4 mb-12">
        <span className="text-4xl">{getCategoryIcon(item.category)}</span>
        <div>
          <h1 className="font-serif text-3xl text-foreground">{item.title}</h1>
          <div className="mt-3 flex items-center gap-2">
            <span
              className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusColor(item.status)}`}
            >
              {item.status}
            </span>
            <span className="text-xs text-muted-foreground">{item.date}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-6">
        {sections.map((section, i) => {
          if (section.startsWith("## ")) {
            return (
              <h2 key={i} className="font-serif text-xl text-foreground mt-10 mb-2">
                {section.replace("## ", "")}
              </h2>
            );
          }
          if (section.startsWith("⚡") || section.startsWith("🔧") || section.startsWith("📐") || section.startsWith("🎨")) {
            return (
              <div
                key={i}
                className="rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground leading-relaxed"
              >
                {section.split("\n").map((line, j) => (
                  <p key={j} className={j > 0 ? "mt-2" : ""}>{line}</p>
                ))}
              </div>
            );
          }
          return (
            <p key={i} className="text-muted-foreground leading-relaxed">
              {section}
            </p>
          );
        })}
      </div>
    </div>
  );
}
