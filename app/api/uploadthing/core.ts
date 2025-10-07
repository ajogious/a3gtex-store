// import { createUploadthing, type FileRouter } from 'uploadthing/next';
// import { UploadThingError } from 'uploadthing/server';
// import { auth } from '@/auth';

// const f = createUploadthing();

// export const ourFileRouter = {
//   imageUploader: f({
//     image: { maxFileSize: '1MB' },
//   })
//     .middleware(async () => {
//       const session = await auth();
//       if (!session) throw new UploadThingError('Unauthorized');
//       return { userId: session?.user?.id };
//     })
//     .onUploadComplete(async ({ metadata }) => {
//       return { uploadedBy: metadata.userId };
//     }),
// } satisfies FileRouter;
// export type OurFileRouter = typeof ourFileRouter;

// /api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import { auth } from '@/auth';

const f = createUploadthing();

export const ourFileRouter = {
  // For product images
  productUploader: f({
    image: { maxFileSize: '1MB' },
  })
    .middleware(async () => {
      const session = await auth();
      if (!session) throw new UploadThingError('Unauthorized');
      return { userId: session?.user?.id };
    })
    .onUploadComplete(async ({ file, metadata }) => {
      return { url: file.url, uploadedBy: metadata.userId };
    }),

  // For banner
  bannerUploader: f({
    image: { maxFileSize: '1MB', maxFileCount: 1 },
  })
    .middleware(async () => {
      const session = await auth();
      if (!session) throw new UploadThingError('Unauthorized');
      return { userId: session?.user?.id };
    })
    .onUploadComplete(async ({ file, metadata }) => {
      return { url: file.url, uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
