import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import mascot from "@/assets/mascot.png";
import aboutCreator from "@/assets/about-creator.png";
import scienceDoodle from "@/assets/science-doodle.png";
import philosophyDoodle from "@/assets/philosophy-doodle.png";

const characters = [
  {
    name: "Brainy",
    role: "Chief Scribbler",
    bio: "Has a head full of ideas and zero artistic talent. Compensates with enthusiasm.",
    img: mascot,
  },
  {
    name: "Professor Doodle",
    role: "Science Correspondent",
    bio: "Once explained quantum physics to a cat. The cat was unimpressed but the article went viral.",
    img: scienceDoodle,
  },
  {
    name: "Thinky McThinkface",
    role: "Philosophy Department",
    bio: "Asks 'but why?' until everyone leaves the room. Considers this a success.",
    img: philosophyDoodle,
  },
];

export default function About() {
  return (
    <Layout>
      <SEOHead
        title="About Us"
        description="Meet the stick-figure team behind Brainy Doodle. Where complex ideas come to be poorly illustrated but excellently explained."
        path="/about"
      />
      <section className="container py-12 max-w-3xl">
        <h1 className="font-display text-5xl md:text-6xl text-foreground mb-4">
          About <span className="text-primary">Brainy Doodle</span>
        </h1>
        <p className="font-body text-lg text-muted-foreground mb-12">
          Where complex ideas come to be poorly illustrated but excellently explained.
        </p>

        {/* Meet the Characters */}
        <section aria-labelledby="characters-heading">
          <h2 id="characters-heading" className="font-display text-3xl text-foreground mb-6">🎭 Meet the Characters</h2>
          <div className="grid gap-6 mb-16">
            {characters.map((char) => (
              <div key={char.name} className="sketch-border bg-card p-6 flex items-center gap-6">
                <img
                  src={char.img}
                  alt={`${char.name} — ${char.role}`}
                  width={80}
                  height={80}
                  loading="lazy"
                  className="rounded-full bg-muted flex-shrink-0"
                />
                <div>
                  <h3 className="font-display text-2xl text-card-foreground">{char.name}</h3>
                  <span className="text-xs font-body text-primary font-semibold uppercase tracking-wider">
                    {char.role}
                  </span>
                  <p className="font-body text-sm text-muted-foreground mt-2">{char.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Creator's Story */}
        <section aria-labelledby="creator-heading">
          <h2 id="creator-heading" className="font-display text-3xl text-foreground mb-4">📝 The Creator's Story</h2>
          <div className="flex flex-col md:flex-row gap-8 items-start mb-16">
            <img
              src={aboutCreator}
              alt="The creator at their desk, surrounded by crumpled paper and coffee cups"
              width={200}
              height={200}
              loading="lazy"
              className="sketch-border bg-muted p-2"
            />
            <div className="font-body text-foreground/90 space-y-4">
              <p>
                Brainy Doodle was born when its creator realized they had two skills: understanding complicated things
                and drawing terribly. Instead of improving at either, they decided to combine both into a blog.
              </p>
              <p>
                Armed with nothing but a tablet, questionable humor, and an unhealthy coffee addiction,
                the creator set out to make the internet slightly less boring. The jury is still out on whether
                they succeeded.
              </p>
              <blockquote className="text-muted-foreground italic border-l-2 border-primary pl-4">
                "I can't draw hands, but I can explain black holes. Priorities." — The Creator
              </blockquote>
            </div>
          </div>
        </section>

        {/* Philosophy of the Doodle */}
        <section aria-labelledby="philosophy-heading">
          <h2 id="philosophy-heading" className="font-display text-3xl text-foreground mb-4">🎨 Philosophy of the Doodle</h2>
          <div className="sketch-border-light bg-accent/30 p-6 mb-16 font-body text-foreground/90 space-y-4">
            <p>
              We believe that if you can't explain something simply, you don't understand it well enough.
              And if you can explain it with a stick figure? Chef's kiss.
            </p>
            <p>Every doodle follows three sacred rules:</p>
            <ol className="list-decimal list-inside space-y-2 text-foreground/80">
              <li>If it's not fun, rewrite it.</li>
              <li>If the stick figure has more than 5 lines, it's too detailed.</li>
              <li>Never, ever use the word "synergy."</li>
            </ol>
          </div>
        </section>

        {/* How I Draw */}
        <section aria-labelledby="draw-heading">
          <h2 id="draw-heading" className="font-display text-3xl text-foreground mb-4">✏️ How I Draw</h2>
          <div className="sketch-border bg-card p-6 font-body text-foreground/90 space-y-4">
            <p>People often ask: "How do you create such... unique artwork?"</p>
            <p>The process is simple:</p>
            <ol className="list-decimal list-inside space-y-2 text-foreground/80">
              <li>Open drawing app</li>
              <li>Draw a circle for the head</li>
              <li>Realize the circle looks like a potato</li>
              <li>Keep the potato</li>
              <li>Add stick limbs</li>
              <li>Call it "artistic style"</li>
              <li>Publish before self-doubt kicks in</li>
            </ol>
            <p className="text-muted-foreground italic mt-4">
              Total time per illustration: 3 minutes of drawing, 47 minutes of questioning life choices.
            </p>
          </div>
        </section>
      </section>
    </Layout>
  );
}
