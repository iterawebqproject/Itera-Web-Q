import { Link } from "react-router-dom";

interface MediaCardProps {
  image: string;
  title: string;
  status: string;
  link?: string;
}

const MediaCard = ({ image, title, status, link = "/synopsis" }: MediaCardProps) => (
  <Link to={link} className="group block rounded-xl overflow-hidden glass transition-all hover:scale-[1.02] hover:shadow-xl">
    <div className="aspect-[3/4] overflow-hidden">
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-foreground text-sm">{title}</h3>
      <div className="mt-2 inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
        {status}
      </div>
    </div>
  </Link>
);

export default MediaCard;
