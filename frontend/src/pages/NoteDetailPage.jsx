import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/api-client";
import { TOO_MANY_REQUESTS } from "../lib/utils";
import toast from "react-hot-toast";
import LoadingUI from "../components/LoadingUI";
import { ArrowLeftIcon, Trash2 } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    api
      .delete(`/notes/${id}`)
      .then(() => {
        toast.success("Note deleted successfully");
        navigate("/");
      })
      .catch((err) => {
        if (err.response.status === TOO_MANY_REQUESTS) {
          toast.error("Slow down! You're deleting too fast", {
            duration: 4000,
            icon: "😒",
          });
        } else toast.error("Failed to delete note");
      });
  };

  const handleSave = () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true);

    api
      .put(`/notes/${id}`, note)
      .then(() => toast.success("Note saved successfully"))
      .then(() => navigate("/"))
      .catch((err) => {
        if (err.response.status === TOO_MANY_REQUESTS) {
          toast.error("Slow down! You're saving too fast", {
            duration: 4000,
            icon: "😒",
          });
        } else toast.error("Failed to save note");
      });
  };

  useEffect(() => {
    api
      .get(`/notes/${id}`)
      .then((res) => setNote(res.data))
      .catch((err) => {
        if (err.response.status === TOO_MANY_REQUESTS) {
          toast.error("Slow down! You're adding notes too fast", {
            duration: 4000,
            icon: "😒",
          });
        } else toast.error("Failed to add note");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <LoadingUI />;
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button
              onClick={() => handleDelete(id)}
              className="btn btn-error btn-outline"
            >
              <Trash2 className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Add New Note</h2>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered rounded-3xl"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-20 rounded-3xl"
                  value={note.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                />
              </div>

              <div className="card-actions justify-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {loading ? "Saving..." : "Save changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
