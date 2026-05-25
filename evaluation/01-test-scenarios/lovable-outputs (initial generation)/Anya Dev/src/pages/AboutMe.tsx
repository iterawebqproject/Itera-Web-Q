import { Github, Linkedin, Mail, User } from "lucide-react";

const skills = [
  { name: "React & Next.js", icon: "⚛️" },
  { name: "TypeScript", icon: "🔷" },
  { name: "Node.js", icon: "🟢" },
  { name: "Rust & WASM", icon: "🦀" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "CSS & Design Systems", icon: "🎨" },
  { name: "WebGPU / WebGL", icon: "🔺" },
  { name: "CI/CD & DevOps", icon: "🚀" },
];

const experience = [
  { role: "Senior Frontend Engineer", company: "Vercel", period: "2024 – Present" },
  { role: "Full-Stack Developer", company: "Stripe", period: "2022 – 2024" },
  { role: "Frontend Developer", company: "Freelance", period: "2020 – 2022" },
];

export default function AboutMe() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Profile */}
      <div className="flex items-center gap-6 mb-14">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-secondary/40 bg-muted">
          <User className="h-10 w-10 text-secondary" />
        </div>
        <div>
          <h1 className="font-serif text-3xl text-foreground">Anya Dev</h1>
          <p className="text-muted-foreground mt-1">
            Full-stack developer · Open source contributor · Creative coder
          </p>
        </div>
      </div>

      {/* About */}
      <section className="mb-14">
        <h2 className="font-serif text-xl text-foreground mb-4">About</h2>
        <p className="text-muted-foreground leading-relaxed">
          I'm a developer who loves building polished, performant web experiences. 
          My work spans from design systems and accessible component libraries to 
          GPU-powered creative experiments. I care deeply about developer experience, 
          thoughtful API design, and shipping work that matters.
        </p>
      </section>

      {/* Skills */}
      <section className="mb-14">
        <h2 className="font-serif text-xl text-foreground mb-4">Skills</h2>
        <div className="grid grid-cols-2 gap-3">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="flex items-center gap-3 rounded-lg border border-border p-3 text-sm text-muted-foreground"
            >
              <span className="text-lg">{skill.icon}</span>
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="mb-14">
        <h2 className="font-serif text-xl text-foreground mb-4">Experience</h2>
        <div className="space-y-4">
          {experience.map((exp) => (
            <div key={exp.role} className="border-l-2 border-secondary/30 pl-4">
              <p className="text-foreground font-medium">{exp.role}</p>
              <p className="text-sm text-muted-foreground">
                {exp.company} · {exp.period}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section>
        <h2 className="font-serif text-xl text-foreground mb-4">Contact</h2>
        <div className="flex gap-4">
          {[
            { icon: Github, href: "#", label: "GitHub" },
            { icon: Linkedin, href: "#", label: "LinkedIn" },
            { icon: Mail, href: "#", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors duration-200 hover:border-secondary hover:text-secondary"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
