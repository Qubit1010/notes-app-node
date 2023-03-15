const fs = require("fs");
const chalk = require("chalk");
const { debug } = require("console");

const addNotes = (title, body) => {
  const notes = loadNotes();
  // const duplicateNotes = notes.filter((notes) => title === notes.title);
  // find method stop searching once it find the element
  const duplicateNote = notes.find((notes) => title === notes.title);

  debugger

  if (!duplicateNote) {
    notes.push({
      title,
      body,
    });
    saveNotes(notes);
    console.log(chalk.green("New note added!"));
  } else {
    console.log(chalk.red("Note title taken!"));
  }
};

const removeNotes = (title) => {
  const notes = loadNotes();
  const updatedNotes = notes.filter((notes) => title !== notes.title);

  if (updatedNotes.length === notes.length) {
    console.log(chalk.red("No note found!"));
  } else {
    console.log(chalk.green("Note Removed!"));
    saveNotes(updatedNotes);
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.white.inverse("Your Notes: "));

  for (const note of notes) {
    console.log(note.title);
  }
};

const readNotes = (title) => {
  const notes = loadNotes();
  const searchedNotes = notes.find((notes) => title === notes.title);

  if (searchedNotes) {
    console.log(chalk.green.inverse(searchedNotes.title));
    console.log(chalk(searchedNotes.body));
  } else {
    console.log(chalk.red("No note found?"))
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addNotes,
  removeNotes,
  listNotes,
  readNotes,
};
