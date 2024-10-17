import type { helperSchemas, collectionSchemas } from "@lib/schemas";
import type { z } from "astro/zod";

export interface Entry {
  id: string;
  collection: string;
}

export type Link = z.infer<typeof helperSchemas.link>;
export type Contact = z.infer<typeof helperSchemas.contact>;
export type Address = z.infer<typeof helperSchemas.address>;
export type Region = z.infer<typeof collectionSchemas.regions>;
export type Document = z.infer<typeof collectionSchemas.documents>;
export type Element = z.infer<(typeof collectionSchemas)["product-elements"]>;
export type Milestone = z.infer<typeof collectionSchemas.milestones>;
export type Feature = z.infer<typeof helperSchemas.feature>;

export interface ContactItem {
  name: string;
  contact: Contact;
  position?: string;
  image?: Entry;
  address?: Address;
}

export interface DrewplastData {
  name: string;
  address: Address;
  contact: Contact;
  nip: string;
  krs: string;
  regon: string;
}

export interface ContactHeadings {
  address: string;
  phone: string;
  email: string;
}

export interface PageLink {
  seo: { slug: string };
  title: string;
}

export interface DynamicImageData {
  import: () => Promise<{ default: ImageMetadata }>;
  alt: string;
  caption: string;
  title: string;
}
