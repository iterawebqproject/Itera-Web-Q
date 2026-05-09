import SEOHead from "@/components/SEOHead";
import officeImg from "@/assets/office.jpg";

const timeline = [
  { year: "2010", event: "ATech Solutions founded in Silicon Valley." },
  { year: "2013", event: "First enterprise client onboarded — Meridian Corp." },
  { year: "2016", event: "Launched CyberShield, our flagship security suite." },
  { year: "2019", event: "Expanded to 12 offices across North America and Europe." },
  { year: "2022", event: "AI Neural Engine released, setting industry benchmarks." },
  { year: "2025", event: "Surpassed 500 enterprise clients globally." },
];

const offices = [
  { city: "San Francisco", region: "HQ" },
  { city: "New York", region: "East Coast" },
  { city: "London", region: "EMEA" },
  { city: "Berlin", region: "EMEA" },
  { city: "Singapore", region: "APAC" },
];

const OurCompany = () => (
  <div>
    <SEOHead title="Our Company" description="Learn about ATech Solutions — our vision, history, and global offices." />

    {/* Vision */}
    <section className="container pt-16 pb-20" aria-label="Company vision">
      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Our Vision</p>
      <h1 className="font-serif-display text-3xl md:text-5xl lg:text-6xl leading-tight max-w-3xl italic">
        "To empower every enterprise with technology that is precise, secure, and endlessly scalable."
      </h1>
    </section>

    {/* History Timeline */}
    <section className="container pb-20" aria-label="Company history">
      <h2 className="text-2xl font-bold mb-10 uppercase tracking-wider">Our Journey</h2>
      <ol className="relative border-l-2 border-primary ml-4" role="list">
        {timeline.map((t) => (
          <li key={t.year} className="pl-8 pb-10 relative">
            <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-primary" aria-hidden="true" />
            <time className="text-sm font-bold text-primary">{t.year}</time>
            <p className="text-foreground mt-1">{t.event}</p>
          </li>
        ))}
      </ol>
    </section>

    {/* Office Image */}
    <section className="container pb-20">
      <img src={officeImg} alt="ATech Solutions headquarters building" loading="lazy" width={1200} height={600} className="w-full h-72 md:h-96 object-cover" />
    </section>

    {/* Offices */}
    <section className="bg-dust py-16" aria-label="Office locations">
      <div className="container">
        <h2 className="text-2xl font-bold mb-10 uppercase tracking-wider">Global Offices</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {offices.map((o) => (
            <div key={o.city} className="text-center">
              <div className="w-3 h-3 rounded-full bg-primary mx-auto mb-3" aria-hidden="true" />
              <h3 className="font-bold text-sm">{o.city}</h3>
              <p className="text-xs text-muted-foreground">{o.region}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Organization Schema */}
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "ATech Solutions",
          url: "https://atech-canvas.lovable.app",
          foundingDate: "2010",
          description: "Enterprise-grade technology solutions for performance, security, and scale.",
        }),
      }}
    />
  </div>
);

export default OurCompany;
