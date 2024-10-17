import { z, defineCollection } from "astro:content";
import { locales } from "@i18n/ui";
import { collectionSchemas } from "@lib/schemas";

const defineLocalizedCollection = (schema) =>
  defineCollection({
    type: "data",
    schema: z.object(
      locales.reduce((obj, lang) => ({ [lang]: schema, ...obj }), {})
    ),
  });

export const collections = {
  departaments: defineLocalizedCollection(collectionSchemas.departaments),
  distributors: defineCollection({
    type: "data",
    schema: collectionSchemas.distributors,
  }),
  "document-categories": defineLocalizedCollection(
    collectionSchemas["document-categories"]
  ),
  documents: defineLocalizedCollection(collectionSchemas.documents),
  employees: defineLocalizedCollection(collectionSchemas.employees),
  milestones: defineLocalizedCollection(collectionSchemas.milestones),
  images: defineLocalizedCollection(collectionSchemas.images),
  pages: defineLocalizedCollection(collectionSchemas.pages),
  products: defineLocalizedCollection(collectionSchemas.products),
  "product-elements": defineLocalizedCollection(
    collectionSchemas["product-elements"]
  ),
  regions: defineLocalizedCollection(collectionSchemas.regions),
  data: defineCollection({ type: "data", schema: collectionSchemas.data }),
  translations: defineLocalizedCollection(collectionSchemas.translations),
};
