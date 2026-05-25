import Layout from "@/components/Layout";
import { Wind, Droplets, Mountain, Trash2 } from "lucide-react";

const aqi = { value: 52, label: "Moderate", color: "text-dept-employment" };

const services = [
  { icon: Wind, label: "Air Quality", desc: "Real-time monitoring & reports" },
  { icon: Droplets, label: "Water Resources", desc: "Testing, permits & conservation" },
  { icon: Mountain, label: "Land Management", desc: "Zoning, permits & inspections" },
  { icon: Trash2, label: "Waste Services", desc: "Collection, recycling & disposal" },
];

export default function EnvironmentHub() {
  return (
    <Layout
      title="Environment Hub — SiamState Portal"
      description="Monitor air quality, access water resources, land management, and waste disposal services."
    >
      <section className="container py-12">
        <h1 className="text-4xl font-extrabold text-foreground mb-1">Environment</h1>
        <div className="h-1 w-24 bg-dept-environment rounded mb-10" aria-hidden="true" />

        {/* AQI Gauge */}
        <div className="bg-card rounded-lg border p-10 text-center mb-12 max-w-md mx-auto" role="status" aria-label={`Air Quality Index: ${aqi.value}, ${aqi.label}`}>
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Current Air Quality Index
          </p>
          <p className={`text-7xl font-extrabold ${aqi.color}`} aria-hidden="true">
            {aqi.value}
          </p>
          <span className="inline-block mt-2 px-3 py-1 rounded-full bg-dept-employment/10 text-dept-employment text-sm font-semibold">
            {aqi.label}
          </span>
        </div>

        {/* Service Grid */}
        <h2 className="sr-only">Environmental Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s) => (
            <div
              key={s.label}
              className="bg-card border rounded-lg p-5 hover:shadow-md transition-shadow cursor-pointer group focus-within:ring-2 focus-within:ring-ring"
              tabIndex={0}
              role="button"
              aria-label={`${s.label}: ${s.desc}`}
            >
              <s.icon className="h-8 w-8 text-dept-environment mb-3 group-hover:scale-110 transition-transform" aria-hidden="true" />
              <h3 className="font-bold text-foreground mb-1">{s.label}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
