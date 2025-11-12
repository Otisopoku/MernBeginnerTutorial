import { AlertTriangle, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router";

const ErrorUI = ({ message = "Something went wrong.", onRetry }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      <div className="bg-base-200 rounded-2xl p-6 shadow-md max-w-md w-full">
        <div className="flex flex-col items-center gap-4">
          <div className="bg-error/10 p-4 rounded-full">
            <AlertTriangle className="size-10 text-error" />
          </div>
          <h2 className="text-2xl font-semibold text-base-content">
            Oops! Something went wrong
          </h2>
          <p className="text-base-content/70">{message}</p>
          <button
            onClick={() => {
              const result = onRetry();
              if (result) {
                navigate("/");
              }
            }}
            className="btn btn-primary mt-4 rounded-full gap-2 shadow-md hover:shadow-lg transition-all"
          >
            <RefreshCw className="size-5" />
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorUI;
