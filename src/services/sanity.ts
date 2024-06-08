import {
  createClient,
  groq,
  ClientPerspective,
  SanityClient,
  ClientConfig,
} from "next-sanity";

const perspective: ClientPerspective = "published";

const config: ClientConfig = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  apiVersion: "vX",
  useCdn: true,
  perspective: perspective,
};

const sanityClient: SanityClient = createClient(config);

export const fetch = async (query: string): Promise<any> => {
  const parseQuery = groq`${query}`;
  return sanityClient.fetch(parseQuery);
};