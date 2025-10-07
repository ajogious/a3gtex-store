// import { NextResponse } from 'next/server';
// import { UTApi } from 'uploadthing/server';

// const utapi = new UTApi();

// export async function POST(req: Request) {
//   try {
//     const { url } = await req.json();

//     if (!url) {
//       return NextResponse.json(
//         { success: false, message: 'Missing file URL' },
//         { status: 400 }
//       );
//     }

//     const fileKey = url.split('/').pop();
//     if (!fileKey) {
//       return NextResponse.json(
//         { success: false, message: 'Invalid file URL' },
//         { status: 400 }
//       );
//     }

//     await utapi.deleteFiles(fileKey);

//     return NextResponse.json({ success: true });
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

// /api/uploadthing/delete/route.ts
import { NextResponse } from 'next/server';
import { UTApi } from 'uploadthing/server';
import { auth } from '@/auth';

const utapi = new UTApi();

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'Missing file URL' }, { status: 400 });
    }

    // Extract the file key from the URL
    const fileKey = url.split('/').pop();
    if (!fileKey) {
      return NextResponse.json({ error: 'Invalid file URL' }, { status: 400 });
    }

    await utapi.deleteFiles(fileKey);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
