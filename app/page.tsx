import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection, TickerSection, GallerySection, TimelineSection, CalendarStrip, BlogSection, AlumniSection } from "@/components/sections/StatsSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { faqs, testimonials } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <main id="main-content">
        <StatsSection />
        <EventsSection compact />
        <TickerSection />
        <GallerySection />
        <TeamSection compact />
        <TimelineSection />
        <CalendarStrip />
        <BlogSection />
        <TestimonialsSection slides={testimonials} />
        <FaqSection items={faqs} />
        <AlumniSection />
      </main>
    </>
  );
}
