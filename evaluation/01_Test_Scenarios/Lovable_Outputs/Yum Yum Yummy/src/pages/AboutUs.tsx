import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import chefPortrait from "@/assets/chef-portrait.jpg";

const team = [
  { name: "Maya Chen", role: "Head Chef & Founder", emoji: "👩‍🍳" },
  { name: "Leo Park", role: "Food Photographer", emoji: "📸" },
  { name: "Ava Singh", role: "Recipe Tester", emoji: "🧪" },
];

const AboutUs = () => (
  <Layout>
    <SEOHead
      title="About Us"
      description="Meet the team behind Yum Yum Yummy — passionate home cooks dedicated to making cooking easy and fun for everyone."
      path="/about"
    />
    <section className="container mx-auto px-4 py-16 max-w-5xl">
      <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
        About Us
      </h1>

      {/* Chef's Story */}
      <div className="flex flex-col md:flex-row gap-10 mb-20">
        <div className="md:w-1/2">
          <img
            src={chefPortrait}
            alt="Chef Maya smiling in her kitchen"
            loading="lazy"
            width={800}
            height={1024}
            className="w-full max-w-sm mx-auto rounded-2xl object-cover shadow-md"
          />
        </div>
        <div className="md:w-1/2 flex flex-col justify-center">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
            Hi, I'm Maya!
          </h2>
          <p className="font-body text-muted-foreground leading-relaxed mb-4">
            Welcome to Yum Yum Yummy! I started this blog in my tiny college dorm kitchen with nothing more than a single pan and a dream to make cooking feel less intimidating.
          </p>
          <p className="font-body text-muted-foreground leading-relaxed mb-4">
            I believe that great food doesn't need to be complicated. Every recipe here is tested multiple times to make sure it's beginner-friendly, uses accessible ingredients, and — most importantly — tastes absolutely delicious.
          </p>
          <p className="font-body text-muted-foreground leading-relaxed">
            Whether you're a student making your first meal or a busy parent looking for quick dinners, this is your space. Let's cook something wonderful together! 💕
          </p>
        </div>
      </div>

      {/* Meet the Team */}
      <div className="text-center">
        <h2 className="font-heading text-2xl font-bold text-foreground mb-8">
          Meet the Team
        </h2>
        <div className="flex flex-wrap justify-center gap-12" role="list">
          {team.map((member) => (
            <div key={member.name} className="flex flex-col items-center" role="listitem">
              <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center text-4xl mb-3 shadow-sm" aria-hidden="true">
                {member.emoji}
              </div>
              <h3 className="font-heading text-sm font-bold text-foreground">{member.name}</h3>
              <p className="font-body text-xs text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default AboutUs;
