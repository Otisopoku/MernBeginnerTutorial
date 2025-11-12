import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";

const App = () => {
  return (
    <div data-theme="coffee" className="overflow-y-hidden">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>

      <footer className="py-4 text-center text-sm text-base-content/60 border-t border-base-content/10">
        © {new Date().getFullYear()} Otis Opoku. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
