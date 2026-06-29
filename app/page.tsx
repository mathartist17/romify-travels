import Image from 'next/image';
import FeedbackBoard from '../components/feedback-board';
import DestinationGallery from '../components/destination-gallery';
import SiteFooter from '../components/site-footer';
import SiteHeader from '../components/site-header';

const destinations = [
  {
    title: 'Meghalaya',
    text: 'Curated routes for waterfalls, living root bridges, and scenic stays with local support.'
  },
  {
    title: 'Arunachal Pradesh',
    text: 'Highland itineraries, monastery visits, and route planning for remote travel days.'
  },
  {
    title: 'Uttar Pradesh',
    text: 'Temple circuits, heritage walks, and practical planning for family and group travel.'
  }
];

const servicePoints = [
  'Itinerary design for couples, families, and groups',
  'Hotel, transfer, and sightseeing coordination',
  'Direct WhatsApp support before and during travel'
];

const serviceCards = [
  {
    title: 'Tour planning',
    text: 'Routes, pacing, and trip structure built around your dates, group size, and travel style.'
  },
  {
    title: 'Travel coordination',
    text: 'Hotels, transfers, and sightseeing support arranged with one point of contact.'
  },
  {
    title: 'Trip support',
    text: 'Traveler communication, review collection, and trip-day assistance from one team.'
  }
];

const contactNumbers = ['+91 81155 75830', '+91 81288 17889'];

export default function HomePage() {
  return (
    <main className="page-shell" id="top">
      <SiteHeader />

      <section className="hero section-wrap">
        <div className="hero-copy">
          <span className="eyebrow">Romify Travels | Travel startup</span>
          <h1>Trips to Meghalaya, Arunachal Pradesh, and Uttar Pradesh, planned with care.</h1>
          <p className="lead">
            A travel website with clear routes, straightforward support, and real traveler reviews.
            Built for people who want scenic trips without complicated planning.
          </p>

          <div className="cta-row">
            <a className="button button-primary" href="tel:+918115575830">
              Call now
            </a>
            <a
              className="button button-secondary"
              href="https://wa.me/918115575830"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </div>

          <div className="hero-pills" aria-label="Travel benefits">
            {servicePoints.map((point) => (
              <span key={point} className="hero-pill">
                {point}
              </span>
            ))}
          </div>
        </div>

        <aside className="hero-card">
          <div className="hero-card-top">
            <div className="brand-badge">
              <div className="brand-mark">
                <Image
                  src="/assets/brand/IMG_3711.PNG"
                  alt="Romify Travels logo"
                  fill
                  sizes="72px"
                  priority
                />
              </div>
              <div>
                <p className="card-label">Brand</p>
                <h2>Romify Travels</h2>
              </div>
            </div>

            <div className="hero-copy-card">
              <p className="card-label">Office</p>
              <h3>N9/61-3-1 Chhoti Patiya, Bajardiha, Varanasi 221109</h3>
              <p>Support for Meghalaya, Arunachal Pradesh, and Uttar Pradesh trip planning.</p>
            </div>
          </div>

          <div className="hero-image-grid">
            <div className="hero-image hero-image-large">
              <Image
                src="/assets/destinations/meghalaya/meghalaya-01.jpeg"
                alt="Meghalaya landscape"
                fill
                priority
                sizes="(max-width: 980px) 100vw, 420px"
              />
            </div>
            <div className="hero-image hero-image-small">
              <Image
                src="/assets/destinations/arunachal-pradesh/arunachal-01.jpeg"
                alt="Arunachal Pradesh landscape"
                fill
                sizes="(max-width: 980px) 100vw, 200px"
              />
            </div>
            <div className="hero-image hero-image-small">
              <Image
                src="/assets/destinations/uttar-pradesh/uttar-pradesh-01.jpeg"
                alt="Uttar Pradesh travel scene"
                fill
                sizes="(max-width: 980px) 100vw, 200px"
              />
            </div>
          </div>

          <div className="metrics-grid">
            <div>
              <strong>3</strong>
              <span>core destinations</span>
            </div>
            <div>
              <strong>25</strong>
              <span>curated images</span>
            </div>
            <div>
              <strong>Live</strong>
              <span>feedback board</span>
            </div>
          </div>
        </aside>
      </section>

      <section className="section-wrap section-grid" id="destinations">
        <div className="section-heading">
          <span className="eyebrow">Destinations</span>
          <h2>Destination routes kept simple, scenic, and easy to compare.</h2>
          <p>
            Each destination is summarized in a short card so visitors can quickly understand the
            route, travel style, and kind of experience they can expect.
          </p>
        </div>

        <div className="destination-grid">
          {destinations.map((destination) => (
            <article className="destination-card" key={destination.title}>
              <span className="destination-mark" />
              <h3>{destination.title}</h3>
              <p>{destination.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-wrap gallery-strip" id="services">
        <div className="section-heading compact">
          <span className="eyebrow">Services</span>
          <h2>Travel services arranged around how people actually book trips.</h2>
          <p>
            This section keeps the offer clear: planning, coordination, and on-trip support,
            without adding clutter or heavy marketing copy.
          </p>
        </div>

        <div className="folder-grid">
          {serviceCards.map((service) => (
            <div className="folder-card" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-wrap gallery-strip" id="gallery">
        <div className="section-heading compact">
          <span className="eyebrow">Media library</span>
          <h2>Travel photos organized so the homepage stays clean and fast.</h2>
          <p>
            The image folders are structured so new photos can be swapped in without changing the
            layout or slowing down the homepage.
          </p>
        </div>

        <div className="folder-grid">
          <div className="folder-card">
            <h3>Brand</h3>
            <p>Logo and mark live in the brand folder for consistent identity.</p>
          </div>
          <div className="folder-card">
            <h3>Destination photos</h3>
            <p>Meghalaya, Arunachal Pradesh, and Uttar Pradesh are split cleanly.</p>
          </div>
          <div className="folder-card">
            <h3>Customer stories</h3>
            <p>Reviews and traveler uploads are collected in one feedback flow.</p>
          </div>
        </div>
      </section>

      <DestinationGallery />

      <section className="section-wrap feedback-section" id="feedback">
        <div className="section-heading">
          <span className="eyebrow">Feedback</span>
          <h2>Traveler ratings and reviews shown in one trusted place.</h2>
          <p>
            Customers can submit a rating, write a short review, and upload travel photos in one
            consistent form.
          </p>
        </div>

        <FeedbackBoard />
      </section>

      <SiteFooter />
    </main>
  );
}