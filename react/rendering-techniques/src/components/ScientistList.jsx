import { scientists } from "../data/data.scientists";
import getImageUrl from "../utility/getImageUrl";

const chemists = [];
const everyoneElse = [];

scientists.forEach((person) => {
  const array = person.profession === "chemist" ? chemists : everyoneElse;
  array.push(person);
});

function ListItem(person) {
  return (
    <li key={person.id}>
      <img src={getImageUrl(person)} alt={person.name} />
      <p>
        <b>{person.name}:</b>
        {` ${person.profession} known for ${person.accomplishment}`}
      </p>
    </li>
  );
}

function ListSection({ title, people }) {
  return (
    <>
      <h2>{title}</h2>
      <ul>
        {people.map((person) => (
          <ListItem key={person.id} {...person} />
        ))}
      </ul>
    </>
  );
}

export default function ScientistList() {
  //   const chemists = scientists.filter(
  //     (scientist) => scientist.profession === "chemist"
  //   );
  //   const notChemists = scientists.filter(
  //     (scientist) => scientist.profession !== "chemist"
  //   );

  return (
    <article>
      <ListSection title="Chemists" people={chemists} />
      <ListSection title="Everyone Else" people={everyoneElse} />
    </article>
  );
}
