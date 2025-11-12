import { Link } from "react-router";
import Navbar from "../components/Navbar";
import RateLimitUI from "../components/RateLimitUI";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Signal } from "lucide-react";
import LoadingUI from "../components/LoadingUI";
import NoteCard from "../components/NoteCard";

const HomePage = () => {
  const TOO_MANY_REQUESTS = 429;
  const [isRateLimit, setRateLimit] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/notes")
      .then((res) => setNotes(res.data))
      .then(setRateLimit(false))
      .catch((err) => {
        console.error("Error fetching notes");
        if (err.response.status === TOO_MANY_REQUESTS) {
          setRateLimit(true);
        } else {
          toast.error("Failed to load notes");
        }
      })
      .finally(setLoading(false));
  }, []);

  console.log(notes);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimit && <RateLimitUI></RateLimitUI>}
      {loading && <LoadingUI />}
      {notes.length > 0 && !isRateLimit && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-10">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onDelete={(id) => console.log("Delete note: ", id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
