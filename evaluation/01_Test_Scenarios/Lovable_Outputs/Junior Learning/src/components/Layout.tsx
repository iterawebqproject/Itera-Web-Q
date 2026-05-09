import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import SkipToContent from "./SkipToContent";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <SkipToContent />
      <SiteHeader />
      <main id="main-content" className="flex-1" role="main">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
};

export default Layout;
