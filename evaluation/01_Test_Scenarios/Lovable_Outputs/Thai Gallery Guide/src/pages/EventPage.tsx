import { useState } from "react";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import hero3 from "@/assets/hero-3.jpg";
import artwork1 from "@/assets/artwork-1.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork3 from "@/assets/artwork-3.jpg";
import hero2 from "@/assets/hero-2.jpg";

const upcomingEvents = [
  { title: "Whispers of Siam", venue: "BACC, Bangkok", dateRange: "May 12 — Jul 20, 2026", status: "Opening Soon", image: artwork1 },
  { title: "Sculptural Dialogues", venue: "MOCA Bangkok", dateRange: "Jun 1 — Aug 15, 2026", status: "Upcoming", image: artwork2 },
  { title: "Tropical Impressions", venue: "Chiang Mai Art Museum", dateRange: "Jul 10 — Sep 5, 2026", status: "Upcoming", image: artwork3 },
  { title: "New Horizons", venue: "Jim Thompson Art Center", dateRange: "Aug 20 — Oct 30, 2026", status: "Upcoming", image: hero2 },
];

const pastEvents = [
  { title: "Eternal Silk", venue: "National Gallery Bangkok", date: "Jan — Mar 2026" },
  { title: "Digital Dharma", venue: "BACC", date: "Nov 2025 — Jan 2026" },
  { title: "Ceramic Traditions", venue: "Chiang Rai Art Museum", date: "Sep — Nov 2025" },
];

const calendarMonths = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"];

const EventPage = () => {
  const [rsvpOpen, setRsvpOpen] = useState(false);

  useDocumentTitle({
    title: "Events & Exhibitions",
    description: "Discover upcoming art exhibitions, gallery openings, and cultural events across Thailand.",
  });

  return (
    <main id="main-content" className="pt-20">
      {/* Featured Event Banner */}
      <section className="relative h-[70vh] overflow-hidden" aria-labelledby="featured-event-heading">
        <img src={hero3} alt="Sacred Narratives exhibition at National Museum Bangkok" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 pb-16">
            <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs tracking-[0.2em] uppercase mb-4">
              Featured Exhibition
            </span>
            <h1 id="featured-event-heading" className="font-heading text-5xl lg:text-7xl text-primary-foreground mb-2">
              Sacred Narratives
            </h1>
            <p className="text-primary-foreground/70 text-lg">
              National Museum Bangkok · Opening May 2026
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24" aria-labelledby="upcoming-heading">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Schedule</p>
        <h2 id="upcoming-heading" className="font-heading text-4xl lg:text-5xl mb-12">Upcoming Exhibitions</h2>
        <div className="space-y-0 border-t border-border">
          {upcomingEvents.map((event) => (
            <article key={event.title} className="gallery-card grid grid-cols-1 md:grid-cols-[200px_1fr_auto] gap-6 items-center py-8 border-b border-border">
              <div className="aspect-[3/2] overflow-hidden">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" loading="lazy" width={200} height={133} />
              </div>
              <div>
                <h3 className="font-heading text-2xl">{event.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{event.venue}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  <time>{event.dateRange}</time>
                </p>
              </div>
              <span className="text-xs tracking-[0.15em] uppercase text-primary" aria-label={`Status: ${event.status}`}>{event.status}</span>
            </article>
          ))}
        </div>
      </section>

      {/* Calendar View */}
      <section className="bg-secondary py-24" aria-labelledby="calendar-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 id="calendar-heading" className="font-heading text-4xl mb-12">Exhibition Calendar</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4" role="list">
            {calendarMonths.map((month) => (
              <div key={month} className="bg-card p-6 text-center" role="listitem">
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">{month}</p>
                <p className="font-heading text-3xl">2026</p>
                <div className="gallery-divider mt-4" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24" aria-labelledby="rsvp-heading">
        <div className="max-w-2xl">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Exclusive</p>
          <h2 id="rsvp-heading" className="font-heading text-4xl mb-4">Private Viewing</h2>
          <p className="text-muted-foreground mb-8">
            Request an invitation to private exhibition openings and collector previews.
          </p>
          {!rsvpOpen ? (
            <button
              onClick={() => setRsvpOpen(true)}
              className="px-8 py-3 bg-primary text-primary-foreground text-xs tracking-[0.2em] uppercase hover:bg-primary/90 transition-colors focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              Request Invitation
            </button>
          ) : (
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()} aria-label="RSVP form for private viewing">
              <div>
                <label htmlFor="rsvp-name" className="sr-only">Full Name</label>
                <input id="rsvp-name" required autoComplete="name" className="w-full px-4 py-3 bg-secondary text-foreground text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary" placeholder="Full Name" />
              </div>
              <div>
                <label htmlFor="rsvp-email" className="sr-only">Email</label>
                <input id="rsvp-email" required type="email" autoComplete="email" className="w-full px-4 py-3 bg-secondary text-foreground text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary" placeholder="Email" />
              </div>
              <div>
                <label htmlFor="rsvp-exhibition" className="sr-only">Preferred Exhibition</label>
                <input id="rsvp-exhibition" className="w-full px-4 py-3 bg-secondary text-foreground text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary" placeholder="Preferred Exhibition" />
              </div>
              <button type="submit" className="px-8 py-3 bg-primary text-primary-foreground text-xs tracking-[0.2em] uppercase hover:bg-primary/90 transition-colors focus:ring-2 focus:ring-ring focus:ring-offset-2">
                Submit RSVP
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Past Exhibitions */}
      <section className="border-t border-border" aria-labelledby="past-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Archive</p>
          <h2 id="past-heading" className="font-heading text-4xl mb-12">Past Exhibitions</h2>
          <div className="space-y-0 border-t border-border">
            {pastEvents.map((event) => (
              <div key={event.title} className="flex justify-between items-baseline py-6 border-b border-border">
                <div>
                  <h3 className="font-heading text-xl">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">{event.venue}</p>
                </div>
                <p className="text-xs text-muted-foreground"><time>{event.date}</time></p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default EventPage;
