// src/components/SmartImage.tsx

import { useState, useRef, useEffect } from 'react';

interface SmartImageProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  fit?: 'cover' | 'contain' | 'fill';
  borderRadius?: string;
  lazy?: boolean;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function SmartImage({
  src,
  alt,
  width = '100%',
  height = '100%',
  fit = 'cover',
  borderRadius,
  lazy = true,
  className = '',
  onLoad,
  onError,
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(!lazy);
  const containerRef = useRef<HTMLDivElement>(null);

  // 懒加载
  useEffect(() => {
    if (!lazy || shouldLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy]);

  // 加载图片
  useEffect(() => {
    if (!shouldLoad || !src) return;

    const img = new Image();
    img.onload = () => {
      setLoaded(true);
      onLoad?.();
    };
    img.onerror = () => {
      setError(true);
      onError?.();
    };
    img.src = src;
  }, [shouldLoad, src, onLoad, onError]);

  const fitClasses = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
  };

  if (error) {
    return (
      <div
        ref={containerRef}
        className={`flex items-center justify-center bg-gray-100 ${className}`}
        style={{ width, height, borderRadius }}
      >
        <span className="text-gray-400 text-xs">加载失败</span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height, borderRadius }}
    >
      {/* 占位符 */}
      {!loaded && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ borderRadius }}
        />
      )}

      {/* 图片 */}
      {shouldLoad && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${fitClasses[fit]}`}
          style={{ borderRadius }}
        />
      )}
    </div>
  );
}
