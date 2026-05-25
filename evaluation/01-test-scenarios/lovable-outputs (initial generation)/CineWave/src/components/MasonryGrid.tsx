import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export interface ArticleCard {
  id: string;
  title: string;
  category: string;
  image: string;
  span?: "tall" | "wide" | "normal";
  link: string;
}

interface MasonryGridProps {
  articles: ArticleCard[];
}

const spanClasses = {
  tall: "row-span-2",
  wide: "md:col-span-2",
  normal: "",
};

const MasonryGrid = ({ articles }: MasonryGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {articles.map((article, i) => (
        <motion.div
          key={article.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05, duration: 0.4 }}
          className={`${spanClasses[article.span || "normal"]} cw-card-hover`}
        >
          <Link to={article.link} className="block relative group overflow-hidden rounded-sm">
            <div className={`relative ${article.span === "tall" ? "h-[500px]" : "h-[280px]"}`}>
              <img
                src={article.image}
                alt={article.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 cw-gradient-overlay" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="cw-label">{article.category}</span>
                <h3 className="text-lg md:text-xl font-black uppercase tracking-tight text-background mt-1 leading-tight">
                  {article.title}
                </h3>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default MasonryGrid;
