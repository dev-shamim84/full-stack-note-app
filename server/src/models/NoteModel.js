import mongoose from "mongoose";

const DataSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const NoteModel = mongoose.model("notes", DataSchema);
export default NoteModel;
