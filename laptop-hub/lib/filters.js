export const SORT_VALUES = ["featured", "price-asc", "price-desc", "rating"];

export function parseList(value) {
  if (!value) return [];
  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

const read = (params, key) => {
  if (!params) return null;
  if (typeof params.get === "function") return params.get(key);
  const value = params[key];
  return Array.isArray(value) ? value[0] : value ?? null;
};

/**
 * Normalises Next.js `searchParams` (or a URLSearchParams instance) into the
 * filter shape used by <ProductGrid />.
 */
export function normalizeFilters(params) {
  const sort = read(params, "sort");

  return {
    q: read(params, "q") ?? "",
    category: read(params, "category") ?? "",
    brands: parseList(read(params, "brands")),
    bands: parseList(read(params, "bands")),
    rams: parseList(read(params, "rams"))
      .map(Number)
      .filter((value) => Number.isFinite(value)),
    sort: SORT_VALUES.includes(sort) ? sort : "featured",
  };
}

export function buildQuery(filters) {
  const params = new URLSearchParams();
  if (filters.q.trim()) params.set("q", filters.q.trim());
  if (filters.category) params.set("category", filters.category);
  if (filters.brands.length) params.set("brands", filters.brands.join(","));
  if (filters.bands.length) params.set("bands", filters.bands.join(","));
  if (filters.rams.length) params.set("rams", filters.rams.join(","));
  if (filters.sort && filters.sort !== "featured") params.set("sort", filters.sort);
  return params.toString();
}
