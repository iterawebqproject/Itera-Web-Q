import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import NewsletterSlideIn from "@/components/NewsletterSlideIn";
import NewsletterFooter from "@/components/NewsletterFooter";
import PageMeta from "@/components/PageMeta";
import { trendDetailData } from "@/data/mockData";

const TrendsDetail = () => {
  const { title, author, date, readTime, category, image, content } = trendDetailData;

  const renderContent = (text: string) => {
    return text.split("\n\n").map((block, i) => {
      if (block.startsWith("## ")) {
        return (
          <h2 key={i} className="text-2xl font-black uppercase tracking-tight mt-12 mb-4 text-foreground">
            {block.replace("## ", "")}
          </h2>
        );
      }
      return <p key={i} className="cw-body mb-6">{block}</p>;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title={title}
        description={content.slice(0, 155)}
        path="/trends/1"
        type="article"
      />
      <Header />
      <NewsletterSlideIn />

      <main id="main-content">
        {/* Article Header */}
        <div className="pt-24 container max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link to="/trends" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-bold text-muted-foreground hover:text-primary transition-colors mb-8">
              <ArrowLeft size={14} aria-hidden="true" /> Back to Trends
            </Link>
            <span className="cw-label block mb-3">{category}</span>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
              {title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-10">
              <span className="font-bold text-foreground">{author}</span>
              <time>{date}</time>
              <span>{readTime}</span>
            </div>
          </motion.div>
        </div>

        {/* Full-Width Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full h-[50vh] mb-12"
        >
          <img src={image} alt={title} className="w-full h-full object-cover" width={1920} height={1080} loading="eager" />
        </motion.div>

        {/* Article Body */}
        <article className="container max-w-3xl pb-20">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            {renderContent(content)}
          </motion.div>
        </article>
      </main>

      <NewsletterFooter />
    </div>
  );
};

export default TrendsDetail;
