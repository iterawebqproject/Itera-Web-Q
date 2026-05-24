export const subjects = [
  { id: "physics", name: "Physics", icon: "Atom", description: "Mechanics, Thermodynamics, Electromagnetism & more" },
  { id: "mathematics", name: "Mathematics", icon: "Calculator", description: "Calculus, Linear Algebra, Statistics & more" },
  { id: "biology", name: "Biology", icon: "Leaf", description: "Cell Biology, Genetics, Ecology & more" },
  { id: "chemistry", name: "Chemistry", icon: "FlaskConical", description: "Organic, Inorganic, Physical Chemistry & more" },
  { id: "computer-science", name: "Computer Science", icon: "Monitor", description: "Algorithms, Data Structures, Systems & more" },
  { id: "earth-science", name: "Earth Science", icon: "Globe", description: "Geology, Meteorology, Oceanography & more" },
  { id: "astronomy", name: "Astronomy", icon: "Star", description: "Stellar Physics, Cosmology, Astrophysics & more" },
  { id: "environmental", name: "Environmental Science", icon: "TreePine", description: "Climate, Conservation, Sustainability & more" },
];

export const topics = [
  { id: "classical-mechanics", subjectId: "physics", title: "Classical Mechanics", level: "Undergraduate", department: "Physics", description: "Newton's laws, energy, momentum, rotational dynamics, and oscillations.", fileType: "PDF" },
  { id: "electromagnetism", subjectId: "physics", title: "Electromagnetism", level: "Undergraduate", department: "Physics", description: "Electric fields, magnetic fields, Maxwell's equations, and electromagnetic waves.", fileType: "PDF" },
  { id: "quantum-mechanics", subjectId: "physics", title: "Quantum Mechanics", level: "Graduate", department: "Physics", description: "Wave functions, Schrödinger equation, quantum states, and perturbation theory.", fileType: "PDF" },
  { id: "thermodynamics", subjectId: "physics", title: "Thermodynamics", level: "Undergraduate", department: "Physics", description: "Laws of thermodynamics, entropy, heat engines, and statistical mechanics.", fileType: "PDF" },
  { id: "calculus-i", subjectId: "mathematics", title: "Calculus I", level: "Undergraduate", department: "Mathematics", description: "Limits, derivatives, integrals, and the fundamental theorem of calculus.", fileType: "PDF" },
  { id: "linear-algebra", subjectId: "mathematics", title: "Linear Algebra", level: "Undergraduate", department: "Mathematics", description: "Vectors, matrices, eigenvalues, and linear transformations.", fileType: "PDF" },
  { id: "cell-biology", subjectId: "biology", title: "Cell Biology", level: "Undergraduate", department: "Biology", description: "Cell structure, organelles, membrane transport, and cell division.", fileType: "PDF" },
  { id: "genetics", subjectId: "biology", title: "Genetics", level: "Undergraduate", department: "Biology", description: "Mendelian genetics, DNA replication, gene expression, and mutations.", fileType: "PDF" },
];

export const topicOutline = [
  { session: 1, title: "Introduction & Newton's First Law", files: ["Lecture Notes 1.pdf", "Problem Set 1.pdf"] },
  { session: 2, title: "Newton's Second & Third Laws", files: ["Lecture Notes 2.pdf", "Lab Report Template.pdf"] },
  { session: 3, title: "Work, Energy & Power", files: ["Lecture Notes 3.pdf", "Problem Set 2.pdf"] },
  { session: 4, title: "Conservation of Momentum", files: ["Lecture Notes 4.pdf", "Simulation Guide.pdf"] },
  { session: 5, title: "Rotational Dynamics", files: ["Lecture Notes 5.pdf", "Problem Set 3.pdf"] },
  { session: 6, title: "Simple Harmonic Motion", files: ["Lecture Notes 6.pdf", "Lab Report 2.pdf"] },
  { session: 7, title: "Gravitation", files: ["Lecture Notes 7.pdf", "Problem Set 4.pdf"] },
  { session: 8, title: "Review & Final Examination", files: ["Review Sheet.pdf", "Practice Exam.pdf"] },
];

export const topicContent = {
  title: "Newton's First Law of Motion",
  body: `Newton's First Law of Motion, often referred to as the Law of Inertia, states that an object at rest will remain at rest, and an object in motion will continue in motion with a constant velocity, unless acted upon by a net external force.

This principle fundamentally changed our understanding of motion. Before Newton, the prevailing Aristotelian view held that objects naturally tend toward rest. Newton's insight was that motion itself is a natural state — it is changes in motion that require explanation.

## Key Concepts

**Inertia** is the tendency of an object to resist changes in its state of motion. The mass of an object is a quantitative measure of its inertia. A more massive object has greater inertia and requires a larger force to change its velocity.

**Net Force** refers to the vector sum of all forces acting on an object. When the net force is zero, the object is in a state of equilibrium. This can mean the object is stationary or moving at a constant velocity.

## Reference Frames

Newton's First Law is only valid in **inertial reference frames** — frames of reference that are not accelerating. In a non-inertial (accelerating) reference frame, fictitious forces appear to act on objects, and the law does not hold in its simple form.

## Applications

Understanding the First Law is essential for analyzing real-world scenarios:

- **Seatbelts** work because of inertia. When a car stops suddenly, passengers continue moving forward.
- **Spacecraft** in deep space continue moving indefinitely without engines because there are no significant external forces.
- **Friction** is the external force that eventually brings most terrestrial objects to rest.

## Mathematical Formulation

When the net force on an object is zero:

ΣF = 0  →  Δv = 0

This means either the object's velocity is zero (at rest) or the velocity is constant (uniform motion in a straight line).`,
  relatedReadings: [
    { title: "Newton's Second Law of Motion", id: "newtons-second-law" },
    { title: "Conservation of Momentum", id: "conservation-momentum" },
    { title: "Frames of Reference in Physics", id: "frames-of-reference" },
  ],
};
