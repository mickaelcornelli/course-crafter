/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:[
            "utfs.io"
        ]
    }
}

module.exports = {
    eslint: {
      ignoreDuringBuilds: true,
    },
  }