import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Divano",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f7f4ee",
    theme_color: "#10263d",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
