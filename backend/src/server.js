import express from "express";
import router from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotevn from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";

dotevn.config();

const app = express();
const __dirname = path.resolve();

// use cors when we are in production because we are using different domains for the backend end server and frontend
if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      // without specifying the origin, it will allow interaction with any client
      origin: "http://localhost:5173",
    })
  );
}

app.use(express.json());
app.use(rateLimiter);
app.use("/api/notes", router);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  // serve the front end statically since we are deploying both the front end and backend on one domain on ra
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB()
  .then(
    app.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}`);
    })
  )
  .catch((err) => console.error("Unable to start app: ", err));
