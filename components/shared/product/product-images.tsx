"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const ProductImages = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);
  return (
    <div className="space-y-4">
      <Image
        src={images[current]}
        alt="product image"
        className="min-h-[300] object-cover object-center"
        width={1000}
        height={1000}
        priority={true}
      />
      <div className="flex">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "border mr-2 cursor-pointer hover:border-orange-600",
              current === index && "border-orange-500"
            )}
          >
            <Image
              src={image}
              alt="image"
              width={100}
              height={100}
              onClick={() => setCurrent(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
