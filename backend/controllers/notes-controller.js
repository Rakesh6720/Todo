const fs = require("fs");
const path = require("path");
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
  const p = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "todos.json"
  );
  fs.readFile(p, (err, fileContent) => {
    let todos = [];
    if (!err) {
      todos = JSON.parse(fileContent);
      res.status(200).json(todos);
    } else {
      const error = new HttpError("Error retrieving todos.", 404);
      next(error);
    }
  });
};

const createNote = (req, res, next) => {
  const { title, content } = req.body;
  const newNote = {
    id: uuidv4(),
    title: title,
    content: content,
    date: new Date(),
  };
  const p = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "todos.json"
  );
  fs.readFile(p, (err, fileContent) => {
    let todos = [];
    if (!err) {
      todos = JSON.parse(fileContent);
    }
    todos.push(newNote);
    fs.writeFile(p, JSON.stringify(todos), (err) => {
      console.log(err);
    });
  });
  res.status(201).json({ note: newNote });
};

const updateNote = (req, res, next) => {
  const todoId = req.params.id;
  const { title, content } = req.body;
  let todos = [];
  const p = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "todos.json"
  );
  fs.readFile(p, (err, fileContent) => {
    if (!err) {
      todos = JSON.parse(fileContent);
      const updatedTodo = todos.find((t) => t.id === todoId);

      if (!updatedTodo) {
        const error = new HttpError("No note with that id found.", 404);
        next(error);
      } else {
        const todoIndex = todos.indexOf((t) => t.id === todoId);

        updatedTodo.title = title;
        updatedTodo.content = content;

        todos[todoIndex] = updatedTodo;
        fs.writeFile(p, JSON.stringify(todos), (err) => {
          console.log(err);
        });
        res.status(200).json({ todos });
      }
    } else {
      console.log(err);
      const error = new HttpError("There was an error reading from file.", 404);
      next(error);
    }
  });
};

const deleteNote = (req, res, next) => {
  const todoId = req.params.id;

  const p = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "todos.json"
  );
  fs.readFile(p, (err, fileContent) => {
    let todos = [];
    if (!err) {
      todos = JSON.parse(fileContent);
    }
    const updatedTodos = todos.filter((t) => t.id !== todoId);

    fs.writeFile(p, JSON.stringify(updatedTodos), (err) => {
      console.log(err);
    });
  });

  res.status(200).json({ message: "Deleted todo" });
};

exports.getNotes = getNotes;
exports.createNote = createNote;
exports.updateNote = updateNote;
exports.deleteNote = deleteNote;
