import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));

    return <div>Home</div>;
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted successfully");
        else alert("Failed to delete note");
      })
      .then(() => getNotes())
      .catch((err) => alert(err));
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { title, content })
      .then((res) => {
        if (res.status === 201) alert("Note created successfully");
        else alert("Failed to create note");
        getNotes();
      })
      .catch((err) => alert(err));
  };
  return (
    <div>
      <div>
        <h2>Notes</h2>
        {notes.map((note) => (
          <Note key={note.id} note={note} onDelete={deleteNote} />
        ))}
      </div>
      <h2>Create Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <br />
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          name="content"
          value={content}
          required
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        />
        <br />
        <input type="submit" value="Create Note" />
      </form>
    </div>
  );
}

export default Home;
