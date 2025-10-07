import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io', // old host (still valid for some uploads)
      },
      {
        protocol: 'https',
        hostname: '**.ufs.sh', // new UploadThing host
      },
    ],
  },
};

export default nextConfig;
