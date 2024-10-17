import { reference, z } from "astro:content";
import { productsElements } from "@i18n/ui";

export const helperSchemas = {
  featuresList: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    })
  ),
  link: z.object({
    text: z.string(),
    url: z.string(),
  }),
  pageLink: z.object({
    text: z.string(),
    page: reference("pages"),
  }),
  address: z.object({
    street: z.string(),
    city: z.string(),
    postalCode: z.string(),
    region: reference("regions"),
  }),
  contact: z.object({
    phone: z.string().optional(),
    email: z.string().optional(),
    url: z.string().url().optional(),
  }),
};

const sectionSchemas = {
  seo: z.object({
    slug: z.string(),
    metaTitle: z.string(),
    metaDescription: z.string(),
    metaImage: reference("images").optional(),
    preventIndexing: z.boolean(),
  }),
  general: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: reference("images").optional(),
    eyebrow: z.string().optional(),
    advantages: z.string().optional(),
    featuresList: helperSchemas.featuresList.optional(),
    link: helperSchemas.link.optional(),
    pageLink: helperSchemas.pageLink.optional(),
  }),
  generalReferenceList: (collection) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      [`${collection}List`]: z.array(reference(collection)).optional(),
    }),
  elements: z.object({
    title: z.string(),
    pipesList: z.array(
      z.object({
        pipe: reference("product-elements"),
        link: z.string(),
      })
    ),
    fittingsList: z.object({
      title: z.string(),
      list: z.array(reference("product-elements")),
      link: z.string(),
    }),
  }),
  hero: z.object({
    title: z.string(),
    description: z.string(),
    image: reference("images").optional(),
    phoneButton: helperSchemas.link,
    emailButton: helperSchemas.link,
    videoButton: helperSchemas.link,
  }),
};

const collectionSchemas = {
  departaments: z.object({
    title: z.string(),
    employeesList: z.array(reference("employees")),
  }),
  distributors: z.object({
    name: z.string(),
    address: helperSchemas.address,
    contact: helperSchemas.contact,
  }),
  "document-categories": z.object({
    title: z.string(),
  }),
  documents: z.object({
    title: z.string(),
    date: z.string(),
    file: z.string(),
    buttonText: z.string(),
    category: z.array(reference("document-categories")),
  }),
  employees: z.object({
    name: z.string(),
    position: z.string(),
    image: reference("images").optional(),
    contact: helperSchemas.contact.optional(),
  }),
  images: z.object({
    title: z.string(),
    alt: z.string(),
    caption: z.string().optional(),
    url: z.string(),
  }),
  milestones: z.object({
    title: z.string(),
    year: z.number(),
    description: z.string(),
  }),
  pages: z.object({
    title: z.string(),
    seo: sectionSchemas.seo,
    sectionHero: sectionSchemas.hero.optional(),
    sectionHeader: sectionSchemas.general.optional(),
    sectionDescription: sectionSchemas.general.optional(),
    sectionDistributors: sectionSchemas.general.optional(),
    sectionProducts: sectionSchemas.general.optional(),
    sectionSustainable: sectionSchemas.general.optional(),
    sectionEmployees: sectionSchemas
      .generalReferenceList("employees")
      .optional(),
    sectionHistory: sectionSchemas
      .generalReferenceList("milestones")
      .optional(),
    image: reference("images").optional(),
    content: z.string().optional(),
    categoriesList: z.array(reference("document-categories")).optional(),
  }),
  products: z.object({
    title: z.string(),
    buttonText: z.string(),
    image: reference("images").optional(),
    seo: sectionSchemas.seo,
    sectionHeader: sectionSchemas.general,
    sectionDescription: sectionSchemas.general,
    sectionElements: sectionSchemas.elements,
    sectionGallery: sectionSchemas.generalReferenceList("images"),
    sectionDocuments: sectionSchemas.generalReferenceList("documents"),
  }),
  "product-elements": z.object({
    category: z.enum([...productsElements.pipes, ...productsElements.fittings]),
    title: z.string(),
    description: z.string().optional(),
    type: z.string().optional(),
    image: reference("images").optional(),
    section: reference("images").optional(),
    table: z.string(),
  }),
  regions: z.object({
    title: z.string(),
  }),
  data: z.object({
    name: z.string().optional(),
    fullName: z.string().optional(),
    description: z.string().optional(),
    address: helperSchemas.address.optional(),
    contact: helperSchemas.contact.optional(),
    nip: z.string().optional(),
    krs: z.string().optional(),
    regon: z.string().optional(),
    navbar: z.array(reference("pages")).optional(),
    footer: z.array(reference("pages")).optional(),
  }),
  translations: z.object({
    aboutCompany: z.string(),
    documentsTableHeadings: z.string(),
    contactHeadings: z.object({
      address: z.string(),
      phone: z.string(),
      email: z.string(),
    }),
    distributorsError: z.string(),
    documentsError: z.string(),
  }),
};

export default collectionSchemas;
