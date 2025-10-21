import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/db/prisma';
import { UTApi } from 'uploadthing/server';

const utapi = new UTApi();

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { productId, imageUrl, type } = await req.json();
    // 👆 pass type: "banner" or "image" from client

    if (!productId || !imageUrl) {
      return NextResponse.json(
        { success: false, message: 'Missing data' },
        { status: 400 }
      );
    }

    // 🔑 Extract file key from UploadThing URL
    const fileKey = imageUrl.split('/').pop();
    if (!fileKey) {
      return NextResponse.json(
        { success: false, message: 'Invalid image URL' },
        { status: 400 }
      );
    }

    // 1. Delete from UploadThing storage
    await utapi.deleteFiles(fileKey);

    // 2. Remove from DB
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { images: true, banner: true },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }

    let updatedProduct;

    if (type === 'banner') {
      // 🔹 Clear banner field
      updatedProduct = await prisma.product.update({
        where: { id: productId },
        data: { banner: '' },
      });
    } else {
      // 🔹 Remove from images[] array
      const updatedImages = product.images.filter((img) => img !== imageUrl);

      updatedProduct = await prisma.product.update({
        where: { id: productId },
        data: { images: { set: updatedImages } },
      });
    }

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error('❌ Error removing image:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
