/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  experimental: {
    mdxRs: false,
  },
  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/docs/tr/getting-started',
        permanent: false,
      },
      {
        source: '/docs/:lang(en|tr)',
        destination: '/docs/:lang/getting-started',
        permanent: false,
      },
      // Legacy routes from the previous site structure.
      { source: '/product', destination: '/products', permanent: true },
      { source: '/about', destination: '/founders', permanent: true },
      { source: '/methodology', destination: '/research', permanent: true },
    ];
  },
  images: {
    domains: [],
  },
};

export default nextConfig;
