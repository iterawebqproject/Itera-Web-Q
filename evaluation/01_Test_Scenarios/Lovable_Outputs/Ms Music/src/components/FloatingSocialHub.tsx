import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Twitter, Instagram, Music, X } from "lucide-react";

const FloatingSocialHub = () => {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const socials = [
    { icon: Twitter, label: "Twitter" },
    { icon: Instagram, label: "Instagram" },
    { icon: Music, label: "Spotify" },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 60 }}
          className="fixed right-4 bottom-6 z-40 flex flex-col items-end gap-2"
        >
          <AnimatePresence>
            {open &&
              socials.map((s, i) => (
                <motion.button
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.5, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0, transition: { delay: i * 0.05 } }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors shadow-lg"
                  aria-label={s.label}
                >
                  <s.icon size={18} />
                </motion.button>
              ))}
          </AnimatePresence>
          <button
            onClick={() => setOpen(!open)}
            className="w-12 h-12 rounded-full editorial-gradient-bg text-primary-foreground flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Social sharing"
          >
            {open ? <X size={20} /> : <Share2 size={20} />}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingSocialHub;
