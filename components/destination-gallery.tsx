import Image from 'next/image';
import { destinationGalleries } from '../lib/gallery-data';

export default function DestinationGallery() {
  return (
    <section className="section-wrap gallery-section">
      <div className="section-heading">
        <span className="eyebrow">Gallery</span>
        <h2>All destination photos shown in a clean, responsive grid.</h2>
        <p>
          Each card is mapped to a destination folder and displays the full set of photos in a
          layout that stays readable on desktop and mobile.
        </p>
      </div>

      <div className="gallery-list">
        {destinationGalleries.map((destination) => (
          <article className="gallery-card" key={destination.title}>
            <div className="gallery-card-head">
              <div>
                <span className="card-label">Destination gallery</span>
                <h3>{destination.title}</h3>
                <p>{destination.blurb}</p>
              </div>
              <span className="gallery-count">{destination.imageCount} photos</span>
            </div>

            <div className="gallery-thumbs">
              {destination.imagePaths.map((imagePath) => (
                <div className="gallery-thumb" key={imagePath}>
                  <Image
                    src={imagePath}
                    alt={`${destination.title} destination photo`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 980px) 33vw, 180px"
                  />
                </div>
              ))}
            </div>

            <div className="gallery-meta">
              <span>{destination.accent}</span>
              <span>{destination.folder}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}