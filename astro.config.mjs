import { defineConfig } from "astro/config";
import { defaultLocale, locales } from "./src/i18n/ui.ts";
import icon from "astro-icon";

import { defineConfig } from "astro/config";

export default defineConfig({
  i18n: {
    defaultLocale: defaultLocale,
    locales: locales,
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [icon()],
});
