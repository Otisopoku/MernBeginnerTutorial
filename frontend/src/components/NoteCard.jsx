import { useNavigate } from "react-router";
import { FilePenLine, Trash2 } from "lucide-react";
import { formateDate } from "../lib/utils";

const NoteCard = ({ note, onDelete }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/note/${note._id}`);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    navigate(`/note/edit/${note._id}`);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete?.(note._id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative cursor-pointer transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="card bg-base-100/70 backdrop-blur-md border border-base-300 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
        {/* Decorative gradient bar */}
        <div className="h-1 bg-gradient-to-r from-primary via-accent to-secondary"></div>

        <div className="card-body">
          <h3 className="card-title text-lg font-semibold text-base-content line-clamp-1">
            {note.title || "Untitled Note"}
          </h3>

          <p className="text-sm text-base-content/70 line-clamp-3 leading-relaxed">
            {note.content || "No content yet..."}
          </p>

          <div className="card-actions justify-between items-center mt-4">
            <span className="text-xs text-base-content/60">
              {formateDate(note.createdAt)}
            </span>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={handleEditClick}
                className="btn btn-ghost btn-xs text-primary hover:bg-primary/10"
              >
                <FilePenLine className="size-4" />
              </button>
              <button
                onClick={handleDeleteClick}
                className="btn btn-ghost btn-xs text-error hover:bg-error/10"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 blur-xl transition duration-300 -z-10"></div>
    </div>
  );
};

export default NoteCard;
