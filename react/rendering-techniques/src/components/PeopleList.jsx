const people = [
  {
    id: 0,
    name: 'Malcolm',
    profession: 'lawyer',
  },
  {
    id: 1,
    name: 'Reese',
    profession: 'welder',
  },
  {
    id: 2,
    name: 'Dewey',
    profession: 'street performer',
  },
  {
    id: 3,
    name: 'Francis',
    profession: 'farmer',
  },
  {
    id: 4,
    name: 'Hal',
    profession: 'accountant',
  },
];

function ListItem({ name, profession }) {
  return (
    <li>
      <p>
        <b>{name}:</b> {' is a ' + profession}
      </p>
    </li>
  );
  //   console.log(props);
  //   return <li>{props.person.name}</li>;
}

function List({ people }) {
  return (
    <ul>
      {people.map((person) => {
        // return <ListItem key={person.id} person={person}
        return <ListItem key={person.id} {...person} />;
      })}
    </ul>
  );
}

export default function PeopleList() {
  return (
    <div>
      <h2>More People: </h2>
      <List people={people} />
    </div>
  );
}
