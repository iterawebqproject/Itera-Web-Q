import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";

export default function EmergencyBar() {
  const [dismissed, setDismissed] = useState(false);
  const [hasEmergency] = useState(true);
  const message = "Severe weather advisory in effect for the Northern District. Stay indoors and monitor updates.";

  if (!hasEmergency || dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-emergency text-destructive-foreground" role="alert" aria-live="assertive">
      <div className="container flex items-center justify-between py-2.5 text-sm">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="font-medium">{message}</span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="p-1 rounded hover:bg-destructive-foreground/10 focus:outline-none focus:ring-2 focus:ring-destructive-foreground"
          aria-label="Dismiss emergency alert"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
