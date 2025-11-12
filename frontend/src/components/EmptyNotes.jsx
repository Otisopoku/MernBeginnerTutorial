import { Link } from "react-router";

const EmptyNotes = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h2 className="text-xl font-semibold text-base-content/80">
        No notes yet
      </h2>
      <p className="text-base-content/60 mt-2">
        Create your first note to get started ✨
      </p>
      <Link to="/create" className="btn btn-primary mt-4 rounded-full gap-2">
        Create Note
      </Link>
    </div>
  );
};

export default EmptyNotes;
