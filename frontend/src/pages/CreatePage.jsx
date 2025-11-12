import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import api from "../lib/api-client";
import { TOO_MANY_REQUESTS } from "../lib/utils";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    api
      .post("/notes", {
        title,
        content,
      })
      .then(toast.success("Note added successfully!"))
      .then(navigate("/"))
      .catch((err) => {
        console.error("Error adding note", err);
        if (err.response.status === TOO_MANY_REQUESTS) {
          toast.error("Slow down! You're adding notes too fast", {
            duration: 4000,
            icon: "😒",
          });
        } else toast.error("Failed to add note");
      })
      .finally(setLoading(false));
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="nax-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Add New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered rounded-3xl"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered h-20 rounded-3xl"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Adding note..." : "Add Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
