import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "",
        pathname: "/wikipedia/**", // อนุญาตให้โหลดรูปภาพจากทุก Path ที่เริ่มต้นด้วย /wikipedia/
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/home", // Route ที่ต้องการให้ Redirect จาก
        destination: "/", // Route ปลายทาง (Canonical URL)
        permanent: true, // 301 Permanent Redirect (ดีต่อ SEO)
      },
    ];
  },
};

export default nextConfig;
