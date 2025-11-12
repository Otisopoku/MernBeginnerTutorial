import Navbar from "../components/Navbar";
import RateLimitUI from "../components/RateLimitUI";
import { useEffect, useState } from "react";
import api from "../lib/api-client";
import toast from "react-hot-toast";
import LoadingUI from "../components/LoadingUI";
import NoteCard from "../components/NoteCard";
import { TOO_MANY_REQUESTS } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import EmptyNotes from "../components/EmptyNotes";
import ErrorUI from "../components/ErrorUI";

const HomePage = () => {
  const [isRateLimit, setRateLimit] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    api
      .delete(`/notes/${id}`)
      .then(() => {
        toast.success("Note deleted successfully");
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
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

  const fetchNotes = () => {
    setLoading(true);
    setError(false);
    api
      .get("/notes")
      .then((res) => setNotes(res.data))
      .then(() => setRateLimit(false))
      .catch((err) => {
        console.error("Error fetching notes");
        if (err.response.status === TOO_MANY_REQUESTS) {
          setRateLimit(true);
        } else {
          toast.error("Failed to load notes");
          setError(true);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {loading ? (
        <LoadingUI />
      ) : error ? (
        <ErrorUI onRetry={fetchNotes} />
      ) : isRateLimit ? (
        <RateLimitUI />
      ) : notes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-10 mt-3">
          <AnimatePresence>
            {notes.map((note) => (
              <motion.div
                key={note._id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <NoteCard note={note} onDelete={handleDelete} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <EmptyNotes />
      )}
    </div>
  );
};

export default HomePage;
