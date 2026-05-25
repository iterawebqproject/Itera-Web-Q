import { useState, useRef, useEffect } from "react";
import { MessageCircleHeart, X } from "lucide-react";

const FeedbackWidget = () => {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Trap focus when dialog is open
  useEffect(() => {
    if (open && dialogRef.current) {
      const firstFocusable = dialogRef.current.querySelector<HTMLElement>("textarea, button");
      firstFocusable?.focus();
    }
  }, [open, submitted]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <>
      <button
        onClick={() => { setOpen(true); setSubmitted(false); }}
        className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground rounded-full p-3 shadow-lg hover:scale-105 transition-transform focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label="Give feedback"
      >
        <MessageCircleHeart size={24} aria-hidden="true" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40"
          role="dialog"
          aria-modal="true"
          aria-label="Send Feedback"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div ref={dialogRef} className="bg-card rounded-lg shadow-xl p-6 w-full max-w-sm mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg" id="feedback-title">Send Feedback</h3>
              <button onClick={() => setOpen(false)} aria-label="Close feedback dialog">
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            {submitted ? (
              <p className="text-center py-8 text-muted-foreground" role="status">Thank you for your feedback! 😊</p>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                <label htmlFor="feedback-text" className="sr-only">Your feedback</label>
                <textarea
                  id="feedback-text"
                  className="w-full border rounded-md p-3 text-sm mb-4 min-h-[100px] bg-background focus:ring-2 focus:ring-primary/30 focus:outline-none"
                  placeholder="Tell us what you think…"
                  required
                  minLength={10}
                />
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground rounded-md py-2 font-semibold text-sm hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackWidget;
