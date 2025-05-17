/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['your-bucket-name.s3.amazonaws.com'],
  },
};

export default nextConfig;
