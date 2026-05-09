import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const NewsletterSlideIn = () => {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [dismissed, setDismissed] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight;
    if (scrollPercent > 0.75) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (dismissed) return;

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed, handleScroll]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Subscribed! Welcome to CineWave.");
      setEmail("");
      setDismissed(true);
      setVisible(false);
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          role="complementary"
          aria-label="Newsletter subscription"
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-6 right-6 z-50 w-80 bg-foreground text-background rounded-lg shadow-2xl p-6"
        >
          <button onClick={handleDismiss} className="absolute top-3 right-3 text-background/50 hover:text-background" aria-label="Dismiss newsletter popup">
            <X size={16} aria-hidden="true" />
          </button>
          <p className="cw-label mb-2 text-primary">Don't Miss Out</p>
          <h3 className="text-lg font-black uppercase tracking-tight mb-2">
            Join CineWave
          </h3>
          <p className="text-sm text-background/60 mb-4">
            Get the latest trends delivered to your inbox.
          </p>
          <form onSubmit={handleSubmit} className="space-y-3" aria-label="Newsletter signup form">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background/10 border-background/20 text-background placeholder:text-background/40 text-sm"
              required
              aria-label="Email address"
            />
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-cw-glow text-sm">
              Subscribe
            </Button>
          </form>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default NewsletterSlideIn;
