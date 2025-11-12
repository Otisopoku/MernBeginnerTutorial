import express from "express";
import router from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotevn from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

dotevn.config();

const app = express();

app.use(
  cors({
    // without specifying the origin, it will allow interaction with any client
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(rateLimiter);
app.use("/api/notes", router);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(
    app.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}`);
    })
  )
  .catch((err) => console.error("Unable to start app: ", err));
