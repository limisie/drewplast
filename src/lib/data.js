import { getEntries, getEntry, getCollection } from "astro:content";
import { appendLocalizedUrl } from "@i18n/urls";

export const getPagesData = async (collection) => {
  const entries = await getCollection(collection);
  const data = entries.map((entry) => {
    appendLocalizedUrl(entry.id, entry.data);
    return entry.data;
  });
  return data;
};

export const getPageData = async (page) => {
  const { data } = await getEntry("pages", page);
  appendLocalizedUrl(page, data);

  return data;
};

export const getLocalizedDataByEntry = async (entry, locale) => {
  const entryData = await getEntry(entry);
  return entryData.data[locale];
};

export const getLocalizedDataByEntries = async (entries, locale) => {
  const entriesData = await getEntries(entries);
  return entriesData.map((entry) => entry.data[locale]);
};

export const getLocalizedCollectionData = async (collection, locale) => {
  const entriesData = await getCollection(collection);
  return entriesData.map((entry) => entry.data[locale]);
};

export const getLocalizedDataWithId = async (collection, locale) => {
  const entriesData = await getCollection(collection);
  return entriesData.map((entry) => {
    return {
      id: entry.id,
      title: entry.data[locale].title,
    };
  });
};

export const getFilteredReferences = async (
  collection,
  filterFunction,
  filterId,
  locale = ""
) => {
  return await getCollection(collection, ({ data }) =>
    filterFunction(locale ? data[locale] : data, filterId)
  );
};

export const filterDocumentsByCategory = (document, categoryId) =>
  document.category.some(({ id }) => id === categoryId);

export const filterDistributorsByRegion = (distributor, regionId) =>
  distributor.address.region.id === regionId;

export const getLocalizedLinks = async (type, locale) => {
  const { data } = await getEntry("data", "links");
  return await Promise.all(
    data[type].map(
      async (pageEntry) => await getLocalizedLink({ page: pageEntry }, locale)
    )
  );
};

export const getLocalizedLink = async (pageLink, locale) => {
  const pageData = await getLocalizedDataByEntry(pageLink.page, locale);
  return {
    text: pageLink.text,
    pageTitle: pageData.title,
    url: pageData.seo.slug.trim(),
    sectionId: pageLink.sectionId,
  };
};

export const getTableRow = (entry, columns) => {
  return columns.map((column) => entry[column]);
};
