export default function NotFound() {
  return (
    <main className="page-shell">
      <section className="section-heading" style={{ textAlign: 'center' }}>
        <span className="eyebrow">Romify Travels</span>
        <h1>Page not found</h1>
        <p>
          The page you are looking for does not exist. Return to the home page to browse travel
          destinations, galleries, and traveler reviews.
        </p>
        <a className="button button-primary" href="/">
          Go home
        </a>
      </section>
    </main>
  );
}