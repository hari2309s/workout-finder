interface FilterState {
  currentPage: number;
  startDate: string;
  categories: string[];
}

const STORAGE_KEY = "workout_finder_filters";

/**
 * Saves the given filters to local storage.
 * @param {FilterState} filters - The filters to save.
 */
export const saveFilters = (filters: FilterState): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
  }
};

/**
 * Loads the saved filters from local storage.
 * @returns {FilterState | null} The saved filters, or null if none are found.
 */
export const loadFilters = (): FilterState | null => {
  if (typeof window === "undefined") return null;

  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return null;

  try {
    return JSON.parse(saved);
  } catch (error) {
    console.error("Failed to parse saved filters", error);
    return null;
  }
};

/**
 * Clears the saved filters from local storage.
 */
export const clearFilters = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
};
