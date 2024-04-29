function ListItem(props) {
  return <li>{props.vegetable}</li>;
}

function List(props) {
  return (
    <ul>
      {
        /* {props.vegetables.map((vegetable) => {
        return vegetable.startsWith("F") ? (
          <ListItem key={vegetable} vegetable={vegetable} />
        ) : null;
      })} */
        props.vegetables.map((vegetable) => {
          return (
            vegetable.startsWith("F") && (
              <ListItem key={vegetable} vegetable={vegetable} />
            )
          );
        })
      }
    </ul>
  );
}

export default function VegetableList() {
  const vegetables = [
    "Fennel",
    "Pandan",
    "Peanuts",
    "Peas",
    "Fenugree",
    "Parsley",
  ];
  return (
    <div>
      <h2>Vegetables:</h2>
      <List vegetables={vegetables} />
    </div>
  );
}
