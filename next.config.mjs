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
        destination: '/docs/tr/aivex-feed/getting-started',
        permanent: false,
      },
      {
        source: '/docs/:lang(en|tr)',
        destination: '/docs/:lang/aivex-feed/getting-started',
        permanent: false,
      },
      // Old flat doc URLs, before pages moved under the aivex-feed folder.
      {
        source: '/docs/:lang(en|tr)/:page(getting-started|outputs|pipeline|turkish-path|integration)',
        destination: '/docs/:lang/aivex-feed/:page',
        permanent: false,
      },
    ];
  },
  images: {
    domains: [],
  },
};

export default nextConfig;
