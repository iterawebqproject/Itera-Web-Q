import portrait1 from "@/assets/portrait-1.jpg";
import portrait2 from "@/assets/portrait-2.jpg";
import portrait3 from "@/assets/portrait-3.jpg";
import portrait4 from "@/assets/portrait-4.jpg";
import PortraitCard from "@/components/PortraitCard";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageMeta from "@/components/PageMeta";

const honorees = [
  { name: "Dr. Elena Vasquez", image: portrait1, title: "Pioneering Gene Therapy" },
  { name: "Amir Khaled", image: portrait2, title: "Voice of a Generation" },
  { name: "Prof. Henrik Larsson", image: portrait3, title: "Architect of Peace" },
  { name: "Maya Chen", image: portrait4, title: "The Future of AI Ethics" },
  { name: "Dr. Elena Vasquez", image: portrait1, title: "Pioneering Gene Therapy" },
  { name: "Amir Khaled", image: portrait2, title: "Voice of a Generation" },
];

const PeopleOfTheYear = () => (
  <div className="min-h-screen bg-background">
    <PageMeta title="People of the Year 2026" description="Legacy Media's 2026 People of the Year — the individuals who shaped our world this year." />
    <SiteHeader />
    <main id="main-content" className="pt-28 pb-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Legacy Media Presents</p>
          <h1 className="font-heading text-7xl md:text-9xl font-bold text-foreground leading-none">2026</h1>
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mt-4">People of the Year</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12 max-w-3xl mx-auto">
          {honorees.map((h, i) => (
            <PortraitCard key={i} name={h.name} image={h.image} slug="/winner-profile-detail" />
          ))}
        </div>
      </div>
    </main>
    <SiteFooter />
  </div>
);

export default PeopleOfTheYear;
