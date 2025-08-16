import Image from 'next/image';

const images = [
  'https://images.unsplash.com/photo-1556228720-195a672e8a44?auto=format&fit=crop&w=300&q=80', // cosmetics
  'https://images.unsplash.com/photo-1525909002-1e1dfa8faa5c?auto=format&fit=crop&w=300&q=80', // makeup
  'https://images.unsplash.com/photo-1598440947619-2c35fc9aaecb?auto=format&fit=crop&w=300&q=80', // natural products
  'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=300&q=80', // bottles
  'https://images.unsplash.com/photo-1556228578-0d712847d4bb?auto=format&fit=crop&w=300&q=80', // more
  'https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?auto=format&fit=crop&w=300&q=80', // vegan
  // Repeat or add more as needed
];

export default function ProductGallery() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-kbeauty-cream to-kbeauty-pink">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Vegan K-Beauty Highlights</h2>
        <div className="flex gap-8 justify-center">
          {/* Left column: large image + small ones */}
          <div className="flex flex-col gap-4">
            <Image src={images[0]} alt="Vegan cosmetic" width={200} height={200} className="rounded-lg shadow-lg" />
            <Image src={images[1]} alt="Vegan cosmetic" width={100} height={100} className="rounded-lg shadow-lg" />
            <Image src={images[2]} alt="Vegan cosmetic" width={100} height={100} className="rounded-lg shadow-lg" />
            <Image src={images[3]} alt="Vegan cosmetic" width={100} height={100} className="rounded-lg shadow-lg" />
            {/* Add more small images */}
          </div>

          {/* Middle: vertical stack */}
          <div className="flex flex-col gap-4">
            <Image src={images[4]} alt="Vegan cosmetic" width={150} height={150} className="rounded-lg shadow-lg" />
            <Image src={images[5]} alt="Vegan cosmetic" width={150} height={150} className="rounded-lg shadow-lg" />
            <Image src={images[0]} alt="Vegan cosmetic" width={150} height={150} className="rounded-lg shadow-lg" />
            {/* More */}
          </div>

          {/* Right: grid */}
          <div className="grid grid-cols-2 gap-4">
            <Image src={images[1]} alt="Vegan cosmetic" width={100} height={100} className="rounded-lg shadow-lg" />
            <Image src={images[2]} alt="Vegan cosmetic" width={100} height={100} className="rounded-lg shadow-lg" />
            <Image src={images[3]} alt="Vegan cosmetic" width={100} height={100} className="rounded-lg shadow-lg" />
            <Image src={images[4]} alt="Vegan cosmetic" width={100} height={100} className="rounded-lg shadow-lg" />
            {/* More in grid */}
          </div>

          {/* Additional column if needed */}
          <div className="flex flex-col gap-4">
            <Image src={images[5]} alt="Vegan cosmetic" width={120} height={120} className="rounded-lg shadow-lg" />
            <Image src={images[0]} alt="Vegan cosmetic" width={120} height={120} className="rounded-lg shadow-lg" />
            {/* More */}
          </div>
        </div>
      </div>
    </section>
  );
}
