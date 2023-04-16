module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "https://app.nelgroup.biz" },
        ],
      },
    ];
  },
};
