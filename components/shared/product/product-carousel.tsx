'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Product } from '@/types';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';

const SLIDE_DELAY = 5000; // 5 seconds per slide

const ProductCarousel = ({ data }: { data: Product[] }) => {
  const autoplay = useRef(
    Autoplay({
      delay: SLIDE_DELAY,
    })
  );

  const [progress, setProgress] = useState(0);

  // progress bar animation (resets each cycle)
  useEffect(() => {
    let start: number | null = null;
    let raf: number;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const percentage = Math.min((elapsed / SLIDE_DELAY) * 100, 100);
      setProgress(percentage);

      if (percentage < 100) {
        raf = requestAnimationFrame(step);
      } else {
        start = null; // reset for next cycle
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className='relative w-full mb-12 overflow-hidden'>
      <Carousel
        className='w-full'
        opts={{
          loop: true,
        }}
        plugins={[autoplay.current]}
      >
        <CarouselContent>
          {data.map((product: Product) => (
            <CarouselItem key={product.id} className='basis-full'>
              <Link href={`/product/${product.slug}`}>
                <div
                  className='
                    relative 
                    w-full 
                    aspect-[16/9]   /* ✅ makes it responsive */
                    sm:aspect-[21/9] 
                    overflow-hidden 
                    rounded-lg
                  '
                >
                  {product.banner ? (
                    <Image
                      src={product.banner}
                      alt={product.name}
                      fill
                      className='object-cover w-full h-full'
                      sizes='100vw'
                      priority
                    />
                  ) : (
                    <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
                      <span className='text-gray-500 text-sm sm:text-base'>
                        No Image
                      </span>
                    </div>
                  )}

                  {/* product name overlay */}
                  <div className='absolute inset-0 flex items-end justify-center'>
                    <h2
                      className='
                        bg-gray-900/60 
                        text-base sm:text-lg md:text-xl lg:text-2xl 
                        font-bold px-2 sm:px-3 py-1 text-white rounded
                        max-w-[90%] text-center truncate
                      '
                    >
                      {product.name}
                    </h2>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className='hidden sm:flex' />
        <CarouselNext className='hidden sm:flex' />
      </Carousel>

      {/* progress bar */}
      <div className='absolute bottom-0 left-0 w-full h-1 bg-gray-300/40'>
        <div
          className='h-full bg-gray-900 transition-all duration-100 linear'
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProductCarousel;
