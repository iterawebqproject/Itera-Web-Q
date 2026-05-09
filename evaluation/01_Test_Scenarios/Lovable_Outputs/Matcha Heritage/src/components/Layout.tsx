import Header from "./Header";
import Footer from "./Footer";
import SkipToContent from "./SkipToContent";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <SkipToContent />
    <Header />
    <main id="main-content" className="flex-1">{children}</main>
    <Footer />
  </div>
);

export default Layout;
