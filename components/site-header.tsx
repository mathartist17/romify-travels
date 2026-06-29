import Image from 'next/image';

const navItems = [
  { label: 'Destinations', href: '#destinations' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Feedback', href: '#feedback' },
  { label: 'Contact', href: '#contact' }
];

export default function SiteHeader() {
  return (
    <header className="site-header">
      <a className="site-brand" href="#top" aria-label="Romify Travels home">
        <span className="site-brand-mark">
          <Image
            src="/assets/brand/IMG_3711.PNG"
            alt="Romify Travels logo"
            fill
            sizes="44px"
            priority
          />
        </span>
        <span>
          <strong>Romify Travels</strong>
          <span>Tour planning and local coordination</span>
        </span>
      </a>

      <nav className="site-nav" aria-label="Primary">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <a className="button button-secondary site-header-action" href="tel:+918115575830">
        Book a call
      </a>
    </header>
  );
}