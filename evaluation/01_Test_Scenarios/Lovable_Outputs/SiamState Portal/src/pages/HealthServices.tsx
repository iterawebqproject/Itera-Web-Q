import { useState, useId } from "react";
import Layout from "@/components/Layout";
import { Syringe, FileText, ClipboardCheck, Users, ShieldCheck, Activity } from "lucide-react";

const tabs = ["Personal Health", "Community Safety"] as const;

const personalTasks = [
  { icon: Syringe, label: "Immunization Records", desc: "View and request vaccination history" },
  { icon: FileText, label: "Birth Certificates", desc: "Order or verify birth records" },
  { icon: ClipboardCheck, label: "Health Permits", desc: "Apply for food, pool & facility permits" },
];

const communityTasks = [
  { icon: Users, label: "Disease Surveillance", desc: "Track outbreak reports and alerts" },
  { icon: ShieldCheck, label: "Safety Inspections", desc: "Restaurant and facility inspection results" },
  { icon: Activity, label: "Emergency Preparedness", desc: "Public health emergency plans" },
];

export default function HealthServices() {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("Personal Health");
  const tasks = activeTab === "Personal Health" ? personalTasks : communityTasks;
  const panelId = useId();

  return (
    <Layout
      title="Health Services — SiamState Portal"
      description="Access public health records, immunization history, birth certificates, health permits, and community safety information."
    >
      <section className="container py-12">
        <h1 className="text-4xl font-extrabold text-foreground mb-1">Public Health &amp; Records</h1>
        <div className="h-1 w-24 bg-primary rounded mb-10" aria-hidden="true" />

        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-muted rounded-lg p-1 w-fit" role="tablist" aria-label="Health service categories">
          {tabs.map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              aria-controls={panelId}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-md text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Task List */}
        <div id={panelId} role="tabpanel" aria-label={activeTab} className="space-y-3 max-w-xl">
          {tasks.map((task) => (
            <button
              key={task.label}
              className="w-full flex items-center gap-4 bg-card border-2 border-border rounded-lg p-5 text-left hover:border-primary hover:shadow-md transition-all group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <div className="p-2.5 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors" aria-hidden="true">
                <task.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">{task.label}</h3>
                <p className="text-sm text-muted-foreground">{task.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </Layout>
  );
}
