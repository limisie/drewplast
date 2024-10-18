import { defaultLocale, locales } from "@i18n/ui";

export const localizedUrlList = {};

export const getLocaleUrl = (locale, path) =>
  locale === defaultLocale
    ? `/${path.trim()}`
    : `/${locale}/${path.trim()}`.replace(/\/$/, "");

export const appendLocalizedUrl = (key, data) => {
  if (!localizedUrlList[key]) {
    localizedUrlList[key] = {};
  }
  locales.map(
    (locale) =>
      (localizedUrlList[key][locale] = getLocaleUrl(
        locale,
        data[locale].seo.slug
      ))
  );
};

export const getLocalizedUrlList = (locale, path) => {
  const key = Object.keys(localizedUrlList).find(
    (key) => localizedUrlList[key][locale] === path
  );
  return localizedUrlList[key];
};

const isEmpty = (obj) => Object.keys(obj).length === 0;

export const getCurrentUrl = (params) => {
  const path = isEmpty(params) ? "" : Object.values(params)[0];
  return `/${path}`;
};
