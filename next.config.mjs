/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    webpack: function (config, options) {
      config.experiments = {
        asyncWebAssembly: true,
        layers: true,
      };
      return config;
    },
  };
  
  export default nextConfig;