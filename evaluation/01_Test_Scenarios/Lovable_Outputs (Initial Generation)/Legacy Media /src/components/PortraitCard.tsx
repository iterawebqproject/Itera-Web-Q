import { Link } from "react-router-dom";

interface PortraitCardProps {
  name: string;
  image: string;
  slug?: string;
}

const PortraitCard = ({ name, image, slug }: PortraitCardProps) => {
  const content = (
    <div className="group cursor-pointer">
      <div className="overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full aspect-[3/4] object-cover grayscale transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <p className="mt-3 font-heading text-lg font-bold text-charcoal group-hover:text-primary transition-colors">
        {name}
      </p>
    </div>
  );

  return slug ? <Link to={slug}>{content}</Link> : content;
};

export default PortraitCard;
