interface LoaderProps {
  message?: string;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({
  message = "Loading workouts...",
  className = "",
}) => {
  return (
    <div
      className={`flex min-h-[500px] flex-col items-center justify-center gap-4 ${className}`}
    >
      <div
        role="status"
        aria-label="Loading"
        className="h-12 w-12 animate-spin rounded-full border-4 border-t-4 border-teal-90 border-t-teal-50"
      />
      <p className="text-sm font-medium text-teal-dark-50">{message}</p>
    </div>
  );
};

export default Loader;
