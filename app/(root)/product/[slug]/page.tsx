import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  getProductBySlug,
  getRelatedProducts,
  getLatestProducts,
} from '@/lib/actions/product.actions';
import { notFound } from 'next/navigation';
import ProductPrice from '@/components/shared/product/product-price';
import ProductImages from '@/components/shared/product/product-images';
import AddToCart from '@/components/shared/product/add-to-cart';
import { getMyCart } from '@/lib/actions/cart.actions';
import ReviewList from './review-list';
import { auth } from '@/auth';
import Rating from '@/components/shared/product/rating';
import ProductList from '@/components/shared/product/product-list';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const ProductDetailsPage = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await props.params;

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const session = await auth();
  const userId = session?.user?.id;

  const cart = await getMyCart();

  // 🔹 Try to fetch related products
  let relatedProducts = await getRelatedProducts(
    product.category,
    product.slug,
    5
  );

  // 🔹 If no related products, fetch latest products instead
  if (!relatedProducts || relatedProducts.length === 0) {
    relatedProducts = await getLatestProducts();
  }

  return (
    <>
      <section>
        <div className='grid grid-cols-1 md:grid-cols-5 gap-6'>
          {/* Images Column */}
          <div className='col-span-2'>
            <ProductImages images={product.images} />
          </div>

          {/* Details Column */}
          <div className='col-span-2 p-5'>
            <div className='flex flex-col gap-6'>
              <p className='text-gray-600'>
                {product.brand} {product.category}
              </p>
              <h1 className='h3-bold'>{product.name}</h1>
              <div className='flex items-center gap-2'>
                <Rating value={Number(product.rating)} />
                <p className='text-sm text-gray-500'>
                  {product.numReviews} reviews
                </p>
              </div>
              <ProductPrice
                value={Number(product.price)}
                className='w-fit rounded-full bg-green-100 text-green-700 px-5 py-2'
              />
            </div>
            <div className='mt-8'>
              <p className='font-semibold mb-1'>Description</p>
              <p className='text-gray-700'>{product.description}</p>
            </div>
          </div>

          {/* Action Column */}
          <div>
            <Card>
              <CardContent className='p-4 space-y-3'>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Price</span>
                  <ProductPrice value={Number(product.price)} />
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Status</span>
                  {product.stock > 0 ? (
                    <Badge variant='outline'>In Stock</Badge>
                  ) : (
                    <Badge variant='destructive'>Out Of Stock</Badge>
                  )}
                </div>
                {product.stock > 0 && (
                  <AddToCart
                    cart={cart}
                    item={{
                      productId: product.id,
                      name: product.name,
                      slug: product.slug,
                      price: product.price,
                      qty: 1,
                      image: product.images![0],
                    }}
                  />
                )}
              </CardContent>
            </Card>

            <Button className='w-full mt-3 bg-orange-600 hover:bg-orange-700'>
              <Link href='/search' className='w-full block text-center'>
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className='mt-12'>
        <h2 className='h2-bold mb-5'>Customer Reviews</h2>
        <ReviewList
          userId={userId || ''}
          productId={product.id}
          productSlug={product.slug}
        />
      </section>

      {/* Related or Latest Products */}
      {relatedProducts.length > 0 && (
        <section className='mt-12'>
          <ProductList
            data={relatedProducts}
            title='You may also like'
            limit={5}
          />
        </section>
      )}
    </>
  );
};

export default ProductDetailsPage;
