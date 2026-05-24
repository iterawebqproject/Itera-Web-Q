import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import type { Course } from "@/data/courses";

const CourseFeedItem = ({ course }: { course: Course }) => (
  <Link
    to={`/subject/${course.id}`}
    className="flex gap-4 border border-primary rounded-lg p-4 bg-card hover:shadow-md transition-shadow"
    role="listitem"
  >
    <div className="w-20 h-20 rounded-md bg-accent flex items-center justify-center shrink-0" aria-hidden="true">
      <span className="text-2xl font-bold text-accent-foreground">{course.title[0]}</span>
    </div>
    <div className="flex-1 min-w-0">
      <h3 className="font-heading font-bold text-foreground truncate">{course.title}</h3>
      <p className="text-sm text-muted-foreground">{course.instructor} · {course.level}</p>
      <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{course.description}</p>
      <div className="flex items-center gap-1 mt-1 text-sm">
        <Star className="h-3.5 w-3.5 fill-primary text-primary" aria-hidden="true" />
        <span className="font-medium">{course.rating}</span>
        <span className="sr-only">out of 5 stars</span>
        <span className="text-muted-foreground ml-2">{course.duration}</span>
        <span className="ml-auto font-semibold text-foreground">{course.price}</span>
      </div>
    </div>
  </Link>
);

export default CourseFeedItem;
