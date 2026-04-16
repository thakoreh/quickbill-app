import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/quickbill-app',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
