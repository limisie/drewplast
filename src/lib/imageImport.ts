import { getLocalizedDataByEntry } from "@lib/data";
import type { Entry } from "@lib/types";

export const getDynamicImageData = async (image: Entry, locale: string) => {
  const imports = import.meta.glob<{ default: ImageMetadata }>(
    "/src/assets/images/*.{jpeg,jpg,png,gif}"
  );
  const data = await getLocalizedDataByEntry(image, locale);
  const src = `/${data.url}`;

  if (!imports[src])
    throw new Error(
      `"${src}" does not exist in glob: "/src/assets/images/*.{jpeg,jpg,png,gif}"`
    );

  return {
    import: imports[src],
    alt: data.alt,
    caption: data.caption ?? "",
    title: data.title,
  };
};
