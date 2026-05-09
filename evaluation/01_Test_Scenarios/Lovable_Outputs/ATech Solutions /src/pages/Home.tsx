import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import heroBg from "@/assets/hero-bg.jpg";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

const news = [
  { title: "ATech Launches Next-Gen AI Platform", date: "Mar 2026", excerpt: "Our latest AI-driven analytics engine sets new benchmarks in enterprise processing." },
  { title: "Partnership with Global Finance Corp", date: "Feb 2026", excerpt: "Strategic alliance to deliver secure cloud infrastructure across 40 countries." },
  { title: "CyberShield 3.0 Receives ISO Certification", date: "Jan 2026", excerpt: "Industry-leading security solution achieves highest international compliance." },
];

const products = [
  { img: product1, name: "Enterprise Server X9", desc: "High-performance computing for demanding workloads" },
  { img: product2, name: "CyberShield Dashboard", desc: "Real-time threat monitoring and analytics" },
  { img: product3, name: "CloudStack Pro", desc: "Scalable cloud infrastructure platform" },
  { img: product4, name: "AI Neural Engine", desc: "Next-generation machine learning accelerator" },
];

const clients = ["Meridian Corp", "NovaTech", "Vertex Industries", "Skyline Group", "Apex Dynamics", "Quantum Labs"];

const Home = () => (
  <div>
    <SEOHead title="Home" description="Enterprise-grade technology solutions for performance, security, and scale." />

    {/* Hero */}
    <section className="relative bg-primary overflow-hidden" aria-label="Hero">
      <img src={heroBg} alt="" role="presentation" className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-multiply" width={1920} height={800} fetchPriority="high" />
      <div className="relative container py-28 md:py-40">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground max-w-3xl leading-tight">
          Precision Tech
        </h1>
        <p className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-xl">
          Enterprise-grade solutions engineered for performance, security, and scale.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 mt-8 px-8 py-3 bg-primary-foreground text-primary font-semibold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-foreground"
          aria-label="View all products"
        >
          View All Products <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>

    {/* Innovation Feed */}
    <section className="container py-20" aria-label="Latest news">
      <h2 className="text-2xl font-bold mb-10 uppercase tracking-wider">Latest News</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {news.map((item) => (
          <article key={item.title} className="border-t-2 border-primary pt-6">
            <time className="text-xs text-muted-foreground uppercase tracking-wider">{item.date}</time>
            <h3 className="text-lg font-bold mt-2 mb-3">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.excerpt}</p>
          </article>
        ))}
      </div>
    </section>

    {/* Top Products */}
    <section className="container pb-20" aria-label="Top products">
      <h2 className="text-2xl font-bold mb-10 uppercase tracking-wider">Top Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((p) => (
          <article key={p.name} className="group relative overflow-hidden bg-accent">
            <img src={p.img} alt={p.name} loading="lazy" width={800} height={800} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="p-6">
              <h3 className="text-lg font-bold">{p.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
              <Link to="/products" className="inline-flex items-center gap-1 mt-3 text-primary text-sm font-semibold hover:underline focus-visible:outline-2 focus-visible:outline-primary">
                Learn More <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>

    {/* Social Proof */}
    <section className="bg-dust py-16" aria-label="Client logos">
      <div className="container">
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-8">Trusted by industry leaders</p>
        <ul className="flex flex-wrap justify-center gap-x-12 gap-y-4" role="list">
          {clients.map((c) => (
            <li key={c} className="text-lg font-bold text-foreground/40">{c}</li>
          ))}
        </ul>
      </div>
    </section>
  </div>
);

export default Home;
