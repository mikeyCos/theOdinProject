export default function App() {
  const animals = ['Lion', 'Cow', 'Snake', 'Lizard'];
  // This is so strange
  return (
    <div>
      <h1>Animals: </h1>
      <ul>
        {animals.map((animal) => (
          <li key={animal}>{animal}</li>
        ))}
      </ul>
    </div>
  );
}
