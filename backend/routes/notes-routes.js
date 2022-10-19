const express = require("express");

const notesController = require("../controllers/notes-controller");

const router = express.Router();

router.get("/", notesController.getNotes);

router.post("/", notesController.createNote);

router.patch("/:id", notesController.updateNote);

router.delete("/:id", notesController.deleteNote);

module.exports = router;
