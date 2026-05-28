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
    ];
  },
  images: {
    domains: [],
  },
};

export default nextConfig;
