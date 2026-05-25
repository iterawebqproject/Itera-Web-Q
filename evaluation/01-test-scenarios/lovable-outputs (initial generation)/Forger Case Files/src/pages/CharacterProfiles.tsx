import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { useState } from "react";
import { Search } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import charLoid from "@/assets/char-loid.jpg";
import charYor from "@/assets/char-yor.jpg";
import charAnya from "@/assets/char-anya.jpg";

interface Character {
  name: string;
  alias: string;
  role: string;
  image: string;
  desc: string;
}

const mainCast: Character[] = [
  { name: "Loid Forger", alias: "Twilight", role: "Spy / Father", image: charLoid, desc: "Westalis' top spy, master of disguise and deduction. Poses as a psychiatrist to maintain his cover family." },
  { name: "Yor Forger", alias: "Thorn Princess", role: "Assassin / Mother", image: charYor, desc: "An elite assassin working for the Garden. She married Loid to avoid suspicion about her single status." },
  { name: "Anya Forger", alias: "Test Subject 007", role: "Telepath / Daughter", image: charAnya, desc: "A young telepath who escaped a research facility. She knows her parents' secrets but keeps them hidden." },
];

const supporting: Character[] = [
  { name: "Franky Franklin", alias: "Classified", role: "Informant", image: "", desc: "Loid's information broker and close ally." },
  { name: "Yuri Briar", alias: "Classified", role: "Secret Police", image: "", desc: "Yor's younger brother who works for the SSS." },
  { name: "Damian Desmond", alias: "N/A", role: "Student", image: "", desc: "Son of Donovan Desmond, Anya's classmate and rival." },
  { name: "Becky Blackbell", alias: "N/A", role: "Student", image: "", desc: "Anya's best friend at Eden Academy." },
  { name: "Sylvia Sherwood", alias: "Handler", role: "WISE Controller", image: "", desc: "Loid's handler at the intelligence agency." },
  { name: "Bond Forger", alias: "Subject 8", role: "Precognitive Dog", image: "", desc: "A large white dog with the ability to see the future." },
];

const CharacterProfiles = () => {
  const [search, setSearch] = useState("");
  const all = [...mainCast, ...supporting];
  const filtered = all.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <PageMeta
        title="Character Profiles"
        description="Browse the Forger family and supporting cast from Spy x Family. Hover names to reveal secret identities."
        path="/characters"
      />
      <Navbar />
      <main id="main-content" className="flex-1 pt-24 container mx-auto px-4">
        <h1 className="font-display font-bold text-4xl text-foreground mb-2">Agent Dossiers</h1>
        <p className="text-muted-foreground mb-8">Hover over a name to reveal their classified identity.</p>

        {/* Search */}
        <div className="relative max-w-md mb-12">
          <label htmlFor="character-search" className="sr-only">Search agents</label>
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            id="character-search"
            type="search"
            placeholder="Search agents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl glass text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {filtered.length === 0 && (
          <p className="text-muted-foreground text-center py-12">No agents found matching "{search}".</p>
        )}

        {/* Main Cast */}
        {filtered.some((c) => mainCast.includes(c)) && (
          <section aria-labelledby="main-ops">
            <h2 id="main-ops" className="font-display font-bold text-2xl text-foreground mb-6">Main Operatives</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {filtered
                .filter((c) => mainCast.includes(c))
                .map((c) => (
                  <article key={c.name} className="glass rounded-xl overflow-hidden group">
                    {c.image && (
                      <div className="aspect-[4/5] overflow-hidden">
                        <img src={c.image} alt={`Portrait of ${c.name}`} loading="lazy" width={400} height={500} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                    )}
                    <div className="p-5">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <h3 className="font-bold text-lg text-foreground cursor-help border-b border-dashed border-primary/40 inline-block focus-visible:outline-2 focus-visible:outline-primary" tabIndex={0}>
                            {c.name}
                          </h3>
                        </TooltipTrigger>
                        <TooltipContent className="bg-foreground text-background px-4 py-2 rounded-lg">
                          <p className="text-xs font-bold">🔒 TOP SECRET</p>
                          <p className="text-sm font-semibold">{c.alias}</p>
                        </TooltipContent>
                      </Tooltip>
                      <p className="text-sm text-primary font-medium mt-1">{c.role}</p>
                      <p className="text-sm text-muted-foreground mt-2">{c.desc}</p>
                    </div>
                  </article>
                ))}
            </div>
          </section>
        )}

        {/* Supporting */}
        {filtered.some((c) => supporting.includes(c)) && (
          <section aria-labelledby="support-personnel">
            <h2 id="support-personnel" className="font-display font-bold text-2xl text-foreground mb-6">Supporting Personnel</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-20">
              {filtered
                .filter((c) => supporting.includes(c))
                .map((c) => (
                  <article key={c.name} className="glass rounded-xl p-5">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <h3 className="font-semibold text-foreground cursor-help border-b border-dashed border-primary/40 inline-block focus-visible:outline-2 focus-visible:outline-primary" tabIndex={0}>
                          {c.name}
                        </h3>
                      </TooltipTrigger>
                      <TooltipContent className="bg-foreground text-background px-4 py-2 rounded-lg">
                        <p className="text-xs font-bold">🔒 TOP SECRET</p>
                        <p className="text-sm font-semibold">{c.alias}</p>
                      </TooltipContent>
                    </Tooltip>
                    <p className="text-sm text-primary font-medium mt-1">{c.role}</p>
                    <p className="text-sm text-muted-foreground mt-2">{c.desc}</p>
                  </article>
                ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CharacterProfiles;
