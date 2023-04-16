module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://api.nelgroup.biz/:path*',
        },
      ]
    },
};
