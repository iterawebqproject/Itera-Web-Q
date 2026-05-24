import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-accent text-accent-foreground">
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <h3 className="font-heading text-2xl mb-4">Thai Gallery Guide</h3>
          <p className="text-sm text-accent-foreground/60 max-w-sm leading-relaxed">
            A premium guide to Thailand's art world, featuring local artists
            and the latest museum shows.
          </p>
        </div>
        <div>
          <h4 className="text-xs tracking-[0.2em] uppercase mb-4 text-accent-foreground/40">Navigate</h4>
          <nav className="flex flex-col gap-2">
            {[
              { label: "Home", path: "/" },
              { label: "Art", path: "/art" },
              { label: "Events", path: "/event" },
              { label: "Artists", path: "/artist" },
              { label: "Galleries", path: "/gallery-museum" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-sm text-accent-foreground/60 hover:text-accent-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <h4 className="text-xs tracking-[0.2em] uppercase mb-4 text-accent-foreground/40">Contact</h4>
          <div className="text-sm text-accent-foreground/60 space-y-2">
            <p>info@thaigalleryguide.com</p>
            <p>Bangkok, Thailand</p>
          </div>
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-accent-foreground/10 text-xs text-accent-foreground/40">
        © 2026 Thai Gallery Guide. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
