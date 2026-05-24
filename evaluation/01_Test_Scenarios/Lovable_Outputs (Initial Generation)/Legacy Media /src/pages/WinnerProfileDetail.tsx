import portrait1 from "@/assets/portrait-1.jpg";
import authorPortrait from "@/assets/author-portrait.jpg";
import ReadTimeBadge from "@/components/ReadTimeBadge";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageMeta from "@/components/PageMeta";
import { Link } from "react-router-dom";

const WinnerProfileDetail = () => (
  <div className="min-h-screen bg-background">
    <PageMeta
      title="Dr. Elena Vasquez"
      description="The scientist who rewrote the rules of medicine — Legacy Media Person of the Year profile."
    />
    <ReadingProgressBar />
    <SiteHeader />

    <main id="main-content" className="pt-24 pb-20">
      {/* Framed Hero */}
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="border-8 border-border">
          <img src={portrait1} alt="Dr. Elena Vasquez portrait" className="w-full aspect-[4/5] md:aspect-[3/4] object-cover" fetchPriority="high" />
        </div>
      </div>

      {/* Article Header */}
      <div className="container mx-auto px-6 max-w-2xl mt-12">
        <ReadTimeBadge minutes={8} />
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mt-4 leading-tight">
          Dr. Elena Vasquez: The Scientist Who Rewrote the Rules of Medicine
        </h1>
        <p className="font-body text-sm text-muted-foreground mt-4">
          By <Link to="/author" className="text-primary hover:underline">Catherine Morales</Link> · <time>April 2, 2026</time>
        </p>
      </div>

      {/* Editorial Body */}
      <article className="container mx-auto px-6 max-w-2xl mt-12 space-y-6">
        <p className="font-body text-base leading-relaxed text-foreground">
          In the sterile corridors of her laboratory at the Max Planck Institute, Dr. Elena Vasquez speaks with the quiet
          confidence of someone who has spent three decades pushing the boundaries of what medicine can achieve. Her latest
          breakthrough—a gene therapy that has shown remarkable efficacy in treating hereditary blindness—has earned her
          comparisons to the pioneers of vaccination.
        </p>

        <figure>
          <blockquote className="border-l-4 border-primary pl-6 my-10">
            <p className="font-heading text-xl md:text-2xl italic text-foreground leading-relaxed">
              "We are not just treating symptoms anymore. We are rewriting the code of life itself."
            </p>
          </blockquote>
        </figure>

        <p className="font-body text-base leading-relaxed text-foreground">
          Born in Buenos Aires to a family of educators, Vasquez showed an early aptitude for the sciences. By sixteen,
          she had already published her first paper on molecular biology. Today, her work spans three continents and has
          attracted funding from both the Gates Foundation and the European Research Council.
        </p>

        <p className="font-body text-base leading-relaxed text-foreground">
          Her approach is methodical, almost philosophical. She rejects the "move fast and break things" ethos that
          pervades much of the biotech industry, preferring instead a model of careful, peer-reviewed progress. "Speed
          without rigor is recklessness," she says. "In medicine, recklessness costs lives."
        </p>

        <figure>
          <blockquote className="border-l-4 border-primary pl-6 my-10">
            <p className="font-heading text-xl md:text-2xl italic text-foreground leading-relaxed">
              "The real revolution isn't in the lab. It's in making these treatments accessible to every human being on Earth."
            </p>
          </blockquote>
        </figure>

        <p className="font-body text-base leading-relaxed text-foreground">
          As Legacy Media's Person of the Year, Dr. Vasquez represents something larger than any single discovery. She
          embodies the belief that science, pursued with patience and integrity, remains humanity's greatest tool for
          building a more just and healthy world.
        </p>

        {/* Author Pill */}
        <div className="mt-16 pt-8 border-t border-border">
          <Link to="/author" className="flex items-center gap-4 group">
            <img
              src={authorPortrait}
              alt="Catherine Morales"
              loading="lazy"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-body text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                Catherine Morales
              </p>
              <p className="font-body text-xs text-muted-foreground">Senior Correspondent, Legacy Media</p>
            </div>
          </Link>
        </div>
      </article>
    </main>

    <SiteFooter />
  </div>
);

export default WinnerProfileDetail;
