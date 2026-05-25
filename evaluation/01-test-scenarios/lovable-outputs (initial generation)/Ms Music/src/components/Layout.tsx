import { ReactNode } from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import FloatingSocialHub from "./FloatingSocialHub";
import SkipToContent from "./SkipToContent";

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <SkipToContent />
    <SiteHeader />
    <main id="main-content" className="flex-1" role="main">
      {children}
    </main>
    <SiteFooter />
    <FloatingSocialHub />
  </div>
);

export default Layout;
