import { Workout } from "@/types";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const categories = ["c1", "c2", "c3", "c4", "c5", "c6", "c7"];
const ITEMS_PER_PAGE = 20;
const TOTAL_WORKOUTS = 1000;
const PAGES = Math.ceil(TOTAL_WORKOUTS / ITEMS_PER_PAGE);

/**
 * Generates a random date between May 2025 and July 2026.
 * @param month - Month offset (0–14).
 * @returns ISO date string.
 */
function generateRandomDate(month: number) {
  const startDate = new Date(2025, 4, 1);
  const date = new Date(startDate);
  date.setMonth(startDate.getMonth() + month);
  return date.toISOString();
}

/**
 * Generates a workout description.
 * Combines a base description with lorem ipsum to reach ~10KB per workout.
 * @returns Description string.
 */
function generateDescription() {
  const base =
    "This is a workout designed to help you achieve your fitness goals. It includes a variety of exercises to improve your strength, flexibility, and endurance. ";
  const filler =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ".repeat(
      70,
    );
  return base + filler;
}

/**
 * Generates 1000 workouts, split into 50 files (20 workouts each, ~200KB per file).
 * Files are named workouts-page-1.json to workouts-page-50.json.
 */
async function generateWorkouts() {
  const workouts: Workout[] = [];

  for (let i = 0; i < TOTAL_WORKOUTS; i++) {
    const month = Math.floor(Math.random() * 15); // Random month between 0–14
    workouts.push({
      id: uuidv4(),
      name: `Workout ${i + 1}`,
      description: generateDescription(),
      startDate: generateRandomDate(month),
      category: categories[Math.floor(Math.random() * categories.length)],
    });
  }

  for (let page = 1; page <= PAGES; page++) {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const pageWorkouts = workouts.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE,
    );
    const filePath = path.join(
      process.cwd(),
      "src",
      "data",
      `workouts-page-${page}.json`,
    );
    await fs.writeFile(filePath, JSON.stringify(pageWorkouts, null, 2));
    console.log(`Generated ${filePath} (${pageWorkouts.length} workouts`);
  }

  console.log(`Generated ${TOTAL_WORKOUTS} workouts across ${PAGES} files`);
}

generateWorkouts();
