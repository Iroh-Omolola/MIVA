 /** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/students/:path*',
          has: [
            {
              type: 'cookie',
              key: 'miva-token',
              value: '(?<value>.+)',
            },
          ],
          destination: '/auth/login',
          permanent: false,
        },
        {
        source: '/',
        destination: '/auth/login',
        permanent: false,
      },
      ];
    },
  };
  
  export default nextConfig;
  