/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductCard from "./product-card";

const ProductList = ({
  data,
  title,
  limit,
}: {
  data: any;
  title?: string;
  limit?: number;
}) => {
  const limitedData = limit ? data.slice(0, limit) : data;

  return (
    <div className="my-10">
      <h2 className="h2-bold mb-4">{title}</h2>
      {data.length > 0 ? (
        <div
          className="
          grid gap-6
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          justify-items-center
        "
        >
          {limitedData.map((product: any) => (
            <ProductCard
              key={product.slug}
              product={product}
              // Example: constrain card width for cleaner centering
              className="w-full max-w-xs"
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <p>No products found</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
