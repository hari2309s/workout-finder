import WorkoutCard from "./WorkoutCard";
import EmptyState from "./EmptyState";
import ErrorState from "./ErrorState";
import Loader from "./Loader";
import { Workout } from "@/types";

export interface WorkoutListProps {
  workouts: Workout[];
  isLoading?: boolean;
  error?: Error | null;
  onRetry?: () => void;
  filtersSet?: boolean;
  onResetFilters?: () => void;
}

const WorkoutList = ({
  workouts,
  isLoading = false,
  error = null,
  onRetry,
  filtersSet = false,
  onResetFilters,
}: WorkoutListProps) => {
  if (error) {
    return (
      <div className="flex min-h-[300px] w-full items-center justify-center">
        <ErrorState
          title="Failed to load workouts"
          message="We couldn't load the workouts. Please try again."
          onRetry={onRetry}
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex w-full items-start justify-center">
        <Loader />
      </div>
    );
  }

  if (workouts.length === 0) {
    return (
      <div className="flex min-h-[300px] w-full items-center justify-center">
        <EmptyState
          title="No workouts found"
          description="Try adjusting your filters or search criteria."
          action={
            filtersSet && onResetFilters ? (
              <button
                onClick={onResetFilters}
                className="rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                Reset Filters
              </button>
            ) : undefined
          }
        />
      </div>
    );
  }

  return (
    <div
      role="list"
      className="grid max-h-[65vh] grid-cols-1 gap-8 overflow-y-auto p-4 md:grid-cols-2 md:p-6 lg:grid-cols-3 lg:p-8"
    >
      {workouts.map((workout) => (
        <WorkoutCard key={workout.id} workout={workout} />
      ))}
    </div>
  );
};

export default WorkoutList;
