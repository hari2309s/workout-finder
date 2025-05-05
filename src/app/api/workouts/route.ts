import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { Workout } from "@/types";

// Directory for chunked workout files
const dataDir = path.join(process.cwd(), "src", "data");
const ITEMS_PER_PAGE = 20;
const TOTAL_PAGES = 50; // 1000 workouts ÷ 20 per page

/**
 * Reads workouts from a specific page file (e.g., workouts-page-2.json).
 * @param page - Page number (1-based).
 * @returns Array of Workout objects.
 */
async function readPage(page: number): Promise<Workout[]> {
  try {
    const filePath = path.join(dataDir, `workouts-page-${page}.json`);
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data) as Workout[];
  } catch (error) {
    console.error(`Error reading page ${page}:`, error);
    return [];
  }
}

/**
 * Reads all workouts from all page files, applying filters.
 * @param startDate - Filter by year and month (e.g., "2025-05").
 * @param categories - Filter by categories (e.g., ["C1", "C2"]).
 * @returns Array of Workout objects matching filters.
 */
async function readAllFiltered(
  startDate: string,
  categories: string[],
): Promise<Workout[]> {
  const workouts: Workout[] = [];
  for (let page = 1; page <= TOTAL_PAGES; page++) {
    const pageWorkouts = await readPage(page);
    let filtered = pageWorkouts;

    // Filter by startDate
    if (startDate) {
      const [year, month] = startDate.split("-");
      const targetMonth = new Date(parseInt(year), parseInt(month) - 1);
      filtered = filtered.filter((w) => {
        const workoutDate = new Date(w.startDate);
        return (
          workoutDate.getFullYear() === targetMonth.getFullYear() &&
          workoutDate.getMonth() === targetMonth.getMonth()
        );
      });
    }

    // Filter by categories
    if (categories.length > 0) {
      filtered = filtered.filter((w) => categories.includes(w.category));
    }

    workouts.push(...filtered);
  }
  return workouts;
}

/**
 * Finds a workout by ID across all page files.
 * @param id - Workout ID.
 * @returns Workout object or null if not found.
 */
async function findWorkoutById(id: string): Promise<Workout | null> {
  for (let page = 1; page <= TOTAL_PAGES; page++) {
    const workouts = await readPage(page);
    const workout = workouts.find((w) => w.id === id);
    if (workout) return workout;
  }
  return null;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const startDate = searchParams.get("startDate") || "";
    const categories = searchParams.getAll("category") || [];
    const id = searchParams.get("id") || "";
    console.log("Requested categories:", categories);

    // Fetch single workout by ID
    if (id) {
      const workout = await findWorkoutById(id);
      if (!workout) {
        return NextResponse.json(
          { error: "Workout not found" },
          { status: 404 },
        );
      }
      return NextResponse.json({ workout });
    }

    // Apply filters or fetch single page
    let workouts: Workout[] = [];
    let totalItems = 0;
    let totalPages = TOTAL_PAGES;

    if (startDate || categories.length > 0) {
      // Filters applied: scan all files
      workouts = await readAllFiltered(startDate, categories);
      totalItems = workouts.length;
      totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    } else {
      // No filters: read only the requested page
      if (page < 1 || page > TOTAL_PAGES) {
        return NextResponse.json(
          { error: "Invalid page number" },
          { status: 400 },
        );
      }
      workouts = await readPage(page);
      totalItems = 1000; // Total workouts without filters
      totalPages = TOTAL_PAGES;
    }

    // When filters are applied, we need to paginate the filtered results
    // When no filters, we already have the correct page from readPage
    let resultWorkouts = workouts;
    if (startDate || categories.length > 0) {
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      resultWorkouts = workouts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }

    return NextResponse.json({
      workouts: resultWorkouts,
      totalPages,
      totalItems,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
