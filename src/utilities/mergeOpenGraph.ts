import { SITE_CONFIG } from "@/config/site";
import type { Metadata } from "next";
import { getServerSideURL } from "./getURL";

const defaultOpenGraph: Metadata["openGraph"] = {
  type: "website",
  description: `${SITE_CONFIG.name} - ${SITE_CONFIG.description}`,
  images: [
    {
      url: `${getServerSideURL()}${SITE_CONFIG.ogImage}`,
    },
  ],
  siteName: SITE_CONFIG.name,
  title: SITE_CONFIG.name,
};

export const mergeOpenGraph = (og?: Metadata["openGraph"]): Metadata["openGraph"] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  };
};
