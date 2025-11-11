import mongoose from "mongoose";

// 1 create a schema
// 2 create a model

const notesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", notesSchema);

export default Note;
