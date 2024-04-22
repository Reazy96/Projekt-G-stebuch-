import "./EntryProps.css";

const EntryProps = ({ id, vn, nn, em, nr }) => {
  return (
    <main>
      <h3>{id}</h3>
      <p>{vn}</p>
      <p>{nn}</p>
      <p>{em}</p>
      <p>{nr}</p>
    </main>
  );
};

export default EntryProps;
