import heroCinema from "@/assets/hero-cinema.jpg";
import trendHero from "@/assets/trend-hero.jpg";
import movieBg from "@/assets/movie-bg.jpg";

export const heroImage = heroCinema;
export const trendHeroImage = trendHero;
export const movieBgImage = movieBg;

export const newsArticles = [
  { id: "1", title: "The Rise of Analog Horror on TikTok", category: "Trends", image: heroCinema, span: "tall" as const, link: "/trends/1" },
  { id: "2", title: "Why Gen-Z is Obsessed with 90s Camcorder Aesthetics", category: "Culture", image: movieBg, span: "normal" as const, link: "/trends/2" },
  { id: "3", title: "Underground Film Festivals You Need to Know", category: "Movies", image: trendHero, span: "wide" as const, link: "/movie" },
  { id: "4", title: "The Death of the Sequel: Original Stories Making a Comeback", category: "Editorial", image: heroCinema, span: "normal" as const, link: "/review-movie" },
  { id: "5", title: "How AI is Reshaping Independent Filmmaking", category: "Tech", image: movieBg, span: "normal" as const, link: "/trends/3" },
  { id: "6", title: "Neon Noir: The Visual Language of Modern Thrillers", category: "Reviews", image: trendHero, span: "tall" as const, link: "/review-movie" },
  { id: "7", title: "Sundance 2026: The Breakout Films Everyone is Talking About", category: "Festivals", image: heroCinema, span: "normal" as const, link: "/movie" },
  { id: "8", title: "From Reels to Screens: Social Media Directors Taking Over Hollywood", category: "Trends", image: movieBg, span: "wide" as const, link: "/trends/4" },
];

export const trendingMovies = [
  { id: "m1", title: "Phantom Thread II", genre: "Drama", rating: 9.2, image: heroCinema },
  { id: "m2", title: "Neon Requiem", genre: "Thriller", rating: 8.8, image: trendHero },
  { id: "m3", title: "Echoes of Tomorrow", genre: "Sci-Fi", rating: 8.5, image: movieBg },
  { id: "m4", title: "The Last Frame", genre: "Documentary", rating: 9.0, image: heroCinema },
  { id: "m5", title: "Velvet Underground", genre: "Crime", rating: 8.7, image: trendHero },
  { id: "m6", title: "Digital Bloom", genre: "Animation", rating: 8.9, image: movieBg },
];

export const trendArticles = [
  { id: "t1", title: "Vertical Cinema: How Smartphone Filmmaking is Changing Everything", category: "Innovation", image: heroCinema, span: "wide" as const, link: "/trends/1" },
  { id: "t2", title: "The Lo-Fi Film Movement", category: "Underground", image: trendHero, span: "tall" as const, link: "/trends/2" },
  { id: "t3", title: "Viral Movie Marketing: Decoded", category: "Business", image: movieBg, span: "normal" as const, link: "/trends/3" },
  { id: "t4", title: "Sound Design Trends Dominating 2026", category: "Audio", image: heroCinema, span: "normal" as const, link: "/trends/4" },
  { id: "t5", title: "The Aesthetics of Film Twitter", category: "Social", image: trendHero, span: "normal" as const, link: "/trends/5" },
  { id: "t6", title: "Why Practical Effects are Making a Comeback", category: "Production", image: movieBg, span: "wide" as const, link: "/trends/6" },
];

export const reviewData = {
  title: "Neon Requiem",
  director: "Ana Voss",
  year: 2026,
  rating: 8.8,
  genre: "Neo-Noir Thriller",
  image: trendHero,
  synopsis: "In a rain-soaked metropolis where reality bleeds into digital hallucination, a disgraced detective must navigate a web of corporate conspiracies and synthetic memories to find a missing filmmaker whose last work may hold the key to exposing a truth that could unravel society itself.",
  review: `Ana Voss delivers a masterclass in atmospheric filmmaking with "Neon Requiem." The film opens with a breathtaking 12-minute single take through the neon-drenched streets of a near-future city, immediately establishing a visual language that is both intoxicating and unsettling.

The cinematography by Kai Nakamura deserves special mention — every frame is composed with painterly precision, using deep shadows and saturated highlights to create a world that feels simultaneously hyper-real and dreamlike. The color palette shifts from cold blues to burning magentas as the narrative spirals deeper into its central mystery.

Where "Neon Requiem" truly excels is in its sound design. The film uses silence as a weapon, punctuating long stretches of ambient dread with sudden, visceral audio cues that burrow under your skin. The score, a collaboration between electronic producer KVLT and classical composer Yui Tanaka, is a masterwork of tension and release.

The performances are uniformly excellent. Lead actor Idris Okafor brings a raw vulnerability to the role of Detective Maren, while newcomer Zara Chen delivers a breakout performance as the enigmatic filmmaker at the center of the mystery. Their scenes together crackle with an electric, ambiguous chemistry.

If there's a weakness, it's in the third act, where the narrative's ambitions occasionally outpace its ability to deliver satisfying resolutions. Some plot threads feel deliberately unresolved — a choice that will frustrate viewers seeking neat conclusions but will delight those who appreciate cinema that trusts its audience to fill in the gaps.

"Neon Requiem" is not a film for passive viewing. It demands attention, rewards patience, and lingers in the mind long after the credits roll. It is, without question, one of the most visually and aurally stunning films of 2026.`,
  relatedReviews: [
    { id: "r1", title: "Phantom Thread II", image: heroCinema, rating: 9.2 },
    { id: "r2", title: "Digital Bloom", image: movieBg, rating: 8.9 },
    { id: "r3", title: "The Last Frame", image: heroCinema, rating: 9.0 },
  ],
};

export const trendDetailData = {
  title: "The Rise of Analog Horror on TikTok",
  author: "Maya Chen",
  date: "April 5, 2026",
  readTime: "8 min read",
  category: "Digital Culture",
  image: heroCinema,
  content: `The analog horror genre has undergone a remarkable transformation. What began as a niche subgenre of found-footage horror on YouTube has exploded into a mainstream cultural phenomenon, driven largely by TikTok's algorithm and Gen-Z's insatiable appetite for unsettling, lo-fi content.

## The Origins

Analog horror traces its roots to early 2010s YouTube series like "Local 58" and "The Backrooms." These creators used the aesthetic of degraded VHS tapes, public access television, and educational films to create an atmosphere of creeping dread. The format thrived on the uncanny valley between the familiar and the deeply wrong.

## The TikTok Explosion

When these aesthetics migrated to TikTok in 2024, something unexpected happened. The platform's short-form format, rather than diluting the genre, actually intensified it. Creators discovered that 60-second horror clips, stripped of setup and context, could be profoundly unsettling. The algorithm's tendency to surface unexpected content meant viewers often encountered these videos without warning — a digital equivalent of channel-surfing late at night and stumbling onto something deeply disturbing.

## The Aesthetic Language

What makes analog horror so effective is its visual vocabulary. CRT scan lines, tracking artifacts, washed-out colors, and degraded audio all signal "old media" to the viewer, triggering a complex set of nostalgic associations. But when these familiar textures are paired with subtly wrong content — a children's show host whose smile is too wide, a PSA about a nonexistent emergency, a nature documentary about impossible creatures — the dissonance creates a uniquely potent form of horror.

## The Creator Economy

The rise of analog horror on TikTok has created new career paths for young filmmakers. Creators like @staticdreams (2.4M followers) and @channel_zero_official (1.8M followers) have turned their analog horror accounts into full creative businesses, selling merchandise, licensing content, and landing development deals with streaming platforms.

## What's Next

The genre continues to evolve. Recent trends include "digital horror" — using the aesthetics of early internet, Windows 95 interfaces, and corrupted digital files to create similar feelings of technological unease. As AI-generated content becomes more prevalent, expect to see analog horror creators incorporating — and commenting on — these tools in increasingly sophisticated ways.

The analog horror phenomenon is more than a trend. It's a genuine artistic movement that represents Gen-Z's complex relationship with technology, nostalgia, and the boundaries between the real and the simulated.`,
};
