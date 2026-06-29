'use client';

import { useEffect, useState } from 'react';
import { feedbackImagesBucket, hasSupabaseConfig, supabase } from '../lib/supabase';

type FeedbackEntry = {
  id: string;
  name: string;
  destination: string;
  rating: number;
  review: string;
  createdAt: string;
  images: string[];
};

type FormState = {
  name: string;
  destination: string;
  rating: number;
  review: string;
  previewImages: string[];
  files: File[];
};

type FeedbackRecord = FeedbackEntry & {
  created_at?: string;
};

const storageKey = 'romify-feedback';

const initialForm: FormState = {
  name: '',
  destination: 'Meghalaya',
  rating: 5,
  review: '',
  previewImages: [],
  files: []
};

function normalizeFeedback(record: FeedbackRecord): FeedbackEntry {
  return {
    id: record.id,
    name: record.name,
    destination: record.destination,
    rating: record.rating,
    review: record.review,
    createdAt: record.created_at ? new Date(record.created_at).toLocaleDateString() : new Date().toLocaleDateString(),
    images: record.images ?? []
  };
}

function ratingLabel(rating: number) {
  if (rating >= 5) return 'Excellent';
  if (rating === 4) return 'Very good';
  if (rating === 3) return 'Good';
  if (rating === 2) return 'Okay';
  return 'Needs attention';
}

function toDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Unable to read file'));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error('Unable to load image'));
      image.onload = () => {
        const maxSize = 1200;
        const ratio = Math.min(maxSize / image.width, maxSize / image.height, 1);
        const width = Math.round(image.width * ratio);
        const height = Math.round(image.height * ratio);
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d');
        if (!context) {
          reject(new Error('Canvas not available'));
          return;
        }
        context.drawImage(image, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      image.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

export default function FeedbackBoard() {
  const [entries, setEntries] = useState<FeedbackEntry[]>([]);
  const [form, setForm] = useState<FormState>(initialForm);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let active = true;

    async function loadEntries() {
      if (!supabase) {
        const stored = window.localStorage.getItem(storageKey);
        if (stored) {
          try {
            const parsed = JSON.parse(stored) as FeedbackEntry[];
            if (active) setEntries(parsed);
          } catch {
            window.localStorage.removeItem(storageKey);
          }
        }
        return;
      }

      const { data, error } = await supabase
        .from('feedback_entries')
        .select('id,name,destination,rating,review,images,created_at')
        .order('created_at', { ascending: false })
        .limit(20);

      if (!active || error || !data) return;

      setEntries(data.map((record) => normalizeFeedback(record as FeedbackRecord)));
    }

    loadEntries();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (supabase) return;
    window.localStorage.setItem(storageKey, JSON.stringify(entries));
  }, [entries]);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []).slice(0, 3);
    const previewImages = [] as string[];
    for (const file of files) {
      if (!file.type.startsWith('image/')) continue;
      previewImages.push(await toDataUrl(file));
    }
    setForm((current) => ({ ...current, previewImages, files }));
  }

  async function uploadFeedbackImages(files: File[]) {
    if (!supabase) return [];

    const uploadedImages: string[] = [];

    for (const file of files) {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const filePath = `feedback/${crypto.randomUUID()}-${safeName}`;

      const { error: uploadError } = await supabase.storage
        .from(feedbackImagesBucket)
        .upload(filePath, file, {
          contentType: file.type,
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from(feedbackImagesBucket).getPublicUrl(filePath);
      uploadedImages.push(data.publicUrl);
    }

    return uploadedImages;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage('');

    if (!form.name.trim() || !form.review.trim()) {
      setErrorMessage('Please add your name and a short review.');
      return;
    }

    setIsSaving(true);
    try {
      const storedImages = supabase ? await uploadFeedbackImages(form.files) : form.previewImages;
      const entry: FeedbackEntry = {
        id: crypto.randomUUID(),
        name: form.name.trim(),
        destination: form.destination,
        rating: form.rating,
        review: form.review.trim(),
        createdAt: new Date().toLocaleDateString(),
        images: storedImages
      };

      setEntries((current) => [entry, ...current]);

      if (supabase && hasSupabaseConfig) {
        const { error } = await supabase.from('feedback_entries').insert({
          name: entry.name,
          destination: entry.destination,
          rating: entry.rating,
          review: entry.review,
          images: entry.images
        });

        if (error) {
          throw error;
        }
      }

      setForm(initialForm);
      event.currentTarget.reset();
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="feedback-grid">
      <form className="feedback-form card-surface" onSubmit={handleSubmit}>
        <div className="form-row two-up">
          <label>
            Your name
            <input
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              placeholder="Enter your name"
            />
          </label>

          <label>
            Destination
            <select
              value={form.destination}
              onChange={(event) =>
                setForm((current) => ({ ...current, destination: event.target.value }))
              }
            >
              <option>Meghalaya</option>
              <option>Arunachal Pradesh</option>
              <option>Uttar Pradesh</option>
            </select>
          </label>
        </div>

        <div className="form-row rating-row">
          <span>Rating</span>
          <div className="rating-buttons" role="radiogroup" aria-label="Rating">
            {[5, 4, 3, 2, 1].map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={value === form.rating}
                className={value === form.rating ? 'rating-button active' : 'rating-button'}
                onClick={() => setForm((current) => ({ ...current, rating: value }))}
              >
                {value}
              </button>
            ))}
          </div>
          <p className="rating-note">Selected: {form.rating}/5 {ratingLabel(form.rating)}</p>
        </div>

        <label>
          Your review
          <textarea
            value={form.review}
            onChange={(event) => setForm((current) => ({ ...current, review: event.target.value }))}
            placeholder="Share what worked well, the route quality, and the overall service."
            rows={5}
          />
        </label>

        <label>
          Upload pictures
          <input type="file" accept="image/*" multiple onChange={handleFileChange} />
        </label>

        {form.previewImages.length > 0 ? (
          <div className="preview-grid">
            {form.previewImages.map((image) => (
              <img key={image} src={image} alt="Upload preview" />
            ))}
          </div>
        ) : null}

        {errorMessage ? <p className="error-text">{errorMessage}</p> : null}

        <button className="button button-primary submit-button" type="submit" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Submit review'}
        </button>
      </form>

      <div className="testimonials-column">
        <div className="testimonials-header card-surface">
          <strong>Traveler reviews</strong>
          <p>{entries.length} customer notes submitted from this browser.</p>
        </div>

        <div className="testimonials-list">
          {entries.length === 0 ? (
            <div className="card-surface empty-state">
              <p>No reviews yet.</p>
              <span>Be the first traveler to leave a rating and upload a memory.</span>
            </div>
          ) : (
            entries.map((entry) => (
              <article className="testimonial-card card-surface" key={entry.id}>
                <div className="testimonial-head">
                  <div>
                    <strong>{entry.name}</strong>
                    <p>{entry.destination}</p>
                  </div>
                  <span>{entry.rating}/5</span>
                </div>
                <div className="star-row" aria-label={`${entry.rating} out of 5 stars`}>
                  {'★★★★★'.split('').map((star, index) => (
                    <span
                      key={`${entry.id}-${index}`}
                      className={index < entry.rating ? 'star active' : 'star'}
                    >
                      {star}
                    </span>
                  ))}
                </div>
                <p>{entry.review}</p>
                {entry.images.length > 0 ? (
                  <div className="preview-grid compact">
                    {entry.images.map((image) => (
                      <img key={image} src={image} alt="Traveler upload" />
                    ))}
                  </div>
                ) : null}
                <span className="entry-date">{entry.createdAt}</span>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}