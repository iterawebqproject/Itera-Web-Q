import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import type { Course } from "@/data/courses";

const CourseCard = ({ course }: { course: Course }) => (
  <Link
    to={`/subject/${course.id}`}
    className="block border border-primary rounded-lg p-5 bg-card hover:shadow-md transition-shadow"
  >
    <h3 className="font-heading font-bold text-foreground leading-tight mb-1">{course.title}</h3>
    <p className="text-sm text-muted-foreground mb-2">{course.instructor}</p>
    <div className="flex items-center gap-1 text-sm">
      <Star className="h-4 w-4 fill-primary text-primary" aria-hidden="true" />
      <span className="font-medium text-foreground">{course.rating}</span>
      <span className="sr-only">out of 5 stars</span>
      <span className="text-muted-foreground ml-2">{course.duration}</span>
      {course.price === "Free" && (
        <span className="ml-auto text-xs font-semibold text-accent-foreground bg-accent px-2 py-0.5 rounded-full">Free</span>
      )}
    </div>
  </Link>
);

export default CourseCard;
