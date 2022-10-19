const { v4: uuidv4 } = require("uuid");
const HttpError = require("../models/http-error");

let NOTES = [
  {
    id: "n1",
    title: "note 1",
    content: "this is my first note",
    date: "2022-10-19",
  },
];

const getNotes = (req, res, next) => {
  res.status(200).json(NOTES);
};

const createNote = (req, res, next) => {
  const { title, content } = req.body;
  const newNote = {
    id: uuidv4(),
    title: title,
    content: content,
    date: new Date(),
  };
  NOTES.push(newNote);
  res.status(201).json({ note: newNote });
};

const updateNote = (req, res, next) => {
  const noteId = req.params.id;
  const { title, content } = req.body;

  const updatedNote = NOTES.find((n) => n.id === noteId);

  if (!updatedNote) {
    const error = new HttpError("No note with that id found.", 404);
    next(error);
  }
  const noteIndex = NOTES.indexOf((n) => n.id === noteId);

  updatedNote.title = title;
  updatedNote.content = content;

  NOTES[noteIndex] = updatedNote;

  res.status(200).json({ note: updatedNote });
};

const deleteNote = (req, res, next) => {
  const noteId = req.params.id;
  const updatedNotes = NOTES.filter((n) => n.id !== noteId);

  NOTES = [...updatedNotes];
  res.status(200).json({ message: "Deleted note" });
};

exports.getNotes = getNotes;
exports.createNote = createNote;
exports.updateNote = updateNote;
exports.deleteNote = deleteNote;
