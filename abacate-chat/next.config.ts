import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */

  // Set the workspace root to silence monorepo warning
  outputFileTracingRoot: path.join(__dirname, "../"),
};

export default nextConfig;
