export function isString(value) {
  return typeof value === "string";
}

export function isList(value) {
  return Array.isArray(value) && value.length > 0;
}
