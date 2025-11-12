import { Link, useLocation } from "react-router";
import { PlusIcon } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-base-300/80 border-b border-base-content/10 shadow-sm">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 group">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl font-bold font-mono tracking-tighter bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
          >
            NotesHub
          </motion.h1>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {location.pathname !== "/create" && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/create"
                className="btn btn-primary rounded-full gap-2 shadow-md hover:shadow-lg  transition-all"
              >
                <PlusIcon className="size-5" />
                <span className="hidden sm:inline">New Note</span>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
