'use server';
import { prisma } from '@/db/prisma';
import { convertToPlainObject, formatError } from '../utils';
import { LATEST_PRODUCTS_LIMIT, PAGE_SIZE } from '../constants';
import { revalidatePath } from 'next/cache';
import { insertProductSchema, updateProductSchema } from '../validators';
import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { UTApi } from 'uploadthing/server';

const utapi = new UTApi();

// Get latest products
export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: 'desc' },
  });

  return convertToPlainObject(data);
}

// Get single product by it's slug
export async function getProductBySlug(slug: string) {
  return await prisma.product.findFirst({
    where: { slug: slug },
  });
}

// Get single product by it's ID
export async function getProductById(productId: string) {
  const data = await prisma.product.findFirst({
    where: { id: productId },
  });

  return convertToPlainObject(data);
}

// Get all products
export async function getAllProducts({
  query,
  limit = PAGE_SIZE,
  page,
  category,
  price,
  rating,
  sort,
}: {
  query: string;
  limit?: number;
  page: number;
  category?: string;
  price?: string;
  rating?: string;
  sort?: string;
}) {
  // Query filter
  const queryFilter: Prisma.ProductWhereInput =
    query && query !== 'all'
      ? {
          name: {
            contains: query,
            mode: 'insensitive',
          } as Prisma.StringFilter,
        }
      : {};

  // Category filter
  const categoryFilter = category && category !== 'all' ? { category } : {};

  // Price filter
  const priceFilter: Prisma.ProductWhereInput =
    price && price !== 'all'
      ? {
          price: {
            gte: Number(price.split('-')[0]),
            lte: Number(price.split('-')[1]),
          },
        }
      : {};

  // Rating filter
  const ratingFilter =
    rating && rating !== 'all'
      ? {
          rating: {
            gte: Number(rating),
          },
        }
      : {};

  const data = await prisma.product.findMany({
    where: {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    },
    orderBy:
      sort === 'lowest'
        ? { price: 'asc' }
        : sort === 'highest'
          ? { price: 'desc' }
          : sort === 'rating'
            ? { rating: 'desc' }
            : { createdAt: 'desc' },
    skip: (page - 1) * limit,
    take: limit,
  });

  const dataCount = await prisma.product.count();

  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  };
}

// Delete a product
export async function deleteProduct(id: string) {
  try {
    const productExists = await prisma.product.findFirst({
      where: { id },
      select: { images: true },
    });

    if (!productExists) throw new Error('Product not found');

    // 🗑️ Delete product from DB first
    await prisma.product.delete({ where: { id } });

    // 🔑 Extract file keys from UploadThing URLs
    const fileKeys = productExists.images
      .map((url) => url.split('/').pop())
      .filter(Boolean) as string[];

    // 🗑️ Delete from UploadThing (non-blocking)
    if (fileKeys.length > 0) {
      try {
        await utapi.deleteFiles(fileKeys);
      } catch (err) {
        console.error('⚠️ Failed to delete images from UploadThing:', err);
        return {
          success: false,
          message: '⚠️ Failed to delete images from UploadThing',
        };
      }
    }

    revalidatePath('/admin/products');

    return {
      success: true,
      message: 'Product deleted successfully (images cleaned up)',
    };
  } catch (error) {
    console.error('❌ Error deleting product:', error);
    return { success: false, message: 'Failed to delete product' };
  }
}

// Create a product
export async function createProduct(data: z.infer<typeof insertProductSchema>) {
  try {
    const product = insertProductSchema.parse(data);
    await prisma.product.create({ data: product });

    revalidatePath('/admin/products');

    return {
      success: true,
      message: 'Product created successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Update a product
export async function updateProduct(data: z.infer<typeof updateProductSchema>) {
  try {
    const product = updateProductSchema.parse(data);

    const productExists = await prisma.product.findFirst({
      where: { id: product.id },
      select: { images: true, banner: true },
    });

    if (!productExists) throw new Error('Product not found');

    // ✅ Find deleted images
    const oldImages = productExists.images || [];
    const newImages = product.images || [];
    const deletedImages = oldImages.filter((img) => !newImages.includes(img));

    // ✅ Find deleted banner
    const oldBanner = productExists.banner;
    const newBanner = product.banner;
    const deletedBanner =
      oldBanner && (!newBanner || oldBanner !== newBanner) ? oldBanner : null;

    // ✅ Update DB first
    await prisma.product.update({
      where: { id: product.id },
      data: product,
    });

    // ✅ Delete orphaned files from UploadThing (non-blocking)
    const toDelete = [...deletedImages, deletedBanner].filter(
      Boolean
    ) as string[];
    if (toDelete.length > 0) {
      try {
        const fileKeys = toDelete
          .map((url) => url.split('/').pop())
          .filter(Boolean) as string[];
        await utapi.deleteFiles(fileKeys);
      } catch (err) {
        console.error('⚠️ Failed to delete images from UploadThing:', err);
      }
    }

    revalidatePath('/admin/products');

    return {
      success: true,
      message: 'Product updated successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Get all categories
export async function getAllCategories() {
  const data = await prisma.product.groupBy({
    by: ['category'],
    _count: true,
  });

  return data;
}

// Get featured products
export async function getFeaturedProducts() {
  const data = await prisma.product.findMany({
    where: { isFeatured: true },
    orderBy: { createdAt: 'desc' },
    take: 4,
  });

  return convertToPlainObject(data);
}

// Get related products
export async function getRelatedProducts(
  category: string,
  excludeSlug: string,
  limit = 5
) {
  return await prisma.product.findMany({
    where: {
      category,
      slug: { not: excludeSlug },
      stock: { gt: 0 },
    },
    take: limit,
    orderBy: {
      createdAt: 'desc',
    },
  });
}
