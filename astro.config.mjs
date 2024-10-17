import { defineConfig } from "astro/config";
import { defaultLocale, locales } from "./src/i18n/ui.ts";
// https://astro.build/config

export default defineConfig({
  i18n: {
    defaultLocale: defaultLocale,
    locales: locales,
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
