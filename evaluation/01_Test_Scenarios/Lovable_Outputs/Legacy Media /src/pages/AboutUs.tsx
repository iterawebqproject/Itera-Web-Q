import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageMeta from "@/components/PageMeta";

const standards = [
  { title: "Accuracy", desc: "Every fact is verified by at least two independent sources before publication." },
  { title: "Independence", desc: "Our editorial decisions are never influenced by advertisers or political interests." },
  { title: "Transparency", desc: "We correct errors promptly and disclose potential conflicts of interest." },
  { title: "Accountability", desc: "Our journalists adhere to the highest ethical standards of the profession." },
];

const AboutUs = () => (
  <div className="min-h-screen bg-background">
    <PageMeta title="About Us" description="Founded in 1923, Legacy Media is the gold standard of investigative journalism. Learn about our mission and editorial standards." />
    <SiteHeader />
    <main id="main-content" className="pt-28 pb-20">
      <div className="container mx-auto px-6 max-w-2xl">
        {/* Mission */}
        <div className="text-center mb-20">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">About</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">Legacy Media</h1>
          <div className="w-12 h-[2px] bg-primary mx-auto mt-6 mb-8" aria-hidden="true" />
          <p className="font-body text-base text-foreground leading-relaxed">
            Founded in 1923, Legacy Media has been the gold standard of investigative journalism for over a century.
            From the front lines of conflict to the corridors of power, our reporters bring you stories that matter—
            with the depth, rigor, and fairness that our readers expect.
          </p>
          <p className="font-body text-base text-foreground leading-relaxed mt-4">
            Today, Legacy Media reaches over 40 million readers across print and digital platforms. Our People of the
            Year collection, launched in 1927, remains one of the most anticipated editorial traditions in global media.
          </p>
        </div>

        {/* Standards */}
        <h2 className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8">Editorial Standards</h2>
        <div className="space-y-8 mb-16">
          {standards.map((s, i) => (
            <div key={i} className={`pb-8 ${i < standards.length - 1 ? "border-b border-border" : ""}`}>
              <h3 className="font-heading text-xl font-bold text-foreground">{s.title}</h3>
              <p className="font-body text-sm text-muted-foreground mt-2 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Contact */}
        <address className="border-t border-border pt-8 not-italic">
          <h2 className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Contact</h2>
          <p className="font-body text-sm text-foreground">Editorial: <a href="mailto:editorial@legacymedia.com" className="text-primary hover:underline">editorial@legacymedia.com</a></p>
          <p className="font-body text-sm text-foreground mt-1">Subscriptions: <a href="mailto:subscribe@legacymedia.com" className="text-primary hover:underline">subscribe@legacymedia.com</a></p>
          <p className="font-body text-sm text-muted-foreground mt-3">
            Legacy Media Headquarters · 1 Times Square, New York, NY 10036
          </p>
        </address>
      </div>
    </main>
    <SiteFooter />
  </div>
);

export default AboutUs;
