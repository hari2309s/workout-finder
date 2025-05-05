import Link from "next/link";
import { Workout } from "@/types";
import { API_URL, ROUTES } from "@/config/urls";
import { ArrowLeft, Calendar, Tag as LucideTag } from "lucide-react";
import Tag from "@/components/Tag";
import { DATE_FORMAT_OPTIONS } from "@/constants";

/**
 * Fetches a workout by ID from the API.
 * @param id - The ID of the workout to fetch.
 * @returns The workout object if found, or null if not found.
 */
async function getWorkout(id: string): Promise<Workout> {
  const res = await fetch(`${API_URL}${ROUTES.API.WORKOUTS}?id=${id}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data.workout;
}

export default async function WorkoutDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workout = await getWorkout(id);

  if (!workout) {
    return (
      <div className="mt-10 text-center text-gray-600">Workout not found</div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Link href="/">
        <button className="group mb-8 inline-flex items-center rounded-lg bg-teal-600 px-4 py-2 text-white transition-colors hover:bg-teal-700">
          <ArrowLeft
            className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
            aria-label="Back"
          />
          Back
        </button>
      </Link>

      <div
        data-testid="workout-details"
        className="rounded-2xl border border-teal-80 bg-white p-8 shadow-lg"
      >
        <h1 className="mb-8 flex items-center gap-3 text-4xl font-extrabold text-gray-900">
          {workout.name}
        </h1>

        <div className="mb-10">
          <h2 className="mb-3 flex items-center gap-2 text-2xl font-semibold text-gray-700">
            Overview
          </h2>
          <p
            className="rounded-lg bg-teal-50/40 p-4 text-base leading-relaxed text-gray-700"
            style={{ lineHeight: 1.7, fontWeight: 400 }}
          >
            {workout.description}
          </p>
        </div>

        <div
          className="my-8 w-full border-t border-gray-200"
          aria-hidden="true"
        ></div>

        <div className="mb-4">
          <h2 className="mb-3 flex items-center gap-2 text-2xl font-semibold text-gray-700">
            Details
          </h2>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-8 sm:space-y-0">
            <div className="flex items-center gap-2 rounded-md bg-teal-100 px-4 py-2 text-gray-800">
              <Calendar
                className="h-4 w-4 text-teal-600"
                aria-label="Start Date"
              />
              <span className="font-semibold">Start Date:</span>
              <span className="font-light">
                {new Date(workout.startDate).toLocaleDateString(
                  DATE_FORMAT_OPTIONS.locale,
                  DATE_FORMAT_OPTIONS.options,
                )}
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-md bg-teal-100 px-4 py-2 text-gray-800">
              <LucideTag
                className="h-4 w-4 text-teal-600"
                aria-label="Category"
              />
              <span className="font-semibold">Category:</span>
              <Tag
                label={workout.category.toUpperCase()}
                category={workout.category}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
