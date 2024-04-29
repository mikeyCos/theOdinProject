export default function App() {
  const animals = ["Lion", "Cow", "Snake", "Lizard"];
  const people = ["Timmy", "Pinny", "Kenny", "Jinny"];
  const peopleList = people.map((person) => <li key={person}>{person}</li>);
  // This is so strange
  return (
    <div>
      <h2>Animals: </h2>
      <ul>
        {animals.map((animal) => (
          <li key={animal}>{animal}</li>
        ))}
      </ul>

      <h2>People: </h2>
      <ul>{peopleList}</ul>
    </div>
  );
}
