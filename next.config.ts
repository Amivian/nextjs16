import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactCompiler: true,
 experimental:{
     turbopackFileSystemCacheForDev: true,
 },
 images:{
     remotePatterns:[
         { hostname: "picsum.photos" }, 
         { hostname: "jsonplaceholder.typicode.com" }
     ],
 },
};

export default nextConfig;
