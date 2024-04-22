import "./AddEntry.css";
import { useState } from "react";

const AddEntry = () => {
  const [newEntry, setNewEntry] = useState({
    vorname: "",
    nachname: "",
    email: "",
    nachricht: "",
  });
  const addNewGuest = (e) => {
    fetch("http://localhost:2233/api/v1/gaestebuch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEntry),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  return (
    <form>
      <input
        type="text"
        placeholder="Vorname"
        value={newEntry.vorname}
        onChange={(e) => setNewEntry({ ...newEntry, vorname: e.target.value })}
      />
      <input
        type="text"
        placeholder="Nachname"
        value={newEntry.nachname}
        onChange={(e) => setNewEntry({ ...newEntry, nachname: e.target.value })}
      />
      <input
        type="email"
        placeholder="E-Mail"
        value={newEntry.email}
        onChange={(e) => setNewEntry({ ...newEntry, email: e.target.value })}
      />
      <input
        type="text"
        placeholder="Nachricht"
        value={newEntry.nachricht}
        onChange={(e) => setNewEntry({ ...newEntry, nachricht: e.target.value })}
      />
      <button onClick={addNewGuest}>Post</button>
    </form>
  );
};

export default AddEntry;
