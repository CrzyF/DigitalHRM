/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async() => {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true
      }
    ]
  },
  images:{
    domains:["localhost"]
  }
}

module.exports = nextConfig
