import { Navigation } from './components/layout/Navigation'
import { Hero } from './components/hero/Hero'
import { CoupleSection } from './components/couple/CoupleSection'
import { StorySection } from './components/story/StorySection'
import { EventsSection } from './components/events/EventsSection'
import { VenueSection } from './components/venue/VenueSection'
import { GallerySection } from './components/gallery/GallerySection'
import { RSVPSection } from './components/rsvp/RSVPSection'
import { ClosingSection } from './components/closing/ClosingSection'

export default function App() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <CoupleSection />
      <StorySection />
      <EventsSection />
      <VenueSection />
      <GallerySection />
      <RSVPSection />
      <ClosingSection />
    </main>
  )
}