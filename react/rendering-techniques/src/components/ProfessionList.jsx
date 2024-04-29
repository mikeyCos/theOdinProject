function ListItem(props) {
  return <li>{props.profession}</li>;
}

function List(props) {
  return (
    <ul>
      {props.professionsList.map((profession) => {
        return <ListItem key={profession} profession={profession} />;
      })}
    </ul>
  );
}

export default function ProfessionList() {
  const professions = [
    "Elementalist",
    "Warrior",
    "Monk",
    "Ranger",
    "Necromancer",
  ];

  return (
    <div>
      <h2>Professions: </h2>
      <List professionsList={professions} />
    </div>
  );
}
