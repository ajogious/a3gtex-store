import ProductCard from './product-card';
import { Product } from '@/types';

const ProductList = ({
  data,
  title,
  limit,
}: {
  data: Product[];
  title?: string;
  limit?: number;
}) => {
  const limitedData = limit ? data.slice(0, limit) : data;

  return (
    <div>
      {title && <h2 className='h2-bold mb-4'>{title}</h2>}

      {data.length > 0 ? (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full'>
          {limitedData.map((product: Product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div>
          <p>No products found</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
