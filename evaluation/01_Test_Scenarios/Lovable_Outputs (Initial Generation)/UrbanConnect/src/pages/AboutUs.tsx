import { Mail, Phone } from "lucide-react";
import Layout from "@/components/Layout";
import FeedbackWidget from "@/components/FeedbackWidget";
import useDocumentTitle from "@/hooks/useDocumentTitle";

const orgChart = [
  { level: 0, name: "Ministry of Communications and Information (MCI)" },
  { level: 1, name: "Government Technology Agency (GovTech)" },
  { level: 1, name: "Infocomm Media Development Authority (IMDA)" },
  { level: 1, name: "National Library Board (NLB)" },
];

const contacts = [
  { agency: "Ministry of Finance", phone: "+65 6225 9911", email: "mof@gov.sg" },
  { agency: "Ministry of Health", phone: "+65 6325 9220", email: "moh@gov.sg" },
  { agency: "GovTech", phone: "+65 6211 0888", email: "info@tech.gov.sg" },
  { agency: "Housing & Development Board", phone: "+65 1800 225 5432", email: "hdb@gov.sg" },
];

const AboutUs = () => {
  useDocumentTitle("About Us", "Learn about UrbanConnect's mission, organisational structure, and contact directory for government agencies.");

  return (
    <Layout>
      <section className="hero-section py-12" aria-labelledby="about-heading">
        <div className="container">
          <h1 id="about-heading" className="text-3xl md:text-4xl font-bold">About Us</h1>
          <p className="mt-2 opacity-85">UrbanConnect — verified government information at your fingertips</p>
        </div>
      </section>

      <section className="container py-12">
        <h2 className="text-xl font-bold mb-6">Our Mission</h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mb-12">
          UrbanConnect is a centralized digital platform providing verified government information, budget transparency, and national policy updates. We aim to strengthen public trust through clarity, accuracy, and accessibility.
        </p>

        <h2 className="text-xl font-bold mb-6">Organisational Structure</h2>
        <ul className="space-y-2 mb-12" role="list" aria-label="Organisational structure">
          {orgChart.map((item, i) => (
            <li key={i} className={`border rounded-lg bg-card px-5 py-3 ${item.level === 0 ? "font-bold" : "ml-8"}`}>
              <span className="text-sm">{item.name}</span>
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-bold mb-6">Contact Directory</h2>
        <div className="space-y-3" role="list" aria-label="Agency contact directory">
          {contacts.map((c) => (
            <div key={c.agency} className="border rounded-lg bg-card px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2" role="listitem">
              <span className="font-semibold text-sm">{c.agency}</span>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 hover:text-primary" aria-label={`Call ${c.agency}`}>
                  <Phone size={14} aria-hidden="true" /> {c.phone}
                </a>
                <a href={`mailto:${c.email}`} className="flex items-center gap-1.5 hover:text-primary" aria-label={`Email ${c.agency}`}>
                  <Mail size={14} aria-hidden="true" /> {c.email}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <FeedbackWidget />
    </Layout>
  );
};

export default AboutUs;
