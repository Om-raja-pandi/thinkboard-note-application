import express from "express";
import {
  createNote,
  deletedNote,
  getAllNotes,
  updatedNote,
  getNoteById
} from "../controllers/notesControllers.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updatedNote);

router.delete("/:id", deletedNote);

export default router;
