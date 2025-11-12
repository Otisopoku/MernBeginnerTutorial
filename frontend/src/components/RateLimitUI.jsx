import { AlertTriangle } from "lucide-react"; // optional icon library

const RateLimitUI = ({ retryAfter = null, onRetry = null }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-full max-w-md shadow-xl bg-base-100 p-6 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-warning">
            <AlertTriangle size={50} />
          </div>
          <h2 className="text-2xl font-bold text-warning">Too Many Requests</h2>
          <p className="text-base text-base-content/80">
            You’ve reached the maximum number of allowed requests in a short
            period. Please wait before trying again.
          </p>

          {retryAfter && (
            <div className="badge badge-outline badge-warning mt-2">
              Try again in {retryAfter} seconds
            </div>
          )}

          <div className="mt-6">
            <button
              className="btn btn-warning"
              onClick={onRetry}
              disabled={retryAfter && retryAfter > 0}
            >
              {retryAfter && retryAfter > 0
                ? `Wait (${retryAfter}s)`
                : "Try Again"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimitUI;
