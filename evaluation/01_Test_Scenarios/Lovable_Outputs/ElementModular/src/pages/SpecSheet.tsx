import { useState } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import Layout from "@/components/Layout";

const benchmarks = [
  { game: "Cyberpunk 2077", fps: 72, max: 120 },
  { game: "Fortnite", fps: 144, max: 180 },
  { game: "Baldur's Gate 3", fps: 85, max: 120 },
  { game: "Starfield", fps: 58, max: 120 },
  { game: "CS2", fps: 240, max: 300 },
];

const specsBasic = [
  { spec: "Processor", basic: "AMD Ryzen 5 7640U", pro: "AMD Ryzen 9 7940HS" },
  { spec: "RAM", basic: "16GB DDR5", pro: "64GB DDR5" },
  { spec: "Storage", basic: "512GB NVMe", pro: "2TB NVMe" },
  { spec: "Display", basic: '13.5" 2256×1504 60Hz', pro: '16" 2560×1600 120Hz' },
  { spec: "Battery", basic: "61Wh", pro: "85Wh" },
  { spec: "Weight", basic: "1.3 kg", pro: "1.8 kg" },
];

const specsPro = [
  ...specsBasic,
  { spec: "GPU", basic: "Integrated Radeon 760M", pro: "Radeon RX 7700S" },
  { spec: "Thunderbolt", basic: "No", pro: "Thunderbolt 4 ×2" },
  { spec: "WiFi", basic: "WiFi 6E", pro: "WiFi 7" },
  { spec: "Cooling", basic: "Single fan", pro: "Dual-fan vapor chamber" },
  { spec: "Expansion Slots", basic: "2 bays", pro: "4 bays" },
  { spec: "Repairability", basic: "Score: 9/10", pro: "Score: 10/10" },
];

const downloads = [
  { name: "ElementBook 16 CAD Blueprint", type: "STEP / IGES", size: "48 MB" },
  { name: "Mainboard Schematic", type: "PDF", size: "12 MB" },
  { name: "Repair Manual – Complete Guide", type: "PDF", size: "24 MB" },
  { name: "Expansion Card Template", type: "KiCad", size: "8 MB" },
];

const SpecSheet = () => {
  const [detailed, setDetailed] = useState(false);
  const specs = detailed ? specsPro : specsBasic;

  return (
    <Layout title="Spec Sheet" description="Technical specifications, gaming benchmarks, and downloadable CAD blueprints for ElementModular computers.">
      {/* Benchmarks */}
      <section className="bg-secondary py-16" aria-labelledby="benchmarks-heading">
        <div className="container">
          <h1 id="benchmarks-heading" className="font-display text-4xl font-bold text-secondary-foreground text-center mb-12">Performance Benchmarks</h1>
          <div className="max-w-2xl mx-auto space-y-6">
            {benchmarks.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-secondary-foreground">{b.game}</span>
                  <span className="text-sm font-bold text-secondary-foreground">{b.fps} FPS</span>
                </div>
                <div className="w-full bg-secondary-foreground/20 rounded-full h-4 overflow-hidden" role="progressbar" aria-valuenow={b.fps} aria-valuemin={0} aria-valuemax={b.max} aria-label={`${b.game}: ${b.fps} FPS`}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(b.fps / b.max) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specs Table */}
      <section className="py-16" aria-labelledby="specs-heading">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 id="specs-heading" className="font-display text-3xl font-bold">Technical Specifications</h2>
            <button
              onClick={() => setDetailed(!detailed)}
              aria-pressed={detailed}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                detailed ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {detailed ? "Pro View" : "Basic View"}
            </button>
          </div>

          <div className="bg-card rounded-xl overflow-hidden shadow-sm" role="table" aria-label="Specifications comparison">
            <div className="grid grid-cols-3 bg-muted p-4 text-sm font-semibold" role="row">
              <span role="columnheader">Specification</span>
              <span role="columnheader">ElementBook Basic</span>
              <span role="columnheader">ElementBook Pro</span>
            </div>
            {specs.map((s, i) => (
              <motion.div
                key={s.spec}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? "bg-card" : "bg-muted/50"}`}
                role="row"
              >
                <span className="font-medium" role="rowheader">{s.spec}</span>
                <span className="text-muted-foreground" role="cell">{s.basic}</span>
                <span className="text-foreground font-medium" role="cell">{s.pro}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineer Hub */}
      <section className="bg-muted py-16" aria-labelledby="engineer-heading">
        <div className="container">
          <h2 id="engineer-heading" className="font-display text-3xl font-bold text-center mb-4">Engineer Hub</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-md mx-auto">
            Download CAD blueprints, schematics, and repair manuals. Build and repair with confidence.
          </p>
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {downloads.map((d, i) => (
              <button
                key={i}
                className="flex items-center gap-4 bg-card p-4 rounded-xl text-left hover:shadow-md transition-shadow group"
                aria-label={`Download ${d.name} (${d.type}, ${d.size})`}
              >
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/30 transition-colors">
                  <Download size={20} className="text-secondary" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{d.name}</p>
                  <p className="text-xs text-muted-foreground">{d.type} · {d.size}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SpecSheet;
