import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import PageMeta from "@/components/PageMeta";
import { getBookById } from "@/data/books";
import { Button } from "@/components/ui/button";
import { Eye, Download } from "lucide-react";

const Resource = () => {
  const { bookId } = useParams();
  const book = getBookById(bookId || "");

  if (!book) {
    return (
      <Layout>
        <PageMeta title="Resource not found" />
        <div className="container py-20 text-center">
          <h1 className="text-3xl font-bold">Resource not found</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageMeta title={book.title} description={book.description} />
      <section className="container py-10">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6 flex gap-1">
          <Link to="/" className="hover:text-secondary">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/subjects" className="hover:text-secondary">Library</Link>
          <span aria-hidden="true">/</span>
          <span className="text-foreground" aria-current="page">{book.title}</span>
        </nav>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Book Summary */}
          <article className="md:col-span-2">
            <div
              className="rounded-2xl aspect-[4/3] mb-6 flex items-end p-8"
              style={{ backgroundColor: book.color }}
              role="img"
              aria-label={`${book.title} book cover`}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-card">{book.title}</h1>
            </div>
            <p className="text-muted-foreground text-sm mb-2">By {book.author}</p>
            <p className="text-lg leading-relaxed">{book.description}</p>
          </article>

          {/* Action Sidebar */}
          <aside className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4 h-fit" aria-label="Book actions">
            <h2 className="font-bold text-lg mb-2">Get this book</h2>
            <Button variant="outline" className="justify-start gap-2 rounded-full">
              <Eye className="h-4 w-4" aria-hidden="true" /> View Online
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full justify-start gap-2 rounded-full">
              <Download className="h-4 w-4" aria-hidden="true" /> Download PDF
            </Button>
          </aside>
        </div>
      </section>
    </Layout>
  );
};

export default Resource;
