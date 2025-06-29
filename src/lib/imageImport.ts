import { getLocalizedDataByEntry } from "@lib/data";
import type { Entry } from "@lib/types";

const imports = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/images/*.{jpeg,jpg,png,gif}",
  { eager: true }
);

export const getDynamicImageData = async (image: Entry, locale: string) => {
  const data = await getLocalizedDataByEntry(image, locale);

  const filename = data.url.split("/").pop();
  if (!filename) throw new Error("Invalid image URL");

  const matchedKey = Object.keys(imports).find((key) => key.endsWith(filename));

  if (!matchedKey) {
    throw new Error(`Image "${filename}" not found in image imports`);
  }

  const imageImport = imports[matchedKey];

  return {
    import: () => imageImport.default,
    alt: data.alt,
    caption: data.caption ?? "",
    title: data.title,
    src: imageImport.default.src,
  };
};
