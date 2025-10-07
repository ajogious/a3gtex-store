'use client';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Expects these image files in:
 * public/images/deals-products/
 * - deal-1.png
 * - deal-2.png
 * - deal-3.png
 * - deal-4.png
 * - deal-5.png
 * - redirect_icon.svg (for the button icon)
 */
const DealCountdown = () => {
  return (
    <div className='my-20'>
      <div className='flex flex-col items-center'>
        <p className='text-3xl font-medium'>Featured Products</p>
        <div className='w-28 h-0.5 bg-orange-600 mt-2'></div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14 mt-12 md:px-14 px-4'>
        <DealCard
          image='/images/deals-products/deal-1.png'
          title='Unparalleled Sound'
          description='Experience crystal-clear audio with premium headphones.'
          link='/search'
        />
        <DealCard
          image='/images/deals-products/deal-2.png'
          title='Stay Connected'
          description='Compact and stylish earphones for every occasion.'
          link='/search'
        />
        <DealCard
          image='/images/deals-products/deal-3.png'
          title='Power in Every Pixel'
          description='Shop the latest laptops for work, gaming, and more.'
          link='/search'
        />
      </div>

      {/* Wide banner with gaming section */}
      <div
        className='bg-gradient-to-r from-purple-100 to-blue-50 rounded-lg 
                p-6 md:p-8 mt-12 flex flex-col md:flex-row items-center gap-6 
                relative overflow-hidden min-h-[300px] md:min-h-[350px]'
      >
        {/* Left image - Speaker */}
        <div className='relative w-40 h-40 md:absolute md:left-6 md:top-1/2 md:-translate-y-1/2 md:w-56 md:h-56 lg:w-64 lg:h-64 z-10 mx-auto md:mx-0'>
          <Image
            src='/images/deals-products/deal-4.png'
            alt='Gaming speaker'
            fill
            className='object-contain'
          />
        </div>

        {/* Center content */}
        <div className='flex-1 text-center z-20 px-6 md:px-20 lg:px-24'>
          <h3 className='text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3'>
            Level Up Your
          </h3>
          <h3 className='text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4'>
            Gaming Experience
          </h3>
          <p className='text-gray-600 mb-6 max-w-md mx-auto'>
            From immersive sound to precise controls - everything you need to
            win.
          </p>
          <button className='flex items-center gap-1.5 bg-orange-600 px-4 py-2 rounded text-white mx-auto'>
            <Link href='/search'>Buy now</Link>
            <Image
              alt='Redirect Icon'
              width={14}
              height={14}
              className='h-3 w-3'
              src='/images/deals-products/arrow_icon_white.svg'
            />
          </button>
        </div>

        {/* Right image - Gaming Controller */}
        <div className='relative w-48 h-48 md:absolute md:right-6 md:top-1/2 md:-translate-y-1/2 md:w-72 md:h-72 z-10 mx-auto md:mx-0 mt-6 md:mt-0'>
          <Image
            src='/images/deals-products/deal-5.png'
            alt='White gaming controller'
            fill
            className='object-contain'
          />
        </div>
      </div>
    </div>
  );
};

const DealCard = ({
  image,
  title,
  description,
  link,
}: {
  image: string;
  title: string;
  description: string;
  link: string;
}) => {
  return (
    <div className='relative group'>
      <Image
        alt={title}
        width='1020'
        height='1284'
        className='group-hover:brightness-75 transition duration-300 w-full h-auto object-cover'
        src={image}
      />
      <div className='group-hover:-translate-y-4 transition duration-300 absolute bottom-8 left-8 text-white space-y-2'>
        <p className='font-medium text-xl lg:text-2xl'>{title}</p>
        <p className='text-sm lg:text-base leading-5 max-w-60'>{description}</p>
        <button className='flex items-center gap-1.5 bg-orange-600 px-4 py-2 rounded'>
          <Link href={link}>Buy now</Link>
          <Image
            alt='Redirect Icon'
            width='14'
            height='14'
            className='h-3 w-3'
            src='/images/deals-products/redirect_icon.svg'
          />
        </button>
      </div>
    </div>
  );
};

export default DealCountdown;
