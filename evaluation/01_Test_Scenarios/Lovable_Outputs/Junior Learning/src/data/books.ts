export interface Book {
  id: string;
  title: string;
  subject: string;
  color: string;
  author: string;
  description: string;
  chapters: { id: string; title: string }[];
}

export const books: Book[] = [
  {
    id: "basic-math",
    title: "Basic Mathematics",
    subject: "math",
    color: "#FFBF00",
    author: "Dr. Emily Carter",
    description: "A fun and friendly introduction to numbers, addition, subtraction, multiplication, and division for young learners.",
    chapters: [
      { id: "ch1", title: "Unit 1: Counting & Numbers" },
      { id: "ch2", title: "Unit 2: Addition" },
      { id: "ch3", title: "Unit 3: Subtraction" },
      { id: "ch4", title: "Unit 4: Multiplication" },
      { id: "ch5", title: "Unit 5: Division" },
    ],
  },
  {
    id: "shapes-geometry",
    title: "Shapes & Geometry",
    subject: "math",
    color: "#BF00FF",
    author: "Prof. Liam Chen",
    description: "Explore shapes, angles, and spatial reasoning with colorful illustrations and hands-on activities.",
    chapters: [
      { id: "ch1", title: "Unit 1: 2D Shapes" },
      { id: "ch2", title: "Unit 2: 3D Shapes" },
      { id: "ch3", title: "Unit 3: Angles" },
      { id: "ch4", title: "Unit 4: Symmetry" },
    ],
  },
  {
    id: "living-things",
    title: "Living Things",
    subject: "science",
    color: "#00BF7F",
    author: "Dr. Sofia Reyes",
    description: "Discover the world of animals, plants, and ecosystems. Perfect for curious young scientists!",
    chapters: [
      { id: "ch1", title: "Unit 1: What Is Alive?" },
      { id: "ch2", title: "Unit 2: Plants" },
      { id: "ch3", title: "Unit 3: Animals" },
      { id: "ch4", title: "Unit 4: Habitats" },
    ],
  },
  {
    id: "earth-space",
    title: "Earth & Space",
    subject: "science",
    color: "#007FBF",
    author: "Dr. Omar Hassan",
    description: "From rocks and rivers to the stars above, explore our planet and the universe beyond.",
    chapters: [
      { id: "ch1", title: "Unit 1: Our Planet" },
      { id: "ch2", title: "Unit 2: Weather" },
      { id: "ch3", title: "Unit 3: The Solar System" },
      { id: "ch4", title: "Unit 4: Stars & Galaxies" },
    ],
  },
];

export const getBooksBySubject = (subject: string) => books.filter((b) => b.subject === subject);
export const getBookById = (id: string) => books.find((b) => b.id === id);
