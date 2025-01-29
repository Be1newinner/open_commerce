/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "firebasestorage.googleapis.com" }],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "firebasestorage.googleapis.com",
    //     port: "",
    //     pathname: "/v0/b/wingfi-9b5b7.appspot.com/o/*",
    //     search: "",
    //   },
    // ],
  },
};

export default nextConfig;
