// src/components/IconGrid.tsx

import { SmartImage } from './SmartImage';
import { MappedImage } from '../types/image-mapping';

interface IconGridProps {
  icons: MappedImage[];
  columns: 4 | 5;
  labels?: string[];
  className?: string;
  onIconClick?: (index: number) => void;
}

export function IconGrid({
  icons,
  columns,
  labels = [],
  className = '',
  onIconClick,
}: IconGridProps) {
  const gridCols = columns === 4 ? 'grid-cols-4' : 'grid-cols-5';

  return (
    <div className={`grid ${gridCols} gap-4 ${className}`}>
      {icons.map((icon, index) => (
        <div
          key={icon.id}
          className={`flex flex-col items-center ${onIconClick ? 'cursor-pointer active:opacity-60 transition-opacity' : ''}`}
          onClick={() => onIconClick?.(index)}
        >
          <SmartImage
            src={icon.src}
            alt={icon.alt}
            width={icon.displayConfig.width}
            height={icon.displayConfig.height}
            fit={icon.displayConfig.fit}
            lazy={index >= columns}
          />
          {labels[index] && (
            <span className="text-xs text-gray-700 mt-2 text-center">
              {labels[index]}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
