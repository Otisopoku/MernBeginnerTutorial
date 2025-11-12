const LoadingUI = ({ message = "Loading please wait..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-base-200/90 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-base-content/80 text-lg font-medium animate-pulse">
          {message}
        </p>
      </div>
    </div>
  );
};

export default LoadingUI;
