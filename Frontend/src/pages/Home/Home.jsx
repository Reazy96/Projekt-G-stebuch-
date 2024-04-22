import { useEffect, useState } from "react";
import AddEntry from "../../components/AddEntry/AddEntry";
import EntryProps from "../../components/EntryProps/EntryProps";

const Home = () => {
  const [saveData, setSaveData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:2233/api/v1/gaestebuch", { method: "GET" })
      .then((res) => res.json())
      .then((data) => setSaveData(data))
      .catch((error) => console.log("AllEntrysFetch Error", error));
  }, []);

  return (
    <>
      <AddEntry />
      <h2>Gästebucheinträge:</h2>

      {saveData ? (
        saveData.map((item, index) => (
          <div key={index}>
            <EntryProps id={item.id} vn={item.vorname} nn={item.nachname} em={item.email} nr={item.nachricht} />
          </div>
        ))
      ) : (
        <p>loading...</p>
      )}
    </>
  );
};

export default Home;
