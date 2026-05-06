import mongoose, { type Document, Schema } from 'mongoose';
import type { LighthouseMetrics } from './lighthouse-parser';
import type { Pa11yMetrics } from './pa11y-parser';

interface SeverityFindings {
  essential: number;
  pragmatic: number;
  hedonic: number;
}

interface HeuristicsMetrics {
  finding: string;
  suggestion: string;
  severity: 'essential' | 'pragmatic' | 'hedonic';
  totalSeverityCount: number;
  totalSeverity: SeverityFindings;
}

interface GreenMetrics {
  finding: string;
  suggestion: string;
  severity: 'essential' | 'pragmatic' | 'hedonic';
  totalSeverityCount: number;
  totalSeverity: SeverityFindings;
}

interface ISnapshot extends Document {
  projectId: string;
  url: string;
  iteration: number;
  content: {
    html: string;
    css: string;
    js: string;
  };
  metrics: {
    heuristic: HeuristicsMetrics;
    pa11y: Pa11yMetrics;
    lighthouse: LighthouseMetrics;
    greenSoftware: GreenMetrics;
  };
  promptUsed: string;
  parentSnapshotId?: mongoose.Types.ObjectId;
  createdAt: Date;
}

const SnapshotSchema: Schema = new Schema({
  projectId: { type: String, required: true },
  iteration: { type: Number, required: true },
  pages: [
    {
      fileName: String,
      content: String,
      metrics: {
        pa11y: Number,
        usability: Number,
        ecoIndex: String,
      },
      url: String, 
    },
  ],
  globalCss: String,
  globalMetrics: {
    averageAccessibility: Number,
    totalEcoIndex: String,
  },
  createdAt: { type: Date, default: Date.now },
});
export const Snapshot = mongoose.model<ISnapshot>('Snapshot', SnapshotSchema);
