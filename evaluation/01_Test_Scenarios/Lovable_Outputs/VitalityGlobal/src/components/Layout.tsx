import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import StockTicker from "./StockTicker";

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <StockTicker />
    <Header />
    <main id="main-content" className="flex-1">{children}</main>
    <Footer />
  </div>
);

export default Layout;
