import { AlertTriangle } from "lucide-react";

const LiveNewsBar = () => (
  <div className="bg-alert text-alert-foreground py-2 overflow-hidden" role="alert" aria-live="polite" aria-label="Public alerts and announcements">
    <div className="flex items-center gap-3 animate-marquee motion-reduce:animate-none whitespace-nowrap">
      <AlertTriangle size={14} className="flex-shrink-0" aria-hidden="true" />
      <span className="text-xs font-medium">
        🔔 System Maintenance: Online tax portal will be unavailable Saturday 2am–6am.
        &nbsp;&nbsp;|&nbsp;&nbsp;
        📢 New: Digital Health ID cards now available — apply online today!
        &nbsp;&nbsp;|&nbsp;&nbsp;
        ⚡ Severe weather alert in northern districts — check emergency services for updates.
        &nbsp;&nbsp;|&nbsp;&nbsp;
        🔔 System Maintenance: Online tax portal will be unavailable Saturday 2am–6am.
        &nbsp;&nbsp;|&nbsp;&nbsp;
        📢 New: Digital Health ID cards now available — apply online today!
        &nbsp;&nbsp;|&nbsp;&nbsp;
        ⚡ Severe weather alert in northern districts — check emergency services for updates.
      </span>
    </div>
  </div>
);

export default LiveNewsBar;
