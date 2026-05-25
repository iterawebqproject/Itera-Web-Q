export type Category = "science" | "philosophy" | "life" | "tech" | "history";

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: Category;
  date: string;
  readTime: string;
  featured?: boolean;
  content: string;
}

export const categories: { id: Category; label: string; emoji: string }[] = [
  { id: "science", label: "Science", emoji: "🔬" },
  { id: "philosophy", label: "Philosophy", emoji: "🤔" },
  { id: "life", label: "Life", emoji: "☕" },
  { id: "tech", label: "Tech", emoji: "💻" },
  { id: "history", label: "History", emoji: "📜" },
];

export const articles: Article[] = [
  {
    id: "quantum-for-dummies",
    title: "Quantum Physics, But Make It Make Sense",
    excerpt: "Schrödinger's cat walks into a bar. And doesn't. At the same time. Let's untangle this mess with stick figures.",
    category: "science",
    date: "2026-04-01",
    readTime: "5 min",
    featured: true,
    content: `So here's the thing about quantum physics: nobody actually understands it. Not even the physicists. They just pretend really well at conferences.

## The Cat Problem

Imagine you put a cat in a box. (Don't actually do this, please.) According to Schrödinger, until you open the box, the cat is both alive AND dead. This is called "superposition," which is a fancy word for "we have no idea what's happening in there."

## Why Should You Care?

Because your phone works because of quantum mechanics. Every time you scroll through memes, you're benefiting from particles that can't decide where they are. You're welcome.

## The Double Slit Experiment

Shoot tiny particles at a wall with two slits. They create a wave pattern. But watch them? They act like particles. It's like they know you're looking. Creepy? Yes. Science? Also yes.

## In Summary

Quantum physics is basically the universe's way of saying "I do what I want." And honestly? Respect.`,
  },
  {
    id: "why-we-procrastinate",
    title: "Why Your Brain Hates Deadlines (A Scientific Excuse)",
    excerpt: "Your brain isn't lazy. It's just... strategically avoiding things. Here's the neuroscience behind procrastination.",
    category: "science",
    date: "2026-03-28",
    readTime: "4 min",
    content: `Let's get one thing straight: procrastination isn't laziness. It's your brain being a dramatic little optimizer.

## The Prefrontal Cortex vs. The Limbic System

Think of your brain as having two roommates. The prefrontal cortex is the responsible one who makes to-do lists. The limbic system is the one who says "let's watch just ONE more episode." Guess who wins?

## The Instant Gratification Monkey

Your brain loves rewards NOW. Future rewards? Meh. That's why eating a cookie feels better than thinking about eating a cookie next Tuesday.

## How to Trick Your Brain

Start with the tiniest possible task. Your brain can't resist something that takes 2 minutes. Once you start, momentum kicks in. It's basically brain judo.

## The Truth

We all procrastinate. Even the people who say they don't are just procrastinating on admitting it.`,
  },
  {
    id: "socrates-was-annoying",
    title: "Socrates Was Basically That Annoying Friend",
    excerpt: "The father of Western philosophy's main skill was asking 'but why?' until people wanted to throw him off a cliff.",
    category: "philosophy",
    date: "2026-03-20",
    readTime: "6 min",
    content: `You know that friend who answers every question with another question? Congratulations, you know a modern-day Socrates. And yes, people found him equally annoying back then.

## The Socratic Method

Socrates didn't teach anything. He just asked questions until you realized you didn't know anything either. It's like debugging but for your entire worldview.

## "I Know That I Know Nothing"

This is his most famous quote, and it's basically ancient Greek for "I have no idea what's going on, but at least I'm honest about it."

## Why Athens Got Mad

Imagine someone walking around your city questioning everything. "What is justice?" "What is love?" "What is a chair, REALLY?" Eventually, Athens said "enough" and gave him hemlock tea. (Spoiler: it was poisonous.)

## His Legacy

Despite being the world's most persistent questioner, Socrates never wrote anything down. Everything we know about him comes from Plato, his student. So technically, Socrates' entire reputation is based on someone else's notes.`,
  },
  {
    id: "coffee-philosophy",
    title: "The Existential Crisis of Your Morning Coffee",
    excerpt: "Is your latte a metaphor for the human condition? Probably not. But let's pretend it is for 4 minutes.",
    category: "philosophy",
    date: "2026-03-15",
    readTime: "4 min",
    content: `Every morning, millions of people perform the same ritual: they make coffee. But have you ever stopped to ask... why?

## Camus and the Coffee Machine

Albert Camus said we must imagine Sisyphus happy. Sisyphus pushed a boulder up a hill forever. You push the "brew" button every morning. Same energy.

## The Bean's Journey

A coffee bean travels thousands of miles, gets roasted, ground up, and drowned in hot water. And we call this "a treat." If that's not absurdist philosophy, I don't know what is.

## Free Will and Cream

Do you choose to add cream? Or does cream choose you? Sartre would say you're condemned to be free. Even in your coffee choices.

## The Takeaway

Your morning coffee is not just a beverage. It's a daily act of rebellion against the void. Drink it proudly.`,
  },
  {
    id: "adulting-is-a-scam",
    title: "Adulting Is a Scam and Here's Proof",
    excerpt: "Nobody actually knows how to do taxes. We're all just clicking buttons and hoping for the best.",
    category: "life",
    date: "2026-03-10",
    readTime: "5 min",
    content: `Here's a secret that no adult will tell you: nobody knows what they're doing. We're all just tall children with credit cards.

## Taxes

They teach you calculus in school but not how to file taxes. Why? Because the education system is run by people who also don't know how to file taxes.

## Cooking

Adult cooking is 90% staring into the fridge and 10% ordering takeout. The other 0% is that one time you made pasta from scratch and told everyone about it for three years.

## Sleep

As a kid, you fight sleep. As an adult, sleep fights you. You lie in bed thinking about that embarrassing thing you said in 2014. Fun!

## The Truth About Adulting

The real skill of adulthood isn't knowing things. It's Googling things fast enough that nobody notices you didn't know.`,
  },
  {
    id: "wifi-explained",
    title: "How WiFi Works (Spoiler: It's Basically Magic)",
    excerpt: "Invisible waves carry your cat videos through walls. If that's not sorcery, I don't know what is.",
    category: "tech",
    date: "2026-03-05",
    readTime: "4 min",
    content: `WiFi. You use it every day. You panic when it goes down. But do you actually know how it works? Let me explain with the confidence of someone who Googled this 20 minutes ago.

## Radio Waves, Baby

WiFi uses radio waves. Yes, the same technology as your grandpa's radio. Except instead of jazz, it transmits your 47 open browser tabs.

## The Router: Your Digital Butler

Your router is basically a tiny radio station in your house. It broadcasts data in all directions, which is why your neighbor can sometimes steal your signal. (Change your password, Karen.)

## Why Walls Are the Enemy

Radio waves hate walls. Especially thick ones. That's why your WiFi works perfectly in the living room but dies the moment you enter the bathroom. Physics has no mercy.

## 2.4GHz vs 5GHz

2.4GHz: Slower but travels farther. Like a tortoise.
5GHz: Faster but gives up at the first wall. Like my motivation on Monday.`,
  },
  {
    id: "medieval-hygiene",
    title: "Medieval Hygiene: A Horror Story",
    excerpt: "People in the Middle Ages bathed once a year. ONCE. Let that sink in (pun intended).",
    category: "history",
    date: "2026-02-28",
    readTime: "5 min",
    content: `If you think your roommate's hygiene is bad, let me introduce you to the Middle Ages. A time when "bath" was a seasonal event and "deodorant" hadn't been invented yet.

## The Bath Situation

Medieval Europeans bathed maybe once or twice a year. And when they did, the whole family used the same water. Dad went first (cleanest), then mom, then kids. The baby went last. Hence the phrase "don't throw the baby out with the bathwater."

## Teeth? What Teeth?

Toothbrushes didn't exist. People rubbed their teeth with cloth or just... didn't. Sugar was expensive though, so peasants actually had better teeth than nobles. Plot twist!

## The Chamber Pot

Indoor plumbing? A fantasy. People used chamber pots and sometimes just... dumped them out the window. "Gardyloo!" they'd yell, which is medieval for "INCOMING!"

## The Silver Lining

Despite all this, medieval people lived, loved, built cathedrals, and created art. Just goes to show: greatness doesn't require shower gel.`,
  },
  {
    id: "plants-are-dramatic",
    title: "Plants Are Way More Dramatic Than You Think",
    excerpt: "Trees gossip, flowers scheme, and your houseplant is definitely judging you. Welcome to botanical drama.",
    category: "science",
    date: "2026-02-20",
    readTime: "5 min",
    content: `You think plants are boring? Just sitting there, photosynthesizing? Think again. Plants are basically running a soap opera and we're not invited.

## Trees Talk

Trees communicate through underground fungal networks. Scientists call it the "Wood Wide Web." Trees share nutrients, warn each other about pests, and probably gossip about the oak that keeps dropping leaves everywhere.

## Flowers Are Manipulative

Flowers didn't evolve to be pretty for YOU. They evolved to trick bees into doing their bidding. Those beautiful colors and sweet scents? Marketing. Pure marketing.

## Your Houseplant Knows

Studies show plants respond to sound, light changes, and touch. Your fiddle leaf fig absolutely knows you forgot to water it. It's keeping score.

## Survival of the Pettiest

Some plants produce toxins to prevent other plants from growing nearby. It's called "allelopathy," but I prefer "botanical shade."`,
  },
];

export const getArticlesByCategory = (category: Category) =>
  articles.filter((a) => a.category === category);

export const getFeaturedArticle = () =>
  articles.find((a) => a.featured) || articles[0];

export const getArticleById = (id: string) =>
  articles.find((a) => a.id === id);
