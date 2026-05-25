import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import PageMeta from "@/components/PageMeta";
import { books } from "@/data/books";
import { Input } from "@/components/ui/input";

const Subject = () => {
  const [query, setQuery] = useState("");
  const filtered = books.filter((b) =>
    b.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Layout>
      <PageMeta title="Library" description="Browse all free textbooks available on Junior Learning." />
      <section className="container py-12">
        <h1 className="text-4xl font-bold mb-2">Library</h1>
        <p className="text-muted-foreground mb-8">Browse all free textbooks.</p>
        <label htmlFor="book-search" className="sr-only">Search books</label>
        <Input
          id="book-search"
          placeholder="Search books…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-md mb-10 rounded-full border-border px-5 py-3 text-base"
          aria-label="Search books"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" role="list">
          {filtered.map((book) => (
            <Link key={book.id} to={`/subjects/${book.subject}/${book.id}`} className="group" role="listitem">
              <div
                className="rounded-2xl aspect-[3/4] flex items-end p-5 transition-transform hover:scale-105"
                style={{ backgroundColor: book.color }}
              >
                <span className="text-lg font-bold text-card">{book.title}</span>
              </div>
            </Link>
          ))}
          {filtered.length === 0 && (
            <p className="text-muted-foreground col-span-full text-center py-10" role="status">No books found.</p>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Subject;
