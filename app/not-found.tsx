'use client';
import { APP_NAME } from '@/lib/constants';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-8'>
      {/* Logo */}
      <div className='mb-6 sm:mb-8'>
        <Image
          src='/images/logo.svg'
          width={48}
          height={48}
          alt={`${APP_NAME} logo`}
          priority={true}
          className='w-10 h-10 sm:w-12 sm:h-12'
        />
      </div>

      {/* Content Card */}
      <div
        className='w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 
                     p-6 sm:p-8 md:p-10 
                     rounded-lg shadow-md 
                     bg-background/95 backdrop-blur-sm 
                     border border-border/50 
                     text-center 
                     transition-all duration-300 
                     hover:shadow-lg'
      >
        {/* Error Illustration/Icon (Optional) */}
        <div className='mb-4 sm:mb-6 flex justify-center'>
          <div className='w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-muted flex items-center justify-center'>
            <span className='text-2xl sm:text-3xl font-bold text-muted-foreground'>
              404
            </span>
          </div>
        </div>

        {/* Heading */}
        <h1 className='text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-foreground'>
          Page Not Found
        </h1>

        {/* Description */}
        <p className='text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed'>
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It
          might have been moved, deleted, or you entered an incorrect URL.
        </p>

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center'>
          <Button asChild className='w-full sm:w-auto min-w-32'>
            <Link href='/'>
              <span className='flex items-center gap-2'>
                <svg
                  className='w-4 h-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                  />
                </svg>
                Back to Home
              </span>
            </Link>
          </Button>

          <Button
            variant='outline'
            asChild
            className='w-full sm:w-auto min-w-32'
          >
            <Link href='/contact'>
              <span className='flex items-center gap-2'>
                <svg
                  className='w-4 h-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                  />
                </svg>
                Contact Support
              </span>
            </Link>
          </Button>
        </div>

        {/* Additional Help Text */}
        <p className='text-xs text-muted-foreground/70 mt-6 sm:mt-8'>
          If you believe this is an error, please{' '}
          <Link href='/contact' className='text-primary hover:underline'>
            contact our support team
          </Link>
        </p>
      </div>

      {/* Background Pattern (Optional) */}
      <div className='absolute inset-0 -z-10 overflow-hidden'>
        <div className='absolute -top-40 -right-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl'></div>
        <div className='absolute -bottom-40 -left-32 w-80 h-80 bg-secondary/5 rounded-full blur-3xl'></div>
      </div>
    </div>
  );
};

export default NotFoundPage;
