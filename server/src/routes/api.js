import express from "express";
import {
  CreateNote,
  DeleteNote,
  GetAllNote,
  GetNote,
  UpDateNote,
} from "../controllers/NoteController.js";
const router = express.Router();
router.get("/allNote", GetAllNote);
router.get("/getNote/:id", GetNote);
router.post("/createNote", CreateNote);
router.put("/updateNote/:id", UpDateNote);
router.delete("/deleteNote/:id", DeleteNote);
export default router;
