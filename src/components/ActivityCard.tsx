// src/components/ActivityCard.tsx

import { SmartImage } from './SmartImage';
import { MappedImage } from '../types/image-mapping';

interface ActivityCardProps {
  image: MappedImage;
  className?: string;
}

export function ActivityCard({ image, className = '' }: ActivityCardProps) {
  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <SmartImage
        src={image.src}
        alt={image.alt}
        width="100%"
        height="100px"
        fit={image.displayConfig.fit}
        borderRadius={image.displayConfig.borderRadius}
      />
    </div>
  );
}

interface ActivityGridProps {
  images: MappedImage[];
  className?: string;
}

export function ActivityGrid({ images, className = '' }: ActivityGridProps) {
  return (
    <div className={`grid grid-cols-2 gap-3 ${className}`}>
      {images.map((image) => (
        <ActivityCard key={image.id} image={image} />
      ))}
    </div>
  );
}
