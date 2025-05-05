"use client";

import { useState, useEffect, useCallback } from "react";
import { Workout } from "@/types";
import Filters from "@/components/Filters";
import Pagination from "@/components/Pagination";
import WorkoutList from "@/components/WorkoutList";
import { API_URL, ROUTES } from "@/config/urls";
import { saveFilters, loadFilters } from "@/utils/storage";
import debounce from "lodash/debounce";

async function getWorkouts(
  currentPage: number = 1,
  startDate: string = "",
  categories: string[] = [],
): Promise<{
  workouts: Workout[];
  totalPages: number;
  totalItems: number;
}> {
  const categoryParams = categories
    .map((cat) => `category=${encodeURIComponent(cat)}`)
    .join("&");
  const query = `page=${currentPage}&startDate=${startDate}${categories.length > 0 ? `&${categoryParams}` : ""}`;
  const res = await fetch(`${API_URL}${ROUTES.API.WORKOUTS}?${query}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch workouts");
  }

  const data = await res.json();
  return data;
}

// Load filters from localStorage on initial render
const loadInitialState = () => {
  if (typeof window === "undefined") {
    return { currentPage: 1, startDate: "", categories: [] };
  }

  const savedFilters = loadFilters();
  return {
    currentPage: savedFilters?.currentPage || 1,
    startDate: savedFilters?.startDate || "",
    categories: savedFilters?.categories || [],
  };
};

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Save filters to localStorage whenever they change
  useEffect(() => {
    if (!isInitialLoad) {
      saveFilters({ currentPage, startDate, categories });
    }
  }, [currentPage, startDate, categories, isInitialLoad]);

  // Load saved filters on initial render
  useEffect(() => {
    const {
      currentPage: savedPage,
      startDate: savedDate,
      categories: savedCategories,
    } = loadInitialState();
    setCurrentPage(savedPage);
    setStartDate(savedDate);
    setCategories(savedCategories);
    setIsInitialLoad(false);
  }, []);

  // Debounced fetch function to reduce API calls during filter changes
  const fetchWorkouts = useCallback(() => {
    const debouncedFetch = debounce(
      async (page: number, date: string, cats: string[]) => {
        try {
          setLoading(true);
          setError(null);
          const data = await getWorkouts(page, date, cats);
          setWorkouts(data.workouts);
          setTotalPages(data.totalPages);
          setTotalItems(data.totalItems);
        } catch {
          setError("Error loading workouts. Please try again.");
          setWorkouts([]);
          setTotalPages(0);
          setTotalItems(0);
        } finally {
          setLoading(false);
        }
      },
      300,
    );

    return debouncedFetch;
  }, []);

  useEffect(() => {
    const debounced = fetchWorkouts();
    debounced(currentPage, startDate, categories);
    // Cleanup debounce on unmount
    return () => {
      debounced.cancel();
    };
  }, [currentPage, startDate, categories, fetchWorkouts]);

  return (
    <div className="flex min-h-screen flex-col">
      <Filters
        startDate={startDate}
        categories={categories}
        onFilterChange={(newStartDate: string, newCategory: string[]) => {
          setStartDate(newStartDate);
          setCategories(newCategory);
          setCurrentPage(1);
        }}
        onResetFilters={() => {
          setStartDate("");
          setCategories([]);
          setCurrentPage(1);
        }}
      />
      <>
        <div className="mb-16 flex-1 sm:mb-0">
          <WorkoutList
            workouts={workouts}
            isLoading={loading}
            error={error ? new Error(error) : null}
            onRetry={() => {
              setCurrentPage(1);
              setStartDate("");
              setCategories([]);
              const debounced = fetchWorkouts();
              debounced(1, "", []);
            }}
            filtersSet={!!startDate || categories.length > 0}
            onResetFilters={() => {
              setStartDate("");
              setCategories([]);
              setCurrentPage(1);
              const debounced = fetchWorkouts();
              debounced(1, "", []);
            }}
          />
        </div>
        {error === null && totalPages > 0 && (
          <div className="py-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              onPageChange={(page: number) => setCurrentPage(page)}
            />
          </div>
        )}
      </>
    </div>
  );
}
