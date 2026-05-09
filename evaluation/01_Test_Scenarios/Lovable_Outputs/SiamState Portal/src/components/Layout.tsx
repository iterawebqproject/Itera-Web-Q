import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import EmergencyBar from "./EmergencyBar";
import { Helmet } from "react-helmet-async";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const defaultTitle = "SiamState Portal — Government Services";
const defaultDesc = "SiamState Portal is your central government hub for public services including health, environment, and employment.";

export default function Layout({ children, title, description }: LayoutProps) {
  const location = useLocation();
  const canonical = `https://siamstate-connect.lovable.app${location.pathname}`;

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>{title || defaultTitle}</title>
        <meta name="description" content={description || defaultDesc} />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content" className="flex-1 pb-12">{children}</main>
      <SiteFooter />
      <EmergencyBar />
    </div>
  );
}
