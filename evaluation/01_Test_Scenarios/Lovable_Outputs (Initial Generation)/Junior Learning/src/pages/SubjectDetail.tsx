import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import PageMeta from "@/components/PageMeta";
import { getBookById } from "@/data/books";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

const SubjectDetail = () => {
  const { bookId } = useParams();
  const book = getBookById(bookId || "");

  if (!book) {
    return (
      <Layout>
        <PageMeta title="Book not found" />
        <div className="container py-20 text-center">
          <h1 className="text-3xl font-bold">Book not found</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageMeta title={book.title} description={book.description} />
      <section className="container py-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6 flex gap-1">
          <Link to="/" className="hover:text-secondary">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/subjects" className="hover:text-secondary capitalize">{book.subject}</Link>
          <span aria-hidden="true">/</span>
          <span className="text-foreground" aria-current="page">{book.title}</span>
        </nav>

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="h-8 w-8 text-secondary" aria-hidden="true" />
          <h1 className="text-3xl md:text-4xl font-bold">{book.title}</h1>
        </div>

        {/* Chapter List */}
        <nav aria-label="Chapters" className="flex flex-col gap-3 mb-10 max-w-2xl">
          {book.chapters.map((ch) => (
            <Link
              key={ch.id}
              to={`/resource/${book.id}`}
              className="rounded-xl border border-border bg-card px-6 py-5 text-lg font-medium hover:bg-accent transition-colors focus-visible:ring-2 focus-visible:ring-ring"
            >
              {ch.title}
            </Link>
          ))}
        </nav>

        {/* Start Button */}
        <Link to={`/resource/${book.id}`}>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 text-lg font-bold rounded-full">
            Start Learning
          </Button>
        </Link>
      </section>
    </Layout>
  );
};

export default SubjectDetail;
