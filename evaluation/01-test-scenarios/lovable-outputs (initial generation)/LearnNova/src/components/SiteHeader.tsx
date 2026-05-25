import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SiteHeader = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/category/all?q=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-3 focus:bg-primary focus:text-primary-foreground">
        Skip to main content
      </a>
      <div className="container flex h-14 items-center gap-4">
        <Link to="/" className="font-heading text-xl font-bold text-primary-dark shrink-0" aria-label="LearnNova home">
          LearnNova
        </Link>

        <form onSubmit={handleSearch} className="flex-1 max-w-md relative hidden sm:block" role="search" aria-label="Site search">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <label htmlFor="header-search" className="sr-only">Search courses</label>
          <Input
            id="header-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses..."
            className="pl-9 h-9 bg-muted/50"
          />
        </form>

        <nav className="ml-auto flex items-center gap-2" aria-label="Main navigation">
          <Link to="/category/all" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:inline">
            Explore
          </Link>
          <Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:inline">
            FAQ
          </Link>
          <Button size="sm" className="bg-primary-dark text-card hover:bg-primary-dark/90">
            Sign In
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;
