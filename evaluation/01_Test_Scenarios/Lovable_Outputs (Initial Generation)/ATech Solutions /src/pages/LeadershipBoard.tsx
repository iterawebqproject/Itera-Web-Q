import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const leaders = [
  {
    name: "Elena Marchetti",
    title: "Chief Executive Officer",
    bio: "Elena has over 20 years of experience in enterprise technology, previously leading innovation at top Fortune 500 companies. Under her leadership, ATech has grown from a startup to a global enterprise partner.",
    links: ["The Future of Enterprise AI — Forbes", "Scaling Security in a Digital World — TechCrunch"],
  },
  {
    name: "David Chen",
    title: "Chief Technology Officer",
    bio: "David architects ATech's core product suite. A former MIT researcher, he holds 14 patents in distributed computing and real-time data processing systems.",
    links: ["Distributed Systems at Scale — IEEE", "Edge Computing: The Next Frontier — Wired"],
  },
  {
    name: "Sarah Okonkwo",
    title: "VP of Product",
    bio: "Sarah drives product strategy across all ATech platforms, ensuring each solution meets the rigorous demands of enterprise clients across industries.",
    links: ["Building Products for the Enterprise — Product Hunt", "UX in B2B: A New Approach — Medium"],
  },
  {
    name: "James Alvarez",
    title: "Chief Financial Officer",
    bio: "James brings deep financial expertise from his career in investment banking and tech finance. He oversees ATech's strategic growth and investor relations.",
    links: ["Tech Valuations in 2026 — Bloomberg", "Sustainable Growth Models — HBR"],
  },
  {
    name: "Priya Nair",
    title: "VP of Engineering",
    bio: "Priya leads a global engineering team of 300+, delivering scalable and resilient systems. She previously managed infrastructure at a leading cloud provider.",
    links: ["Infrastructure as Code — InfoQ", "Women in Engineering Leadership — The Verge"],
  },
  {
    name: "Marcus Thompson",
    title: "Chief Security Officer",
    bio: "Marcus is responsible for ATech's security posture and the development of CyberShield. He has two decades of experience in cybersecurity and defense.",
    links: ["Zero Trust Architecture — CSO Online", "The Evolving Threat Landscape — Dark Reading"],
  },
];

const LeadershipBoard = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const leader = selected !== null ? leaders[selected] : null;

  const close = useCallback(() => setSelected(null), []);

  useEffect(() => {
    if (selected === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [selected, close]);

  return (
    <div>
      <SEOHead title="Leadership" description="Meet the leadership team behind ATech Solutions driving innovation and growth." />

      <section className="container pt-16 pb-20">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Leadership Board</h1>
        <p className="text-muted-foreground max-w-xl mb-12">
          The people behind ATech Solutions — driving innovation, strategy, and growth.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
          {leaders.map((l, i) => (
            <button
              key={l.name}
              role="listitem"
              onClick={() => setSelected(selected === i ? null : i)}
              aria-expanded={selected === i}
              className={`text-left p-6 border transition-colors focus-visible:outline-2 focus-visible:outline-primary ${
                selected === i ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-lg font-bold text-muted-foreground mb-4" aria-hidden="true">
                {l.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <h2 className="font-bold">{l.name}</h2>
              <p className="text-sm text-muted-foreground">{l.title}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Slide-over Profile */}
      {leader && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`${leader.name} profile`}
        >
          <div className="absolute inset-0 bg-foreground/40" aria-hidden="true" />
          <div
            className="relative w-full max-w-lg bg-card h-full overflow-y-auto p-8 shadow-2xl animate-in slide-in-from-right"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              className="absolute top-6 right-6 text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary"
              aria-label="Close profile panel"
            >
              <X size={20} aria-hidden="true" />
            </button>

            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-2xl font-bold text-muted-foreground mb-6" aria-hidden="true">
              {leader.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <h2 className="text-2xl font-bold">{leader.name}</h2>
            <p className="text-primary font-medium mb-6">{leader.title}</p>
            <p className="text-foreground leading-relaxed mb-8">{leader.bio}</p>

            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Thought Leadership</h3>
            <ul className="space-y-2">
              {leader.links.map((link) => (
                <li key={link} className="text-sm text-primary hover:underline cursor-pointer">
                  {link}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadershipBoard;
