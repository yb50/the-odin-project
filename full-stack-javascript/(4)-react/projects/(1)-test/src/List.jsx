function List() {
  const animals = ["Lion", "Cow", "Snake", "Lizard"];

  return (
    <>
      <h1>Animals: </h1>
      <ul>
        {animals.map((animal) => {
          return <li key={animal}>{animal}</li>;
        })}
      </ul>
    </>
  );
}

export default List;

