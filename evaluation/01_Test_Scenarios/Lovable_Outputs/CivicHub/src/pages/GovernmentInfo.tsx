import { Building2, Phone, Mail, Clock } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";

const departments = [
  { name: "Dept. of Education", head: "Dr. Sarah Mitchell", phone: "+1 (555) 100-2001", email: "edu@civichub.gov" },
  { name: "Dept. of Finance", head: "James Thornton", phone: "+1 (555) 100-2002", email: "finance@civichub.gov" },
  { name: "Dept. of Health", head: "Dr. Amara Osei", phone: "+1 (555) 100-2003", email: "health@civichub.gov" },
  { name: "Dept. of Infrastructure", head: "Carlos Rivera", phone: "+1 (555) 100-2004", email: "infra@civichub.gov" },
  { name: "Dept. of Justice", head: "Hon. Patricia Yoon", phone: "+1 (555) 100-2005", email: "justice@civichub.gov" },
  { name: "Dept. of Social Services", head: "Michael Chen", phone: "+1 (555) 100-2006", email: "social@civichub.gov" },
];

const timeline = [
  { date: "Apr 8, 2026", title: "New Digital ID Policy Announced", desc: "All citizens can now apply for digital identification cards online." },
  { date: "Apr 3, 2026", title: "Budget 2026-27 Released", desc: "The annual national budget has been published for public review." },
  { date: "Mar 28, 2026", title: "Environmental Standards Update", desc: "New emission standards take effect for commercial vehicles." },
  { date: "Mar 20, 2026", title: "Free School Meals Program Expanded", desc: "Program now covers all primary school students nationwide." },
];

const GovernmentInfo = () => {
  usePageTitle("Government Directory — CivicHub");

  return (
    <div>
      <section className="civic-section" aria-label="Agency directory">
        <div className="civic-container">
          <h1 className="text-3xl font-bold text-foreground mb-2 text-center">Government Directory</h1>
          <p className="text-muted-foreground text-center mb-10">Find departments, leaders, and contact information.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => (
              <article key={dept.name} className="civic-card">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Building2 size={20} className="text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{dept.name}</h3>
                    <p className="text-sm text-muted-foreground">{dept.head}</p>
                  </div>
                </div>
                <address className="space-y-2 text-sm not-italic">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone size={14} aria-hidden="true" /> <a href={`tel:${dept.phone.replace(/\s/g, '')}`}>{dept.phone}</a>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail size={14} aria-hidden="true" /> <a href={`mailto:${dept.email}`}>{dept.email}</a>
                  </div>
                </address>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-16" aria-label="Director General profile">
        <div className="civic-container max-w-3xl">
          <div className="bg-card rounded-2xl border border-border p-8 flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0" role="img" aria-label="Portrait of Dr. Rebecca Nzima">
              <span className="text-4xl font-bold text-primary" aria-hidden="true">DR</span>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-xl font-bold text-foreground">Director General — Dr. Rebecca Nzima</h2>
              <blockquote className="text-muted-foreground mt-3 leading-relaxed">
                "Our mission is to make government transparent, accessible, and responsive. CivicHub is our commitment to putting citizens first — empowering every person with seamless access to the services they need."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <section className="civic-section" aria-label="Recent policy updates">
        <div className="civic-container max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Recent Updates</h2>
          <ol className="relative" role="list" aria-label="Timeline of recent updates">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" aria-hidden="true" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <li key={i} className="relative pl-12">
                  <div className="absolute left-2.5 top-1 w-3 h-3 rounded-full bg-primary border-2 border-card" aria-hidden="true" />
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                    <Clock size={12} aria-hidden="true" /> <time>{item.date}</time>
                  </div>
                  <h3 className="font-bold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                </li>
              ))}
            </div>
          </ol>
        </div>
      </section>
    </div>
  );
};

export default GovernmentInfo;
