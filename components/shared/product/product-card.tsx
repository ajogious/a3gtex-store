import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import Rating from './rating';

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className='flex flex-col items-start gap-0.5 w-full cursor-pointer'>
      {/* Image Section */}
      <Link href={`/product/${product.slug}`} className='w-full'>
        <div className='cursor-pointer group relative bg-gray-500/10 rounded-lg w-full aspect-[4/5] flex items-center justify-center overflow-hidden'>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes='(max-width: 768px) 100vw, 33vw'
            className='object-cover group-hover:scale-105 transition duration-300'
          />
        </div>
      </Link>

      {/* Product Name */}
      <Link href={`/product/${product.slug}`}>
        <p className='md:text-base font-medium pt-2 w-full'>
          {product.name.split(' ').slice(0, 3).join(' ')}
          {product.name.split(' ').length > 3 && '...'}
        </p>
      </Link>

      {/* Product Description - Hidden on mobile */}
      <p className='w-full text-xs text-gray-500/70 max-sm:hidden'>
        {product.description.split(' ').slice(0, 4).join(' ')}
        {product.description.split(' ').length > 4 && '...'}
      </p>

      {/* Rating Section */}
      <div className='flex items-center gap-2'>
        <p className='text-xs'>{Number(product.rating).toFixed(1)}</p>
        <div className='flex items-center text-xs'>
          <Rating value={Number(product.rating)} />
        </div>
      </div>

      {/* Price and Buy Button */}
      <div className='flex items-end justify-between w-full mt-1'>
        <p className='text-base font-medium'>
          ₦
          {Number(product.price).toLocaleString('en-NG', {
            minimumFractionDigits: 2,
          })}
        </p>
        {product.stock > 0 ? (
          <Link href={`/product/${product.slug}`} className='max-sm:hidden'>
            <button className='px-4 py-1.5 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-50 transition'>
              Buy now
            </button>
          </Link>
        ) : (
          <button
            disabled
            className='px-4 py-1.5 text-red-600 border border-red-600/20 rounded-full text-xs bg-red-50 cursor-not-allowed max-sm:hidden'
          >
            Out of Stock
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
