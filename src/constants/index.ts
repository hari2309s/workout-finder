export const DATE_FORMAT_OPTIONS = {
  locale: "de-DE",
  options: {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  },
} as const;

export const CATEGORY_COLORS: Record<string, string> = {
  c1: "bg-teal-600 text-white",
  c2: "bg-blue-600 text-white",
  c3: "bg-orange-500 text-white",
  c4: "bg-purple-600 text-white",
  c5: "bg-pink-600 text-white",
  c6: "bg-green-600 text-white",
  c7: "bg-yellow-500 text-gray-900",
} as const;
