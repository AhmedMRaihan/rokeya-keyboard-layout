import type { NextConfig } from "next";
import { name, version } from './package.json';

const nextConfig: NextConfig = {
  /* config options here */
  env:{
    name,
    version
  },
  output: "export",
  basePath: "/rokeya-keyboard-layout",
  trailingSlash: true,
};

export default nextConfig;
