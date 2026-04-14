// src/components/ImageSlider.tsx

import { useState, useEffect, useCallback } from 'react';
import { SmartImage } from './SmartImage';
import { MappedImage } from '../types/image-mapping';

interface ImageSliderProps {
  images: MappedImage[];
  autoplay?: boolean;
  interval?: number;
  height?: string;
  className?: string;
}

export function ImageSlider({
  images,
  autoplay = true,
  interval = 3000,
  height = '150px',
  className = '',
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  // 自动播放
  useEffect(() => {
    if (!autoplay || images.length <= 1) return;

    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [autoplay, interval, nextSlide, images.length]);

  if (!images || images.length === 0) {
    return (
      <div
        className={`bg-gray-200 rounded-xl ${className}`}
        style={{ height }}
      />
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`} style={{ height }}>
      {/* 图片容器 */}
      <div
        className="flex transition-transform duration-500 ease-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image) => (
          <div key={image.id} className="w-full h-full flex-shrink-0">
            <SmartImage
              src={image.src}
              alt={image.alt}
              width="100%"
              height="100%"
              fit={image.displayConfig.fit}
              borderRadius={image.displayConfig.borderRadius}
              lazy={false}
            />
          </div>
        ))}
      </div>

      {/* 指示器 */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
