export type DestinationGallery = {
  title: string;
  blurb: string;
  imageCount: number;
  folder: string;
  accent: string;
  imagePaths: string[];
};

export const destinationGalleries: DestinationGallery[] = [
  {
    title: 'Meghalaya',
    blurb: 'Waterfalls, root bridges, and misty routes.',
    imageCount: 9,
    folder: '/assets/destinations/meghalaya',
    accent: 'Forest + water',
    imagePaths: Array.from({ length: 9 }, (_, index) =>
      `/assets/destinations/meghalaya/meghalaya-${String(index + 1).padStart(2, '0')}.jpeg`
    )
  },
  {
    title: 'Arunachal Pradesh',
    blurb: 'High passes, monasteries, and remote drives.',
    imageCount: 8,
    folder: '/assets/destinations/arunachal-pradesh',
    accent: 'Hills + heritage',
    imagePaths: Array.from({ length: 8 }, (_, index) =>
      `/assets/destinations/arunachal-pradesh/arunachal-${String(index + 1).padStart(2, '0')}.jpeg`
    )
  },
  {
    title: 'Uttar Pradesh',
    blurb: 'Temple routes, city breaks, and heritage walks.',
    imageCount: 8,
    folder: '/assets/destinations/uttar-pradesh',
    accent: 'Culture + family travel',
    imagePaths: Array.from(
      { length: 8 },
      (_, index) => `/assets/destinations/uttar-pradesh/uttar-pradesh-${String(index + 1).padStart(2, '0')}.jpeg`
    )
  }
];