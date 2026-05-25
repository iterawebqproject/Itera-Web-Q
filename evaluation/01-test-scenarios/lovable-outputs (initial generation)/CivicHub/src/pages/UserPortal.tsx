import { Download, FileText, ShieldCheck, Bell, CheckCircle2, Clock, Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { usePageTitle } from "@/hooks/usePageTitle";

const applications = [
  { name: "Health ID Card", status: "approved", progress: 100 },
  { name: "Business License Renewal", status: "in-review", progress: 60 },
  { name: "Housing Subsidy Application", status: "submitted", progress: 30 },
];

const documents = [
  { name: "National ID — Front.pdf", date: "Mar 15, 2026", size: "1.2 MB" },
  { name: "Proof of Income — Q1 2026.pdf", date: "Mar 10, 2026", size: "340 KB" },
  { name: "Business Registration Certificate.pdf", date: "Feb 22, 2026", size: "890 KB" },
  { name: "Health Insurance Card.pdf", date: "Jan 5, 2026", size: "520 KB" },
];

const statusIcon = (status: string) => {
  if (status === "approved") return <CheckCircle2 size={18} className="text-civic-success" aria-hidden="true" />;
  if (status === "in-review") return <Loader2 size={18} className="text-civic-warning animate-spin motion-reduce:animate-none" aria-hidden="true" />;
  return <Clock size={18} className="text-civic-info" aria-hidden="true" />;
};

const statusLabel = (status: string) => {
  if (status === "approved") return "Approved";
  if (status === "in-review") return "In Review";
  return "Submitted";
};

const UserPortal = () => {
  usePageTitle("My Portal — CivicHub");

  return (
    <div>
      <section className="civic-section" aria-label="User portal">
        <div className="civic-container max-w-3xl">
          <h1 className="text-3xl font-bold text-foreground mb-2 text-center">My Portal</h1>
          <p className="text-muted-foreground text-center mb-10">Track your applications, documents, and settings.</p>

          <h2 className="text-xl font-bold text-foreground mb-6">Application Status</h2>
          <div className="space-y-4 mb-12">
            {applications.map((app) => (
              <div key={app.name} className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {statusIcon(app.status)}
                    <span className="font-medium text-foreground">{app.name}</span>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
                    {statusLabel(app.status)}
                  </span>
                </div>
                <div
                  className="w-full bg-muted rounded-full h-2.5"
                  role="progressbar"
                  aria-valuenow={app.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${app.name}: ${app.progress}% complete`}
                >
                  <div
                    className="h-2.5 rounded-full transition-all duration-500"
                    style={{
                      width: `${app.progress}%`,
                      backgroundColor: app.progress === 100 ? "hsl(var(--civic-success))" : "hsl(var(--primary))",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-foreground mb-6">My Documents</h2>
          <div className="bg-card border border-border rounded-xl overflow-hidden mb-12">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th scope="col" className="text-left py-3 px-4 font-medium text-muted-foreground">Document</th>
                    <th scope="col" className="text-left py-3 px-4 font-medium text-muted-foreground hidden sm:table-cell">Date</th>
                    <th scope="col" className="text-left py-3 px-4 font-medium text-muted-foreground hidden sm:table-cell">Size</th>
                    <th scope="col" className="py-3 px-4"><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc) => (
                    <tr key={doc.name} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4 text-foreground flex items-center gap-2">
                        <FileText size={16} className="text-primary flex-shrink-0" aria-hidden="true" />
                        {doc.name}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground hidden sm:table-cell">{doc.date}</td>
                      <td className="py-3 px-4 text-muted-foreground hidden sm:table-cell">{doc.size}</td>
                      <td className="py-3 px-4 text-right">
                        <button className="text-primary hover:text-primary/80 transition-colors" aria-label={`Download ${doc.name}`}>
                          <Download size={16} aria-hidden="true" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <h2 className="text-xl font-bold text-foreground mb-6">Settings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-xl p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShieldCheck size={20} className="text-civic-success" aria-hidden="true" />
                <div>
                  <label htmlFor="two-factor-toggle" className="font-medium text-foreground text-sm cursor-pointer">Two-Factor Auth</label>
                  <p className="text-xs text-muted-foreground">Extra security for your account</p>
                </div>
              </div>
              <Switch id="two-factor-toggle" defaultChecked />
            </div>
            <div className="bg-card border border-border rounded-xl p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell size={20} className="text-civic-warning" aria-hidden="true" />
                <div>
                  <label htmlFor="notifications-toggle" className="font-medium text-foreground text-sm cursor-pointer">Email Notifications</label>
                  <p className="text-xs text-muted-foreground">Get updates on your applications</p>
                </div>
              </div>
              <Switch id="notifications-toggle" defaultChecked />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserPortal;
