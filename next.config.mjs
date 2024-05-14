/** @type {import('next').NextConfig} */
// Add your domain here to allow lazy loading images from this domain and optimized by the next/image component
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hgtovaupiuxajqlkjdfg.supabase.co',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
