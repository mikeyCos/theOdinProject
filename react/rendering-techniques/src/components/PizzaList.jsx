function ListItem(props) {
  return <li>{props.pizza}</li>;
}

// function List(props) {
//   if (!props.pizzas) return <div>Loading...</div>;
//   if (props.pizzas.length === 0)
//     return <div>There are no pizzas in the list!</div>;

//   return (
//     <ul>
//       {props.pizzas.map((pizza) => {
//         return <ListItem key={pizza} pizza={pizza} />;
//       })}
//     </ul>
//   );
// }

// OR
// function List(props) {
//   return (
//     <>
//       {!props.pizzas ? (
//         <div>Loading...</div>
//       ) : props.pizzas.length > 0 ? (
//         <ul>
//           {props.pizzas.map((pizza) => {
//             return <ListItem key={pizza} pizza={pizza} />;
//           })}
//         </ul>
//       ) : (
//         <div>There are no pizzas on the list!</div>
//       )}
//     </>
//   );
// }

// OR
function List(props) {
  return (
    <>
      {!props.pizzas && <div>Loading...</div>}
      {props.pizzas && props.pizzas.length > 0 && (
        <ul>
          {props.pizzas.map((pizza) => {
            return <ListItem key={pizza} pizza={pizza} />;
          })}{" "}
        </ul>
      )}
      {props.pizzas && props.pizzas.length === 0 && (
        <div>There are no pizzas on the list!</div>
      )}
    </>
  );
}

export default function PizzaList() {
  const pizzasList = ["pepperoni", "cheese", "3-cheese", "bbq chicken"];
  const pizzas = [];

  return (
    <div>
      <h2>Pizzas: </h2>
      <List pizzas={pizzasList} />
      <List pizzas={pizzas} />
      <List />
    </div>
  );
}
