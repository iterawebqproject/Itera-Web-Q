import { Link } from "react-router-dom";

const SiteFooter = () => (
  <footer className="bg-foreground text-background py-10 mt-16" role="contentinfo">
    <div className="container">
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-3">UrbanConnect</h3>
          <p className="text-sm opacity-70">
            A centralized digital platform providing verified government information, budget transparency, and national policy updates.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider opacity-60">Quick Links</h4>
          <nav className="flex flex-col gap-2 text-sm" aria-label="Footer navigation">
            <Link to="/budget-2026" className="hover:underline opacity-80">Budget 2026</Link>
            <Link to="/national-day-rally-2025" className="hover:underline opacity-80">NDR 2025</Link>
            <Link to="/factually-checkpulse" className="hover:underline opacity-80">CheckPulse</Link>
            <Link to="/about-us" className="hover:underline opacity-80">About Us</Link>
          </nav>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider opacity-60">Contact</h4>
          <p className="text-sm opacity-70">info@urbanconnect.gov</p>
          <p className="text-sm opacity-70">+65 6000 0000</p>
        </div>
      </div>
      <div className="border-t border-background/20 mt-8 pt-6 text-center text-xs opacity-50">
        © 2025 UrbanConnect. All rights reserved.
      </div>
    </div>
  </footer>
);

export default SiteFooter;
