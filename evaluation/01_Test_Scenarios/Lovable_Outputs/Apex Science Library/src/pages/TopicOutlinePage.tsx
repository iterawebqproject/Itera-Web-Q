import { useParams } from "react-router-dom";
import { useState } from "react";
import { SidebarLayout } from "@/components/SidebarLayout";
import { PdfPreviewModal } from "@/components/PdfPreviewModal";
import { topics, topicOutline } from "@/data/mockData";
import { Download, FileText, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHead } from "@/components/PageHead";

const TopicOutlinePage = () => {
  const { topicId } = useParams();
  const topic = topics.find((t) => t.id === topicId);
  const [previewFile, setPreviewFile] = useState<string | null>(null);

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
      <PageHead title={`${topic.title} – Outline`} description={`Course outline and materials for ${topic.title}.`} />
      <div className="p-8" id="main-content">
        <h1 className="font-heading text-2xl font-bold text-foreground mb-2">{topic.title}</h1>
        <p className="font-body text-muted-foreground mb-8">Course Outline &amp; Materials</p>

        {/* Academic Matrix */}
        <div className="bg-card border border-border rounded-lg overflow-hidden mb-10 animate-fade-in overflow-x-auto" role="region" aria-label="Course outline table">
          <table className="w-full">
            <caption className="sr-only">Course session outline for {topic.title}</caption>
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th scope="col" className="text-left px-5 py-3 font-heading text-sm font-bold">Session #</th>
                <th scope="col" className="text-left px-5 py-3 font-heading text-sm font-bold">Topic Title</th>
                <th scope="col" className="text-left px-5 py-3 font-heading text-sm font-bold">Associated Files</th>
              </tr>
            </thead>
            <tbody>
              {topicOutline.map((row, i) => (
                <tr key={row.session} className={`border-t border-border ${i % 2 === 1 ? "bg-muted/40" : ""}`}>
                  <td className="px-5 py-3 font-body text-sm text-foreground font-medium">{row.session}</td>
                  <td className="px-5 py-3">
                    <Link
                      to={`/topic-content/${topicId}/${row.session}`}
                      className="font-body text-sm text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring rounded"
                    >
                      {row.title}
                    </Link>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex flex-wrap gap-2">
                      {row.files.map((file) => (
                        <button
                          key={file}
                          onClick={() => setPreviewFile(file)}
                          aria-label={`Preview ${file}`}
                          className="inline-flex items-center gap-1.5 text-xs font-body text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded"
                        >
                          <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                          {file}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Download Hub */}
        <section className="animate-fade-in" style={{ animationDelay: "0.15s" }} aria-labelledby="download-heading">
          <h2 id="download-heading" className="font-heading text-lg font-bold text-foreground mb-4">Download Hub</h2>
          <div className="space-y-2" role="list" aria-label="Downloadable files">
            {topicOutline.flatMap((row) =>
              row.files.map((file) => (
                <button
                  key={`${row.session}-${file}`}
                  onClick={() => setPreviewFile(file)}
                  role="listitem"
                  aria-label={`Preview ${file}`}
                  className="flex items-center gap-3 w-full text-left bg-card border border-border rounded-lg px-4 py-3 hover:border-primary/30 hover:shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <FileText className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
                  <span className="font-body text-sm text-foreground flex-1">{file}</span>
                  <Download className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                </button>
              ))
            )}
          </div>
        </section>
      </div>

      <PdfPreviewModal
        open={!!previewFile}
        onOpenChange={() => setPreviewFile(null)}
        fileName={previewFile ?? ""}
      />
    </SidebarLayout>
  );
};

export default TopicOutlinePage;
