/* eslint-disable no-undef */
module.exports = {
  eslint: {
    ignoreDuringBuilds: true
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  env: {
    API_URL: process.env.API_URL,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    ALGORITHM: process.env.ALGORITHM,
    HASH_SALT: process.env.HASH_SALT
  },
  typescript: {
    ignoreBuildErrors: true
  }
}
