import Link from "next/link";
import { Workout } from "@/types";
import { DATE_FORMAT_OPTIONS } from "@/constants";
import { ChevronRight, Calendar } from "lucide-react";
import Tag from "@/components/Tag";

interface WorkoutCardProps {
  workout: Workout;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  return (
    <Link href={`/workout/${workout.id}`}>
      <div
        data-testid="workout-card"
        className="flex h-full flex-col rounded-2xl border border-teal-80 bg-white p-6 shadow-md transition-all duration-200 hover:bg-teal-50/40 hover:shadow-lg"
      >
        <h3 className="mb-2 text-xl font-bold text-gray-900">{workout.name}</h3>
        <p className="mb-3 leading-relaxed text-gray-700">
          {workout.description.length > 100
            ? `${workout.description.substring(0, 100)}...`
            : workout.description}
        </p>
        <div className="mb-3 flex items-center gap-2 text-sm text-gray-800">
          <Calendar className="h-4 w-4 text-teal-600" />
          <span>
            Start:{" "}
            {new Date(workout.startDate).toLocaleDateString(
              DATE_FORMAT_OPTIONS.locale,
              DATE_FORMAT_OPTIONS.options,
            )}
          </span>
        </div>
        <div className="mb-4">
          <Tag
            label={workout.category.toUpperCase()}
            category={workout.category}
            showIcon={true}
          />
        </div>
        <div className="flex justify-end">
          <button className="group inline-flex items-center gap-1 rounded-lg bg-teal-600 px-4 py-2 text-sm leading-5 text-white transition-colors hover:bg-teal-700">
            Explore
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
              <ChevronRight
                className="h-4 w-4 text-white"
                data-testid="chevron-right"
              />
            </span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;
